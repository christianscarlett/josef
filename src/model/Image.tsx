export interface OnImageDataLoaded {
  (imageData: ImageData, src: string): void;
}

export const getDataFromFiles = async function (
  files: FileList | null,
  callback: OnImageDataLoaded
) {
  if (files != null) {
    const filesArray = Array.from(files);
    const file = filesArray.at(0);
    if (file !== undefined) {
      getDataFromFile(file, callback);
    }
  }
};

const getDataFromFile = async function (
  file: File,
  callback: OnImageDataLoaded
) {
  const fileReader = new FileReader();
  fileReader.onload = function () {
    const result = fileReader.result;
    if (typeof result === "string") {
      getDataFromFileResult(result, callback);
    }
  };
  fileReader.readAsDataURL(file);
};

const IMG_CANVAS_SIZE = 512;

const getDataFromFileResult = async function (
  result: string,
  callback: OnImageDataLoaded
) {
  const img = new Image();
  img.onload = function () {
    const canvas = document.createElement("canvas");
    // Limit the size of the canvas so we don't have to process too much data later on
    canvas.width = IMG_CANVAS_SIZE;
    canvas.height = IMG_CANVAS_SIZE;
    const ctx = canvas.getContext("2d");
    if (ctx !== null) {
      ctx.drawImage(img, 0, 0);
      callback(ctx.getImageData(0, 0, canvas.width, canvas.height), result);
    }
  };
  img.src = result;
};

export const formatData = function (imageData: ImageData): number[][] {
  const rgbaData = imageData.data;
  const rgbData: number[][] = [];
  for (let i = 0; i < rgbaData.length; i += 4) {
    const rgb = [rgbaData[i], rgbaData[i + 1], rgbaData[i + 2]];
    rgbData.push(rgb);
  }
  return rgbData;
};
