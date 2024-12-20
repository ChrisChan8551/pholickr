const { test } = require('@playwright/test');

const {
	navigateTo,
	verifyVisibility,
	verifyFooterLinks,
	selectors,
} = require('./helpers.js');

test.describe('Navigation Bar Tests', () => {
	test.describe.configure({ mode: 'serial' });
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
