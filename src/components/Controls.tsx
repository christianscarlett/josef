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

function Controls() {
  return (
    <div className="flex flex-col items-start">
      <ControlRow
        title="Squares"
        controller={
          <>
            <InputNumber />
          </>
        }
      />
      <ControlRow title="Palette" controller={<></>} />
    </div>
  );
}

export default Controls;
