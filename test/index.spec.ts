import { readFileSync } from "fs";
import { join } from "path";
import { makeUri2Absolute, makeUri2ID, parseAssets } from "../src/assets";
import { parseHTML } from "../src/html-parser";
import { serializeHTML } from "../src/html-serializer";
// tslint:disable-next-line:no-var-requires
const assetsJSON = require("./proj/assets.json");
const indexHtml = readFileSync(join(__dirname, "./proj/index.html"), { encoding: "utf8" });
test("snapshot", () => {
  const assets = parseAssets(assetsJSON);
  const uri2ID = makeUri2ID(assets, "index.html");
  const uri2Absolute = makeUri2Absolute(assets, "index.html");
  const ast = parseHTML(uri2ID, indexHtml);
  serializeHTML(uri2Absolute, ast);
});
