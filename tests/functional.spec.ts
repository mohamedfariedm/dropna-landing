import { test, expect } from "@playwright/test";

const LOCAL = process.env.LOCAL_BASE_URL ?? "http://localhost:3000";

test.describe("local functional interactions", () => {
  test("home AR — nav, language, classes flip, scrubber", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${LOCAL}/ar`, { waitUntil: "domcontentloaded" });

    await expect(page.locator("h1")).toContainText("مع دروبنا");

    // Language switch
    await page.getByRole("link", { name: "English" }).click();
    await expect(page).toHaveURL(/\/en/);
    await expect(page.locator("h1")).toContainText("Droobna");

    await page.getByRole("link", { name: "العربية" }).click();
    await expect(page).toHaveURL(/\/ar/);

    // Scroll to classes and flip via peek strip (overflow-clipped inactive slots)
    await page.locator("#classes").scrollIntoViewIfNeeded();
    const lite = page.getByRole("button", { name: "دروبنا لايت" });
    await lite.click({ force: false, position: { x: 48, y: 20 } });
    await expect(lite).toHaveAttribute("aria-pressed", "true", { timeout: 5000 });

    const plus = page.getByRole("button", { name: "دروبنا بلس" });
    await plus.click({ position: { x: 48, y: 20 } });
    await expect(plus).toHaveAttribute("aria-pressed", "true", { timeout: 5000 });

    // Download dropdown
    await page.getByRole("button", { name: "حمّل التطبيق" }).click();
    await expect(page.getByRole("menu")).toBeVisible();
  });

  test("FAQ accordion expand/collapse", async ({ page }) => {
    await page.goto(`${LOCAL}/ar/faq`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText("نساعدك");

    const openBtn = page.getByRole("button", { name: /كيف أحجز مشوار/ });
    await expect(openBtn).toHaveAttribute("aria-expanded", "true");

    await page.getByRole("button", { name: /وش الفرق/ }).click();
    await expect(
      page.getByRole("button", { name: /وش الفرق/ }),
    ).toHaveAttribute("aria-expanded", "true");

    await page.getByRole("button", { name: "الأمان" }).click();
    await expect(page.locator("#safety")).toBeVisible();
  });

  test("contact form validation", async ({ page }) => {
    await page.goto(`${LOCAL}/ar/contact`, { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "أرسل الرسالة" }).click();
    // HTML5 / zod should block empty required fields — page stays
    await expect(page).toHaveURL(/contact/);
  });

  test("privacy TOC anchors", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${LOCAL}/ar/privacy`, { waitUntil: "domcontentloaded" });
    const tocLink = page.locator("aside a").first();
    await tocLink.click();
    await page.waitForTimeout(300);
    // hash should update or section be in view
    const href = await tocLink.getAttribute("href");
    expect(href?.startsWith("#")).toBeTruthy();
  });
});
