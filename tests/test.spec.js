const { test, expect } = require('@playwright/test');
const exp = require('constants');

const performActionOnElements = async (page, selectors, action) => {
	for (const selector of selectors) {
		const element = page.locator(selector);
		await action(element);
	}
};

const fillFormFields = async (page, fields) => {
	for (const [selector, value] of Object.entries(fields)) {
		const field = await page.locator(selector);
		await field.fill(value);
	}
};

const weblink = 'https://pholickr.onrender.com/';
const locallink = 'http://localhost:3000/';

const navigateTo = async (page, url = weblink) => {
	await page.goto(url);
};

const verifyVisibility = async (page, selectors, shouldBeVisible = true) => {
	await performActionOnElements(page, selectors, async (element) =>
		shouldBeVisible
			? expect(element).toBeVisible()
			: expect(element).not.toBeVisible()
	);
};

const verifyErrorMessage = async (page, message) => {
	await expect(page.locator(`text="${message}"`)).toBeVisible();
};

const fillSignUpForm = async (page, data) => {
	await fillFormFields(page, {
		'input[name="username"]': data.username,
		'input[name="firstName"]': data.firstName,
		'input[name="lastname"]': data.lastName,
		'input[name="email"]': data.email,
		'input[name="password"]': data.password,
		'input[name="repeat_password"]': data.repeatPassword,
	});
	await page.click('button[type="submit"]');
};

const performLogin = async (page, email, password) => {
	await verifyVisibility(page, selectors.navLinks, false);
	await verifyVisibility(page, Object.values(selectors.navButtons), true);

	await page.click(selectors.navButtons.login);
	await fillFormFields(page, {
		'input[name="email"]': email,
		'input[name="password"]': password,
	});
	await page.click('button[type="submit"]');
};

const performLogout = async (page) => {
	await verifyVisibility(page, selectors.navLinks, true);
	await page.locator(selectors.logoutDropdown.button).click();
	await page.locator(selectors.logoutDropdown.logout).click();
	await verifyVisibility(page, selectors.navLinks, false);
};

const selectors = {
	navLinks: [
		'a[href="/photos"]:has-text("My Photos")',
		'a[href="/albums"]:has-text("My Albums")',
	],
	navButtons: {
		demo: 'button:has-text("Demo")',
		signUp: 'button:has-text("Sign Up")',
		login: 'button:has-text("Login")',
	},
	searchBar: '.search_middle',
	footerLinks: '.footer-icons > a',
	logoutDropdown: {
		button: '.svg-inline--fa.fa-chevron-down',
		logout: 'button.blue-button.modal-label:has-text("Log out")',
	},
};

const expectedFooterLinks = [
	'https://www.linkedin.com/in/chris-chan-94567289/',
	'https://github.com/ChrisChan8551',
	'mailto:chrischan8551@gmail.com',
	'https://chrischan8551.github.io/',
];

const fillCreatePhotoForm = async (page, data) => {
	await fillFormFields(page, {
		'input[name="photo-title"]': data.title,
		'textarea[name="photo-description"]': data.description,
		'textarea[name="photo-imageUrl"]': data.imageUrl,
	});
	await page.click('button[type="submit"]');
};

const verifyFooterLinks = async (page) => {
	const footerLinks = page.locator(selectors.footerLinks);
	await expect(footerLinks).toHaveCount(expectedFooterLinks.length);
	for (let i = 0; i < expectedFooterLinks.length; i++) {
		await expect(footerLinks.nth(i)).toHaveAttribute(
			'href',
			expectedFooterLinks[i]
		);
	}
};

const fillCreateAlbumForm = async (page, data) => {
	await fillFormFields(page, {
		'input[name="album-title"]': data.title,
		'textarea[name="album-imageUrl"]': data.imageUrl,
	});
	await page.click('button[type="submit"]');
};

