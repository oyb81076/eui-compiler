import { DefaultTreeDocumentFragment, parseFragment } from "parse5";
import parseHTMLNodes from "./_parseHTMLNodes";
export default function parseHTMLFragment(content: string) {
  const fragment = parseFragment(content) as DefaultTreeDocumentFragment;
  const nodes = parseHTMLNodes(fragment.childNodes, true);
  return { type: "#fragment", nodes };
}
