import ControlRow from "./ControlRow";
import PaletteController, {
  OnPaletteIndexUpdated,
  OnNumSquaresUpdated,
  OnRandomizeClicked,
} from "./PaletteController";
import SpacingController, { OnSpacingUpdated } from "./SpacingController";
import SquareSizeController, {
  OnSquareSizeUpdated,
} from "./SquareSizeController";
import TextureController, {
  Texture,
  onTextureUpdated,
} from "./TextureController";

interface ControlsProps {
  palette: string[];
  verticalSpacing: number;
  horizontalSpacing: number;
  squareSize: number;
  texture: Texture;
  onNumSquaresUpdated: OnNumSquaresUpdated;
  onPaletteIndexUpdated: OnPaletteIndexUpdated;
  onVerticalSpacingUpdated: OnSpacingUpdated;
  onHorizontalSpacingUpdated: OnSpacingUpdated;
  onRandomizeClicked: OnRandomizeClicked;
  onSquareSizeUpdated: OnSquareSizeUpdated;
  onTextureUpdated: onTextureUpdated;
}

function Controls(props: ControlsProps) {
  const {
    palette,
    verticalSpacing,
    horizontalSpacing,
    squareSize,
    texture,
    onNumSquaresUpdated,
    onPaletteIndexUpdated,
    onVerticalSpacingUpdated,
    onHorizontalSpacingUpdated,
    onRandomizeClicked,
    onSquareSizeUpdated,
    onTextureUpdated,
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
            onRandomizeClicked={onRandomizeClicked}
          />
        }
      />
      <ControlRow
        title="Texture"
        controller={
          <TextureController
            texture={texture}
            onTextureUpdated={onTextureUpdated}
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
      <ControlRow
        title="Square Size"
        controller={
          <SquareSizeController
            squareSize={squareSize}
            onSquareSizeUpdated={onSquareSizeUpdated}
          />
        }
      />
    </div>
  );
}

export default Controls;
