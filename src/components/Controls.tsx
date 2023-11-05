import { InputNumber } from "antd";
import ControlRow from "./ControlRow";
import PaletteController from "./PaletteController";

interface ControlsProps {
  palette: string[];
  onNumSquaresUpdated: OnNumSquaresUpdatedFunction;
}

interface OnNumSquaresUpdatedFunction {
  (numSquares: number): void;
}

function Controls(props: ControlsProps) {
  const { palette, onNumSquaresUpdated } = props;

  return (
    <div className="flex flex-col items-start">
      <ControlRow
        title="Squares"
        controller={
          <>
            <InputNumber
              value={palette.length}
              min={1}
              onChange={(n) => {
                if (n == null) {
                  n = palette.length;
                }
                onNumSquaresUpdated(n);
              }}
            />
          </>
        }
      />
      <ControlRow
        title="Palette"
        controller={<PaletteController palette={palette} />}
      />
    </div>
  );
}

export default Controls;
