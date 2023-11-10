import { ReactNode } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

interface ControlRowProps {
  title: string;
  controller: ReactNode;
  tooltipTitle?: string;
}

function ControlRow(props: ControlRowProps) {
  const { title, controller, tooltipTitle } = props;
  return (
    <div className="flex items-center justify-center bg-white/30 p-3 rounded backdrop-blur-sm drop-shadow-2xl mb-5 w-full">
      <div className="flex items-center justify-center">
        <h3>{title}</h3>
        <Tooltip title={tooltipTitle}>
          <InfoCircleOutlined className="ml-2 opacity-70 hover:opacity-100 hover:text-black hover:cursor-pointer" />
        </Tooltip>
      </div>
      <div className="border-solid border-l border-black self-stretch ml-3 mr-3"></div>
      {controller}
    </div>
  );
}

export default ControlRow;
