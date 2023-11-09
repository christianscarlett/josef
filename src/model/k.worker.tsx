import { generatePaletteFromImageData } from "./Model";

export default onmessage = function (e: MessageEvent<any>) {
  const data = e.data as unknown as KWorkerInput;
  if (data !== null) {
    const result = generatePaletteFromImageData(data.imageData, data.numColors);
    const output: KWorkerOutput = {
      palette: result,
    };
    this.postMessage(output);
  }
};

export interface KWorkerInput {
  imageData: ImageData;
  numColors: number;
}

export interface KWorkerOutput {
  palette: string[];
}
