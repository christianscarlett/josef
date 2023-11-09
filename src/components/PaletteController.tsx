import { Button, ColorPicker } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { ReactNode, useRef, useState } from "react";
import { OnImageDataLoaded, getDataFromFiles } from "../model/Image";
import { generatePaletteFromImageData } from "../model/Model";
import { KWorkerInput, KWorkerOutput } from "../model/k.worker";

interface PaletteControllerProps {
  palette: string[];
  onPaletteIndexUpdated: OnPaletteIndexUpdated;
  onNumSquaresUpdated: OnNumSquaresUpdated;
  onRandomizeClicked: OnRandomizeClicked;
  onImagePaletteCreated: OnImagePaletteCreated;
}

export interface OnPaletteIndexUpdated {
  (index: number, newColor: string): void;
}

export interface OnNumSquaresUpdated {
  (numSquares: number): void;
}

export interface OnRandomizeClicked {
  (): void;
}

export interface OnImagePaletteCreated {
  (palette: string[]): void;
}

class PreviewImageData {
  imageData: ImageData;
  src: string;
  constructor(imageData: ImageData, src: string) {
    this.imageData = imageData;
    this.src = src;
  }
}

function PaletteController(props: PaletteControllerProps) {
  const {
    palette,
    onPaletteIndexUpdated,
    onNumSquaresUpdated,
    onRandomizeClicked,
    onImagePaletteCreated,
  } = props;

  const pickers: ReactNode[] = palette.map((color, i) => {
    return (
      <ColorPicker
        value={color}
        onChange={(value, hex) => {
          onPaletteIndexUpdated(i, hex);
        }}
        key={i}
      />
    );
  });

  const [previewImageData, setPreviewImageData] =
    useState<PreviewImageData | null>(null);

  const fileInputRef = useRef(null);

  // Worker for generating palettes (k clustering is expensive)
  const kWorker = new Worker(new URL("../model/k.worker.tsx", import.meta.url));
  kWorker.onmessage = (e: MessageEvent<any>) => {
    const data = e.data as unknown as KWorkerOutput;
    if (data !== null) {
      onImagePaletteCreated(data.palette);
    }
  };

  const requestPalettize = function (imageData: ImageData, numColors: number) {
    const kWorkerInput: KWorkerInput = {
      imageData: imageData,
      numColors: numColors,
    };
    kWorker.postMessage(kWorkerInput);
  };

  const onImageDataLoaded: OnImageDataLoaded = function (
    imageData: ImageData,
    src: string
  ) {
    setPreviewImageData(new PreviewImageData(imageData, src));
    requestPalettize(imageData, palette.length);
  };

  const onRepalettizeClicked = async function () {
    if (previewImageData?.imageData != null) {
      requestPalettize(previewImageData.imageData, palette.length);
    }
  };

  const onRemoveImageClicked = function () {
    setPreviewImageData(null);
  };

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    getDataFromFiles(files, onImageDataLoaded);
  };

  return (
    <div className="flex items-center justify-around w-full">
      <div className="flex flex-col justify-center items-center">
        <input
          ref={fileInputRef}
          className="h-0 w-0 overflow-hidden"
          type="file"
          accept="image/*"
          onChange={onFileSelected}
        />
        {previewImageData?.src && (
          <img
            className="w-1/3 max-w-xs max-h-xs mb-2"
            alt="img"
            src={previewImageData.src}
          />
        )}
        <div className="flex items-center justify-center">
          <Button
            className="bg-gray-100 w-fit mr-2"
            type="default"
            onClick={() => {
              const fileInput =
                fileInputRef.current as unknown as HTMLInputElement;
              fileInput.click();
            }}
          >
            Choose Photo
          </Button>
          {previewImageData && (
            <Button
              className="inline-flex items-center border-rose-600 justify-center w-fit mr-2"
              type="default"
              icon={<CloseOutlined style={{ color: "rgb(225, 29, 72)" }} />}
              onClick={onRemoveImageClicked}
            />
          )}
        </div>
      </div>
      <div className="border-solid border-l border-black self-stretch ml-3 mr-3"></div>
      <div className="flex flex-col items-center w-full">
        <div className="flex mb-2">{pickers}</div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex">
            <Button
              className="bg-gray-100 mr-2"
              type="default"
              onClick={() => onRandomizeClicked()}
            >
              Randomize
            </Button>
            <Button
              className="bg-gray-100"
              type="default"
              disabled={palette.length <= 1}
              onClick={() => {
                let n = Math.max(1, palette.length - 1);
                onNumSquaresUpdated(n);
              }}
            >
              -
            </Button>
            <Button
              className="bg-gray-100"
              type="default"
              onClick={() => onNumSquaresUpdated(palette.length + 1)}
            >
              +
            </Button>
          </div>
          {previewImageData && (
            <Button
              className="bg-gray-100 w-fit mt-2"
              type="default"
              onClick={onRepalettizeClicked}
              disabled={previewImageData === null}
            >
              Re-palettize Photo
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaletteController;
