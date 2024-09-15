import { Button, Checkbox, ColorPicker, InputNumber } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { CANVAS_SIZE } from '../model/Model';
import { Texture, getTextureConfig } from '../model/Texture';
import { OnPaletteIndexUpdated } from './PaletteController';

const compareFn = function (a: any, b: any) {
  return +a - +b;
};

const updateCanvas = function (
  canvas: HTMLCanvasElement,
  palette: string[],
  verticalSpacing: number,
  horizontalSpacing: number,
  squareSize: number,
  texture: Texture,
  showMeasurements: boolean,
  measureScale: number
): [number[], number[]] {
  const ctx = canvas.getContext('2d');
  if (ctx == null) {
    return [[], []];
  }
  const height = canvas.height;
  const width = canvas.width;

  const d_init = Math.round(CANVAS_SIZE * squareSize);
  // Ratio of bottom spacing to top spacing
  const r_h = verticalSpacing;
  // Ratio of left spacing to right spacing
  const r_w = horizontalSpacing;

  const width_markers: number[] = [];
  const height_markers: number[] = [];

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

    width_markers.push(...[x, x + w]);
    height_markers.push(...[y, y + h]);

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

  /* Draw markers */
  if (showMeasurements) {
    width_markers.sort(compareFn);
    height_markers.sort(compareFn);

    const fontSize = 20;
    ctx.font = `${fontSize}px sans-serif`;

    for (let i = 0; i < width_markers.length; i++) {
      const width_mark = width_markers[i];
      const height_mark = height_markers[i];

      const isSecondHalf = i >= width_markers.length / 2;

      const x = width_mark;
      const y = height_mark + (!isSecondHalf ? fontSize : 0);

      if (isSecondHalf) {
        ctx.direction = 'rtl';
      } else {
        ctx.direction = 'ltr';
      }

      const text = `${((measureScale * width_mark) / CANVAS_SIZE).toFixed(
        3
      )}, ${((measureScale * height_mark) / CANVAS_SIZE).toFixed(3)}`;

      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(text, x, y);
      ctx.fillStyle = '#000000';
      ctx.strokeText(text, x, y);
    }
  }

  return [width_markers, height_markers];
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

  const scale = canvasRect.width / CANVAS_SIZE;

  const x = (clickClientCoords.x - canvasRect.left) / scale;
  const y = (clickClientCoords.y - canvasRect.top) / scale;

  const d = Math.round(CANVAS_SIZE * squareSize);
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

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [dynamicColorPickerCoords, setDynamicColorPickerCoords] =
    useState<Coordinates | null>(null);
  const [currentDynamicIndex, setCurrentDynamicIndex] = useState(0);

  const [showMeasurements, setShowMeasurements] = useState(false);
  const [measureScale, setMeasureScale] = useState(1);

  const onCanvasClick = function (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
    if (dynamicColorPickerCoords !== null) {
      setDynamicColorPickerCoords(null);
      return;
    }
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
        texture,
        showMeasurements,
        measureScale
      );
    }
  }, [
    palette,
    verticalSpacing,
    horizontalSpacing,
    squareSize,
    texture,
    showMeasurements,
    measureScale,
  ]);

  return (
    <div className="px-2 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="border-solid border-2 drop-shadow-xl w-full"
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        onClick={onCanvasClick}
      ></canvas>
      <div
        className={dynamicColorPickerCoords === null ? 'hidden' : 'absolute'}
        style={{
          left: dynamicColorPickerCoords?.x ?? 0,
          top: dynamicColorPickerCoords?.y ?? 0,
          transform: 'translate(-50%, -50%)',
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
          const link = document.createElement('a');
          const seconds = Math.floor(new Date().getTime() / 1000);
          link.download = `josef_square_generated_${seconds}.png`;
          const canvas = canvasRef.current as unknown as HTMLCanvasElement;
          if (canvas != null) {
            link.href = canvas.toDataURL();
            link.click();
          }
        }}
      >
        Download
      </Button>

      <div className="w-full mt-5 flex items-center justify-center">
        <Checkbox
          value={showMeasurements}
          onChange={(e) => setShowMeasurements(e.target.checked)}
        >
          Show measurements
        </Checkbox>
      </div>
      {showMeasurements && (
        <div className="w-full mt-2 flex items-center justify-center">
          <InputNumber
            min={0}
            defaultValue={measureScale}
            onChange={(e) => setMeasureScale(e ?? measureScale)}
          />
        </div>
      )}
    </div>
  );
}

export default Square;
