import { DefaultTreeDocument, DefaultTreeDocumentFragment, parse, parseFragment } from "parse5";
import dirname from "path-url/dirname";
import parseHTMLNodes from "./_parseHTMLNodes";
import walkHTML from "./_walkHTML";
import { uri2ID } from "./assets";
import { IAssets, IHTMLDocument, IHTMLFragment, IHTMLTagNode } from "./faces";

const transHTMLAttrURI = (parseURI: (uri: string) => string, node: IHTMLTagNode) => {
  switch (node.tag) {
    case "link":
    case "a":
      node.attrs.forEach((x) => {
        if (x.name === "href") {
          x.value = parseURI(x.value);
        }
      });
      break;
  }
};

const parseNodes = (assets: IAssets, filename: string, doc: DefaultTreeDocument | DefaultTreeDocumentFragment) => {
  const nodes = parseHTMLNodes(doc.childNodes, true);
  const dir = dirname(filename);
  const parseURI = (uri: string) => uri2ID(assets, dir, uri);
  walkHTML(nodes, (node) => {
    if (node.type === "tag") {
      transHTMLAttrURI(parseURI, node);
    }
  });
  return nodes;
};

export const parseHTML = (assets: IAssets, filename: string, content: string): IHTMLDocument => {
  const doc = parse(content) as DefaultTreeDocument;
  const nodes = parseNodes(assets, filename, doc);
  return { type: "#document", nodes };
};

export const parseHTMLFragment = (assets: IAssets, filename: string, content: string): IHTMLFragment => {
  const doc = parseFragment(content) as DefaultTreeDocumentFragment;
  const nodes = parseNodes(assets, filename, doc);
  return { type: "#fragment", nodes };
};
