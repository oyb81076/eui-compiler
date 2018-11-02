// 用来将./proj的编译中间的内容写入成文件
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { parseAssets } from "../src/assets";
import parseHTML from "../src/parseHTML";
import serializeHTML from "../src/serializeHTML";
// tslint:disable-next-line:no-var-requires
const assetsJSON = require("./proj/assets.json");
const assets = parseAssets(assetsJSON);
writeFileSync(
  join(__dirname, "./ast/assets.ast.json"),
  JSON.stringify(assets, null, 2),
  { encoding: "utf8" },
);
const indexHtml = readFileSync(join(__dirname, "./proj/index.html"), { encoding: "utf8" });
const indexAst = parseHTML(assets, "index.html", indexHtml);
writeFileSync(
  join(__dirname, "./ast/index.html.ast.json"),
  JSON.stringify(indexAst, null, 2),
  { encoding: "utf8" },
);
writeFileSync(
  join(__dirname, "./ast/index.html.ast.html"),
  serializeHTML(assets, "index.html", indexAst),
  { encoding: "utf8" },
);
