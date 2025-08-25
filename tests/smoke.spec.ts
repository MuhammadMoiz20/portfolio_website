import { test, expect } from '@playwright/test';

test('navigation and theme toggle', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Muhammad Moiz/);
  await page.getByRole('link', { name: 'Projects' }).click();
  await expect(page).toHaveURL(/.*projects/);
  await page.getByRole('link', { name: 'Blog' }).click();
  await expect(page).toHaveURL(/.*blog/);
});


