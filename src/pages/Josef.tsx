import { useState } from "react";
import Controls from "../components/Controls";
import Square from "../components/Square";
import "./Josef.css";
import { generateRandomPalette, updateRandomPalette } from "../model/Model";

function Josef() {
  const [palette, setPalette] = useState<string[]>(generateRandomPalette(4));
  const [verticalSpacing, setVerticalSpacing] = useState<number>(1 / 4);

  return (
    <div className="Josef h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-10">
        Josef Albers "Homage to the Square" Generator
      </h1>
      <div className="mb-10">
        <Square palette={palette} verticalSpacing={verticalSpacing} />
      </div>
      <Controls
        palette={palette}
        verticalSpacing={verticalSpacing}
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
      />
    </div>
  );
}

export default Josef;
