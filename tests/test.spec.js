const { test, expect } = require('@playwright/test');

const verifyLinks = async (page, selector, expectedLinks) => {
	const links = page.locator(selector);
	await expect(links).toHaveCount(expectedLinks.length);

	for (let i = 0; i < expectedLinks.length; i++) {
		const link = links.nth(i);
		await expect(link).toHaveAttribute('href', expectedLinks[i]);
	}
};

const verifyVisibility = async (page, selectors, shouldBeVisible = true) => {
	for (const selector of selectors) {
		const element = page.locator(selector);
		if (shouldBeVisible) {
			await expect(element).toBeVisible();
		} else {
			await expect(element).not.toBeVisible();
		}
	}
};

const verifyCount = async (
	page,
	selector,
	expectedCount,
	shouldMatch = true
) => {
	const elements = page.locator(selector);
	if (shouldMatch) {
		await expect(elements).toHaveCount(expectedCount);
	} else {
		await expect(elements).not.toHaveCount(expectedCount);
	}
};

test.describe('Navigation Bar Tests', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to the base URL before each test
		await page.goto('https://pholickr.onrender.com/');
	});
	test('Should verify that "My Photos" and "My Albums" links are not visible', async ({
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
		await verifyVisibility(
			page,
			['button:has-text("Demo")', 'button:has-text("Sign Up")'],
			true
		);
	});

	test('Should not have searchbar', async ({ page }) => {
		await verifyVisibility(page, ['.search_middle'], false);
	});

	test('Should verify all footer links', async ({ page }) => {
		const expectedFooterLinks = [
			'https://www.linkedin.com/in/chris-chan-94567289/',
			'https://github.com/ChrisChan8551',
			'mailto:chrischan8551@gmail.com',
			'https://chrischan8551.github.io/',
		];
		await verifyLinks(page, '.footer-icons > a', expectedFooterLinks);
	});

	test('Negative: Should handle missing or broken footer elements', async ({
		page,
	}) => {
		await verifyVisibility(
			page,
			[
				'a[href="https://www.linkedin.com/in/invalid-profile"]',
				'a[href="mailto:invalid-email"]',
			],
			false
		);
	});

	test('should not have logout or drop down', async ({ page }) => {
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

	const performLogin = async (page, email, password) => {
		const loginButton = page.locator(
			'button.blue-button:has-text("Login")'
		);
		await expect(loginButton).toBeVisible({ timeout: 3000 });
		await loginButton.click();

		const emailField = page.locator('input[name="email"]');
		const passwordField = page.locator('input[name="password"]');
		await expect(emailField).toBeVisible({ timeout: 3000 });
		await expect(passwordField).toBeVisible({ timeout: 3000 });

		await emailField.fill(email);
		await passwordField.fill(password);

		const submitButton = page.locator('button[type="submit"]');
		await submitButton.click();
	};

	const verifyErrorMessage = async (page, errorMessageText) => {
		const errorMessage = page.locator(`text="${errorMessageText}"`);
		await expect(errorMessage).toBeVisible({ timeout: 3000 });
	};

	// Example test using the reusable functions
	test('invalid login', async ({ page }) => {
		await performLogin(page, 'invalid@example.com', 'wrongpassword');
		await verifyErrorMessage(page, 'Invalid email or Password');
	});

	// 	test('signup', async ({ page }) => {});
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
});

// test.describe('', () => {});
