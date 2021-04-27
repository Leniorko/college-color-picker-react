import { ColorPicker } from "../scripts/ColorPicker";


//TODO Get familiar with tasting of dom events and data
//TODO How to use ts in html

describe("Some shit please work", ()=>{
    let colorPicker : ColorPicker

    beforeAll(()=>{
        document.body.innerHTML = ' <canvas id="imageCanvas"> </canvas> '
        colorPicker = new ColorPicker();
    })

    it("If color picker is defined", ()=>{

        

        expect(colorPicker).toBeDefined()
    })

    it("canvas?",()=>{
        console.log(colorPicker.canvas);
        
        expect(colorPicker.canvas).not.toBeNull()
    })
})