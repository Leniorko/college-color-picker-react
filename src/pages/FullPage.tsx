import { useState } from "react";
import { ColorPickerComponent } from "../components/ColorPicker";
import { FilePickerComponent } from "../components/FilePicker";

// Interface that describes event for file input
interface FileInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

//Interface that describes image sizes.
export interface ImageSize {
  width: Number;
  height: Number;
}

// Entire page as one component.
export function FullPagePage() {
  const [image, setImage] = useState<HTMLImageElement>(new Image());
  const [imageSize, setImageSize] = useState<ImageSize>({
    width: 100,
    height: 100,
  });
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  const [canvasContext, setContext] = useState<CanvasRenderingContext2D>();

  function getImageFromInput(e: FileInputEvent) {
    if (e.target.files) {
      image.src = URL.createObjectURL(e.target.files[0]);
    }
  }

  // Draws image when it is loaded
  image.onload = function (e) {
    setImageSize({
      width: image.width,
      height: image.height,
    });
    canvasContext?.drawImage(image, 0, 0);
  };

  return (
    <>
      <FilePickerComponent getImageFunc={getImageFromInput} />
      <ColorPickerComponent
        setCanvas={setCanvas}
        imageSize={imageSize}
        setCanvasContext={setContext}
      />
    </>
  );
}
