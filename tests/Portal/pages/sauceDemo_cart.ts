import {  expect } from '@playwright/test';
import { BasePage } from "./base_page";

export class CartPage extends BasePage {

  private checkoutButton = this.page.locator('#checkout');
  private cartItemName = this.page.locator('.inventory_item_name');

  async verifyItemInCart(expectedName: string) {
    const name = await this.cartItemName.textContent();
    expect(name?.trim()).toBe(expectedName);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
