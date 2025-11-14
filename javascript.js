const canvasGridDoc = document.querySelector(".canvas");
const canvasSizeDoc = document.getElementById("canvasSizeInput")
const colorRGBDoc = document.getElementById("colorRGB")
const colorAlphaDoc = document.getElementById("colorAlpha")
const colorPickerDoc = document.querySelector(".colorPick")
const resetColorDoc = document.getElementById("resetColor")
const previewStrokeDoc = document.querySelector(".previewStroke")
const colorValidationDoc = document.getElementById("colorValidation")
const rainbowCheckboxDoc = document.getElementById("rainbowEnable")

let isMouseDown = false;
document.addEventListener("mousedown",  () => {
  isMouseDown = true;
})
document.addEventListener("mouseup",  () => {
  isMouseDown = false;
})

function createCanvasZIdxMatrix (size) {
  return Array(size).fill(0).map(()=>Array(size).fill(0))
}

let currRGB = [0,0,0];
let currAlpha = 1;
let currZIndex = createCanvasZIdxMatrix(+canvasSizeDoc.value)
let currStrokeNum = 0;
colorRGBDoc.value = "#000000"
colorAlphaDoc.value = 1
addCanvasGrid(+canvasSizeDoc.value)
updateColorValidation()

console.log(createCanvasZIdxMatrix(+canvasSizeDoc.value))

function createCanvasGrid (size) {
  const createCanvasRow = (jndex) => {
    const canvasGrid = document.createElement('div')
    canvasGrid.classList.add(`grid`)
    canvasGrid.dataset.y = `${jndex}`
    canvasGrid.draggable = false
    canvasGrid.style.position = `relative`;
    return canvasGrid
  }
  const canvasColumnsDocArr = Array(+size).fill(0).map((_, index) => {
    const canvasColumn = document.createElement('div')
    canvasColumn.classList.add(`column`)
    canvasColumn.dataset.x = `${index}`
    canvasColumn.draggable = false
    return canvasColumn
  }).map((item) => {
    for (let j = 0; j < size; j++) {
      item.appendChild(createCanvasRow(j));
    }
    return item
  })
  return canvasColumnsDocArr
}


function randRainbow () {
  return Array(3).fill(0).map((item) => {
    return 1 + Math.floor(Math.random()*255)
  })
}

function drawCanvasStroke(item) {
  const canvasStroke = document.createElement('div')
  canvasStroke.classList.add('stroke')
  canvasStroke.dataset.stroke = currStrokeNum
  canvasStroke.style.backgroundColor = !rainbowCheckboxDoc.checked ?
    `rgba(${currRGB.join(', ')}, ${currAlpha})` :
    `rgba(${randRainbow().join(', ')})`
  canvasStroke.style.width = `100%`;
  canvasStroke.style.height = `100%`;
  canvasStroke.style.position = `absolute`;

  const zPos = currZIndex[+ item.parentNode.dataset.x][+ item.dataset.y]
  canvasStroke.style.zIndex = zPos;
  currZIndex[+ item.parentNode.dataset.x][+ item.dataset.y] += 1;
  item.appendChild(canvasStroke)
}

function updatePreviewStroke (size, updateStroke = true) {
  previewStrokeDoc.replaceChildren();
  createCanvasGrid(size).forEach((item) => {
    previewStrokeDoc.appendChild(item)
  });
  if (updateStroke) {
    canvasGridDoc.querySelectorAll(`[data-stroke="${currStrokeNum-1}"]`).forEach((item) => {
      const xItem = +item.parentNode.parentNode.dataset.x
      const yItem = +item.parentNode.dataset.y
      previewStrokeDoc.querySelector(`[data-x="${xItem}"]`)
        .querySelector(`[data-y="${yItem}"]`)
        .appendChild(item.cloneNode())
    });
  }

}

function addCanvasGrid (size) {
  canvasGridDoc.replaceChildren();
  currZIndex = createCanvasZIdxMatrix(size)

  createCanvasGrid(size).forEach((item) => {
    canvasGridDoc.appendChild(item)
  });


  document.querySelectorAll('.grid').forEach((item) => {
    item.addEventListener("pointerenter", () => {
      if (isMouseDown === true) {
        drawCanvasStroke(item)
      }
    })
    item.addEventListener("pointerdown", () => {
      drawCanvasStroke(item)
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
  addCanvasGrid(+e.target.value)
  updatePreviewStroke(+e.target.value, false)
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

document.querySelector(".fullpage").addEventListener("pointerup", () => {
  if (canvasGridDoc.querySelectorAll(`[data-stroke="${currStrokeNum}"]`).length > 0){
    currStrokeNum += 1;
    updatePreviewStroke(+canvasSizeDoc.value);
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
  addCanvasGrid(+canvasSizeDoc.value)
  updatePreviewStroke(+canvasSizeDoc.value, false)
})

document.querySelector("#deleteStroke").addEventListener("click", () => {
  canvasGridDoc.querySelectorAll(`[data-stroke="${currStrokeNum-1}"]`).forEach((item) => {
    item.remove()
  });
  currStrokeNum = Math.max(currStrokeNum-1, 0);
  updatePreviewStroke(+canvasSizeDoc.value);
})
