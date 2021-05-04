import { useState } from "react";
import { ColorPickedComponent } from "../components/ColorPicked";
import { ColorPickerComponent } from "../components/ColorPicker";
import { FilePickerComponent } from "../components/FilePicker";
import { StateControlsComponent } from "../components/StateControls";

// Interface that describes event for file input
interface FileInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

//Interface that describes image sizes.
export interface ImageSize {
  width: number;
  height: number;
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
  const [amountOfColors, setColorsAmount] = useState<number>(3);
  const [isInPickingMode, setPickingMode] = useState<boolean>(false);

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
      <StateControlsComponent
        amountOfColors={amountOfColors}
        setColorsAmount={setColorsAmount}
        isInPickingMode={isInPickingMode}
        setPickingMode={setPickingMode}
      />
      <div className="choosed-oolors-list">
        {/* TODO Generate list of ColorPickedComponent and add logic to load colors in them */}
      </div>
    </>
  );
}
