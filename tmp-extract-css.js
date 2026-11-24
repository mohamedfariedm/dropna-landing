const fs = require("fs");
const c = fs.readFileSync(process.env.TEMP + "/framer-home.html", "utf8");

const classes = [
  "framer-1y6icwu",
  "framer-dci1aw",
  "framer-16vz69p",
  "framer-t6ldh4",
  "framer-139c6a9",
  "framer-1op45xt",
  "framer-9jijad-container",
  "framer-styles-preset-1txie6a",
  "framer-styles-preset-1hs6q91",
];

function extractRules(name) {
  const out = [];
  let i = 0;
  while ((i = c.indexOf(name, i)) !== -1) {
    const start = c.lastIndexOf("{", i);
    const selStart = c.lastIndexOf("}", i);
    const ruleStart = Math.max(selStart, c.lastIndexOf("<style", i));
    const end = c.indexOf("}", i);
    if (start !== -1 && end !== -1 && i - start < 400) {
      out.push(c.slice(Math.max(0, start - 180), end + 1));
    }
    i += name.length;
    if (out.length > 12) break;
  }
  return out;
}

const chunks = [];
for (const name of classes) {
  chunks.push("\n\n===== " + name + " =====\n");
  chunks.push(extractRules(name).join("\n---\n"));
}

// find script srcs
const srcs = [...c.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
chunks.push("\n\n===== SCRIPTS =====\n" + srcs.filter((s) => s.includes("framer") || s.includes(".mjs") || s.includes(".js")).slice(0, 40).join("\n"));

fs.writeFileSync(process.env.TEMP + "/framer-classes-css.txt", chunks.join("\n"));
console.log("css bytes", chunks.join("\n").length);
