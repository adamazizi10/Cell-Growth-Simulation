export enum CellType {
  Alive,
  Dead,
}

export const createEmptyGrid = (rows: number, cols: number): CellType[][] => {
  const grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => CellType.Dead));
  const centerRow = Math.floor(rows / 2);
  const centerCol = Math.floor(cols / 2);
  grid[centerRow][centerCol] = CellType.Alive;
  return grid;
};


type Cell = { row: number, col: number };

export const simulateCellGrowth = (grid: CellType[][], rows: number, cols: number): CellType[][] => {
  const newGrid = grid.map(row => [...row]);
  const activeCells: Cell[] = [];

  // Gather all currently alive cells
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === CellType.Alive) {
        activeCells.push({ row: i, col: j });
      }
    }
  }

  // Process only active cells
  for (const { row, col } of activeCells) {
    if (row > 0 && grid[row - 1][col] === CellType.Dead) newGrid[row - 1][col] = CellType.Alive;
    if (row < rows - 1 && grid[row + 1][col] === CellType.Dead) newGrid[row + 1][col] = CellType.Alive;
    if (col > 0 && grid[row][col - 1] === CellType.Dead) newGrid[row][col - 1] = CellType.Alive;
    if (col < cols - 1 && grid[row][col + 1] === CellType.Dead) newGrid[row][col + 1] = CellType.Alive;
  }
  
  return newGrid;
};
