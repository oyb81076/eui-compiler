import { DefaultTreeDocument, parse } from "parse5";
import dirname from "path-url/dirname";
import parseHTMLNodes from "./_parseHTMLNodes";
import walkHTML from "./_walkHTML";
import { uri2ID } from "./assets";
import { IAssets, IHTMLDocument, IHTMLNode, IHTMLTagNode } from "./faces";
const transHTMLAttrURI = (assets: IAssets, dir: string, node: IHTMLTagNode) => {
  switch (node.tag) {
    case "link":
    case "a":
      node.attrs.forEach((x) => {
        if (x.name === "href") {
          x.value = uri2ID(assets, dir, x.value);
        }
      });
      break;
  }
};
export const transformURI = (assets: IAssets, filename: string, nodes: IHTMLNode[]) => {
  const dir = dirname(filename);
  walkHTML(nodes, (node) => {
    if (node.type === "tag") {
      transHTMLAttrURI(assets, dir, node);
    }
  });
};
const parseHTML = (assets: IAssets, filename: string, content: string): IHTMLDocument => {
  const html = parse(content) as DefaultTreeDocument;
  const nodes = parseHTMLNodes(html.childNodes, true);
  transformURI(assets, filename, nodes);
  return { type: "#document", nodes };
};
export default parseHTML;
