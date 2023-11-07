import { Button, ColorPicker } from "antd";
import { ReactNode } from "react";

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

  return (
    <div className="flex flex-col items-center w-full">
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
  );
}

export default PaletteController;
