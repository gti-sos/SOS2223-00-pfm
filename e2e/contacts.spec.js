// @ts-check
import  { test, expect } from '@playwright/test';

test('home has the right title', async ({ page }) => {
  await page.goto('localhost:12345');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Contact Manager");
});

test('navigate to contact list page', async ({ page }) => {
await page.goto('localhost:12345');

  // Click the get started link.
  await page.getByRole('link', { name: 'Contacts' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveTitle("Contact List");
});
