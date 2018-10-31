import { IHTMLNode } from "./faces";
export default function walkHTML(nodes: IHTMLNode[], cb: (node: IHTMLNode) => void): void {
  nodes.forEach((node) => {
    cb(node);
    if (node.type === "tag" && node.nodes.length) {
      walkHTML(node.nodes, cb);
    }
  });
}
