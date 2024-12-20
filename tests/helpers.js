const { expect } = require('@playwright/test');



export const weblink = 'https://pholickr.onrender.com/';
export const locallink = 'http://localhost:3000/';
export const BASE_URL = locallink;

export const navigateTo = async (page, path = '', baseUrl = BASE_URL) => {
	const fullUrl = `${baseUrl}${path}`;
	await page.goto(fullUrl);
};



export const performActionOnElements = async (page, selectors, action) => {
	for (const selector of selectors) {
		const element = page.locator(selector);
		await action(element);
	}
};

export const fillFormFields = async (page, fields) => {
	for (const [selector, value] of Object.entries(fields)) {
		const field = await page.locator(selector);
		await field.fill(value);
	}
};

export const verifyVisibility = async (
	page,
	selectors,
	shouldBeVisible = true
) => {
	await performActionOnElements(page, selectors, async (element) =>
		shouldBeVisible
			? expect(element).toBeVisible()
			: expect(element).not.toBeVisible()
	);
};

export const verifyErrorMessage = async (page, message) => {
	await expect(page.locator(`text="${message}"`)).toBeVisible();
};

export const selectors = {
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

export const expectedFooterLinks = [
	'https://www.linkedin.com/in/chris-chan-94567289/',
	'https://github.com/ChrisChan8551',
	'mailto:chrischan8551@gmail.com',
	'https://chrischan8551.github.io/',
];

export const testImage =
	'https://m.media-amazon.com/images/I/81hsQ2HK0mL.__AC_SX300_SY300_QL70_FMwebp_.jpg';

export const verifyFooterLinks = async (page) => {
	const footerLinks = page.locator(selectors.footerLinks);
	await expect(footerLinks).toHaveCount(expectedFooterLinks.length);
	for (let i = 0; i < expectedFooterLinks.length; i++) {
		await expect(footerLinks.nth(i)).toHaveAttribute(
			'href',
			expectedFooterLinks[i]
		);
	}
};
