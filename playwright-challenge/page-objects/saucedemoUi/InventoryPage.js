class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.items = page.locator('.inventory_item');
    this.addItem = (name) => page.locator(`.inventory_item:has-text("${name}") button`);
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async addItemToCart(itemName) {
    await this.addItem(itemName).click();
  }

  async gotoCart() {
    await this.cartIcon.click();
  }

}

module.exports = InventoryPage;
