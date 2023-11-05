import { ColorPicker } from "antd";
import { ReactNode } from "react";

interface PaletteControllerProps {
  palette: string[];
  onPaletteIndexUpdated: OnPaletteIndexUpdated;
}

export interface OnPaletteIndexUpdated {
  (index: number, newColor: string): void;
}

function PaletteController(props: PaletteControllerProps) {
  const { palette, onPaletteIndexUpdated } = props;

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

  return <div className="flex">{pickers}</div>;
}

export default PaletteController;
