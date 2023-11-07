import { useEffect, useRef } from "react";
import { CANVAS_SIZE } from "../model/Model";
import fabric from "../images/lightfabric.png";
import paper from "../images/paper.png";

const updateCanvas = function (
  canvas: HTMLCanvasElement,
  palette: string[],
  verticalSpacing: number,
  horizontalSpacing: number,
  squareSize: number
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

  // let texture = new Image();
  // texture.src = lightFabric;

  // if (texture.complete) {
  //   drawTexture(canvas, ctx, texture);
  // } else {
  //   texture.onload = function () {
  //     drawTexture(canvas, ctx, texture);
  //   };
  // }
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
}

function Square(props: SquareProps) {
  const { palette, verticalSpacing, horizontalSpacing, squareSize } = props;

  const canvasRef = useRef(null);

  useEffect(() => {
    let canvas = canvasRef.current as unknown as HTMLCanvasElement;
    if (canvas != null) {
      updateCanvas(
        canvas,
        palette,
        verticalSpacing,
        horizontalSpacing,
        squareSize
      );
    }
  });

  return (
    <canvas
      ref={canvasRef}
      className="border-solid border-2 drop-shadow-xl"
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
    ></canvas>
  );
}

export default Square;
