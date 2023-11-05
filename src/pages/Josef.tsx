import Title from "antd/es/typography/Title";
import Controls from "../components/Controls";
import Square from "../components/Square";
import "./Josef.css";

function Josef() {
  return (
    <div className="Josef h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-10">
        Josef Albers "Homage to the Square" Generator
      </h1>
      <div className="mb-10">
        <Square />
      </div>
      <Controls />
    </div>
  );
}

export default Josef;
