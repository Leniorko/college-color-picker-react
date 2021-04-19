const fileInput = document.getElementById("person_picture")
const imageCanvas = document.getElementById("imageCanvas")
const imageCanvasContext = imageCanvas.getContext('2d')

const firstColor = document.getElementsByClassName("color1")
const secondColor = document.getElementsByClassName("color2")
const thirdColor = document.getElementsByClassName("color3")

// function rgbToHex(color){
//     return Number(color).toString(16).length == 1 
//     ? "0" + Number(color).toString(16) 
//     :    Number(color).toString(16)
// }

let fileList = []
let imageToCanvas = new Image

fileInput.addEventListener("change", (event)=>{
    fileList = event.target.files
    console.log(fileList)

    imageToCanvas.src = URL.createObjectURL(fileList[0])
})

imageToCanvas.onload = function(e){
    imageCanvas.setAttribute("width", this.width)
    imageCanvas.setAttribute("height", this.height)
    imageCanvasContext.drawImage(imageToCanvas, 0, 0)
}

imageCanvas.addEventListener("click", (e) =>{
    let rect = e.target.getBoundingClientRect()
    let pixel = imageCanvasContext.getImageData(e.clientX - rect.left, e.clientY - rect.top, 1, 1).data
    console.log(pixel);
})

