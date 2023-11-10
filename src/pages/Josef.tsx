import { useEffect, useState } from "react";
import Controls from "../components/Controls";
import Square from "../components/Square";
import "./Josef.css";
import { generateRandomPalette, updateRandomPalette } from "../model/Model";
import { Texture } from "../model/Texture";
import { OnPaletteIndexUpdated } from "../components/PaletteController";

const isWindowSizeSmall = function () {
  return window.innerWidth < 768;
};

function Josef() {
  const [isMobile, setIsMobile] = useState<boolean>(isWindowSizeSmall());
  const [palette, setPalette] = useState<string[]>(generateRandomPalette(4));
  const [verticalSpacing, setVerticalSpacing] = useState<number>(1 / 4);
  const [horizontalSpacing, setHorizontalSpacing] = useState<number>(1 / 2);
  const [squareSize, setSquareSize] = useState<number>(0.2);
  const [texture, setTexture] = useState<Texture>(Texture.Flat);

  const determineIsMobile = function () {
    setIsMobile(isWindowSizeSmall());
  };
  useEffect(() => {
    window.onresize = determineIsMobile;
    return () => {
      window.removeEventListener("resize", determineIsMobile);
    };
  });

  const onPaletteIndexUpdated: OnPaletteIndexUpdated = function (
    index: number,
    newColor: string
  ) {
    const p = [...palette];
    p[index] = newColor;
    setPalette(p);
  };

  return (
    <div className="Josef min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl text-center mb-10 mt-10">
        Josef Albers "Homage to the Square" Generator
      </h1>
      <div className="flex flex-col items-center justify-center mb-5">
        <Square
          palette={palette}
          verticalSpacing={verticalSpacing}
          horizontalSpacing={horizontalSpacing}
          squareSize={squareSize}
          texture={texture}
          onPaletteIndexUpdated={onPaletteIndexUpdated}
        />
      </div>
      <Controls
        palette={palette}
        verticalSpacing={verticalSpacing}
        horizontalSpacing={horizontalSpacing}
        squareSize={squareSize}
        texture={texture}
        isMobile={isMobile}
        onNumSquaresUpdated={(n) => {
          setPalette(updateRandomPalette(palette, n));
        }}
        onPaletteIndexUpdated={onPaletteIndexUpdated}
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
        onImagePaletteCreated={(p) => {
          setPalette(p);
        }}
      />
    </div>
  );
}

export default Josef;
