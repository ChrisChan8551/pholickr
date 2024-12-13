const { test, expect } = require('@playwright/test');

const verifyLinks = async (page, selector, expectedLinks) => {
	const links = page.locator(selector);
	await expect(links).toHaveCount(expectedLinks.length);
	for (let i = 0; i < expectedLinks.length; i++) {
		await expect(links.nth(i)).toHaveAttribute('href', expectedLinks[i]);
	}
};

const verifyVisibility = async (page, selectors, shouldBeVisible = true) => {
	for (const selector of selectors) {
		const element = page.locator(selector);
		await (shouldBeVisible
			? expect(element).toBeVisible()
			: expect(element).not.toBeVisible());
	}
};

const verifyCount = async (
	page,
	selector,
	expectedCount,
	shouldMatch = true
) => {
	const elements = page.locator(selector);

	await (shouldMatch
		? expect(elements).toHaveCount(expectedCount)
		: expect(elements).not.toHaveCount(expectedCount));
};

const performLogin = async (page, email, password) => {
	const loginButton = page.locator('button.blue-button:has-text("Login")');
	await expect(loginButton).toBeVisible({ timeout: 3000 });
	await loginButton.click();

	const emailField = page.locator('input[name="email"]');
	const passwordField = page.locator('input[name="password"]');
	await expect(emailField).toBeVisible({ timeout: 3000 });
	await expect(passwordField).toBeVisible({ timeout: 3000 });

	await emailField.fill(email);
	await passwordField.fill(password);
	await page.locator('button[type="submit"]').click();
};

const verifyErrorMessage = async (page, errorMessageText) => {
	await expect(page.locator(`text="${errorMessageText}"`)).toBeVisible({
		timeout: 3000,
	});
};

const navigateTo = async (page, url = 'https://pholickr.onrender.com/') => {
	await page.goto(url);
};

const fillSignUpForm = async (
	page,
	{ username, firstName, lastName, email, password, repeatPassword }
) => {
	await page.fill('input[name="username"]', username);
	await page.fill('input[name="firstName"]', firstName);
	await page.fill('input[name="lastname"]', lastName);
	await page.fill('input[name="email"]', email);
	await page.fill('input[name="password"]', password);
	await page.fill('input[name="repeat_password"]', repeatPassword);
	await page.click('button[type="submit"]');
	await page.waitForTimeout(3000);
};

test.describe('Navigation Bar Tests', () => {
	test.beforeEach(async ({ page }) => {
		await navigateTo(page);
	});

	test('Verify that "My Photos" and "My Albums" links are not visible', async ({
		page,
	}) => {
		await verifyVisibility(
			page,
			[
				'a[href="/photos"]:has-text("My Photos")',
				'a[href="/albums"]:has-text("My Albums")',
			],
			false
		);
	});

	test('Verify buttons before login', async ({ page }) => {
		await verifyVisibility(
			page,
			[
				'button:has-text("Demo")',
				'button:has-text("Sign Up")',
				'button:has-text("Login")',
			],
			true
		);
	});

	test('Verify search bar is not present', async ({ page }) => {
		await verifyVisibility(page, ['.search_middle'], false);
	});

	test('Verify all footer links', async ({ page }) => {
		const expectedFooterLinks = [
			'https://www.linkedin.com/in/chris-chan-94567289/',
			'https://github.com/ChrisChan8551',
			'mailto:chrischan8551@gmail.com',
			'https://chrischan8551.github.io/',
		];
		await verifyLinks(page, '.footer-icons > a', expectedFooterLinks);
	});

	test('Handle missing or broken footer elements', async ({ page }) => {
		await verifyVisibility(
			page,
			[
				'a[href="https://www.linkedin.com/in/invalid-profile"]',
				'a[href="mailto:invalid-email"]',
			],
			false
		);
	});

	test('Verify absence of logout or dropdown', async ({ page }) => {
		await verifyVisibility(
			page,
			[
				'div.dropdown_button',
				'svg[data-icon="chevron-down"]',
				'button.blue-button.modal-label',
			],
			false
		);
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
		await performLogin(page, 'david1@aa.io', 'password');
		await verifyVisibility(
			page,
			[
				'a[href="/photos"]:has-text("My Photos")',
				'a[href="/albums"]:has-text("My Albums")',
			],
			true
		);
		await verifyVisibility(
			page,
			[
				'button:has-text("Demo")',
				'button:has-text("Sign Up")',
				'button:has-text("Login")',
			],
			false
		);
	});
});

test.describe('sign up tests', () => {
	test.beforeEach(async ({ page }) => {
		await navigateTo(page);
	});
	test('signup with valid inputs', async ({ page }) => {
		const signupButton = page.locator(
			'button.grey-button:has-text("Sign Up")'
		);
		await expect(signupButton).toBeVisible({ timeout: 3000 });
		await signupButton.click();
		await fillSignUpForm(page, {
			username: 'validuser1234',
			firstName: 'valid4',
			lastName: 'User4',
			email: 'validuser1234@example.com',
			password: 'Password123',
			repeatPassword: 'Password123',
		});

		await verifyVisibility(
			page,
			[
				'a[href="/photos"]:has-text("My Photos")',
				'a[href="/albums"]:has-text("My Albums")',
			],
			true
		);
		await verifyVisibility(
			page,
			[
				'button:has-text("Demo")',
				'button:has-text("Sign Up")',
				'button:has-text("Login")',
			],
			false
		);
		await verifyVisibility(page, ['.search_middle'], true);
	});

	test('sign up with passwords that do not match', async ({ page }) => {
		const signupButton = page.locator(
			'button.grey-button:has-text("Sign Up")'
		);
		await expect(signupButton).toBeVisible({ timeout: 3000 });
		await signupButton.click();
		await fillSignUpForm(page, {
			username: 'anothertestuser',
			firstName: 'another',
			lastName: 'test',
			email: 'another@example.com',
			password: 'Password123',
			repeatPassword: 'dontmatch',
		});
		await page.click('button[type="submit"]');
		await verifyErrorMessage(page, 'Passwords do not match');
	});
	test('sign up with existing user', async ({ page }) => {
		const signupButton = page.locator(
			'button.grey-button:has-text("Sign Up")'
		);
		await expect(signupButton).toBeVisible({ timeout: 3000 });
		await signupButton.click();
		await fillSignUpForm(page, {
			username: 'demotest',
			firstName: 'demo',
			lastName: 'User',
			email: 'demo@aa.io',
			password: 'password',
			repeatPassword: 'password',
		});

		await page.click('button[type="submit"]');
		const errorMessage = await page.locator('.errors').first();
		await expect(errorMessage).toHaveText(/Username is already in use./i);
	});
	test('sign up with existing email', async ({ page }) => {
		const signupButton = page.locator(
			'button.grey-button:has-text("Sign Up")'
		);
		await expect(signupButton).toBeVisible({ timeout: 3000 });
		await signupButton.click();
		await fillSignUpForm(page, {
			username: 'testanother',
			firstName: 'bob',
			lastName: 'smith',
			email: 'demo@aa.io',
			password: 'password',
			repeatPassword: 'password',
		});
		await page.click('button[type="submit"]');
		const errorMessage = await page.locator('.errors').first();
		await expect(errorMessage).toHaveText(
			/Email address is already in use./i
		);
	});
});

// 	test('logout', async ({ page }) => {});
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
