// Получение всех необходимых элементов html
const fileInput = document.getElementById("person_picture")
const imageCanvas = document.getElementById("imageCanvas")
const imageCanvasContext = imageCanvas.getContext('2d')

const colorTxt = document.getElementsByClassName("color")
const colorBgs = document.getElementsByClassName("color_bg")

const predictedSpan = document.getElementsByClassName("predict")

// Цвет кожи определяется как сумма R G B. Значения захардкожены
// На основе людей из skinSamples
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

//Функция обрабатывающая данные пикселя
function colorPickingLogic(r, g, b){
    let currentBlock = clickCounter % colorBgs.length
    colorTxt[currentBlock].textContent = `#${rgbToHex(r)}${rgbToHex(g)}${rgbToHex(b)}`
    colorBgs[currentBlock].style.backgroundColor = `rgb(${r}, ${g}, ${b})`

    pickedColors[currentBlock] = r + g + b

    clickCounter += 1
}

// Отрисовывающаяся картинка
let image = new Image

// Эвент для установки источника картинки по выбору файла
fileInput.addEventListener("change", (event)=>{
    image.src = URL.createObjectURL(event.target.files[0])
})

// Отрисовка картинки на canvas
image.onload = function(e){
    imageCanvas.setAttribute("width", this.width)
    imageCanvas.setAttribute("height", this.height)
    imageCanvasContext.drawImage(image, 0, 0)
}

// Логика выбора пикселя и определения цвета кожи
imageCanvas.addEventListener("click", (e) =>{
    let rect = e.target.getBoundingClientRect()
    let pixel = imageCanvasContext.getImageData(e.clientX - rect.left, e.clientY - rect.top, 1, 1).data

    colorPickingLogic(pixel[0], pixel[1], pixel[2])

    if (pickedColors.length == 3){
        let b = 0
        let w = 0
        let m = 0

        pickedColors.forEach(element => {
            if (element >= whiteSkinSample){
                w += 1
            } else if (element <= blackSkinSample){
                b += 1
            } else {
                m += 1
            }
        })

        let mostTo = Math.max(b, w, m)

        if ([w, m, b].every(element => element == w)){
            predictedSpan[0].textContent = "probably mulatto"
        } else if (mostTo == w) {
            predictedSpan[0].textContent = "white"
        }else if (mostTo == b){
            predictedSpan[0].textContent = "black"
        } else {
            predictedSpan[0].textContent = "mulatto"
        }
    }

})

