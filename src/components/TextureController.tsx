import { Segmented } from "antd";
import { Texture } from "../model/Texture";

export interface onTextureUpdated {
  (t: Texture): void;
}

interface TextureControllerProps {
  texture: Texture;
  isMobile: boolean;
  onTextureUpdated: onTextureUpdated;
}

function TextureController(props: TextureControllerProps) {
  const { texture, isMobile, onTextureUpdated } = props;
  return (
    <div
      className={
        "flex items-center w-full " +
        (isMobile ? "overflow-x-scroll" : "justify-center")
      }
    >
      <Segmented
        className={isMobile ? "ml-auto mr-auto" : ""}
        value={texture}
        options={Object.values(Texture)}
        onChange={(t) => {
          onTextureUpdated(t as unknown as Texture);
        }}
      />
    </div>
  );
}

export const textureControllerDescription: string =
  "Apply a texture to the canvas by clicking an option.";

export default TextureController;
