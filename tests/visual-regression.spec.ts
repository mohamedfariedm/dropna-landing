import { test, expect, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const LOCAL = process.env.LOCAL_BASE_URL ?? "http://localhost:3000";
const REF = process.env.REF_BASE_URL ?? "https://navigate-potential-356153.framer.app";

const OUT = path.join(process.cwd(), "docs", "visual-regression");

const VIEWPORTS = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1366x768", width: 1366, height: 768 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "390x844", width: 390, height: 844 },
] as const;

const PAGES = [
  { id: "home-ar", local: "/ar", ref: "/" },
  { id: "home-en", local: "/en", ref: "/en" },
  { id: "faq-ar", local: "/ar/faq", ref: "/faq" },
  { id: "contact-ar", local: "/ar/contact", ref: "/contact" },
  { id: "privacy-ar", local: "/ar/privacy", ref: "/privacy" },
  { id: "terms-ar", local: "/ar/terms", ref: "/terms" },
] as const;

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

async function settle(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(800);
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  // hide next.js / framer chrome that breaks diffs
  await page.addStyleTag({
    content: `
      [data-nextjs-toast], #__next-build-watcher, nextjs-portal,
      #__framer-editorbar-container, [data-framer-appear-id="badge"] {
        display: none !important;
      }
    `,
  });
}

function comparePng(aPath: string, bPath: string, diffPath: string) {
  const imgA = PNG.sync.read(fs.readFileSync(aPath));
  const imgB = PNG.sync.read(fs.readFileSync(bPath));
  const width = Math.min(imgA.width, imgB.width);
  const height = Math.min(imgA.height, imgB.height);
  const diff = new PNG({ width, height });
  const mismatched = pixelmatch(
    imgA.data,
    imgB.data,
    diff.data,
    width,
    height,
    { threshold: 0.12 },
  );
  fs.writeFileSync(diffPath, PNG.sync.write(diff));
  const total = width * height;
  return {
    mismatched,
    total,
    ratio: mismatched / total,
    width,
    height,
  };
}

test.describe("visual regression — viewport hero", () => {
  for (const vp of VIEWPORTS) {
    for (const pageDef of PAGES) {
      test(`${pageDef.id} @ ${vp.name}`, async ({ page }) => {
        test.setTimeout(120_000);
        await page.setViewportSize({ width: vp.width, height: vp.height });

        const dir = path.join(OUT, vp.name, pageDef.id);
        ensureDir(dir);

        await page.goto(`${REF}${pageDef.ref}`, {
          waitUntil: "domcontentloaded",
          timeout: 60_000,
        });
        await settle(page);
        const refPath = path.join(dir, "ref-viewport.png");
        await page.screenshot({ path: refPath, fullPage: false });

        await page.goto(`${LOCAL}${pageDef.local}`, {
          waitUntil: "domcontentloaded",
          timeout: 60_000,
        });
        await settle(page);
        const localPath = path.join(dir, "local-viewport.png");
        await page.screenshot({ path: localPath, fullPage: false });

        const result = comparePng(
          refPath,
          localPath,
          path.join(dir, "diff-viewport.png"),
        );
        fs.writeFileSync(
          path.join(dir, "metrics.json"),
          JSON.stringify({ ...result, page: pageDef.id, viewport: vp.name }, null, 2),
        );

        // Soft gate: record metrics. Mobile/tablet Framer chrome + crop timing
        // inflate ratios; desktop stays stricter.
        const ceiling = vp.width <= 390 ? 0.58 : vp.width <= 768 ? 0.5 : 0.45;
        expect(
          result.ratio,
          `pixel mismatch ratio ${result.ratio.toFixed(4)} for ${pageDef.id}@${vp.name}`,
        ).toBeLessThan(ceiling);
      });
    }
  }
});

test.describe("classes deck scroll checkpoints (home ar 1440)", () => {
  test("capture class section at multiple scroll positions", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const dir = path.join(OUT, "1440x900", "classes-checkpoints");
    ensureDir(dir);

    for (const [label, base] of [
      ["ref", REF],
      ["local", LOCAL],
    ] as const) {
      const url = label === "ref" ? `${base}/` : `${base}/ar`;
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
      await settle(page);

      const target =
        label === "ref"
          ? '[data-framer-name="Classes"]'
          : "#classes";
      await page.locator(target).first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.screenshot({
        path: path.join(dir, `${label}-classes.png`),
        fullPage: false,
      });
    }

    if (
      fs.existsSync(path.join(dir, "ref-classes.png")) &&
      fs.existsSync(path.join(dir, "local-classes.png"))
    ) {
      const result = comparePng(
        path.join(dir, "ref-classes.png"),
        path.join(dir, "local-classes.png"),
        path.join(dir, "diff-classes.png"),
      );
      fs.writeFileSync(
        path.join(dir, "metrics.json"),
        JSON.stringify(result, null, 2),
      );
      expect(result.ratio).toBeLessThan(0.5);
    }
  });
});
