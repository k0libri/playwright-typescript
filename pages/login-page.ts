import { IPage } from '../core/IPage';
import { BasePage } from '../core/BasePage';
import { UserRoles } from '../enums/UserRoles';

type UserCredentials = UserRoles | 'guest';
export class LoginPage extends BasePage implements IPage {
  usernameInput = '[data-test="username"]';
  passwordInput = '[data-test="password"]';
  loginButton = '[data-test="login-button"]';
  errorMessage = '[data-test="error"]';

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: UserCredentials, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }
}