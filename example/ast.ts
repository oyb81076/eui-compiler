// tslint:disable:no-var-requires
// 用来将./proj的编译中间的内容写入成文件
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { makeUri2Absolute, makeUri2ID, parseAssets } from "../src/assets";
import { parseHTML } from "../src/html-parser";
import { serializeHTML } from "../src/html-serializer";
const stringify = require("json-stringify-pretty-compact");
const res = {
  "assets": require("./res/assets.json"),
  "index.html": readFileSync(join(__dirname, "./res/index.html"), { encoding: "utf8" }),
};
const assets = parseAssets(res.assets);
if (!existsSync(join(__dirname, "./build"))) {
  mkdirSync(join(__dirname, "./build"));
}
writeFileSync(
  join(__dirname, "./build/assets.ast.json"),
  stringify(assets, { margins: true }),
  { encoding: "utf8" },
);
const indexAst = parseHTML(makeUri2ID(assets, "index.html"), res["index.html"]);
writeFileSync(
  join(__dirname, "./build/index.html.ast.json"),
  stringify(indexAst, { margins: true }),
  { encoding: "utf8" },
);
writeFileSync(
  join(__dirname, "./build/index.html.ast.html"),
  serializeHTML(makeUri2Absolute(assets, "index.html"), indexAst),
  { encoding: "utf8" },
);
