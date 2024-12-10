const { test, expect } = require('@playwright/test');

test.describe('Home Page test after login', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://pholickr.onrender.com/');
	});
	test('Check if the Logo is present', async ({ page }) => {
		const demoButton = page.getByRole('button', { name: 'Demo' });
		await page.pause();
		await expect(demoButton).toBeVisible();
		await demoButton.click();
		await expect(demoButton).not.toBeVisible();
	});

	test('links should be available', async ({ page }) => {
        const myPhotosLink = page.getByRole('link', { name: 'My Photos' });
        const myAlbumsLink = page.getByRole('link', { name: 'My Albums' });

		const signup = page.locator('button:has-text("Sign Up")');
		await page.pause();
		await expect(signup).not.toBeVisible();
		await expect(myPhotosLink).toBeVisible();
		await expect(myAlbumsLink).toBeVisible();
	});
});
