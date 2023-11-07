import fabric from "../images/lightfabric.png";
import paper from "../images/cleanpaper.png";

export enum Texture {
  Flat = "Flat",
  Fabric = "Fabric",
  Paper = "Paper",
}

export interface TextureConfig {
  src: string;
}

export const getTextureConfig = function (t: Texture): TextureConfig {
  let src = "";
  switch (t) {
    case Texture.Fabric:
      src = fabric;
      break;
    case Texture.Paper:
      src = paper;
      break;
    default:
      break;
  }

  let config: TextureConfig = {
    src: src,
  };
  return config;
};
