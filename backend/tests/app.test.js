const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../app");
const bcrypt = require("bcryptjs");
const Admin = require("../src/models/Admin");
const { connectRedis, getRedisClient } = require("../src/config/redis");

test("login accepts an admin with the legacy hashedPassword field", async () => {
  const originalFindOne = Admin.findOne;
  const originalJwtSecret = process.env.JWT_SECRET;
  const password = "correct horse battery staple";
  const hashedPassword = await bcrypt.hash(password, 4);
  Admin.findOne = () => ({
    select: async () => ({
      id: "admin-id",
      email: "admin@example.com",
      name: "Administrator",
      hashedPassword,
    }),
  });
  process.env.JWT_SECRET = "test-secret-with-at-least-thirty-two-characters";

  const server = app.listen(0);
  try {
    await new Promise((resolve) => server.once("listening", resolve));
    const response = await fetch(`http://127.0.0.1:${server.address().port}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@example.com", password }),
    });
    assert.equal(response.status, 200);
    assert.ok((await response.json()).token);
  } finally {
    Admin.findOne = originalFindOne;
    if (originalJwtSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = originalJwtSecret;
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});

test("login accepts configured admin credentials when the stored hash is stale", async () => {
  const originalFindOne = Admin.findOne;
  const originalJwtSecret = process.env.JWT_SECRET;
  const originalAdminEmail = process.env.ADMIN_EMAIL;
  const originalAdminPassword = process.env.ADMIN_PASSWORD;
  const password = "configured-test-password";
  const staleHash = await bcrypt.hash("old-test-password", 4);
  Admin.findOne = () => ({
    select: async () => ({
      id: "admin-id",
      email: "admin@example.com",
      name: "Administrator",
      passwordHash: staleHash,
    }),
  });
  process.env.JWT_SECRET = "test-secret-with-at-least-thirty-two-characters";
  process.env.ADMIN_EMAIL = " Admin@Example.com ";
  process.env.ADMIN_PASSWORD = password;

  const server = app.listen(0);
  try {
    await new Promise((resolve) => server.once("listening", resolve));
    const response = await fetch(`http://127.0.0.1:${server.address().port}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@example.com", password }),
    });
    assert.equal(response.status, 200);
    assert.ok((await response.json()).token);
  } finally {
    Admin.findOne = originalFindOne;
    if (originalJwtSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = originalJwtSecret;
    if (originalAdminEmail === undefined) delete process.env.ADMIN_EMAIL;
    else process.env.ADMIN_EMAIL = originalAdminEmail;
    if (originalAdminPassword === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = originalAdminPassword;
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});

test("API can disable response caching when Redis is unavailable", async () => {
  const client = await connectRedis("redis://127.0.0.1:1");
  assert.equal(client, null);
  assert.equal(getRedisClient(), null);
});

test("health endpoint returns service status", async () => {
  const server = app.listen(0);
  try {
    await new Promise((resolve) => server.once("listening", resolve));
    const response = await fetch(`http://127.0.0.1:${server.address().port}/api/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "ok" });
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});

test("admin endpoints reject requests without a bearer token", async () => {
  const server = app.listen(0);
  try {
    await new Promise((resolve) => server.once("listening", resolve));
    const response = await fetch(`http://127.0.0.1:${server.address().port}/api/admin/clients`);
    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), { error: "Authentication required." });
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});

test("contact form rejects incomplete enquiries", async () => {
  const server = app.listen(0);
  try {
    await new Promise((resolve) => server.once("listening", resolve));
    const response = await fetch(`http://127.0.0.1:${server.address().port}/api/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Ramesh" }),
    });
    assert.equal(response.status, 400);
    assert.ok((await response.json()).error);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});

test("public testimonial submissions reject invalid details", async () => {
  const server = app.listen(0);
  try {
    await new Promise((resolve) => server.once("listening", resolve));
    const response = await fetch(`http://127.0.0.1:${server.address().port}/api/testimonials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientName: "Ramesh" }),
    });
    assert.equal(response.status, 400);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});

test("media upload endpoint requires authentication", async () => {
  const server = app.listen(0);
  try {
    await new Promise((resolve) => server.once("listening", resolve));
    const response = await fetch(`http://127.0.0.1:${server.address().port}/api/admin/media/upload`, {
      method: "POST",
    });
    assert.equal(response.status, 401);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
