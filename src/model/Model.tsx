import { Texture } from "../components/TextureController";
import fabric from "../images/lightfabric.png";
import paper from "../images/paper.png";

export const generateRandomColor = function (): string {
  // https://stackoverflow.com/questions/5092808/how-do-i-randomly-generate-html-hex-color-codes-using-javascript
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
};

export const generateRandomPalette = function (numColors: number): string[] {
  const palette: string[] = [];
  for (let i = 0; i < numColors; i++) {
    palette.push(generateRandomColor());
  }
  return palette;
};

export const updateRandomPalette = function (
  oldPalette: string[],
  newNumColors: number
): string[] {
  const newPalette: string[] = [];

  for (let i = 0; i < newNumColors; i++) {
    if (i < oldPalette.length) {
      newPalette.push(oldPalette[i]);
    } else {
      newPalette.push(generateRandomColor());
    }
  }

  return newPalette;
};

export const CANVAS_SIZE = 512;

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
