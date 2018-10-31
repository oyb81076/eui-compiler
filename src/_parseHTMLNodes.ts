import { DefaultTreeElement, DefaultTreeNode, DefaultTreeTextNode } from "parse5";
import { IHTMLNode } from "./faces";
const isEmptyString = (text: string) => {
  return text.length === 0 || /^\s*$/.test(text);
};
const isText = (node: DefaultTreeNode): node is DefaultTreeTextNode => {
  return node.nodeName === "#text";
};
const isTag = (node: DefaultTreeNode): node is DefaultTreeElement => {
  return node.nodeName[0] !== "#";
};

// export const parseStyleValue = (node: DefaultTreeElement, styles: string[]) => {
//   const content = node.childNodes.map((n) => {
//     if (isText(n) && !isEmptyString(n.value)) { return n.value; }
//     return "";
//   }).join("");
//   if (!content.length) { return; }
//   styles.push(content);
// };
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
  });
  return array;
}
