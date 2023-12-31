import { Segmented, Slider } from "antd";
import { useState } from "react";

export interface OnSpacingUpdated {
  (spacing: number): void;
}

interface SpacingControllerProps {
  spacing: number;
  isMobile: boolean;
  onSpacingUpdated: OnSpacingUpdated;
}

const MIN_SPACING = 0;
const MAX_SPACING = 1;

enum SpacingOption {
  OneToThree = "1 : 3",
  OneToE = "1 : e",
  GoldenRatio = "Golden Ratio",
  Even = "Even",
  Custom = "Custom",
}

const roundFriendlyNumber = function (n: number): number {
  return Math.round(n * 100) / 100;
};

const getFriendlyRatio = function (spacing: number): string {
  if (spacing <= 1 / 2) {
    return "1 : " + roundFriendlyNumber(1 / spacing - 1);
  }
  return roundFriendlyNumber(1 / (1 - spacing) - 1) + " : 1";
};

const spacingOptionToSpacing = function (
  spacingOption: string,
  default_: number
): number {
  switch (spacingOption) {
    case SpacingOption.OneToThree:
      return 1 / 4;
    case SpacingOption.OneToE:
      return 1 / (1 + Math.E);
    case SpacingOption.GoldenRatio:
      return 1 - 1 / 1.618;
    case SpacingOption.Even:
      return 1 / 2;
    default:
      return default_;
  }
};

const spacingToSpacingOption = function (spacing: number): SpacingOption {
  for (const value of Object.values(SpacingOption)) {
    if (Math.abs(spacing - spacingOptionToSpacing(value, spacing)) < 0.0001) {
      return value;
    }
  }
  return SpacingOption.Custom;
};

function SpacingController(props: SpacingControllerProps) {
  const { spacing, isMobile, onSpacingUpdated } = props;

  const [spacingOption, setSpacingOption] = useState(
    spacingToSpacingOption(spacing)
  );

  const friendlyRatio = getFriendlyRatio(spacing);
  return (
    <div className="flex flex-col items-center w-full">
      <p className="mb-2">{friendlyRatio}</p>

      <div className={isMobile ? "w-full overflow-x-scroll flex" : ""}>
        <Segmented
          className={"mb-2 " + (isMobile ? "ml-auto mr-auto" : "")}
          value={spacingOption}
          options={[
            SpacingOption.OneToThree,
            SpacingOption.OneToE,
            SpacingOption.GoldenRatio,
            SpacingOption.Even,
            SpacingOption.Custom,
          ]}
          onChange={(value) => {
            const v = value as unknown as SpacingOption;
            setSpacingOption(v);
            onSpacingUpdated(spacingOptionToSpacing(v, spacing));
          }}
        />
      </div>
      <div className="w-full">
        <Slider
          value={spacing}
          onChange={(n) => {
            if (n == null || n < MIN_SPACING || n > MAX_SPACING) {
              n = spacing;
            }
            setSpacingOption(spacingToSpacingOption(n));
            onSpacingUpdated(n);
          }}
          min={MIN_SPACING}
          max={MAX_SPACING}
          step={0.001}
          tooltip={{
            placement: "bottom",
          }}
        />
      </div>
    </div>
  );
}

export const verticalSpacingControllerDescription: string =
  "Choose the ratio of the height of the bottom of the square to the height of the top.";

export const horizontalSpacingControllerDescription: string =
  "Choose the ratio of the width of the left of the square to the width of the right.";

export default SpacingController;
