import { test } from '@playwright/test';
import { LoginPage } from '../pages/sauceDemo_Login';
import { ProductsPage } from '../pages/sauceDemo_product';
import { CartPage } from '../pages/sauceDemo_cart';
import { CheckoutPage } from '../pages/sauceDemo_checkOut';

test('E-Commerce E2E flow (Login → Add to Cart → Checkout Summary)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Add first product
  const productName = await productsPage.addFirstProductToCart();

  // Go to Cart and verify
  await productsPage.goToCart();
  await cartPage.verifyItemInCart(productName);

  //Checkout process
  await cartPage.proceedToCheckout();
  await checkoutPage.fillCheckoutInfo('Trinadh', 'Kumar', '500081');
  await checkoutPage.verifySummary();

  await page.screenshot({ path: `e2e_checkout_summary.png`, fullPage: true });
});
