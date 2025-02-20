import { test, expect, beforeEach, describe } from '@playwright/test';
import { before } from 'node:test';
import { loginWith, createBlog } from './helper';
import { create } from 'node:domain';

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
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'John Tester',
        username: 'jtester',
        password: 'password123'
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
      await loginWith(page, 'root', 'admin')

      await expect(page.getByText('Superuser logged in')).toBeVisible()
    })
    test('fails with incorrect credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('root')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'admin')
    })

    test('a blog can be created', async ({ page }) => {
      await createBlog(page, 'Test title', 'Test author', 'Test url')

      await expect(page.getByText('Test title Test author view')).toBeVisible()
    })

    describe('with a blog in db', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Test title', 'Test author', 'Test url')
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('a blog can be deleted', async ({ page }) => {
        page.on('dialog', async dialog => {
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText('Test title Test author hide')).not.toBeVisible()
      })

      test('only creator can delete a blog', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'jtester', 'password123')

        page.on('dialog', async dialog => {
          await dialog.accept()
        })

        await page.getByRole('button', { name: 'view' }).click()

        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })
  })
})
