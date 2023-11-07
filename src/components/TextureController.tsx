import { Segmented } from "antd";

export enum Texture {
  Flat = "Flat",
  Fabric = "Fabric",
  Paper = "Paper",
}

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
