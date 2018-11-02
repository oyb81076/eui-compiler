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

export interface IAsset {
  _id: string;
  filename: string;
  mine: string;
}
export type IAssets = Record<string, IAsset>;
