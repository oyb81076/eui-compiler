import dirname from "path-url/dirname";
import isSelfCloseTag from "./_isSelfCloseTag";
import { escapeAttrValue } from "./_string";
import { uri2Absolute } from "./assets";
import { IAssets, IHTMLDocument, IHTMLNode, IHTMLTextNode } from "./faces";
const serializeNode = (assets: IAssets, dir: string, node: IHTMLNode, indent: string) => {
  switch (node.type) {
    case "text": return indent + node.value;
    case "tag": {
      const { tag, attrs, nodes } = node;
      let out = indent + `<${tag}`;
      if (attrs.length) {
        attrs.forEach(({ name, value }) => {
          if (name === "href") {
            value = uri2Absolute(assets, dir, value);
          }
          out += " " + name + "=\"" + escapeAttrValue(value) + "\"";
        });
      }
      if (nodes.length === 1 && nodes[0].type === "text") {
        out += `>${(nodes[0] as IHTMLTextNode).value}</${tag}>\n`;
      } else if (nodes.length) {
        out += ">\n";
        const nextIndent = tag === "html" ? indent : indent + "  ";
        out += nodes.map((child) => serializeNode(assets, dir, child, nextIndent)).join("");
        out += indent + "</" + tag + ">\n";
      } else if (isSelfCloseTag(tag)) {
        out += "/>\n";
      } else {
        out += "></" + tag + ">\n";
      }
      return out;
    }
  }
};
const serializeHTML = (assets: IAssets, filename: string, doc: IHTMLDocument): string => {
  const dir = dirname(filename);
  return "<!DOCTYPE html>\n" + doc.nodes.map((node) => {
    return serializeNode(assets, dir, node, "");
  }).join("");
};
export default serializeHTML;
