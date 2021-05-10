import React, { useEffect, useRef, useState } from "react";
import { colorPredictionCouner, ImageSize } from "../pages/FullPage";

interface canvasProps {
  setCanvasContext: Function;
  imageSize: ImageSize;
  isInPickingMode: boolean;
  amountOfColors: number;
  setPickingMode: (isInPickingMode: boolean) => void;
  colors: Array<string>;
  setColors: (colors: Array<string>) => void;
  skinPredictionCounter: colorPredictionCouner;
  setPredictionCounter: (predictionCounter: colorPredictionCouner) => void;
}

function rgbToHex(color: number) {
  return Number(color).toString(16).length === 1
    ? "0" + Number(color).toString(16)
    : Number(color).toString(16);
}

export function ColorPickerComponent(props: canvasProps) {
  const [clickCounter, setCounter] = useState(0);
  const [skinSamples] = useState({
    black: 28 + 23 + 20,
    mulatto: 173 + 120 + 94,
    white: 245 + 218 + 207,
  });

  useEffect(() => {
    if (props.isInPickingMode) {
      setCounter(0);
      props.setColors(["0"]);
      props.setPredictionCounter({
        white: 0,
        black: 0,
        mulatto: 0,
      });
    }
  }, [props.isInPickingMode]);

  function pickColorOnClick(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
    if (props.isInPickingMode) {
      if (clickCounter === props.amountOfColors - 1) {
        props.setPickingMode(false);
      }

      const rect = (canvasRef.current!! as HTMLCanvasElement).getBoundingClientRect();
      const canvasContext = (canvasRef.current!! as HTMLCanvasElement).getContext(
        "2d"
      );
      const pixel = canvasContext?.getImageData(
        e.clientX - rect.left,
        e.clientY - rect.top,
        1,
        1
      ).data;
      const [r, g, b, a] = [pixel?.[0], pixel?.[1], pixel?.[2], pixel?.[3]];
      console.log(r, g, b, a);
      const sumOfCollors = r!! + g!! + b!!;

      const currentColorBlock = clickCounter % props.amountOfColors;

      const currentColors = [...props.colors];
      currentColors[currentColorBlock] = `#${rgbToHex(r!!)}${rgbToHex(
        g!!
      )}${rgbToHex(b!!)}`;
      const currentSkinPredictionCounters = props.skinPredictionCounter;

      if (sumOfCollors <= skinSamples.black)
        currentSkinPredictionCounters.black += 1;
      else if (sumOfCollors >= skinSamples.white)
        currentSkinPredictionCounters.white += 1;
      else currentSkinPredictionCounters.mulatto += 1;

      props.setColors(currentColors);
      props.setPredictionCounter(currentSkinPredictionCounters);
      setCounter(clickCounter + 1);
    }
  }

  // Setting up context of canvas
  const canvasRef = useRef(null);
  const ourCanvas = (
    <canvas
      ref={canvasRef}
      className="color-picker-canvas"
      width={props.imageSize.width}
      height={props.imageSize.height}
      onClick={(e) => pickColorOnClick(e)}
    ></canvas>
  );
  useEffect(() => {
    const canvasElem = canvasRef.current!! as HTMLCanvasElement;
    const context = canvasElem.getContext("2d");
    props.setCanvasContext(context);
  }, []);

  return <>{ourCanvas}</>;
}
