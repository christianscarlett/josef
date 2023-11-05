import { Segmented, Slider } from "antd";
import { useState } from "react";

export interface OnSpacingUpdated {
  (spacing: number): void;
}

interface SpacingControllerProps {
  spacing: number;
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

const spacingOptionToSpacing = function (spacingOption: string): number {
  switch (spacingOption) {
    case SpacingOption.OneToThree:
      return 1 / 4;
    case SpacingOption.OneToE:
      return 1 / (1 + Math.E);
    case SpacingOption.GoldenRatio:
      return 1 - 1 / 1.618;
    case SpacingOption.Even:
      return 1 / 2;
    case SpacingOption.Custom:
      return 1 / 2;
    default:
      return 1 / 2;
  }
};

const spacingToSpacingOption = function (spacing: number): SpacingOption {
  for (const value of Object.values(SpacingOption)) {
    if (Math.abs(spacing - spacingOptionToSpacing(value)) < 0.0001) {
      return value;
    }
  }
  return SpacingOption.Custom;
};

function SpacingController(props: SpacingControllerProps) {
  const { spacing, onSpacingUpdated } = props;

  const [spacingOption, setSpacingOption] = useState(
    spacingToSpacingOption(spacing)
  );

  const friendlyRatio = getFriendlyRatio(spacing);
  return (
    <div className="w-full">
      <p>{friendlyRatio}</p>
      <Segmented
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
          onSpacingUpdated(spacingOptionToSpacing(v));
        }}
      />
      <div className="flex">
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
    </div>
  );
}

export default SpacingController;
