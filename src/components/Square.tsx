import { useEffect, useRef, useState } from "react";
import { CANVAS_SIZE } from "../model/Model";
import { Texture, getTextureConfig } from "../model/Texture";
import { Button, ColorPicker } from "antd";
import { OnPaletteIndexUpdated } from "./PaletteController";

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

const getPaletteIndexAtLocation = function (
  canvas: HTMLCanvasElement,
  clickClientCoords: Coordinates,
  palette: string[],
  verticalSpacing: number,
  horizontalSpacing: number,
  squareSize: number
): number {
  // https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
  const canvasRect = canvas.getBoundingClientRect();
  const x = clickClientCoords.x - canvasRect.left;
  const y = clickClientCoords.y - canvasRect.top;

  const scale = canvasRect.width / CANVAS_SIZE;

  const d = Math.round(CANVAS_SIZE * scale * squareSize);
  const r_h = verticalSpacing;
  const r_w = horizontalSpacing;

  // i can only possibly be as large as j (and vice versa) so the minimum must be the index.
  const i = Math.floor(x / (d * r_w));
  const j = Math.floor(y / (d * (1 - r_h)));

  // We must also check against the bottom right because the squares wrap
  const k = Math.floor(Math.max(CANVAS_SIZE - x, 0) / (d * (1 - r_w)));
  const l = Math.floor(Math.max(CANVAS_SIZE - y, 0) / (d * r_h));
  return Math.min(i, j, k, l, palette.length - 1);
};

interface SquareProps {
  palette: string[];
  verticalSpacing: number;
  horizontalSpacing: number;
  squareSize: number;
  texture: Texture;
  onPaletteIndexUpdated: OnPaletteIndexUpdated;
}

interface Coordinates {
  x: number;
  y: number;
}

function Square(props: SquareProps) {
  const {
    palette,
    verticalSpacing,
    horizontalSpacing,
    squareSize,
    texture,
    onPaletteIndexUpdated,
  } = props;

  const canvasRef = useRef(null);

  const [dynamicColorPickerCoords, setDynamicColorPickerCoords] =
    useState<Coordinates | null>(null);
  const [currentDynamicIndex, setCurrentDynamicIndex] = useState(0);

  const onCanvasClick = function (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    if (canvas == null) {
      return;
    }
    const { pageX, pageY, clientX, clientY } = e;
    const index = getPaletteIndexAtLocation(
      canvas,
      { x: clientX, y: clientY },
      palette,
      verticalSpacing,
      horizontalSpacing,
      squareSize
    );
    setCurrentDynamicIndex(index);
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
  }, [palette, verticalSpacing, horizontalSpacing, squareSize, texture]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="border-solid border-2 drop-shadow-xl w-full"
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        onClick={onCanvasClick}
      ></canvas>
      <div
        className={dynamicColorPickerCoords === null ? "hidden" : "absolute"}
        style={{
          left: dynamicColorPickerCoords?.x ?? 0,
          top: dynamicColorPickerCoords?.y ?? 0,
          transform: "translate(-50%, -50%)",
        }}
        onMouseLeave={onMouseLeaveColorPicker}
      >
        <ColorPicker
          className="m-5"
          open={dynamicColorPickerCoords !== null}
          value={palette[currentDynamicIndex]}
          onChange={(value, hex) => {
            onPaletteIndexUpdated(currentDynamicIndex, hex);
          }}
        />
      </div>
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
