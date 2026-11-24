const fs = require("fs");
const c = fs.readFileSync(process.env.TEMP + "/framer-home.html", "utf8");

function context(needle, n = 6) {
  const hits = [];
  let i = 0;
  while ((i = c.indexOf(needle, i)) !== -1 && hits.length < n) {
    hits.push(c.slice(Math.max(0, i - 220), i + needle.length + 80).replace(/\s+/g, " "));
    i += needle.length;
  }
  return hits;
}

const out = [];
for (const needle of [
  ".framer-dci1aw{padding",
  ".framer-9jijad-container{height",
  ".framer-t6ldh4{",
  "--framer-font-size:64px",
  "--framer-font-size:20px",
  "preset-1txie6a",
  "preset-1hs6q91",
]) {
  out.push("\n#### " + needle + "\n");
  out.push(context(needle).join("\n---\n"));
}

// desktop preset block: find first occurrence of styles-preset-1hs6q91 rule start
const key = ".framer-styles-preset-1hs6q91";
const i = c.indexOf(key);
out.push("\n#### H2 PRESET WINDOW\n");
out.push(c.slice(i, i + 1800));
const j = c.indexOf(".framer-styles-preset-1txie6a");
out.push("\n#### EYEBROW PRESET WINDOW\n");
out.push(c.slice(j, j + 1600));

fs.writeFileSync(process.env.TEMP + "/framer-classes-type.txt", out.join("\n"));
console.log("ok", out.join("\n").length);
