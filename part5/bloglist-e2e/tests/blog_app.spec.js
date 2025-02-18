import { test, expect, beforeEach, describe } from '@playwright/test';

describe('Blog App', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  })

  test('login form is shown', async ({ page }) => {
    const locator = await page.getByText('blogs')
    await expect(locator).toBeVisible()
  })
})
