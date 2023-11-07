import { Segmented, Slider } from "antd";
import { useState } from "react";

export interface OnSquareSizeUpdated {
  (n: number): void;
}

interface SquareSizeControllerProps {
  squareSize: number;
  onSquareSizeUpdated: OnSquareSizeUpdated;
}

enum SquareSizeOption {
  Fifteen = "15%",
  Twenty = "20%",
  TwentyFive = "25%",
  OneOverPi = "1 / π",
  OneOverE = "1 / e",
  OneOverGoldenRatio = "1 / Golden Ratio",
  Custom = "Custom",
}

const squareSizeOptionToValue = function (
  o: SquareSizeOption,
  default_: number
): number {
  switch (o) {
    case SquareSizeOption.Fifteen:
      return 0.15;
    case SquareSizeOption.Twenty:
      return 0.2;
    case SquareSizeOption.TwentyFive:
      return 0.25;
    case SquareSizeOption.OneOverPi:
      return 1 / Math.PI;
    case SquareSizeOption.OneOverE:
      return 1 / Math.E;
    case SquareSizeOption.OneOverGoldenRatio:
      return 1 / 1.618;
    default:
      return default_;
  }
};

const squareSizeToSquareSizeOption = function (
  squareSize: number
): SquareSizeOption {
  for (const option of Object.values(SquareSizeOption)) {
    if (
      Math.abs(squareSize - squareSizeOptionToValue(option, squareSize)) < 0.001
    ) {
      return option;
    }
  }
  return SquareSizeOption.Custom;
};

function SquareSizeController(props: SquareSizeControllerProps) {
  const { squareSize, onSquareSizeUpdated } = props;
  const [squareSizeOption, setSquareSizeOption] = useState(
    squareSizeToSquareSizeOption(squareSize)
  );
  return (
    <div className="flex flex-col items-center w-full">
      <Segmented
        value={squareSizeOption}
        options={Object.values(SquareSizeOption)}
        onChange={(o) => {
          const option = o as unknown as SquareSizeOption;
          const value = squareSizeOptionToValue(option, squareSize);
          setSquareSizeOption(option);
          onSquareSizeUpdated(value);
        }}
      />
      <div className="w-full">
        <Slider
          value={squareSize}
          onChange={(n) => {
            setSquareSizeOption(squareSizeToSquareSizeOption(n));
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
    </div>
  );
}

export default SquareSizeController;
