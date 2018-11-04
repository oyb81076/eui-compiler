/**
 * html dom节点 div,span
 */

export interface IHTMLTagNode {
  type: "tag";
  tag: string;
  attrs: Array<{ name: string, value: string }>;
  nodes: IHTMLNode[];
}
/**
 * html纯文本节点
 */
export interface IHTMLTextNode {
  type: "text";
  value: string;
}
export type IHTMLNode = IHTMLTagNode | IHTMLTextNode;
/**
 * html 文档
 */
export interface IHTMLDocument {
  type: "#document";
  nodes: IHTMLNode[];
}
/**
 * html片段
 */
export interface IHTMLFragment {
  type: "#fragment";
  nodes: IHTMLNode[];
}

/**
 * 以下部分为css部分文件
 */
export interface ICssAtRule {
  type: "atRule";
  name: string;
  params: string;
  nodes: ICssRule[];
}
export interface ICssRule {
  type: "rule";
  selectors: string[];
  nodes: ICssDecl[];
}
export interface ICssDecl {
  type: "decl";
  prop: string;
  value: string;
}
export interface ICssDocument {
  type: "#document";
  nodes: Array<ICssAtRule | ICssRule>;
}
export interface ICssFragment {
  type: "#fragment";
  nodes: Array<ICssAtRule | ICssRule>;
}
export interface ICssInlineStyle {
  type: "#css-inline";
  nodes: ICssDecl[];
}

/**
 * 资源文件
 */
export interface IAsset {
  _id: string;
  filename: string;
  mine: string;
}

export type IAssets = Record<string, IAsset>;
// immutable map of IAsset
export interface IAssetMap {
  get(key: "_id" | "filename" | "mine"): string;
}

// immutable map of IAsset
export interface IAssetsMap {
  get(key: string): IAssetMap;
  set(key: string, value: IAssetMap): this;
  delete(key: string): this;
  has(key: string): boolean;
  getIn(paths: [string, "_id" | "filename" | "mine"]): string;
}
export type ParseURI = (uri: string) => string;
