const { test, expect } = require('@playwright/test');

const {
	navigateTo,
	verifyVisibility,
	selectors,
	testImage,
	BASE_URL,
	fillFormFields,
	verifyFooterLinks,
} = require('./helpers.js');

export const photoData = {
	title: 'Siracha',
	description: 'Siracha slaps game',
	imageUrl: testImage,
};

export const addPhotoAndVerify = async (page, photoData) => {
	await page.locator(selectors.navLinks[0]).click(); // My Photos
	await expect(page).toHaveURL(`${BASE_URL}photos`);
	const addPhotoButton = page.locator('button:has-text("Add Photo")');
	await addPhotoButton.click();
	await fillCreatePhotoForm(page, photoData);
	await expect(page).toHaveURL(/\/photos\/\d+$/);

	await expect(page.locator('.PhotoDetail--Image')).toHaveAttribute(
		'src',
		photoData.imageUrl
	);
	await expect(page.locator('h1.title-text')).toHaveText(photoData.title);
	await expect(page.locator('.desc-text')).toHaveText(photoData.description);
	await verifyFooterLinks(page);
	const deletePhotoButton = await page.locator(
		'button:has-text("Delete Photo")'
	);
	const editPhotoButton = await page.locator('button:has-text("Edit Photo")');
	const profileCard = page.locator('.profile-img');

	await expect(editPhotoButton).toBeVisible();
	await expect(deletePhotoButton).toBeVisible();
	await expect(editPhotoButton).toHaveText('Edit Photo');
	await expect(deletePhotoButton).toHaveText('Delete Photo');

	await expect(profileCard).toBeVisible();
};

export const deletePhoto = async (page, photoData) => {
	const deleteButton = page.locator('button:has-text("Delete Photo")');
	await deleteButton.click({ timeout: 5000 });
	await expect(page).toHaveURL(`${BASE_URL}photos`);
	await expect(page.locator(`img[src="${photoData.imageUrl}"]`)).toHaveCount(
		0
	);
};

export const deletePhotoUsingOptions = async (page, photoData) => {
	await page.goto(`${BASE_URL}photos`, { timeout: 5000 });
	await expect(page).toHaveURL(`${BASE_URL}photos`);
	const imageLocator = page
		.locator(`img[alt="${photoData.title}"][src="${photoData.imageUrl}"]`)
		.first();
	const optionsButton = imageLocator
		.locator('..')
		.locator('..')
		.locator('button.blue-button:has-text("Options")');
	await optionsButton.waitFor({ state: 'visible', timeout: 2000 });
	await optionsButton.click();
	const deleteButton = page.locator('button:has-text("Delete")');
	await deleteButton.click();
	await imageLocator.waitFor({ state: 'hidden', timeout: 5000 });
	await expect(page.locator(`img[src="${photoData.imageUrl}"]`)).toHaveCount(
		0
	);
};

export const fillCreatePhotoForm = async (page, data) => {
	await fillFormFields(page, {
		'input[name="photo-title"]': data.title,
		'textarea[name="photo-description"]': data.description,
		'textarea[name="photo-imageUrl"]': data.imageUrl,
	});
	await page.click('button[type="submit"]');
};

test.describe('My Photo Page Tests', () => {
	test.describe.configure({ mode: 'serial' });
	test.beforeEach(async ({ page }) => {
		await navigateTo(page);
		await page.locator(selectors.navButtons.demo).click();
		await verifyVisibility(page, selectors.navLinks, true);
	});

	test('Go to Photos page and add photo then delete it', async ({ page }) => {
		await addPhotoAndVerify(page, photoData);
		await deletePhoto(page, photoData);
	});

	test('Go to My Photos page and add photo then delete using option', async ({
		page,
	}) => {
		await addPhotoAndVerify(page, photoData);
		await deletePhotoUsingOptions(page, photoData);
	});
});
