import { useEffect, useState } from "react";
import { ColorPickedComponent } from "../components/ColorPicked";
import { ColorPickerComponent } from "../components/ColorPicker";
import { FilePickerComponent } from "../components/FilePicker";
import { ResultComponent } from "../components/Result";
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

export interface colorPredictionCouner {
  white: number;
  black: number;
  mulatto: number;
}

// Entire page as one component.
export function FullPagePage() {
  const [image, setImage] = useState<HTMLImageElement>(new Image());
  const [imageSize, setImageSize] = useState<ImageSize>({
    width: 100,
    height: 100,
  });
  const [canvasContext, setContext] = useState<CanvasRenderingContext2D>();
  const [amountOfColors, setColorsAmount] = useState<number>(3);
  const [isInPickingMode, setPickingMode] = useState<boolean>(false);
  const [colors, setColors] = useState<Array<string>>(["0"]);
  const [
    skinPredictionCounter,
    setPredictionCounter,
  ] = useState<colorPredictionCouner>({
    white: 0,
    black: 0,
    mulatto: 0,
  });
  const [result, setResult] = useState<string>("");

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

  let colorsMapCounter = 0;
  let colorsMap = colors.map((color) => {
    colorsMapCounter++;
    return <ColorPickedComponent key={colorsMapCounter} colorValue={color} />;
  });

  useEffect(colorResult, [
    skinPredictionCounter.white,
    skinPredictionCounter.black,
    skinPredictionCounter.mulatto,
  ]);

  function colorResult() {
    if (
      skinPredictionCounter.black > skinPredictionCounter.white &&
      skinPredictionCounter.black > skinPredictionCounter.mulatto
    ) {
      setResult("Black");
    } else if (skinPredictionCounter.white > skinPredictionCounter.mulatto) {
      setResult("White");
    } else {
      setResult("Mulatto");
    }
  }

  return (
    <>
      <FilePickerComponent
        getImageFunc={getImageFromInput}
        isInPickingMode={isInPickingMode}
      />
      <ColorPickerComponent
        imageSize={imageSize}
        isInPickingMode={isInPickingMode}
        setCanvasContext={setContext}
        amountOfColors={amountOfColors}
        setPickingMode={setPickingMode}
        colors={colors}
        setColors={setColors}
        skinPredictionCounter={skinPredictionCounter}
        setPredictionCounter={setPredictionCounter}
      />
      <StateControlsComponent
        amountOfColors={amountOfColors}
        setColorsAmount={setColorsAmount}
        isInPickingMode={isInPickingMode}
        setPickingMode={setPickingMode}
      />
      <div className="choosed-colors-list">
        {colors[0] === "0" ? <></> : colorsMap}
      </div>

      {colors[0] === "0" ? <></> : <ResultComponent result={result} />}
    </>
  );
}
