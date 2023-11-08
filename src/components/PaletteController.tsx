import { Button, ColorPicker } from "antd";
import { ReactNode, useRef } from "react";
import { OnImageDataLoaded, getDataFromFiles } from "../model/Image";

interface PaletteControllerProps {
  palette: string[];
  onPaletteIndexUpdated: OnPaletteIndexUpdated;
  onNumSquaresUpdated: OnNumSquaresUpdated;
  onRandomizeClicked: OnRandomizeClicked;
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

function PaletteController(props: PaletteControllerProps) {
  const {
    palette,
    onPaletteIndexUpdated,
    onNumSquaresUpdated,
    onRandomizeClicked,
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

  const fileInputRef = useRef(null);

  const onImageDataLoaded: OnImageDataLoaded = function (imageData: ImageData) {
    const data = imageData.data;
    console.log(data.length);
    console.log(data.length / 512 / 512);
  };

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    getDataFromFiles(files, onImageDataLoaded);
  };

  return (
    <div className="flex items-center justify-around w-full">
      <div>
        <input
          ref={fileInputRef}
          className="h-0 w-0 overflow-hidden"
          type="file"
          accept="image/*"
          onChange={onFileSelected}
        />
        <Button
          className="bg-gray-100 mr-2"
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
