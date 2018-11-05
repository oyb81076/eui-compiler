import { SELF_CLOSE_TAG } from "./_constants";
import { escapeAttrValue } from "./_utils";
import { IHTMLDocument, IHTMLNode, IHTMLTextNode, ParseURI } from "./faces";
const serializeNode = (parseURI: ParseURI, node: IHTMLNode, indent: string) => {
  switch (node.type) {
    case "text": return indent + node.value;
    case "tag": {
      const { tag, attrs, nodes } = node;
      let out = indent + `<${tag}`;
      if (attrs.length) {
        attrs.forEach(({ name, value }) => {
          if (name === "href") {
            value = parseURI(value);
          }
          out += " " + name + "=\"" + escapeAttrValue(value) + "\"";
        });
      }
      if (nodes.length === 1 && nodes[0].type === "text") {
        out += `>${(nodes[0] as IHTMLTextNode).value}</${tag}>\n`;
      } else if (nodes.length) {
        out += ">\n";
        const nextIndent = tag === "html" ? indent : indent + "  ";
        out += nodes.map((child) => serializeNode(parseURI, child, nextIndent)).join("");
        out += indent + "</" + tag + ">\n";
      } else if (SELF_CLOSE_TAG.has(tag)) {
        out += "/>\n";
      } else {
        out += "></" + tag + ">\n";
      }
      return out;
    }
  }
};
export const serializeHTML = (parseURI: ParseURI, doc: IHTMLDocument): string => {
  return "<!DOCTYPE html>\n" + doc.nodes.map((node) => {
    return serializeNode(parseURI, node, "");
  }).join("");
};
