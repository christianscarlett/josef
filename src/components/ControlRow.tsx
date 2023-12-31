import { ReactNode, useState } from "react";
import {
  InfoCircleOutlined,
  LeftOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

interface ControlRowProps {
  title: string;
  controller: ReactNode;
  tooltipTitle?: string;
  isMobile: boolean;
}

function ControlRow(props: ControlRowProps) {
  const { title, controller, tooltipTitle, isMobile } = props;

  const [isExpanded, setIsExpanded] = useState(true);

  const expandIcon = isExpanded ? (
    <DownOutlined
      className="ml-2 opacity-70 hover:opacity-100 hover:text-black hover:cursor-pointer"
      onClick={() => setIsExpanded(false)}
    />
  ) : (
    <LeftOutlined
      className="ml-2 opacity-70 hover:opacity-100 hover:text-black hover:cursor-pointer"
      onClick={() => setIsExpanded(true)}
    />
  );

  return (
    <div
      className={
        "flex " +
        (isMobile ? "flex-col" : "") +
        " items-center justify-center bg-white/30 p-3 rounded backdrop-blur-sm drop-shadow-2xl mb-5 w-full"
      }
    >
      <div
        className={isMobile ? "flex items-center justify-around w-full" : ""}
      >
        {isMobile && <div className="opacity-0">{expandIcon}</div>}
        <div className="flex items-center justify-center">
          <h3>{title}</h3>
          <Tooltip title={tooltipTitle}>
            <InfoCircleOutlined className="ml-2 opacity-70 hover:opacity-100 hover:text-black hover:cursor-pointer" />
          </Tooltip>
        </div>
        {isMobile && expandIcon}
      </div>
      {(!isMobile || isExpanded) && (
        <>
          <div
            className={
              "border-solid border-l border-b border-black self-stretch " +
              (isMobile ? "my-3" : "mx-3")
            }
          ></div>
          {controller}
        </>
      )}
    </div>
  );
}

export default ControlRow;
