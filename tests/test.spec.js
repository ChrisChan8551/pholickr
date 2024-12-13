const { test, expect } = require('@playwright/test');

const performActionOnElements = async (page, selectors, action) => {
	for (const selector of selectors) {
		const element = page.locator(selector);
		await action(element);
	}
};

const fillFormFields = async (page, fields) => {
	for (const [selector, value] of Object.entries(fields)) {
		await page.fill(selector, value);
	}
};

const navigateTo = async (page, url = 'https://pholickr.onrender.com/') => {
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
	await verifyVisibility(page, Object.values(selectors.buttons), true);

	await page.click(selectors.buttons.login);
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
	buttons: {
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

test.describe('Navigation Bar Tests', () => {
	test.beforeEach(async ({ page }) => {
		await navigateTo(page);
	});

	test('Verify navigation bar elements', async ({ page }) => {
		await verifyVisibility(page, selectors.navLinks, false);
		await verifyVisibility(page, Object.values(selectors.buttons), true);
	});

	test('Verify footer links', async ({ page }) => {
		const footerLinks = page.locator(selectors.footerLinks);
		await expect(footerLinks).toHaveCount(expectedFooterLinks.length);
		for (let i = 0; i < expectedFooterLinks.length; i++) {
			await expect(footerLinks.nth(i)).toHaveAttribute(
				'href',
				expectedFooterLinks[i]
			);
		}
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
		await verifyVisibility(page, Object.values(selectors.buttons), true);
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
		await verifyVisibility(page, Object.values(selectors.buttons), false);
	});
});

// 	test('my photos page', async ({ page }) => {});
// 	test('my photos - add photos', async ({ page }) => {});
// 	test('my photos - option delete photos', async ({ page }) => {});
// 	test('my photos option move to album', async ({ page }) => {});
// 	test('photo detail - edit photo', async ({ page }) => {});
// 	test('photo detail - delete photo', async ({ page }) => {});
// 	test('photo detail - make comment', async ({ page }) => {});
// 	test('photo detail - delete comment', async ({ page }) => {});
// 	test('photo detail - edit comment', async ({ page }) => {});
// 	test('user profile - follow', async ({ page }) => {});
// 	test('user profile - unfollow', async ({ page }) => {});
// 	test('user profile - followers', async ({ page }) => {});
// 	test('user profile - following', async ({ page }) => {});
// 	test('my albums - create album', async ({ page }) => {});
// 	test('my albums - option delete album', async ({ page }) => {});
// 	test('my albums - delete album', async ({ page }) => {});
// 	test('my albums - edit album', async ({ page }) => {});
// 	test('my albums detail page', async ({ page }) => {});

// test.describe('', () => {
// 	test.beforeEach(async ({ page }) => {
// 		await page.goto('https://pholickr.onrender.com/');
// 	});
// });
