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

async function lidarInput(e) {
    switch (e.key) {
        case "ArrowUp":
           if(!podeMoverCima()){
            setUpInput
             return
           }
            await moverCima()
            break
        case "ArrowDown":
            if(!podeMoverBaixo()){
                setUpInput
              return
            }
             await moverBaixo()
            break
        case "ArrowLeft":
            if(!podeMoverEsquerda()){
                setUpInput
               return
            }
             await moverEsquerda()
            break
        case "ArrowRight":
            if(!podeMoverDireita()){
                setUpInput
                return
            }
            await moverDireita()
            break
        default:
            setUpInput()
            return
    }

  grid.cells.forEach(cell => cell.mergeTiles());

  const newTile = new Tile(gameBoard)
  grid.randomEmptyCell().tile = newTile

  if (!podeMoverCima() && !podeMoverBaixo() && !podeMoverEsquerda() && !podeMoverDireita()) {

     newTile.waitForTransition(true).then(() => {
      alert("Game Over!")
    })
  }

    setUpInput()
}

function moverCima() {
  moverTiles(grid.cellsByColumn)
}

function moverBaixo() {
  moverTiles(grid.cellsByColumn.map(column => [...column].reverse()))
}

function moverEsquerda() {
  moverTiles(grid.cellsByRow)
}

function moverDireita() {
  moverTiles(grid.cellsByRow.map(row => [...row].reverse()))
}

function moverTiles(cells) {
  return Promise.all(
    cells.flatMap(group => {
      const promises =[]
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
          promises.push(cell.tile.waitForTransition())
          if (lastValidCell.tile != null) {
            lastValidCell.mergeTile = cell.tile
          } else {
            lastValidCell.tile = cell.tile
          }
          cell.tile = null
        }
      }
      return promises
    })
  )
}

function podeMoverCima() {
    return podeMover(grid.cellsByColumn) 
}

function podeMoverBaixo() {
    return podeMover(grid.cellsByColumn.map(column => [...column].reverse()))
}

function podeMoverEsquerda() {
    return podeMover(grid.cellsByRow)
}

function podeMoverDireita() {
    return podeMover(grid.cellsByRow.map(row => [...row].reverse()))
}

function podeMover(cells) {
    return cells.some(group => {
        return group.some((cell, index) => {
           if (index === 0) return false
            if (cell.tile == null) return false
            const moveToCell = group[index - 1]
            return moveToCell.podeAceitar(cell.tile)
        })
    })
}