test.describe('Navigation Bar Tests', () => {
	test.beforeEach(async ({ page }) => {
		await navigateTo(page);
	});

	test('Verify navigation bar elements', async ({ page }) => {
		await verifyVisibility(page, selectors.navLinks, false);
		await verifyVisibility(page, Object.values(selectors.navButtons), true);
	});

	test('Verify footer links', async ({ page }) => {
		await verifyFooterLinks(page);
	});
});

test.describe('Login Tests', () => {
	test.beforeEach(async ({ page }) => {
		await navigateTo(page);
	});

	test('Invalid login', async ({ page }) => {
		await performLogin(page, 'invalid@example.com', 'wrongpassword');
		await verifyErrorMessage(page, 'Invalid email or Password');
	});

	test('Valid login', async ({ page }) => {
		await performLogin(page, 'demo@aa.io', 'password');
	});

	test('logout', async ({ page }) => {
		await performLogin(page, 'demo@aa.io', 'password');
		await performLogout(page);
	});
});

test.describe('Sign Up Tests', () => {
	test.beforeEach(async ({ page }) => {
		await navigateTo(page);
		await verifyVisibility(page, selectors.navLinks, false);
		await verifyVisibility(page, Object.values(selectors.navButtons), true);
	});

	test('Sign up with mismatched passwords', async ({ page }) => {
		await page.click('button.grey-button:has-text("Sign Up")');
		await fillSignUpForm(page, {
			username: 'anothertestuser',
			firstName: 'another',
			lastName: 'test',
			email: 'another@example.com',
			password: 'Password123',
			repeatPassword: 'dontmatch',
		});
		await verifyErrorMessage(page, 'Passwords do not match');
	});

	test('Sign up with existing user', async ({ page }) => {
		await page.click('button.grey-button:has-text("Sign Up")');
		await fillSignUpForm(page, {
			username: 'demotest',
			firstName: 'demo',
			lastName: 'User',
			email: 'demo@aa.io',
			password: 'password',
			repeatPassword: 'password',
		});
		await verifyErrorMessage(
			page,
			'username : Username is already in use.'
		);
	});

	test('Sign up with existing email', async ({ page }) => {
		await page.click('button.grey-button:has-text("Sign Up")');
		await fillSignUpForm(page, {
			username: 'testanother',
			firstName: 'bob',
			lastName: 'smith',
			email: 'demo@aa.io',
			password: 'password',
			repeatPassword: 'password',
		});
		await verifyErrorMessage(
			page,
			'email : Email address is already in use.'
		);
	});
	test('Sign up with valid inputs', async ({ page }) => {
		await page.click('button.grey-button:has-text("Sign Up")');
		await fillSignUpForm(page, {
			username: 'validuser',
			firstName: 'valid',
			lastName: 'User',
			email: 'validuser@example.com',
			password: 'Password123',
			repeatPassword: 'Password123',
		});
		await verifyVisibility(page, selectors.navLinks, true);
		await verifyVisibility(
			page,
			Object.values(selectors.navButtons),
			false
		);
	});
});

