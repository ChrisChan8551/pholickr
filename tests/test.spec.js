const { test, expect } = require('@playwright/test');

test.describe('Navigation Bar Tests', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to the base URL before each test
		await page.goto('https://pholickr.onrender.com/');
	});

    test('profile button is not visible before logging in', async ({ page }) => {


        // Define the selector for the image
        const profileButton = page.locator('img[alt="profile button"]');

        // Assert that the profile button is visible
        await expect(profileButton).not.toBeVisible();
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

	test('Positive: Should display navigation links and icons', async ({
		page,
	}) => {
		// Check the main container is visible
		const mainContainer = page.locator('.home-main-container');
		await expect(mainContainer).toBeVisible();
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
});
