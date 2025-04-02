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
    this.#cells = createCellElements(elementoGrid).map(
      (elementoCell, index) => {
        return new Cell(
          elementoCell,
          index % GRID_SIZE,
          Math.floor(index / GRID_SIZE)
        );
      }
    );
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
  #elementoCell;
  #x;
  #y;
  #tile;

  constructor(elementoCell, x, y) {
    this.#elementoCell = elementoCell;
    this.#x = x;
    this.#y = y;
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
