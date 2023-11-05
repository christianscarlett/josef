import { InputNumber } from "antd";
import ControlRow from "./ControlRow";

interface ControlsProps {
  numSquares: number;
  onNumSquaresUpdated: OnNumSquaresUpdatedFunction;
}

interface OnNumSquaresUpdatedFunction {
  (numSquares: number): void;
}

function Controls(props: ControlsProps) {
  const { numSquares, onNumSquaresUpdated } = props;

  let inputNumberValue = 1;
  if (numSquares > inputNumberValue) {
    inputNumberValue = numSquares;
  }

  return (
    <div className="flex flex-col items-start">
      <ControlRow
        title="Squares"
        controller={
          <>
            <InputNumber
              value={inputNumberValue}
              min={1}
              onChange={(n) => {
                if (n == null) {
                  n = inputNumberValue;
                }
                onNumSquaresUpdated(n);
              }}
            />
          </>
        }
      />
      <ControlRow title="Palette" controller={<></>} />
    </div>
  );
}

export default Controls;
