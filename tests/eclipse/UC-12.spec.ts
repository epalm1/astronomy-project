import { test, expect } from '@playwright/test';

test('UC-12-01', async ({ page }) => {
  await page.goto('https://astronoomia.ee/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Astronoomiahuvilisele');
});

test('UC-12-02', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('UC-12-03', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
