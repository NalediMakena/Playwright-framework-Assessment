const { test, expect } = require('@playwright/test');
const users = require('../../test-data/booker-users.json');

const BASE = users.restfulbooker.base;
const bookingData = users.restfulbooker.bookingData;

let bookingId;

test.describe('Restful Booker - Booking CRUD', () => {
  let token;

  test.beforeAll(async ({ request }) => {
    // Create auth token
    const resp = await request.post(`${BASE}/auth`, {
      data: {
        username: users.restfulbooker.admin.username,
        password: users.restfulbooker.admin.password
      }
    });
    const body = await resp.json();
    token = body.token;
  });

  test('Create booking', async ({ request }) => {
    const resp = await request.post(`${BASE}/booking`, { data: bookingData });
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    bookingId = body.bookingid || body.id; // store for later tests
    expect(bookingId).toBeDefined();
  });

  test('Read booking', async ({ request }) => {
    const resp = await request.get(`${BASE}/booking/${bookingId}`);
    expect(resp.status()).toBe(200);
    const body = await resp.json();
    expect(body.firstname).toBe(bookingData.firstname);
    expect(body.lastname).toBe(bookingData.lastname);
  });

  test('Update booking', async ({ request }) => {
  const updatedBooking = {
    firstname: bookingData.firstname,
    lastname: bookingData.lastname,
    totalprice: 250,
    depositpaid: true,
    bookingdates: bookingData.bookingdates,
    additionalneeds: "Lunch"
  };

  const resp = await request.put(`${BASE}/booking/${bookingId}`, {
    data: updatedBooking,
    headers: {
      "Content-Type": "application/json",
      "Cookie": `token=${token}`,
      "Authorization": `Basic ${Buffer.from(`${users.restfulbooker.admin.username}:${users.restfulbooker.admin.password}`).toString('base64')}`
    }
  });

  expect(resp.status()).toBe(200);
  const body = await resp.json();
  expect(body.totalprice).toBe(250);
});


test('Delete booking', async ({ request }) => {
  const resp = await request.delete(`${BASE}/booking/${bookingId}`, {
    headers: {
      "Content-Type": "application/json",
      "Cookie": `token=${token}`,
      "Authorization": `Basic ${Buffer.from(`${users.restfulbooker.admin.username}:${users.restfulbooker.admin.password}`).toString('base64')}`
    }
  });

  expect(resp.status()).toBe(201);

  // Verify deletion
  const confirm = await request.get(`${BASE}/booking/${bookingId}`);
  expect(confirm.status()).toBe(404);
});
});
