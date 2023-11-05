import { Segmented } from "antd";
import { SegmentedLabeledOption } from "antd/es/segmented";

interface PaletteControllerProps {
  palette: string[];
}

const getSegmentedOption = function (color: string): SegmentedLabeledOption {
  return {
    label: (
      <div
        className="inline-block align-middle rounded h-6 w-6 mb-1 mt-1"
        style={{ backgroundColor: color }}
      ></div>
    ),
    value: color,
  };
};

function PaletteController(props: PaletteControllerProps) {
  const { palette } = props;
  const options = palette.map((color) => getSegmentedOption(color));
  return <Segmented options={options} />;
}

export default PaletteController;
