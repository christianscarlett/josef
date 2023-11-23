import { useEffect, useState } from "react";
import Controls from "../components/Controls";
import Square from "../components/Square";
import "./Josef.css";
import { generateRandomPalette, updateRandomPalette } from "../model/Model";
import { Texture } from "../model/Texture";
import { OnPaletteIndexUpdated } from "../components/PaletteController";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

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
      <div className="flex flex-col items-center justify-center bg-white/30 p-3 rounded backdrop-blur-sm drop-shadow-2xl mb-8 mt-8 mx-2">
        <h1 className="text-2xl text-center my-2 mx-2">
          Josef Albers "Homage to the Square" Generator
        </h1>

        <Tooltip
          className="flex mb-2 opacity-70 hover:opacity-100 hover:cursor-pointer text-sm"
          title={josefDescription}
        >
          <p>What is this?</p>
          <InfoCircleOutlined className="ml-2 hover:text-black" />
        </Tooltip>
      </div>
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

const josefDescription =
  "I made this in appreciation of the “Homage to the Square” series by Josef Albers. This is a tool to generate your own Square paintings by choosing the colors, spacing, and texture of the squares. See the controls below to start creating!";

export default Josef;
