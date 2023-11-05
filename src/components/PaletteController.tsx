import { Segmented } from "antd";
import { SegmentedLabeledOption } from "antd/es/segmented";
import { useState } from "react";

interface PaletteControllerProps {
  palette: string[];
}

const getSegmentedOption = function (
  color: string,
  value: number
): SegmentedLabeledOption {
  return {
    label: (
      <div
        className="inline-block align-middle rounded h-6 w-6 mb-1 mt-1"
        style={{ backgroundColor: color }}
      ></div>
    ),
    value: value,
  };
};

function PaletteController(props: PaletteControllerProps) {
  const { palette } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const options = palette.map((color, i) => getSegmentedOption(color, i));
  return (
    <Segmented
      options={options}
      value={selectedIndex}
      onChange={(value) => {
        setSelectedIndex(value as number);
      }}
    />
  );
}

export default PaletteController;
