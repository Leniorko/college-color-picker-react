import { useEffect, useRef } from "react";
import { ImageSize } from "../pages/FullPage";

interface canvasProps {
  setCanvas: Function;
  setCanvasContext: Function;
  imageSize: ImageSize;
}

export function ColorPickerComponent(props: canvasProps) {
  // Setting up context of canvas
  const canvasRef = useRef(null);
  const ourCanvas = (
    <canvas
      ref={canvasRef}
      className="color-picker-canvas"
      width={props.imageSize.width.toString()}
      height={props.imageSize.height.toString()}
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
