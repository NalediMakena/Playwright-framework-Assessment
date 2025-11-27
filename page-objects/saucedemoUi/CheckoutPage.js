class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continue_ = page.locator('[data-test="continue"]');
    this.finish = page.locator('[data-test="finish"]');
    this.complete = page.locator('.complete-header');
  }

  async details(first, last, zip) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
  }

  async continueBtn() {
    await this.continue_.click();
  }

  async finishBtn() {
    await this.finish.click();
  }

  async confirmComplete() {
    return this.complete.textContent();
  }
}

module.exports = CheckoutPage;
