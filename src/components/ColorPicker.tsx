import React, { useEffect, useRef, useState } from "react";
import { ImageSize } from "../pages/FullPage";

interface canvasProps {
  setCanvas: Function;
  setCanvasContext: Function;
  imageSize: ImageSize;
}

function rgbToHex(color: Number) {
  return Number(color).toString(16).length === 1
    ? "0" + Number(color).toString(16)
    : Number(color).toString(16);
}

// TODO create boxes with representation of pciker colors
// TODO maybe create "picking mode" for color picking purpose.
export function ColorPickerComponent(props: canvasProps) {

  const [clickCounter, setCounter] = useState(0);
  const [colors, setColors] = useState([0,0,0])

  function pickColorOnClick(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
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
    
    const currentColorBlock = clickCounter % 3

    const currentColors = [...colors]
    currentColors[currentColorBlock] = r!! + g!! + b!!
    setColors(currentColors)
    setCounter(clickCounter+1)
  }

  // Setting up context of canvas
  const canvasRef = useRef(null);
  const ourCanvas = (
    <canvas
      ref={canvasRef}
      className="color-picker-canvas"
      width={props.imageSize.width.toString()}
      height={props.imageSize.height.toString()}
      onClick={(e) => pickColorOnClick(e)}
    ></canvas>
  );
  useEffect(() => {
    const canvasElem = canvasRef.current!! as HTMLCanvasElement;
    const context = canvasElem.getContext("2d");
    props.setCanvasContext(context);
    props.setCanvas(ourCanvas);
  }, []);

  return <>{ourCanvas}</>;
}
