import { expect } from '@playwright/test';
import { BasePage } from "./base_page";

export class LoginPage extends BasePage{

  private usernameInput = this.page.locator('#user-name');
  private passwordInput = this.page.locator('#password');
  private loginButton = this.page.locator('#login-button');
  private title = this.page.locator('.title');

  async goto() {
    await this.page.goto(process.env.saucedemoURL);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await expect(this.title).toHaveText('Products');
  }
}
