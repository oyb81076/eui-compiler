import { URL_DECL_PROP } from "./_constants";
import { ParseURI } from "./faces";

export const escapeAttrValue = (val: string) => val.replace(/"/g, "&quot;");
export const isEmptyString = (text: string) => {
  return text.length === 0 || /^\s*$/.test(text);
};
export const parseDeclValue = (parseURI: ParseURI, prop: string, value: string): string => {
  if (URL_DECL_PROP.has(prop)) {
    return value.replace(/url\(\s*["']?([^'"]*)["']?\s*\)/g, (_, uri: string) => {
      return "url(" + parseURI(uri.trimRight()) + ")";
    });
  }
  return value;
};
