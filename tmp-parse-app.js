const fs = require("fs");
const html = fs.readFileSync(process.env.TEMP + "/framer-home.html", "utf8");
const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]);
console.log(scripts.join("\n"));
const idx = html.indexOf("translateY(34px)");
console.log("\n--- context y34 ---\n");
console.log(html.slice(Math.max(0, idx - 400), idx + 200));
