import {  expect } from '@playwright/test';
import { BasePage } from "./base_page";

export class CheckoutPage extends BasePage  {

  private firstName = this.page.locator('#first-name');
  private lastName = this.page.locator('#last-name');
  private postalCode = this.page.locator('#postal-code');
  private continueButton = this.page.locator('#continue');
  private summaryInfo = this.page.locator('.summary_info_label');

  async fillCheckoutInfo(first: string, last: string, postal: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(postal);
    await this.continueButton.click();
  }

  async verifySummary() {
    await expect(this.summaryInfo).toContainText(['Payment Information', 'Shipping Information']);
  }
}
