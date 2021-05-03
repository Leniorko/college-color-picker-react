import { useEffect, useRef } from "react"

interface canvasProps {
    setCanvasContext: Function
}

export function ColorPickerComponent(props: canvasProps){
    
    // Setting up context of canvas
    const canvasRef = useRef(null);
    useEffect(()=>{
        const canvasElem = canvasRef.current!! as HTMLCanvasElement
        const context = canvasElem.getContext("2d")
        props.setCanvasContext(context)
    }, [])
    



    return(
        <canvas
        ref = {canvasRef} className="color-picker-canvas"></canvas>
    )
}