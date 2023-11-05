import { InputNumber } from "antd";
import ControlRow from "./ControlRow";
import PaletteController, {
  OnPaletteIndexUpdated,
  OnNumSquaresUpdated,
} from "./PaletteController";
import SpacingController, { OnSpacingUpdated } from "./SpacingController";

interface ControlsProps {
  palette: string[];
  verticalSpacing: number;
  horizontalSpacing: number;
  onNumSquaresUpdated: OnNumSquaresUpdated;
  onPaletteIndexUpdated: OnPaletteIndexUpdated;
  onVerticalSpacingUpdated: OnSpacingUpdated;
  onHorizontalSpacingUpdated: OnSpacingUpdated;
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
        title="Palette"
        controller={
          <PaletteController
            palette={palette}
            onPaletteIndexUpdated={onPaletteIndexUpdated}
            onNumSquaresUpdated={onNumSquaresUpdated}
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
