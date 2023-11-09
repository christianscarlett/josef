import { useEffect, useRef, useState } from "react";
import { CANVAS_SIZE } from "../model/Model";
import { Texture, getTextureConfig } from "../model/Texture";
import { Button, ColorPicker } from "antd";

const updateCanvas = function (
  canvas: HTMLCanvasElement,
  palette: string[],
  verticalSpacing: number,
  horizontalSpacing: number,
  squareSize: number,
  texture: Texture
) {
  const ctx = canvas.getContext("2d");
  if (ctx == null) {
    return;
  }
  const height = canvas.height;
  const width = canvas.width;

  const d_init = Math.round(CANVAS_SIZE * squareSize);
  // Ratio of bottom spacing to top spacing
  const r_h = verticalSpacing;
  // Ratio of left spacing to right spacing
  const r_w = horizontalSpacing;

  palette.forEach((color, i) => {
    const d = d_init * i;
    const x = d * r_w;
    const w = width - d;
    const y = d * (1 - r_h);
    const h = height - d;

    // Don't draw squares that are too small
    if (w < 0 || h < 0) {
      return;
    }

    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  });

  if (texture !== Texture.Flat) {
    const textureConfig = getTextureConfig(texture);
    let textureImage = new Image();
    textureImage.src = textureConfig.src;
    if (textureImage.complete) {
      drawTexture(canvas, ctx, textureImage);
    } else {
      textureImage.onload = function () {
        drawTexture(canvas, ctx, textureImage);
      };
    }
  }
};

const drawTexture = function (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  texture: HTMLImageElement
) {
  ctx.drawImage(texture, 0, 0, canvas.width, canvas.height);
};

interface SquareProps {
  palette: string[];
  verticalSpacing: number;
  horizontalSpacing: number;
  squareSize: number;
  texture: Texture;
}

interface Coordinates {
  x: number;
  y: number;
}

function Square(props: SquareProps) {
  const { palette, verticalSpacing, horizontalSpacing, squareSize, texture } =
    props;

  const canvasRef = useRef(null);

  const [dynamicColorPickerCoords, setDynamicColorPickerCoords] =
    useState<Coordinates | null>(null);

  const onCanvasClick = function (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
    const { pageX, pageY } = e;
    setDynamicColorPickerCoords({ x: pageX, y: pageY });
  };

  const onMouseLeaveColorPicker = function () {
    setDynamicColorPickerCoords(null);
  };

  useEffect(() => {
    let canvas = canvasRef.current as unknown as HTMLCanvasElement;
    if (canvas != null) {
      updateCanvas(
        canvas,
        palette,
        verticalSpacing,
        horizontalSpacing,
        squareSize,
        texture
      );
    }
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        className="border-solid border-2 drop-shadow-xl"
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        onClick={onCanvasClick}
      ></canvas>
      {dynamicColorPickerCoords && (
        <div
          className="absolute"
          style={{
            left: dynamicColorPickerCoords.x,
            top: dynamicColorPickerCoords.y,
            transform: "translate(-50%, -50%)",
          }}
          onMouseLeave={onMouseLeaveColorPicker}
        >
          <ColorPicker className="m-6" />
        </div>
      )}

      <Button
        className="bg-gray-400 mt-5 w-full drop-shadow-xl"
        type="primary"
        onClick={() => {
          const link = document.createElement("a");
          link.download = "josef_square_generated.png";
          const canvas = canvasRef.current as unknown as HTMLCanvasElement;
          if (canvas != null) {
            link.href = canvas.toDataURL();
            link.click();
          }
        }}
      >
        Download
      </Button>
    </>
  );
}

export default Square;
