export interface IHTMLTagNode {
  type: "tag";
  tag: string;
  attrs: Array<{ name: string, value: string }>;
  nodes: IHTMLNode[];
}
export interface IHTMLTextNode {
  type: "text";
  value: string;
}
export type IHTMLNode = IHTMLTagNode | IHTMLTextNode;
export interface IHTMLDocument {
  type: "#document";
  nodes: IHTMLNode[];
}

export interface IAssets {
  _id: string;
  filename: string;
  mine: string;
}
