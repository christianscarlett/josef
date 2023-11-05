import { Button, ColorPicker } from "antd";
import { ReactNode } from "react";

interface PaletteControllerProps {
  palette: string[];
  onPaletteIndexUpdated: OnPaletteIndexUpdated;
  onNumSquaresUpdated: OnNumSquaresUpdated;
}

export interface OnPaletteIndexUpdated {
  (index: number, newColor: string): void;
}

export interface OnNumSquaresUpdated {
  (numSquares: number): void;
}

function PaletteController(props: PaletteControllerProps) {
  const { palette, onPaletteIndexUpdated, onNumSquaresUpdated } = props;

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
    <div className="flex flex-col">
      <div className="flex">
        {pickers}
        <Button
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
