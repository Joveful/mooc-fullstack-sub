import { test, expect, beforeEach, describe } from '@playwright/test';

describe('Blog App', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Superuser',
        username: 'root',
        password: 'admin'
      }
    })

    await page.goto('http://localhost:5173');
  })

  test('login form is shown', async ({ page }) => {
    const locator = await page.getByText('blogs')
    await expect(locator).toBeVisible()
  })

  describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('root')
      await page.getByRole('textbox').last().fill('admin')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Superuser logged in')).toBeVisible()
    })

    test('fails with incorrect credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('root')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })
})
