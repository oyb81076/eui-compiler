// tslint:disable:no-var-requires
// 用来将./proj的编译中间的内容写入成文件
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { makeUri2Absolute, makeUri2ID, parseAssets } from "../src/assets";
import { parseCss } from "../src/css-parser";
import { serializeCss } from "../src/css-serializer";
import { parseHTML } from "../src/html-parser";
import { serializeHTML } from "../src/html-serializer";
const stringify = require("json-stringify-pretty-compact");
const assets = parseAssets(require("./res/assets.json"));
mkdirp();
writeAssetsAstJson();
writeIndexHtml();
writeBaseCss();
writeIndexCss();
function mkdirp() {
  if (!existsSync(join(__dirname, "./build"))) {
    mkdirSync(join(__dirname, "./build"));
  }
}
function writeAssetsAstJson() {
  write("./build/assets.ast.json", assets);
}
function writeIndexHtml() {
  const html = read("./res/index.html");
  const ast = parseHTML(makeUri2ID(assets, "index.html"), html);
  write("./build/index.html.ast.json", ast);
  const astHtml = serializeHTML(makeUri2Absolute(assets, "index.html"), ast);
  write("./build/index.html.ast.html", astHtml);
}
function writeBaseCss() {
  const css = read("./res/base.css");
  const ast = parseCss(makeUri2ID(assets, "base.css"), css);
  write("./build/base.css.ast.json", ast);
  const astCss = serializeCss(makeUri2Absolute(assets, "base.css"), ast);
  write("./build/base.css.ast.css", astCss);
}
function writeIndexCss() {
  const css = read("./res/index.css");
  const ast = parseCss(makeUri2ID(assets, "index.css"), css);
  write("./build/index.css.ast.json", ast);
  const astCss = serializeCss(makeUri2Absolute(assets, "index.css"), ast);
  write("./build/index.css.ast.css", astCss);
}

function read(path: string) {
  return readFileSync(join(__dirname, path), { encoding: "utf8" });
}
function write(path: string, body: any) {
  if ( typeof body !== "string" ) {
    body = stringify(body, { margins: true });
  }
  writeFileSync(join(__dirname, path), body, { encoding: "utf8" });
}
