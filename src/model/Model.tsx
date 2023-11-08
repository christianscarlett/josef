import { kmeans } from "ml-kmeans";

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

export const kClusterImageData = function (
  data: number[][],
  k: number
): number[][] {
  const result = kmeans(data, k, {});
  return result.centroids;
};

export const getPaletteFromRgb = function (rgb: number[][]): string[] {
  const palette: string[] = [];
  for (const pixel of rgb) {
    const r = pixel.at(0);
    const g = pixel.at(1);
    const b = pixel.at(2);
    if (r !== undefined && g !== undefined && b !== undefined) {
      palette.push(rgbToHex(Math.floor(r), Math.floor(g), Math.floor(b)));
    }
  }
  return palette;
};

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
const componentToHex = function (c: number): string {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};

/** Assumes integer inputs */
const rgbToHex = function (r: number, g: number, b: number): string {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};
