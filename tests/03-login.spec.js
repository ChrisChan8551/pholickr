const { test } = require('@playwright/test');

const {
	navigateTo,
	verifyErrorMessage,
	verifyVisibility,
	selectors,
	fillFormFields,
} = require('./helpers.js');

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

export const performLogout = async (page) => {
	await verifyVisibility(page, selectors.navLinks, true);
	await page.locator(selectors.logoutDropdown.button).click();
	await page.locator(selectors.logoutDropdown.logout).click();
	await verifyVisibility(page, selectors.navLinks, false);
};

test.describe('Login Tests', () => {
	test.describe.configure({ mode: 'serial' });
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
