module.exports = {
  print(v) { return v },
  test(val) { return typeof val === "string" && /^\s*</.test(val) },
};
