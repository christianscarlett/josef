import { Slider } from "antd";

export interface OnSpacingUpdated {
  (spacing: number): void;
}

interface SpacingControllerProps {
  spacing: number;
  onSpacingUpdated: OnSpacingUpdated;
}

const MIN_SPACING = 0;
const MAX_SPACING = 1;

const roundFriendlyNumber = function (n: number): number {
  return Math.round(n * 100) / 100;
};

const getFriendlyRatio = function (spacing: number): string {
  console.log(spacing);
  if (spacing <= 1 / 2) {
    return "1 : " + roundFriendlyNumber(1 / spacing - 1);
  }
  return roundFriendlyNumber(1 / (1 - spacing) - 1) + " : 1";
};

function SpacingController(props: SpacingControllerProps) {
  const { spacing, onSpacingUpdated } = props;
  const friendlyRatio = getFriendlyRatio(spacing);
  return (
    <div className="w-full">
      <p>{friendlyRatio}</p>
      <Slider
        value={spacing}
        onChange={(n) => {
          if (n == null || n < MIN_SPACING || n > MAX_SPACING) {
            n = 1;
          }
          onSpacingUpdated(n);
        }}
        min={MIN_SPACING}
        max={MAX_SPACING}
        step={0.01}
      />{" "}
    </div>
  );
}

export default SpacingController;
