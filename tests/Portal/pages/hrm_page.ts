import { BasePage } from "./base_page";
import { Locator } from '@playwright/test';

import locators from '../resources/AutoMate/homeLocators.json';

export class HRMHomePage extends BasePage {

  private getLocator(selector: string): string {
    return locators[selector];
  }

  private async getElement(selector: string): Promise<Locator> {
    const locator = this.getLocator(selector);
    return this.page.locator(locator);
  }

  async clickUsernameInput() {
    const element = await this.getElement('usernameInput');
    await element.click();
  }

  async clickPasswordInput() {
    const element = await this.getElement('passwordInput');
    await element.click();
  }

  async clickLoginButton() {
    const element = await this.getElement('loginButton');
    await element.click();
  }

  async clickClientBrandBannerLink() {
    const element = await this.getElement('clientBrandBannerLink');
    await element.click();
  }

  async clickDashboardLink() {
    const element = await this.getElement('dashboardLink');
    await element.click();
  }

  async clickPIMLink() {
    const element = await this.getElement('pimLink');
    await element.click();
  }

  async clickAddButton() {
    const element = await this.getElement('addButton');
    await element.click();
  }

  async clickSaveButton() {
    const element = await this.getElement('saveButton');
    await element.click();
  }

  async fillUsernameInput() {
    const element = await this.getElement('usernameInput');
    await element.fill(process.env.user_name ?? '');
  }

  async fillPasswordInput() {
    const element = await this.getElement('passwordInput');
    await element.fill(process.env.pwd ?? '');
  }

  async fillFirstNameInput(value: string) {
    const element = await this.getElement('firstNameInput');
    await element.fill(value);
  }

  async fillMiddleNameInput(value: string) {
    const element = await this.getElement('middleNameInput');
    await element.fill(value);
  }

  async fillLastNameInput(value: string) {
    const element = await this.getElement('lastNameInput');
    await element.fill(value);
  }

  async fillEmployeeIdInput(value: string) {
    const element = await this.getElement('employeeIdInput');
    await element.fill(value);
  }

  async clearInput(selector: string) {
    const element = await this.getElement(selector);
    await element.clear();
  }

  async waitForPageLoad() {
    await this.page.waitForElementState('visible');
  }
  async getFirstNameInput(): Promise<Locator> {
    return this.getElement('firstNameInput');
  }

  async getMiddleNameInput(): Promise<Locator> {
    return this.getElement('middleNameInput');
  }

  async getLastNameInput(): Promise<Locator> {
    return this.getElement('lastNameInput');
  }

  async getEmployeeIdInput(): Promise<Locator> {
    return this.getElement('employeeIdInput');
  }
}
