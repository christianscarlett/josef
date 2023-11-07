import { Segmented } from "antd";
import { Texture } from "../model/Model";

export interface onTextureUpdated {
  (t: Texture): void;
}

interface TextureControllerProps {
  texture: Texture;
  onTextureUpdated: onTextureUpdated;
}

function TextureController(props: TextureControllerProps) {
  const { texture, onTextureUpdated } = props;
  return (
    <div className="flex justify-center items-center w-full">
      <Segmented
        value={texture}
        options={Object.values(Texture)}
        onChange={(t) => {
          onTextureUpdated(t as unknown as Texture);
        }}
      />
    </div>
  );
}

export default TextureController;
