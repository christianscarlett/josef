import { useEffect, useRef } from "react";

const updateCanvas = function (canvas: HTMLCanvasElement, palette: string[]) {
  const ctx = canvas.getContext("2d");
  if (ctx == null) {
    return;
  }
  const height = canvas.height;
  const width = canvas.width;

  const d_init = 100;
  // Ratio of bottom spacing to top spacing
  const r_h = 1 / 4;
  // Ratio of right spacing to left spacing
  const r_w = 1 / 2;

  palette.forEach((color, i) => {
    const d = d_init * i;
    const x = d * (1 - r_w);
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
}

function Square(props: SquareProps) {
  const { palette } = props;

  const canvasRef = useRef(null);

  useEffect(() => {
    let canvas = canvasRef.current as unknown as HTMLCanvasElement;
    if (canvas != null) {
      updateCanvas(canvas, palette);
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
