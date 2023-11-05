export const generateRandomColor = function (): string {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
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
