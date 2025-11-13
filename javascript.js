const canvasGridDoc = document.querySelector(".canvas");
const canvasSizeDoc = document.getElementById("canvasSizeInput")
const colorRGBDoc = document.getElementById("colorRGB")
const colorAlphaDoc = document.getElementById("colorAlpha")
const colorPickerDoc = document.querySelector(".colorPick")
const resetColorDoc = document.getElementById("resetColor")
const colorValidationDoc = document.getElementById("colorValidation")

let isMouseDown = false;
document.addEventListener("mousedown",  () => {
  isMouseDown = true;
})
document.addEventListener("mouseup",  () => {
  isMouseDown = false;
})

let currRGB = [0,0,0];
let currAlpha = 1;
colorRGBDoc.value = "#000000"
colorAlphaDoc.value = 1
addCanvasGrid(canvasSizeDoc.value)
updateColorValidation()

function createCanvasGrid (size) {
  const canvasColumnsDocArr = Array(+size).fill(0).map((_, index) => {
    const canvasColumn = document.createElement('div')
    canvasColumn.classList.add(`column`)
    canvasColumn.id = `x-${index}`
    canvasColumn.draggable = false
    return canvasColumn
  }).map((item) => {
    const createCanvasRow = (jndex) => {
      const canvasGrid = document.createElement('div')
      canvasGrid.classList.add(`grid`)
      canvasGrid.id = `y-${jndex}`
      canvasGrid.draggable = false
      return canvasGrid
    }
    for (let j = 0; j < size; j++) {
      item.appendChild(createCanvasRow(j));
    }
    return item
  })
  return canvasColumnsDocArr
}

function addCanvasGrid (size) {
  canvasGridDoc.replaceChildren();
  createCanvasGrid(size).forEach((item) => {
    canvasGridDoc.appendChild(item)
  });

  document.querySelectorAll('.grid').forEach((item) => {

    // // TOP's project requirements; I am not confined to such restrictions.
    // item.addEventListener("mouseenter", () => {
    //   item.style.backgroundColor = `rgba(${currRGB.join(', ')}, ${currAlpha})`
    // })

    item.addEventListener("mouseenter", () => {
      if (isMouseDown === true) {
        item.style.backgroundColor = `rgba(${currRGB.join(', ')}, ${currAlpha})`
      }
    })
    item.addEventListener("mousedown", () => {
      item.style.backgroundColor = `rgba(${currRGB.join(', ')}, ${currAlpha})`
    })

    // Prevents pesky dragging when you're drawing
    item.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
  });
}

function convertRGBText (sRGBValue) {
  const parseColorValue = (colorStr, pos) => parseInt(colorStr.slice(pos, pos+2), 16)
  const rValue = parseColorValue(sRGBValue, 1)
  const gValue = parseColorValue(sRGBValue, 3)
  const bValue = parseColorValue(sRGBValue, 5)
  return [rValue, gValue, bValue]
}

function updateColorValidation () {
  colorValidationDoc.textContent = `${currRGB.join(", ")} \\ ${currAlpha}`
}

canvasSizeDoc.addEventListener("change", (e) => {
  addCanvasGrid(e.target.value)
})

colorPickerDoc.addEventListener("change", (e) => {
  if (e.target.id === "colorRGB") {
    currRGB = convertRGBText(e.target.value);
    updateColorValidation()
  } else if (e.target.id === "colorAlpha") {
    currAlpha = +e.target.value;
    updateColorValidation()
  }
})

colorPickerDoc.addEventListener("click", (e) => {
  if (e.target.id === "resetColor") {
    colorRGBDoc.value = "#000000"
    colorAlphaDoc.value = 1
    currRGB = [0, 0, 0]
    currAlpha = 1
    updateColorValidation()
  }
})

document.querySelector("#clearCanvas").addEventListener("click", () => {
  document.querySelectorAll(".grid").forEach((item) => {
    item.style.backgroundColor = ''
  })
})
