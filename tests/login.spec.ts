// @ts-check
import { test, expect } from '@playwright/test';

test.describe('login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('login page loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByTestId('username')).toBeVisible();
    await expect(page.getByTestId('password')).toBeVisible();
    await expect(page.getByTestId('login-button')).toBeVisible();
    await expect(page.getByTestId('login-button')).toHaveText('Login');
    await expect(page.locator('.login_logo')).toBeVisible();
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');
  });

  test('the user can log in with valid credentials', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item"]').first()).toBeVisible();
    await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
  });

  test('the user cannot log in with invalid credentials', async ({ page }) => {
    await page.fill('[data-test="username"]', 'invalid');
    await page.fill('[data-test="password"]', 'invalid');
    await page.getByTestId('login-button').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
    await expect(page).not.toHaveTitle('https://www.saucedemo.com/inventory.html')
    await expect(page.locator('[data-test="inventory-list"]')).not.toBeVisible();
  });
});