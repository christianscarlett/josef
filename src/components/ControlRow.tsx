import { ReactNode } from "react";

interface ControlRowProps {
  title: String;
  controller: ReactNode;
}

function ControlRow(props: ControlRowProps) {
  return (
    <div className="flex items-center justify-center bg-white/30 p-3 rounded backdrop-blur-sm drop-shadow-2xl mb-5 w-full">
      <h3>{props.title}</h3>
      <div className="border-solid border-l border-black self-stretch ml-3 mr-3"></div>
      {props.controller}
    </div>
  );
}

export default ControlRow;
