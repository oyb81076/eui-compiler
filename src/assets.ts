import join from "path-url/join";
import { IAsset } from "./faces";
const SLASH = "/".charCodeAt(0);

const getAsset = (assets: Record<string, IAsset>, dirname: string, uri: string) => {
  if (/^(http|https|file):\/\//.test(uri)) {// http开头
    return uri;
  } else if (uri.charCodeAt(0) === SLASH) {// 斜杠开头
    if (uri.charCodeAt(1) === SLASH) {// //开头
      return uri;
    } else { // /开头
      return assets["db://fs" + uri] || uri;
    }
  } else if (/^db:\/\/(id|fs)\//) { // db:// 开头
    return assets[uri] || uri;
  } else {
    const filename = join(dirname, uri);
    return assets["db://fs/" + filename];
  }
};

/**
 * 将uri转换成 db://id/xxxx的形式
 * @param assets
 * @param dirname
 * @param uri
 */
export const uri2ID = (assets: Record<string, IAsset>, dirname: string, uri: string) => {
  const asset = getAsset(assets, dirname, uri);
  if (typeof asset === "string") {
    return asset;
  } else {
    return "db://id/" + asset._id;
  }
};

/**
 * 将uri转换成绝对路径的形式
 * @example http://www.baidu.com => http://www.baidu.com
 * @example db://id/someid => /path/to/file
 * @example ./xxxx => /path/to/file
 * @example /xxxx => /xxx
 * @param assets
 * @param dirname
 * @param uri
 */
export const uri2Absolute = (assets: Record<string, IAsset>, dirname: string, uri: string) => {
  const asset = getAsset(assets, dirname, uri);
  if (typeof asset === "string") {
    return asset;
  } else {
    return "/" + asset.filename;
  }
};

export const parseAssets = <T extends IAsset>(assetsArray: T[]): Record<string, T> => {
  const assets: Record<string, T> = {};
  assetsArray.forEach((src) => {
    assets["db://id/" + src._id] = src;
    assets["db://fs/" + src.filename] = src;
  });
  return assets;
};