test.describe('My Photo Page Tests', () => {
	test.beforeEach(async ({ page }) => {
		await navigateTo(page);
		await verifyVisibility(page, selectors.navLinks, false);
		await verifyVisibility(page, Object.values(selectors.navButtons), true);
		await page.locator(selectors.navButtons.demo).click();
		await verifyVisibility(page, selectors.navLinks, true);
		await verifyFooterLinks(page);
		await verifyVisibility(
			page,
			Object.values(selectors.navButtons),
			false
		);
	});

	test('Go to Photos page and add photo then delete it', async ({ page }) => {
		await page.locator(selectors.navLinks[0]).click(); // My Photos
		await expect(page).toHaveURL('https://pholickr.onrender.com/photos');
		const addPhotoButton = page.locator('button:has-text("Add Photo")');
		await expect(addPhotoButton).toBeVisible();
		await addPhotoButton.click();
		const photoData = {
			title: 'Siracha',
			description: 'Siracha slaps game',
			imageUrl:
				'https://m.media-amazon.com/images/I/81hsQ2HK0mL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
		};
		await fillCreatePhotoForm(page, photoData);
		// Expect the page to reroute to the new photo's URL
		await expect(page).toHaveURL(/\/photos\/\d+$/);
		const photoImage = page.locator('.PhotoDetail--Image');
		const photoTitle = page.locator('h1.title-text');
		const photoDesc = page.locator('.desc-text');
		await expect(photoTitle).toHaveText(photoData.title);
		await expect(photoDesc).toHaveText(photoData.description);
		await expect(photoImage).toHaveAttribute('src', photoData.imageUrl);
		await verifyFooterLinks(page);
		await expect(page.locator('.PhotoDetail--Image')).toHaveAttribute(
			'src',
			'https://m.media-amazon.com/images/I/81hsQ2HK0mL.__AC_SX300_SY300_QL70_FMwebp_.jpg'
		);

		const deletePhotoButton = await page.locator(
			'button:has-text("Delete Photo")'
		);
		const editPhotoButton = await page.locator(
			'button:has-text("Edit Photo")'
		);

		await expect(editPhotoButton).toBeVisible();
		await expect(deletePhotoButton).toBeVisible();
		await expect(editPhotoButton).toHaveText('Edit Photo');
		await expect(deletePhotoButton).toHaveText('Delete Photo');

        const profileCard = page.locator('.profile-img');
        await expect(profileCard).toBeVisible();

		await deletePhotoButton.click();
		await expect(page).toHaveURL('https://pholickr.onrender.com/photos');
	});

	// 	test('my photos - option delete photos', async ({ page }) => {});
	// 	test('my photos option move to album', async ({ page }) => {});
	// https://m.media-amazon.com/images/I/81hsQ2HK0mL.__AC_SX300_SY300_QL70_FMwebp_.jpg
});

test.describe('My Albums Tests', () => {
	test.beforeEach(async ({ page }) => {
		await navigateTo(page);
		await verifyVisibility(page, selectors.navLinks, false);
		await verifyVisibility(page, Object.values(selectors.navButtons), true);
		await page.locator(selectors.navButtons.demo).click();
		await verifyVisibility(page, selectors.navLinks, true);
		await verifyVisibility(
			page,
			Object.values(selectors.navButtons),
			false
		);
		await verifyFooterLinks(page);
	});
	test('Go to Albums Page and create album', async ({ page }) => {
		await page.locator(selectors.navLinks[1]).click(); // My Albums
		await expect(page).toHaveURL('https://pholickr.onrender.com/albums');
		const addAlbumButton = page.locator('button:has-text("Create Album")');
		await expect(addAlbumButton).toBeVisible();
		await addAlbumButton.click();
		const albumData = {
			title: 'Siracha',
			imageUrl:
				'https://m.media-amazon.com/images/I/81hsQ2HK0mL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
		};
		await fillCreateAlbumForm(page, albumData);
		const albumImage = page
			.locator(
				'img[src="https://m.media-amazon.com/images/I/81hsQ2HK0mL.__AC_SX300_SY300_QL70_FMwebp_.jpg"]'
			)
			.nth(0);

		await expect(albumImage).toBeVisible();
	});
	// 	test('my albums - create album', async ({ page }) => {});
	// 	test('my albums - option delete album', async ({ page }) => {});
});
// 	test('photo detail - edit photo', async ({ page }) => {});
// 	test('photo detail - delete photo', async ({ page }) => {});
// 	test('photo detail - make comment', async ({ page }) => {});
// 	test('photo detail - delete comment', async ({ page }) => {});
// 	test('photo detail - edit comment', async ({ page }) => {});
// 	test('user profile - follow', async ({ page }) => {});
// 	test('user profile - unfollow', async ({ page }) => {});
// 	test('user profile - followers', async ({ page }) => {});
// 	test('user profile - following', async ({ page }) => {});
// 	test('my albums - delete album', async ({ page }) => {});
// 	test('my albums - edit album', async ({ page }) => {});
// 	test('my albums detail page', async ({ page }) => {});

// test.describe('', () => {
// 	test.beforeEach(async ({ page }) => {
// 		await page.goto('https://pholickr.onrender.com/');
// 	});
// });
