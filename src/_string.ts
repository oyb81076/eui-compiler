export const escapeAttrValue = (val: string) => val.replace(/"/g, "&quot;");
export const isEmptyString = (text: string) => {
  return text.length === 0 || /^\s*$/.test(text);
};
