const { test, expect } = require('@playwright/test');

const performActionOnElements = async (page, selectors, action, expected = null) => {
    for (const selector of selectors) {
      const element = page.locator(selector);
      await action(element, expected);
    }
  };

  const verifyAttributes = async (page, selector, attribute, expectedValues) => {
    const elements = page.locator(selector);
    await expect(elements).toHaveCount(expectedValues.length);
    for (let i = 0; i < expectedValues.length; i++) {
      await expect(elements.nth(i)).toHaveAttribute(attribute, expectedValues[i]);
    }
  };

  const fillFormFields = async (page, fields) => {
    for (const [selector, value] of Object.entries(fields)) {
      await page.fill(selector, value);
    }
  };

  // Core reusable functions
  const navigateTo = async (page, url = 'https://pholickr.onrender.com/') => {
    await page.goto(url);
  };

  const verifyVisibility = async (page, selectors, shouldBeVisible = true) => {
    await performActionOnElements(
      page,
      selectors,
      async (element) => shouldBeVisible
        ? expect(element).toBeVisible()
        : expect(element).not.toBeVisible()
    );
  };

  const performLogin = async (page, email, password) => {
    await verifyVisibility(page, ['button.blue-button:has-text("Login")'], true);
    await page.click('button.blue-button:has-text("Login")');

    await fillFormFields(page, {
      'input[name="email"]': email,
      'input[name="password"]': password,
    });

    await page.click('button[type="submit"]');
  };

  const verifyErrorMessage = async (page, message) => {
    await expect(page.locator(`text="${message}"`)).toBeVisible({ timeout: 3000 });
  };

  const fillSignUpForm = async (page, data) => {
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

  // Tests
  const selectors = {
    footerLinks: '.footer-icons > a',
    loginButton: 'button.blue-button:has-text("Login")',
  };

  const expectedFooterLinks = [
    'https://www.linkedin.com/in/chris-chan-94567289/',
    'https://github.com/ChrisChan8551',
    'mailto:chrischan8551@gmail.com',
    'https://chrischan8551.github.io/',
  ];

  test.describe('Navigation Bar Tests', () => {
    test.beforeEach(async ({ page }) => {
      await navigateTo(page);
    });

    test('Verify that "My Photos" and "My Albums" links are not visible', async ({ page }) => {
      await verifyVisibility(page, [
        'a[href="/photos"]:has-text("My Photos")',
        'a[href="/albums"]:has-text("My Albums")',
      ], false);
    });

    test('Verify buttons before login', async ({ page }) => {
      await verifyVisibility(page, [
        'button:has-text("Demo")',
        'button:has-text("Sign Up")',
        'button:has-text("Login")',
      ], true);
    });

    test('Verify search bar is not present', async ({ page }) => {
      await verifyVisibility(page, ['.search_middle'], false);
    });

    test('Verify all footer links', async ({ page }) => {
      await verifyAttributes(page, selectors.footerLinks, 'href', expectedFooterLinks);
    });

    test('Verify absence of logout or dropdown', async ({ page }) => {
      await verifyVisibility(page, [
        'div.dropdown_button',
        'svg[data-icon="chevron-down"]',
        'button.blue-button.modal-label',
      ], false);
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
      await verifyVisibility(page, [
        'a[href="/photos"]:has-text("My Photos")',
        'a[href="/albums"]:has-text("My Albums")',
      ], true);
      await verifyVisibility(page, [
        'button:has-text("Demo")',
        'button:has-text("Sign Up")',
        'button:has-text("Login")',
      ], false);
    });
  });

  test.describe('Sign Up Tests', () => {
    test.beforeEach(async ({ page }) => {
      await navigateTo(page);
    });

    test('Sign up with valid inputs', async ({ page }) => {
      await page.click('button.grey-button:has-text("Sign Up")');
      await fillSignUpForm(page, {
        username: 'validuser1234',
        firstName: 'valid4',
        lastName: 'User4',
        email: 'validuser1234@example.com',
        password: 'Password123',
        repeatPassword: 'Password123',
      });

      await verifyVisibility(page, [
        'a[href="/photos"]:has-text("My Photos")',
        'a[href="/albums"]:has-text("My Albums")',
      ], true);
      await verifyVisibility(page, [
        'button:has-text("Demo")',
        'button:has-text("Sign Up")',
        'button:has-text("Login")',
      ], false);
      await verifyVisibility(page, ['.search_middle'], true);
    });

    test('Sign up with mismatched passwords', async ({ page }) => {
      await page.click('button.grey-button:has-text("Sign Up")');
      await fillSignUpForm(page, {
        username: 'anothertestuser',
        firstName: 'another',
        lastName: 'test',
        email: 'another@example.com',
        password: 'Password123',
        repeatPassword: 'dontmatch',
      });
      await verifyErrorMessage(page, 'Passwords do not match');
    });

    test('Sign up with existing user', async ({ page }) => {
      await page.click('button.grey-button:has-text("Sign Up")');
      await fillSignUpForm(page, {
        username: 'demotest',
        firstName: 'demo',
        lastName: 'User',
        email: 'demo@aa.io',
        password: 'password',
        repeatPassword: 'password',
      });
      await verifyErrorMessage(page, 'username : Username is already in use.');
    });

    test('Sign up with existing email', async ({ page }) => {
      await page.click('button.grey-button:has-text("Sign Up")');
      await fillSignUpForm(page, {
        username: 'testanother',
        firstName: 'bob',
        lastName: 'smith',
        email: 'demo@aa.io',
        password: 'password',
        repeatPassword: 'password',
      });
      await verifyErrorMessage(page, 'email : Email address is already in use.');
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
