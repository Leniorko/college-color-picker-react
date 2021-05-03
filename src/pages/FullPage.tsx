import { ChangeEvent, useState } from "react";
import { ColorPickerComponent } from "../components/ColorPicker";
import { FilePickerComponent } from "../components/FilePicker";

// Interface that describes event for file input
interface FileInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export interface ImageSize {
  width: Number;
  height: Number;
}

export function FullPagePage() {
  const [image, setImage] = useState<HTMLImageElement>();
  const [imageSize, setParam] = useState<ImageSize>({
    width: 100,
    height: 100,
  });
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  const [canvasContext, setContext] = useState<CanvasRenderingContext2D>();

  const actualImage = new Image();

  function getImageFromInput(e: FileInputEvent) {
    if (e.target.files) {
      console.log(e.target.files[0]);

      actualImage.src = URL.createObjectURL(e.target.files[0]);
      setImage(actualImage);
    }
  }

  actualImage.onload = function (e) {
    setParam({
      width: actualImage.width,
      height: actualImage.height,
    });
    canvasContext?.drawImage(actualImage, 0, 0);
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
