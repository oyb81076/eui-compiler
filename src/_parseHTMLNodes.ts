import { DefaultTreeElement, DefaultTreeNode, DefaultTreeTextNode } from "parse5";
import { isEmptyString } from "./_string";
import { IHTMLNode } from "./faces";
const isText = (node: DefaultTreeNode): node is DefaultTreeTextNode => {
  return node.nodeName === "#text";
};
const isTag = (node: DefaultTreeNode): node is DefaultTreeElement => {
  return node.nodeName[0] !== "#";
};

export default function parseHTMLNodes(nodes: DefaultTreeNode[], trim: boolean): IHTMLNode[] {
  if (nodes.length === 0) { return []; }
  const array: IHTMLNode[] = [];
  nodes.forEach((node) => {
    if (isTag(node)) {
      const tagName = node.tagName;
      if (tagName === "script" || tagName === "style") { return; }
      array.push({
        attrs: node.attrs.map(({ name, value }) => ({ name, value })),
        nodes: parseHTMLNodes(node.childNodes, trim || tagName === "pre"),
        tag: tagName,
        type: "tag",
      });
    } else if (isText(node)) {
      if (!trim || !isEmptyString(node.value)) {
        array.push({ type: "text", value: node.value });
      }
    }
    // DocType之类的一概拒绝
  });
  return array;
}
