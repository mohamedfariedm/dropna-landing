const fs = require("fs");
const c = fs.readFileSync(process.env.TEMP + "/framer-home.html", "utf8");
const marker = "framer/appear";
const i = c.indexOf(marker);
console.log("appear idx", i);
const scriptStart = c.indexOf(">", i);
const scriptEnd = c.indexOf("</script>", scriptStart);
const json = c.slice(scriptStart + 1, scriptEnd);
fs.writeFileSync(process.env.TEMP + "/framer-appear.json", json);
console.log("json len", json.length);
const data = JSON.parse(json);
const keys = Object.keys(data);
console.log("keys", keys.length);
const interesting = ["9jijad", "1op45xt", "139c6a9", "1y6icwu", "dci1aw", "t6ldh4", "16vz69p"];
for (const k of keys) {
  if (interesting.some((x) => k.includes(x))) {
    console.log("\nKEY", k);
    console.log(JSON.stringify(data[k]).slice(0, 1500));
  }
}
