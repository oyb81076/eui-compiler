/**
 * @copyright https://github.com/jonschlinkert/self-closing-tags/blob/master/index.js
 */
const svgElements = [
  "circle",
  "ellipse",
  "line",
  "path",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "use",
];

const voidElements = [
  "area",
  "base",
  "br",
  "col",
  "command",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
];
const voids = svgElements.concat(voidElements);
const isSelfCloseTag = (tag: string): boolean => voids.indexOf(tag) === -1;
export default isSelfCloseTag;
