import { ChangeEvent, useState } from "react";
import { ColorPickerComponent } from "../components/ColorPicker";
import { FilePickerComponent } from "../components/FilePicker";

// Interface that describes event for file input
interface FileInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

export function FullPagePage() {

    const [image, setImage] = useState<HTMLImageElement>();
    const [imageParam, setParam] = useState<any>();
    const [canvasContext, setContext] = useState<CanvasRenderingContext2D>()

    function getImageFromInput(e: FileInputEvent){
      
      if (e.target.files){
        const actualImage = new Image()
        
        console.log(e.target.files[0]);
        
        actualImage.src = URL.createObjectURL(e.target.files[0])
        setImage(actualImage)
        setParam({
          src: actualImage.src,
          width: actualImage.width,
          height: actualImage.height
        })
      }
    }

  return (
    <>
      <FilePickerComponent getImageFunc = {getImageFromInput} />
      <ColorPickerComponent setCanvasContext = {setContext} />
    </>
  );
}
