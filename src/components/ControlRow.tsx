import { Divider } from "antd";
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

export default ControlRow;
