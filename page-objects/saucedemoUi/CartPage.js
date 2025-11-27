class CartPage {
  constructor(page) {
    this.page = page;
    this.checkout = page.locator('[data-test="checkout"]');
    this.items = page.locator('.cart_item');
  }

  async clickCheckout() {
    await this.checkout.click();
  }

  async removeItem(itemName) {
    const button = this.page.locator(`.cart_item:has-text("${itemName}") button`);
    await button.click();
  }
}

module.exports = CartPage;
