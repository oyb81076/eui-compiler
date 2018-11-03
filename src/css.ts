import dirname from "path-url/dirname";
import { AtRule, Declaration, parse } from "postcss";
import { uri2ID } from "./assets";
import { IAssets } from "./faces";

const transformAtRuleURL = (parseURI: (uri: string) => string, rule: AtRule) => {
  if (rule.name === "import") {
    const uri = rule.params
      .replace(/^\s*url\(\s*["']?/i, "")
      .replace(/["']?\s*\)\s*$/i, "");
    rule.params = parseURI(uri);
  }
};
const transformDeclURL = (parseURI: (uri: string) => string, decl: Declaration) => {
  switch (decl.prop) {
    case "background":
    case "background-image":
    case "border-image":
    case "border":
    case "list-style":
    case "list-style-image":
    case "src":
      decl.value = decl.value.replace(/url\(\s+["']?(.*)["']?\s+\)/ig, (_, value) => {
        return "url(\"" + parseURI(value) + "\")";
      });
      break;
  }
};

export const parseCss = (assets: IAssets, filename: string, content: string) => {
  const dir = dirname(filename);
  const root = parse(content);
  const parseURI = (uri: string) => uri2ID(assets, dir, uri);
  root.walkAtRules("import", (atRule) => {
    transformAtRuleURL(parseURI, atRule);
  });
  root.walkDecls((decl) => {
    transformDeclURL(parseURI, decl);
  });
};
// export const serializeCss = (assets: IAssets, filename: string, content)=>
