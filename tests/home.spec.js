const { test, expect } = require('@playwright/test');

test.describe('Home Page test before login', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to the base URL before each test
		await page.goto('https://pholickr.onrender.com/');
	});
	test('Check if the Logo is present', async ({ page }) => {
		// Navigate to the page containing the element
		const photoIcon = page.locator('img.photo-icon');
		await expect(photoIcon).toBeVisible();
		await expect(photoIcon).toHaveAttribute('src', '/pho.png');
		await expect(photoIcon).toHaveAttribute('alt', 'logo');
		const iconContainer = page.locator('div.icon');
		await expect(iconContainer).toContainText('Pholickr');
	});
	test('profile button is not visible before logging in', async ({
		page,
	}) => {
		const profileButton = page.locator('img[alt="profile button"]');
		await expect(profileButton).not.toBeVisible();
	});

	test('Should verify that "My Photos" and "My Albums" links are not visible', async ({
		page,
	}) => {
		let myPhotosLink = page.locator(
			'a[href="/photos"]:has-text("My Photos")'
		);
		let myAlbumsLink = page.locator(
			'a[href="/albums"]:has-text("My Albums")'
		);
		let demoButton = page.locator('button:has-text("Demo")');
		let signup = page.locator('button:has-text("Sign Up")');
		await expect(signup).toBeVisible();
		await expect(demoButton).toBeVisible();
		await expect(myPhotosLink).not.toBeVisible();
		await expect(myAlbumsLink).not.toBeVisible();
	});
	test('Should not have search bar', async ({ page }) => {
		let searchInputContainer = page.locator('.search_middle');
		await expect(searchInputContainer).not.toBeVisible();
	});

	test('Positive: Should verify all footer links', async ({ page }) => {
		// Locate all footer links within the footer-icons container
		let footerLinks = page.locator('.footer-icons > a');

		// Verify the number of links matches the expected count
		await expect(footerLinks).toHaveCount(4);

		// Verify each link individually
		let expectedLinks = [
			'https://www.linkedin.com/in/chris-chan-94567289/',
			'https://github.com/ChrisChan8551',
			'mailto:chrischan8551@gmail.com',
			'https://chrischan8551.github.io/',
		];

		for (let i = 0; i < expectedLinks.length; i++) {
			let link = footerLinks.nth(i);
			await expect(link).toHaveAttribute('href', expectedLinks[i]);
		}
	});

	test('Positive: Should display navigation links and icons', async ({
		page,
	}) => {
		// Check the main container is visible
		let mainContainer = page.locator('.home-main-container');
		await expect(mainContainer).toBeVisible();
	});

	test('Negative test: footer elements', async ({ page }) => {
		// Scenario where LinkedIn link might be missing
		let missingLinkedInLink = page.locator(
			'a[href="https://www.linkedin.com/in/invalid-profile"]'
		);
		await expect(missingLinkedInLink).not.toBeVisible();

		// Test invalid href attribute (e.g., malformed email link)
		let invalidMailLink = page.locator('a[href="mailto:invalid-email"]');
		await expect(invalidMailLink).not.toBeVisible();
	});
});

test.describe('Home Page test AFTER login', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://pholickr.onrender.com/');
        let demoButton = page.getByRole('button', { name: 'Demo' });
        await expect(demoButton).toBeVisible();
		await demoButton.click();

	});
	test('Check Demo button is present and clicking', async ({ page }) => {
		let demoButton = page.getByRole('button', { name: 'Demo' });
		await expect(demoButton).not.toBeVisible();
	});

	test('profile button is visible after logging in', async ({ page }) => {
		let profileButton = page.locator('img[alt="profile button"]');
		await expect(profileButton).not.toBeVisible();
	});

	test('links should be available after clicking demo button', async ({
		page,
	}) => {
		let myPhotosLink = page.getByRole('link', { name: 'My Photos' });
		let myAlbumsLink = page.getByRole('link', { name: 'My Albums' });
		let signup = page.locator('button:has-text("Sign Up")');
		await expect(signup).not.toBeVisible();
		await expect(myPhotosLink).toBeVisible();
		await expect(myAlbumsLink).toBeVisible();
	});
});
