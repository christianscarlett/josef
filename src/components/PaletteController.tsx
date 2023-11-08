import { Button, ColorPicker } from "antd";
import { ReactNode, useRef, useState } from "react";
import {
  OnImageDataLoaded,
  OnImgSrcGenerated,
  formatData,
  getDataFromFiles,
} from "../model/Image";
import { getPaletteFromRgb, kClusterImageData } from "../model/Model";

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

  const [previewImageSrc, setPreviewImageSrc] = useState<string | null>(null);

  const fileInputRef = useRef(null);

  const onImageDataLoaded: OnImageDataLoaded = function (imageData: ImageData) {
    const data = formatData(imageData);
    const clusters = kClusterImageData(data, palette.length);
    const newPalette = getPaletteFromRgb(clusters);
    onImagePaletteCreated(newPalette);
  };

  const onImgSrcGenerated: OnImgSrcGenerated = function (src: string) {
    setPreviewImageSrc(src);
  };

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    getDataFromFiles(files, onImageDataLoaded, onImgSrcGenerated);
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
        {previewImageSrc && (
          <img
            className="w-1/3 max-w-xs max-h-xs mb-2"
            alt="img"
            src={previewImageSrc}
          />
        )}
        <Button
          className="bg-gray-100 w-fit"
          type="default"
          onClick={() => {
            const fileInput =
              fileInputRef.current as unknown as HTMLInputElement;
            fileInput.click();
          }}
        >
          Choose Image
        </Button>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex mb-2">{pickers}</div>
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
      </div>
    </div>
  );
}

export default PaletteController;
