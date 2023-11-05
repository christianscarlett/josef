import { Slider } from "antd";

export interface OnSpacingUpdated {
  (spacing: number): void;
}

interface SpacingControllerProps {
  spacing: number;
  onSpacingUpdated: OnSpacingUpdated;
}

function SpacingController(props: SpacingControllerProps) {
  const { spacing, onSpacingUpdated } = props;
  return (
    <div className="w-full">
      <Slider
        value={spacing}
        onChange={(n) => {
          if (n == null || n < 0 || n > 1) {
            n = 1;
          }
          onSpacingUpdated(n);
        }}
        min={0}
        max={1}
        step={0.01}
      />{" "}
    </div>
  );
}

export default SpacingController;
