const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;
const CELL_RADIUS = 1;

export default class Grid {
  #cells;

  constructor(elementoGrid) {
    elementoGrid.style.setProperty("--grid-size", GRID_SIZE);
    elementoGrid.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
    elementoGrid.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
    elementoGrid.style.setProperty("--cell-radius", `${CELL_RADIUS}vmin`);
    this.#cells = createCellElements(elementoGrid).map((elementoCell, index) => {
        return new Cell(elementoCell, index % GRID_SIZE, Math.floor(index / GRID_SIZE));
      });

  }

  get cells() {
    return this.#cells;
  }
  
  get cellsByRow(){
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.y] = cellGrid[cell.y] || []
      cellGrid[cell.y][cell.x] = cell
      return cellGrid
    }, [])
  }

     get cellsByColumn() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || []
      cellGrid[cell.x][cell.y] = cell
      return cellGrid
    }, [])
  }

  get #emptyCells() {
    return this.#cells.filter((cell) => cell.tile == null);
  }

  randomEmptyCell() {
    const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);
    return this.#emptyCells[randomIndex];
  }
}

class Cell {
  #elementoCell
  #x
  #y
  #tile
  #mergeTile

  constructor(elementoCell, x, y) {
    this.#elementoCell = elementoCell;
    this.#x = x;
    this.#y = y;
  }
  
  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  } 

  get tile() {
    return this.#tile;
  }

  set tile(value) {
    this.#tile = value;
    if (value == null) return;
    this.#tile.x= this.#x;
    this.#tile.y= this.#y;
  }

   get mergeTile() {
    return this.#mergeTile
  }

  set mergeTile(value) {
    this.#mergeTile = value
    if (value == null) return
    this.#mergeTile.x = this.#x
    this.#mergeTile.y = this.#y
  }

  podeAceitar(tile) {
    return (
      this.tile == null ||
      (this.mergeTile == null && this.tile.value === tile.value)
    )
  }
   
   mergeTiles() {
    if (this.tile == null || this.mergeTile == null) return
    this.tile.value = this.tile.value + this.mergeTile.value
    this.mergeTile.remove()
    this.mergeTile = null
  }

}

function createCellElements(elementoGrid) {
  const cells = [];
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cells.push(cell);
    elementoGrid.append(cell);
  }
  return cells;
}
