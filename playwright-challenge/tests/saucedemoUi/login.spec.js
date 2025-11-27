// tests/ui/auth.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../../page-objects/saucedemoUi/LoginPage');
const users = require('../../test-data/saucedemo-users.json');

test.describe('SauceDemo - Authentication', () => {
  test('standard user can login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(
  users.saucedemo.standard_user.username,
  users.saucedemo.standard_user.password
);

    // verify inventory page visible
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

});
