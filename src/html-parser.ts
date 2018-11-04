import { DefaultTreeDocument, DefaultTreeDocumentFragment, parse, parseFragment } from "parse5";
import parseHTMLNodes from "./_parseHTMLNodes";
import walkHTML from "./_walkHTML";
import { IHTMLDocument, IHTMLFragment, IHTMLTagNode, ParseURI } from "./faces";

const transHTMLAttrURI = (parseURI: ParseURI, node: IHTMLTagNode) => {
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

const parseNodes = (parseURI: ParseURI, doc: DefaultTreeDocument | DefaultTreeDocumentFragment) => {
  const nodes = parseHTMLNodes(doc.childNodes, true);
  walkHTML(nodes, (node) => {
    if (node.type === "tag") {
      transHTMLAttrURI(parseURI, node);
    }
  });
  return nodes;
};

export const parseHTML = (parseURI: ParseURI, content: string): IHTMLDocument => {
  const doc = parse(content) as DefaultTreeDocument;
  const nodes = parseNodes(parseURI, doc);
  return { type: "#document", nodes };
};

export const parseHTMLFragment = (parseURI: ParseURI, content: string): IHTMLFragment => {
  const doc = parseFragment(content) as DefaultTreeDocumentFragment;
  const nodes = parseNodes(parseURI, doc);
  return { type: "#fragment", nodes };
};
