const { test, expect } = require('@playwright/test');
const users = require('../../test-data/booker-users.json');

const BASE = users.restfulbooker.base;
const USERNAME = users.restfulbooker.admin.username;
const PASSWORD = users.restfulbooker.admin.password;

test.describe('Test Auth', () => {
  test('create auth token', async ({ request }) => {
    const resp = await request.post(`${BASE}/auth`, {
      data: { username: USERNAME, password: PASSWORD }
    });
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body).toHaveProperty('token');
  });
});
