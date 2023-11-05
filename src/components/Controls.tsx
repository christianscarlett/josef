import { Divider, InputNumber } from "antd";
import { ReactNode } from "react";

interface ControlRowProps {
  title: String;
  controller: ReactNode;
}

function ControlRow(props: ControlRowProps) {
  return (
    <div className="flex items-center justify-center mb-5">
      <h3>{props.title}</h3>
      <Divider className="bg-black" type="vertical" />
      {props.controller}
    </div>
  );
}

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
