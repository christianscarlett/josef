import { useState } from "react";
import Controls from "../components/Controls";
import Square from "../components/Square";
import "./Josef.css";
import { generateRandomPalette, updateRandomPalette } from "../model/Model";
import { Texture } from "../components/TextureController";

function Josef() {
  const [palette, setPalette] = useState<string[]>(generateRandomPalette(4));
  const [verticalSpacing, setVerticalSpacing] = useState<number>(1 / 4);
  const [horizontalSpacing, setHorizontalSpacing] = useState<number>(1 / 2);
  const [squareSize, setSquareSize] = useState<number>(0.2);
  const [texture, setTexture] = useState<Texture>(Texture.Flat);

  console.log(texture);

  return (
    <div className="Josef min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-10 mt-10">
        Josef Albers "Homage to the Square" Generator
      </h1>
      <div className="mb-10">
        <Square
          palette={palette}
          verticalSpacing={verticalSpacing}
          horizontalSpacing={horizontalSpacing}
          squareSize={squareSize}
        />
      </div>
      <Controls
        palette={palette}
        verticalSpacing={verticalSpacing}
        horizontalSpacing={horizontalSpacing}
        squareSize={squareSize}
        texture={texture}
        onNumSquaresUpdated={(n) => {
          setPalette(updateRandomPalette(palette, n));
        }}
        onPaletteIndexUpdated={(index, newColor) => {
          const p = [...palette];
          p[index] = newColor;
          setPalette(p);
        }}
        onVerticalSpacingUpdated={(n) => {
          setVerticalSpacing(n);
        }}
        onHorizontalSpacingUpdated={(n) => {
          setHorizontalSpacing(n);
        }}
        onRandomizeClicked={() => {
          setPalette(generateRandomPalette(palette.length));
        }}
        onSquareSizeUpdated={(n) => {
          setSquareSize(n);
        }}
        onTextureUpdated={(t) => {
          setTexture(t);
        }}
      />
    </div>
  );
}

export default Josef;
