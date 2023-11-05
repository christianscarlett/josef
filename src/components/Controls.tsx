import { InputNumber } from "antd";
import ControlRow from "./ControlRow";
import PaletteController, { OnPaletteIndexUpdated } from "./PaletteController";
import SpacingController, { OnSpacingUpdated } from "./SpacingController";

interface ControlsProps {
  palette: string[];
  verticalSpacing: number;
  horizontalSpacing: number;
  onNumSquaresUpdated: OnNumSquaresUpdatedFunction;
  onPaletteIndexUpdated: OnPaletteIndexUpdated;
  onVerticalSpacingUpdated: OnSpacingUpdated;
  onHorizontalSpacingUpdated: OnSpacingUpdated;
}

interface OnNumSquaresUpdatedFunction {
  (numSquares: number): void;
}

function Controls(props: ControlsProps) {
  const {
    palette,
    verticalSpacing,
    horizontalSpacing,
    onNumSquaresUpdated,
    onPaletteIndexUpdated,
    onVerticalSpacingUpdated,
    onHorizontalSpacingUpdated,
  } = props;

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
        controller={
          <PaletteController
            palette={palette}
            onPaletteIndexUpdated={onPaletteIndexUpdated}
          />
        }
      />
      <ControlRow
        title="Vertical Spacing"
        controller={
          <SpacingController
            spacing={verticalSpacing}
            onSpacingUpdated={onVerticalSpacingUpdated}
          />
        }
      />
      <ControlRow
        title="Horizontal Spacing"
        controller={
          <SpacingController
            spacing={horizontalSpacing}
            onSpacingUpdated={onHorizontalSpacingUpdated}
          />
        }
      />
    </div>
  );
}

export default Controls;
