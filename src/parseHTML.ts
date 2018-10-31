import { DefaultTreeDocument, parse } from "parse5";
import path from "path-url";
import { uri2ID } from "./_assets";
import parseHTMLNodes from "./_parseHTMLNodes";
import walkHTML from "./_walkHTML";
import { IAssets, IHTMLDocument, IHTMLNode, IHTMLTagNode } from "./faces";
const transHTMLAttrURI = (assets: Record<string, IAssets>, dirname: string, node: IHTMLTagNode) => {
  switch (node.tag) {
    case "link":
    case "a":
      node.attrs.forEach((x) => {
        if (x.name === "href") {
          x.value = uri2ID(assets, dirname, x.value);
        }
      });
      break;
  }
};
export const transformURI = (assets: Record<string, IAssets>, filename: string, nodes: IHTMLNode[]) => {
  const dirname = path.dirname(filename);
  walkHTML(nodes, (node) => {
    if (node.type === "tag") {
      transHTMLAttrURI(assets, dirname, node);
    }
  });
};
export default function parseHTML(
  assets: Record<string, IAssets>,
  filename: string,
  content: string,
): IHTMLDocument {
  const html = parse(content) as DefaultTreeDocument;
  const nodes = parseHTMLNodes(html.childNodes, true);
  transformURI(assets, filename, nodes);
  return { type: "#document", nodes };
}
