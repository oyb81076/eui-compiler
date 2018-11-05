import { join } from "path";
import { parseDeclValue } from "../src/_utils";
test("parseDeclValue", () => {
  const parseURI = (uri: string) => join("db://fs/" + uri);
  const v = parseDeclValue(
    parseURI,
    "background",
    "black url(\"./favicon.ico\") no-repeat center / 30px",
  );
  expect(v).toEqual("black url(db:/fs/favicon.ico) no-repeat center / 30px");
  const v2 = parseDeclValue(
    parseURI,
    "background",
    "black url('./favicon.ico' ) no-repeat center / 30px",
  );
  expect(v2).toEqual("black url(db:/fs/favicon.ico) no-repeat center / 30px");
  const v3 = parseDeclValue(
    parseURI,
    "background",
    "black url( ./favicon.ico ) no-repeat center / 30px",
  );
  expect(v3).toEqual("black url(db:/fs/favicon.ico) no-repeat center / 30px");
});
