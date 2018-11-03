import { readFileSync } from "fs";
import { join } from "path";
import { parseAssets } from "../src/assets";
import { parseHTML } from "../src/html-parser";
import { serializeHTML } from "../src/html-serializer";
// tslint:disable-next-line:no-var-requires
const assetsJSON = require("./proj/assets.json");
const indexHtml = readFileSync(join(__dirname, "./proj/index.html"), { encoding: "utf8" });
test("snapshot", () => {
  const assets = parseAssets(assetsJSON);
  const ast = parseHTML(assets, "index.html", indexHtml);
  serializeHTML(assets, "index.html", ast);
});
