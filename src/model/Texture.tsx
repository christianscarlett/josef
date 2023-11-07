import fabric from "../images/lightfabric.png";
import paper from "../images/cleanpaper.png";
import linen from "../images/lightlinen.png";
import felt from "../images/felt.png";
import stucco from "../images/stucco.png";
import snow from "../images/snow.png";
import wood from "../images/wood.png";
import noise from "../images/noisy.png";

export enum Texture {
  Flat = "Flat",
  Fabric = "Fabric",
  Paper = "Paper",
  Linen = "Linen",
  Felt = "Felt",
  Stucco = "Stucco",
  Soft = "Soft",
  Wood = "Wood",
  Noise = "Noise",
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
    case Texture.Linen:
      src = linen;
      break;
    case Texture.Felt:
      src = felt;
      break;
    case Texture.Stucco:
      src = stucco;
      break;
    case Texture.Soft:
      src = snow;
      break;
    case Texture.Wood:
      src = wood;
      break;
    case Texture.Noise:
      src = noise;
      break;
    default:
      break;
  }

  let config: TextureConfig = {
    src: src,
  };
  return config;
};
