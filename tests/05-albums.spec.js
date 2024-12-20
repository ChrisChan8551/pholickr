const { test, expect } = require('@playwright/test');
const {
	navigateTo,
	verifyVisibility,
	verifyFooterLinks,
	selectors,
	testImage,
	BASE_URL,
	fillFormFields,
} = require('./helpers.js');

const navigateToAlbumsPage = async (page) => {
	await page.locator(selectors.navLinks[1]).click();
	await expect(page).toHaveURL(`${BASE_URL}albums`);
};

const createAlbum = async (page, albumData) => {
	const addAlbumButton = page.locator('button:has-text("Create Album")');
	await expect(addAlbumButton).toBeVisible();
	await addAlbumButton.click();
	await fillCreateAlbumForm(page, albumData);
	const albumImage = page.locator(`img[src="${albumData.imageUrl}"]`).first();
	await expect(albumImage).toBeVisible();
	return albumImage;
};

const verifyAlbumDetails = async (page, albumImage, albumData) => {
	const albumDiv = albumImage.locator('..').locator('..');
	await albumDiv.click();
	const albumTitle = page.locator('h1.album-title');
	await expect(albumTitle).toHaveText(albumData.title);
	const editAlbumButton = page.locator('button:has-text("Edit Album")');
	const deleteAlbumButton = page.locator('button:has-text("Delete Album")');
	await expect(editAlbumButton).toBeVisible();
	await expect(deleteAlbumButton).toBeVisible();
	await verifyFooterLinks(page);
};

const deleteAlbum = async (page, albumImage) => {
	const deleteAlbumButton = page.locator('button:has-text("Delete Album")');
	await deleteAlbumButton.click();
	await expect(page).toHaveURL(`${BASE_URL}albums`);
	await expect(albumImage).not.toBeVisible();
	await expect(albumImage).toHaveCount(0);
};

const removeAlbum = async (page, albumImage) => {
	await navigateToAlbumsPage(page);
	const removeButton = await albumImage
		.locator('..')
		.locator('..')
		.locator('button.blue-button:has-text("Remove")');
	await expect(removeButton).toBeVisible({ timeout: 2000 });
	await removeButton.click();
	const confirmButton = albumImage
		.locator('..')
		.locator('..')
		.locator('button.blue-button:has-text("Confirm Delete")');
	await confirmButton.click();
	await expect(albumImage).not.toBeVisible();
	await expect(albumImage).toHaveCount(0);
};

const fillCreateAlbumForm = async (page, data) => {
	await fillFormFields(page, {
		'input[name="album-title"]': data.title,
		'textarea[name="album-imageUrl"]': data.imageUrl,
	});
	await page.click('button[type="submit"]');
};

test.describe('My Albums Tests', () => {
	test.describe.configure({ mode: 'serial' });
	const albumData = {
		title: 'Siracha',
		imageUrl: testImage,
	};

	test.beforeEach(async ({ page }) => {
		await navigateTo(page);
		await verifyVisibility(page, selectors.navLinks, false);
		await verifyVisibility(page, Object.values(selectors.navButtons), true);
		await page.locator(selectors.navButtons.demo).click();
		await verifyVisibility(page, selectors.navLinks, true);
		await verifyVisibility(
			page,
			Object.values(selectors.navButtons),
			false
		);
	});

	test('Go to Albums Page, Create Album, Delete not using remove button', async ({
		page,
	}) => {
		await navigateToAlbumsPage(page);
		const albumImage = await createAlbum(page, albumData);
		await verifyAlbumDetails(page, albumImage, albumData);
		await deleteAlbum(page, albumImage);
	});

	test('Go to Albums Page, Create Album, Delete using remove button', async ({
		page,
	}) => {
		await navigateToAlbumsPage(page);
		const albumImage = await createAlbum(page, albumData);
		await removeAlbum(page, albumImage);
	});

	test.afterEach(async ({ page }) => {
		await verifyFooterLinks(page);
	});
});
