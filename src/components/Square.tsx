import { useEffect, useRef } from "react";

const updateCanvas = function (
  canvas: HTMLCanvasElement,
  palette: string[],
  verticalSpacing: number,
  horizontalSpacing: number
) {
  const ctx = canvas.getContext("2d");
  if (ctx == null) {
    return;
  }
  const height = canvas.height;
  const width = canvas.width;

  const d_init = 100;
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
};

interface SquareProps {
  palette: string[];
  verticalSpacing: number;
  horizontalSpacing: number;
}

function Square(props: SquareProps) {
  const { palette, verticalSpacing, horizontalSpacing } = props;

  const canvasRef = useRef(null);

  useEffect(() => {
    let canvas = canvasRef.current as unknown as HTMLCanvasElement;
    if (canvas != null) {
      updateCanvas(canvas, palette, verticalSpacing, horizontalSpacing);
    }
  });

  return (
    <canvas
      ref={canvasRef}
      className="border-solid border-2"
      width="500"
      height="500"
    ></canvas>
  );
}

export default Square;
