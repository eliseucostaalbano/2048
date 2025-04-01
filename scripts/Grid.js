const GRID_SIZE = 4
const CELL_SIZE = 20
const CELL_GAP = 2
const CELL_RADIUS = 1

export default class Grid {
    constructor(elementoGrid){
    elementoGrid.style.setProperty("--grid-size", GRID_SIZE)
    elementoGrid.style.setProperty("--cell-size", `${CELL_SIZE}vmin`)
    elementoGrid.style.setProperty("--cell-gap", `${CELL_GAP}vmin`)
    elementoGrid.style.setProperty("--cell-radius", `${CELL_RADIUS}vmin`)
    }
}