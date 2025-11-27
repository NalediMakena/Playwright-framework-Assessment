// tests/ui/inventory.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../page-objects/saucedemoUi/LoginPage');
const users = require('../../test-data/saucedemo-users.json');
const InventoryPage = require('../../page-objects/saucedemoUi/InventoryPage');
const CartPage = require('../../page-objects/saucedemoUi/CartPage');
const CheckoutPage = require('../../page-objects/saucedemoUi/CheckoutPage');

test('add to cart and checkout', async ({ page }) => {
  test.setTimeout(60000);
  const login = new LoginPage(page);
  await login.goto();
  await login.login(
    users.saucedemo.standard_user.username,
    users.saucedemo.standard_user.password)

    // Adding items to cart
  const inventory = new InventoryPage(page);
  await inventory.addItemToCart('Sauce Labs Bike Light');
  await inventory.addItemToCart('Sauce Labs Bolt T-Shirt');
  await inventory.gotoCart();

  await expect(page.locator('.cart_item')).toHaveCount(2);
  
  // Checkout
  const cart = new CartPage(page);
  await cart.clickCheckout();

  const checkout = new CheckoutPage(page);
  await checkout.details('Naledi', 'Makena', '1687');
  await checkout.continueBtn();
  await checkout.finishBtn();


});
