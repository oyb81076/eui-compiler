import { readFileSync } from "fs";
import { join } from "path";
import { parseAssets } from "../src/assets";
import parseHTML from "../src/parseHTML";
import serializeHTML from "../src/serializeHTML";
// tslint:disable-next-line:no-var-requires
const assetsJSON = require("./proj/assets.json");
const indexHtml = readFileSync(join(__dirname, "./proj/index.html"), { encoding: "utf8" });
test("snapshot", () => {
  const assets = parseAssets(assetsJSON);
  const ast = parseHTML(assets, "index.html", indexHtml);
  serializeHTML(assets, "index.html", ast);
});
