const { test } = require('@playwright/test');

const {
	navigateTo,
	verifyVisibility,
	selectors,
	verifyErrorMessage,
    fillFormFields,
} = require('./helpers.js');

export const fillSignUpForm = async (page, data) => {
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

test.describe('Sign Up Tests', () => {
	test.describe.configure({ mode: 'serial' });
	const signUpData = {
		mismatchedPasswords: {
			username: 'anothertestuser',
			firstName: 'another',
			lastName: 'test',
			email: 'another@example.com',
			password: 'Password123',
			repeatPassword: 'dontmatch',
			errorMessage: 'Passwords do not match',
		},
		existingUser: {
			username: 'demotest',
			firstName: 'demo',
			lastName: 'User',
			email: 'demo@aa.io',
			password: 'password',
			repeatPassword: 'password',
			errorMessage: 'username : Username is already in use.',
		},
		existingEmail: {
			username: 'testanother',
			firstName: 'bob',
			lastName: 'smith',
			email: 'demo@aa.io',
			password: 'password',
			repeatPassword: 'password',
			errorMessage: 'email : Email address is already in use.',
		},
		validUser: {
			username: 'validuser12',
			firstName: 'valid12',
			lastName: 'User12',
			email: 'validuser12@example.com',
			password: 'Password123',
			repeatPassword: 'Password123',
		},
	};

	test.beforeEach(async ({ page }) => {
		await navigateTo(page);
		await verifyVisibility(page, selectors.navLinks, false);
		await verifyVisibility(page, Object.values(selectors.navButtons), true);
		await page.click(selectors.navButtons.signUp);
	});

	const runSignUpTest = async (page, userData, verifySuccess = false) => {
		await fillSignUpForm(page, userData);

		if (verifySuccess) {
			await verifyVisibility(page, selectors.navLinks, true);
			await verifyVisibility(
				page,
				Object.values(selectors.navButtons),
				false
			);
		} else {
			await verifyErrorMessage(page, userData.errorMessage);
		}
	};

	test('Sign up with mismatched passwords', async ({ page }) => {
		await runSignUpTest(page, signUpData.mismatchedPasswords);
	});

	test('Sign up with existing user', async ({ page }) => {
		await runSignUpTest(page, signUpData.existingUser);
	});

	test('Sign up with existing email', async ({ page }) => {
		await runSignUpTest(page, signUpData.existingEmail);
	});

	test('Sign up with valid inputs', async ({ page }) => {
		await runSignUpTest(page, signUpData.validUser, true);
	});
});
