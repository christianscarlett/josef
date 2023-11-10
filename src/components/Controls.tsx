import { Texture } from "../model/Texture";
import ControlRow from "./ControlRow";
import PaletteController, {
  OnPaletteIndexUpdated,
  OnNumSquaresUpdated,
  OnRandomizeClicked,
  OnImagePaletteCreated,
  paletteControllerDescription,
} from "./PaletteController";
import SpacingController, {
  OnSpacingUpdated,
  horizontalSpacingControllerDescription,
  verticalSpacingControllerDescription,
} from "./SpacingController";
import SquareSizeController, {
  OnSquareSizeUpdated,
  squareSizeControllerDescription,
} from "./SquareSizeController";
import TextureController, {
  onTextureUpdated,
  textureControllerDescription,
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
  onImagePaletteCreated: OnImagePaletteCreated;
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
    onImagePaletteCreated,
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
            onImagePaletteCreated={onImagePaletteCreated}
          />
        }
        tooltipTitle={paletteControllerDescription}
      />
      <ControlRow
        title="Texture"
        controller={
          <TextureController
            texture={texture}
            onTextureUpdated={onTextureUpdated}
          />
        }
        tooltipTitle={textureControllerDescription}
      />
      <ControlRow
        title="Square Size"
        controller={
          <SquareSizeController
            squareSize={squareSize}
            onSquareSizeUpdated={onSquareSizeUpdated}
          />
        }
        tooltipTitle={squareSizeControllerDescription}
      />
      <ControlRow
        title="Vertical Spacing"
        controller={
          <SpacingController
            spacing={verticalSpacing}
            onSpacingUpdated={onVerticalSpacingUpdated}
          />
        }
        tooltipTitle={verticalSpacingControllerDescription}
      />
      <ControlRow
        title="Horizontal Spacing"
        controller={
          <SpacingController
            spacing={horizontalSpacing}
            onSpacingUpdated={onHorizontalSpacingUpdated}
          />
        }
        tooltipTitle={horizontalSpacingControllerDescription}
      />
    </div>
  );
}

export default Controls;
