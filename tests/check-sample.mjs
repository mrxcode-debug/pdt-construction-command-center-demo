import assert from "node:assert/strict";
import fs from "node:fs";
const html = fs.readFileSync("index.html","utf8");
const js = fs.readFileSync("app.js","utf8");
const data = fs.readFileSync("data.js","utf8");
assert.match(html,/INTERNAL DEMO - SYNTHETIC DATA/);
assert.match(html,/data\.js/);
assert.match(html,/app\.js/);
assert.match(html,/PDT Construction Command Center/);
assert.match(data,/ConstructionOSData/);
assert.match(js,/dataAdapter/);
for (const s of [html,js,data]) {
 assert.doesNotMatch(s,/(ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9]{20,}|-----BEGIN .*PRIVATE KEY-----)/);
}
console.log("PASS: self-contained static app, demo disclosure and basic secret-pattern checks");
