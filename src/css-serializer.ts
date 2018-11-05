import { parseDeclValue } from "./_utils";
import { ICssAtRule, ICssDecl, ICssDocument, ICssRule, ParseURI } from "./faces";
const serializeAtRule = (parseURI: ParseURI, atRule: ICssAtRule): string => {
  if (atRule.name === "import") {
    return `@import "${parseURI(atRule.params)}";\n`;
  } else if (!atRule.nodes) {
    return `@${atRule.name} ${atRule.params};\n`;
  }
  let out = `@${atRule.name} ${atRule.params} {\n`;
  out += atRule.nodes.map((node) => serializeRule(parseURI, node, "  ")).join("\n");
  out += "}\n";
  return out;
};
const serializeDecl = (parseURI: ParseURI, { prop, value }: ICssDecl, indent: string) => {
  return `${indent}${prop}: ${parseDeclValue(parseURI, prop, value)};\n`;
};
const serializeRule = (parseURI: ParseURI, rule: ICssRule, indent: string): string => {
  const nextIndent = "  " + indent;
  return `${indent}${rule.selectors.join(", ")} {\n${
    rule.nodes.map((n) => serializeDecl(parseURI, n, nextIndent)).join("")
    }}\n`;
};
export const serializeCss = (parseURI: ParseURI, doc: ICssDocument): string => {
  return doc.nodes.map<string>((node) => {
    switch (node.type) {
      case "atRule": return serializeAtRule(parseURI, node);
      case "rule": return serializeRule(parseURI, node, "");
    }
    return "";
  }).join("");
};
