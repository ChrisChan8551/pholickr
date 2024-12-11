const { test, expect } = require('@playwright/test');

test.describe('Navigation Bar Tests', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to the base URL before each test
		await page.goto('https://pholickr.onrender.com/');
	});
	test('Should verify that "My Photos" and "My Albums" links are not visible', async ({
		page,
	}) => {
		const myPhotosLink = page.locator(
			'a[href="/photos"]:has-text("My Photos")'
		);
		const myAlbumsLink = page.locator(
			'a[href="/albums"]:has-text("My Albums")'
		);
		const demoButton = page.locator('button:has-text("Demo")');
		const signup = page.locator('button:has-text("Sign Up")');
		await expect(signup).toBeVisible();
		await expect(demoButton).toBeVisible();
		await expect(myPhotosLink).not.toBeVisible();
		await expect(myAlbumsLink).not.toBeVisible();
	});
	test('Should not have search bar', async ({ page }) => {
		const searchInputContainer = page.locator('.search_middle');
		await expect(searchInputContainer).not.toBeVisible();
	});

	test('Should verify all footer links', async ({ page }) => {
		// Locate all footer links within the footer-icons container
		const footerLinks = page.locator('.footer-icons > a');

		// Verify the number of links matches the expected count
		await expect(footerLinks).toHaveCount(4);

		// Verify each link individually
		const expectedLinks = [
			'https://www.linkedin.com/in/chris-chan-94567289/',
			'https://github.com/ChrisChan8551',
			'mailto:chrischan8551@gmail.com',
			'https://chrischan8551.github.io/',
		];

		for (let i = 0; i < expectedLinks.length; i++) {
			const link = footerLinks.nth(i);
			await expect(link).toHaveAttribute('href', expectedLinks[i]);
		}
	});

	test('Negative: Should handle missing or broken footer elements', async ({
		page,
	}) => {
		// Scenario where LinkedIn link might be missing
		const missingLinkedInLink = page.locator(
			'a[href="https://www.linkedin.com/in/invalid-profile"]'
		);
		await expect(missingLinkedInLink).not.toBeVisible();

		// Test invalid href attribute (e.g., malformed email link)
		const invalidMailLink = page.locator('a[href="mailto:invalid-email"]');
		await expect(invalidMailLink).not.toBeVisible();
	});
	test('should not have logout or drop down', async ({ page }) => {
		// Check that the dropdown button does not exist
		const dropdownButton = await page.locator('div.dropdown_button');
		await expect(dropdownButton).toHaveCount(0, { timeout: 3000 });

		// Check that the specific <svg> element for the dropdown does not exist
		const dropdownSvg = await page.locator('svg[data-icon="chevron-down"]');
		await expect(dropdownSvg).toHaveCount(0, { timeout: 3000 });

		// Check that the logout button does not exist
		const logoutButton = await page.locator(
			'button.blue-button.modal-label'
		);
		await expect(logoutButton).toHaveCount(0, { timeout: 3000 });
	});

	// test('invalid login', async ({ page }) => {
	// 	const loginButton = await page.locator(
	// 		'button.blue-button:has-text("Login")'
	// 	);
	// 	await expect(loginButton).toBeVisible({ timeout: 3000 });

	// 	await loginButton.click();

	// 	const emailField = await page.locator('input[name="email"]');
	// 	const passwordField = await page.locator('input[name="password"]');
	// 	await expect(emailField).toBeVisible({ timeout: 3000 });
	// 	await expect(passwordField).toBeVisible({ timeout: 3000 });

	// 	await emailField.fill('invalid@example.com');
	// 	await passwordField.fill('wrongpassword');

	// 	const submitButton = await page.locator('button[type="submit"]');
	// 	await submitButton.click();

	// 	const errorMessage = await page.locator(
	// 		'text="email : Invalid email or Password"'
	// 	);
	// 	await expect(errorMessage).toBeVisible({ timeout: 3000 });
	// });

	test('signup', async ({ page }) => {});
	test('logout', async ({ page }) => {});
	test('my photos page', async ({ page }) => {});
	test('my photos - add photos', async ({ page }) => {});
	test('my photos - option delete photos', async ({ page }) => {});
	test('my photos option move to album', async ({ page }) => {});
	test('photo detail - edit photo', async ({ page }) => {});
	test('photo detail - delete photo', async ({ page }) => {});
	test('photo detail - make comment', async ({ page }) => {});
	test('photo detail - delete comment', async ({ page }) => {});
	test('photo detail - edit comment', async ({ page }) => {});
	test('user profile - follow', async ({ page }) => {});
	test('user profile - unfollow', async ({ page }) => {});
	test('user profile - followers', async ({ page }) => {});
	test('user profile - following', async ({ page }) => {});
	test('my albums - create album', async ({ page }) => {});
	test('my albums - option delete album', async ({ page }) => {});
	test('my albums - delete album', async ({ page }) => {});
	test('my albums - edit album', async ({ page }) => {});
	test('my albums detail page', async ({ page }) => {});
});

test.describe('', () => {});
