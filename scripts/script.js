import Grid from "./Grid.js"
import Tile from "./Tile.js"

const gameBoard = document.getElementById("game-board")

const grid = new Grid(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
setUpInput()

function setUpInput() {
    window.addEventListener("keydown", lidarInput, { once: true })
}

function lidarInput(e) {
    switch (e.key) {
        case "ArrowUp":
            moverCima()
            break
        case "ArrowDown":
             moverBaixo()
            break
        case "ArrowLeft":
             moverEsquerda()
            break
        case "ArrowRight":
            moverDireita()
            break
        default:
            setUpInput()
            return
    }
    setUpInput()
}

function moverCima() {
  moverTiles(grid.cellsByColumn)
}

function moverTiles(cells) {
    cells.flatMap(group => {
      for (let i = 1; i < group.length; i++) {
        const cell = group[i]
        if (cell.tile == null) continue
        let lastValidCell
        for (let j = i - 1; j >= 0; j--) {
          const moveToCell = group[j]
          if (!moveToCell.podeAceitar(cell.tile)) break
          lastValidCell = moveToCell
        }
        if (lastValidCell != null) {
          if (lastValidCell.tile != null) {
            lastValidCell.mergeTile = cell.tile
          } else {
            lastValidCell.tile = cell.tile
          }
          cell.tile = null
        }
      }
    })
}
