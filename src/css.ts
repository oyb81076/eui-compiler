import { AtRule, ChildNode, Declaration, parse, Root, Rule } from "postcss";
import { ICssAtRule, ICssDecl, ICssDocument, ICssInlineStyle, ICssRule, ParseURI } from "./faces";

const transformAtRuleURL = (parseURI: (uri: string) => string, rule: AtRule) => {
  if (rule.name === "import") {
    const uri = rule.params
      .replace(/^\s*url\(\s*["']?/i, "")
      .replace(/["']?\s*\)\s*$/i, "");
    rule.params = parseURI(uri);
  }
};
const transformDeclURL = (parseURI: (uri: string) => string, decl: Declaration) => {
  switch (decl.prop) {
    case "background":
    case "background-image":
    case "border-image":
    case "border":
    case "list-style":
    case "list-style-image":
    case "src":
      decl.value = decl.value.replace(/url\(\s+["']?(.*)["']?\s+\)/ig, (_, value) => {
        return "url(\"" + parseURI(value) + "\")";
      });
      break;
  }
};
const parseDecls = (nodes?: ChildNode[]): ICssDecl[] => {
  if (!nodes) { return []; }
  return nodes
    .filter((x): x is Declaration => x.type === "decl")
    .map<ICssDecl>((n) => {
      return { type: "decl", prop: n.prop, value: n.value };
    });
};
const parseRule = ({ nodes, selectors, selector }: Rule): ICssRule => ({
  nodes: parseDecls(nodes),
  selectors: selectors || [selector],
  type: "rule",
});
const parseRules = (nodes?: ChildNode[]): ICssRule[] => {
  if (!nodes) { return []; }
  return nodes
    .filter((x): x is Rule => x.type === "rule")
    .map(parseRule);
};
const parseAtRule = (rule: AtRule): ICssAtRule => {
  return {
    name: rule.name,
    nodes: parseRules(rule.nodes),
    params: rule.params,
    type: "atRule",
  };
};
const parseRootRules = (root: Root): ICssDocument["nodes"] => {
  const nodes: ICssDocument["nodes"] = [];
  root.nodes!.forEach((rule) => {
    switch (rule.type) {
      case "atrule": {
        nodes.push(parseAtRule(rule));
        break;
      }
      case "rule": {
        nodes.push(parseRule(rule));
        break;
      }
    }
  });
  return nodes;
};
export const parseCss = (parseURI: ParseURI, content: string): ICssDocument => {
  const root = parse(content);
  root.walkAtRules("import", (atRule) => {
    transformAtRuleURL(parseURI, atRule);
  });
  root.walkDecls((decl) => {
    transformDeclURL(parseURI, decl);
  });
  const nodes = parseRootRules(root);
  return { type: "#document", nodes };
};
export const parseInlineStyle = (parseURI: ParseURI, content: string): ICssInlineStyle => {
  const root = parse(content);
  root.walkDecls((decl) => {
    transformDeclURL(parseURI, decl);
  });
  const nodes = parseDecls(root.nodes);
  return { type: "#css-inline", nodes };
};
// export const serializeCss = (assets: IAssets, filename: string, content)=>
