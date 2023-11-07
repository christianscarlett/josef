import { Slider } from "antd";

export interface OnSquareSizeUpdated {
  (n: number): void;
}

interface SquareSizeControllerProps {
  squareSize: number;
  onSquareSizeUpdated: OnSquareSizeUpdated;
}

function SquareSizeController(props: SquareSizeControllerProps) {
  const { squareSize, onSquareSizeUpdated } = props;
  return (
    <div className="w-full">
      <Slider
        value={squareSize}
        onChange={(n) => {
          onSquareSizeUpdated(n);
        }}
        min={0}
        max={1}
        step={0.001}
        tooltip={{
          placement: "bottom",
        }}
      />
    </div>
  );
}

export default SquareSizeController;
