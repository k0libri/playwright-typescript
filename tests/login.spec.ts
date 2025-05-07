import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { UserRoles } from '../enums/UserRoles';

test.describe('login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('login page loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator(loginPage.usernameInput)).toBeVisible();
    await expect(page.locator(loginPage.passwordInput)).toBeVisible();
    await expect(page.locator(loginPage.loginButton)).toBeVisible();
  });

  test('the user can log in with valid credentials', async ({ page }) => {
    await loginPage.login(UserRoles.STANDARD_USER, 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('the user cannot log in with invalid credentials', async () => {
    await loginPage.login(UserRoles.STANDARD_USER, 'invalid');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
  });

  test('guest user cannot log in', async () => {
    await loginPage.login('guest', 'secret_sauce');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
  });
});