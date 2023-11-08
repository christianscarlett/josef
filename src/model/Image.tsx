export interface OnImageDataLoaded {
  (imageData: ImageData): void;
}

export const getDataFromFiles = async function (
  files: FileList | null,
  callback: OnImageDataLoaded
) {
  console.log("fromfiles");
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
  console.log("fromfile");
  const fileReader = new FileReader();
  fileReader.onload = function () {
    const result = fileReader.result;
    if (typeof result === "string") {
      getDataFromFileResult(result, callback);
    }
  };
  fileReader.readAsDataURL(file);
};

const getDataFromFileResult = async function (
  result: string,
  callback: OnImageDataLoaded
) {
  console.log("fromresult");
  const img = new Image();
  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (ctx !== null) {
      ctx.drawImage(img, 0, 0);
      callback(ctx.getImageData(0, 0, img.width, img.height));
    }
  };
  img.src = result;
};

export const formatData = function (imageData: ImageData) {
  // const rgbaData = imageData.data;
  // const rgbData = number[];
  // for
  clusterfck.km;
};
