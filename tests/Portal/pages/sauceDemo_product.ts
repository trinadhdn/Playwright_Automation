import { BasePage } from "./base_page";

export class ProductsPage extends BasePage {

  private firstProduct = this.page.locator('.inventory_item').first();
  private cartIcon = this.page.locator('.shopping_cart_link');

  async addFirstProductToCart(): Promise<string> {
    const name = await this.firstProduct.locator('.inventory_item_name').textContent();
    await this.firstProduct.locator('button:has-text("Add to cart")').click();
    return name?.trim() || '';
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}
