import { useEffect, useRef } from "react";

const updateCanvas = function (canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (ctx == null) {
    return;
  }
  const height = canvas.height;
  const width = canvas.width;

  const colors = ["blue", "red", "green", "yellow"];
  const d_init = 100;
  // Ratio of bottom spacing to top spacing
  const r_h = 1 / 4;
  // Ratio of right spacing to left spacing
  const r_w = 1 / 2;

  colors.forEach((color, i) => {
    const d = d_init * i;
    const x = d * (1 - r_w);
    const w = width - d;
    const y = d * (1 - r_h);
    const h = height - d;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  });
};

function Square() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let canvas = canvasRef.current as unknown as HTMLCanvasElement;
    if (canvas != null) {
      updateCanvas(canvas);
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
