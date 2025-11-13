const canvasGridDoc = document.querySelector(".canvas");
const canvasSizeDoc = document.getElementById("canvasSizeInput")
const colorRGBDoc = document.getElementById("colorRGB")
const colorAlphaDoc = document.getElementById("colorAlpha")
const resetColorDoc = document.getElementById("resetColor")
const colorValidationDoc = document.getElementById("colorValidation")

function createCanvasGrid (size) {
  const canvasColumnsDocArr = Array(+size).fill(0).map((_, index, arr) => {
    const canvasColumn = document.createElement('div')
    canvasColumn.classList.add(`column`)
    canvasColumn.id = `x-${index}`
    return canvasColumn
  }).map((item) => {
    const createCanvasRow = (jndex) => {
      const canvasGrid = document.createElement('div')
      canvasGrid.classList.add(`grid`)
      canvasGrid.id = `y-${jndex}`
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
}

canvasSizeDoc.addEventListener("change", (e) => {
  addCanvasGrid(e.target.value)
})
