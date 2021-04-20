const fileInput = document.getElementById("person_picture")
const imageCanvas = document.getElementById("imageCanvas")
const imageCanvasContext = imageCanvas.getContext('2d')

const colorTxt = document.getElementsByClassName("color")
const colorBgs = document.getElementsByClassName("color_bg")

const predictedSpan = document.getElementsByClassName("predict")
// Цвет кожи определяется как сумма R G B. Значения захардкожены
// На основе цветов из skinSamples
const blackSkinSample = 28 + 23 + 20
const mulattoSkinSample = 173 + 120 + 94
const whiteSkinSample = 245 + 218 + 207

let clickCounter = 0
let pickedColors = []

function rgbToHex(color){
    return Number(color).toString(16).length == 1 
    ? "0" + Number(color).toString(16) 
    :    Number(color).toString(16)
}

function colorPickingLogic(r, g, b){
    let currentBlock = clickCounter % colorBgs.length
    colorTxt[currentBlock].textContent = `#${rgbToHex(r)}${rgbToHex(g)}${rgbToHex(b)}`
    colorBgs[currentBlock].style.backgroundColor = `rgb(${r}, ${g}, ${b})`

    pickedColors[currentBlock] = r + g + b

    clickCounter += 1
}

let fileList = []
let image = new Image

fileInput.addEventListener("change", (event)=>{
    fileList = event.target.files
    console.log(fileList)

    image.src = URL.createObjectURL(fileList[0])
})

image.onload = function(e){
    imageCanvas.setAttribute("width", this.width)
    imageCanvas.setAttribute("height", this.height)
    imageCanvasContext.drawImage(image, 0, 0)
}

imageCanvas.addEventListener("click", (e) =>{
    let rect = e.target.getBoundingClientRect()
    let pixel = imageCanvasContext.getImageData(e.clientX - rect.left, e.clientY - rect.top, 1, 1).data

    colorPickingLogic(pixel[0], pixel[1], pixel[2])

    if (pickedColors.length == 3){
        let b = 0
        let w = 0
        let m = 0

        pickedColors.forEach(element => {
            console.log(element);
            if (element >= whiteSkinSample){
                w += 1
            } else if (element <= blackSkinSample){
                b += 1
            } else {
                m += 1
            }
        })

        let mostTo = Math.max(b, w, m)
        console.log(mostTo);

        if ([w, m, b].every(element => element == w)){
            predictedSpan[0].textContent = "probably mulatto"
        } else if (mostTo == w) {
            predictedSpan[0].textContent = "white"
        }else if (mostTo == b){
            predictedSpan[0].textContent = "black"
        } else {
            predictedSpan[0].textContent = "mulatto"
        }

        console.log(w, m, b);
    }

})

