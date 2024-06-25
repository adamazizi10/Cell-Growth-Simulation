# Cell Growth Simulation
## Live Demo
You can view the live demo of the application [here](https://cell-growth-simulation.vercel.app/).

## Background
Bacterial colonies are groups of bacteria that grow on a solid medium, such as agar in a petri dish. A single bacterial cell that goes through several cycles of growth and division, is the source of every colony. Cell division results in the formation of visible clusters that may be examined for a variety of characteristics.

Growth:
* Initially, bacterial cells divide rapidly, leading to an exponential increase in the colony size.
* In a confined space, such as a petri dish, bacterial cells compete for limited resources and space, affecting their growth and distribution.
* Cells can only divide if there is enough space, typically an adjacent empty cell, for the new cells to occupy.

## Overview
This project is a React application that allows users to understand the growth patterns of bacterial colonies through real-time visualization in a custom-sized petri dish. The application allows users to select their preferred petri dish size and growth time interval. Users can click on one or multiple cells to introduce bacteria or click on live cells to eliminate them. Additionally, users have the option to pause and analyze the results of the petri dish and the exponential graph.

## Features
Grid Representation: The initial size of the grid is 16x22 which represents a petri dish where each cell can be either empty or occupied by a bacterial cell. This grid size is dynamic and can be changed by the user.

Growth Rules:
* Bacterial cells divide every fixed time interval with a default interval of 1 second. This interval is also dynamic and can be changed by the user.
* Cells can only divide if there is at least one adjacent empty cell (up, down, left, right).

User Controls:
* There is a Start/Pause button to control the simulation.
* There is also Reset button to restart the simulation.
* There is an input field to set the time interval for cell division.
* Users are able to manually place or remove bacterial cells on the grid by clicking on the cells.

### Additional Features
* There is an exponential graph that visualizes the growth rate of the number of cells over time.
* Users have the ability to dynamically change the grid size to explore different simulation scenarios.

![image](https://github.com/adamazizi10/Cell-Growth-Simulation/assets/106051947/23e08aa9-cda4-4624-ae4c-39e1b7de7f31)
*Figure 1: Snapshot of the Simulator and the Graph*
  
![image](https://github.com/adamazizi10/Cell-Growth-Simulation/assets/106051947/eb1c1219-abb8-4628-bd56-43018db54dc0)
*Figure 2: Snapshot of the Simulator and the Graph after the growth of bacteria*

## Quick Setup Instructions
These are quick setups, please navigate to the directory of your choice.

If you are using HTTPS:
```
git clone https://github.com/adamazizi10/Cell-Growth-Simulation.git
cd Cell-Growth-Simulation
npm install
npm start
```

If you are using SSH:
```
git clone git@github.com:adamazizi10/Cell-Growth-Simulation.git
cd Cell-Growth-Simulation
npm install
npm start
```
And you are done!

## Step-by-Step Setup Instructions
If you prefer step-by-step setup instructions, please follow the instructions below:
1. Navigate to the directory of your choice
2. Clone the repository using HTTPS:
```
git clone https://github.com/adamazizi10/Cell-Growth-Simulation.git
```
or using SSH:
```
git clone git@github.com:adamazizi10/Cell-Growth-Simulation.git
```
3. Navigate to the project root directory:
```
cd Cell-Growth-Simulation
```
4. Install the dependencies:
```
npm install
```
5. Start the development server:
```
npm start
```
6. If not opened automatically, open your browser and navigate to:
```
http://localhost:3000
```

# Project Structure
Key Components
* **App.tsx:** Main application component.
* **Simulator.tsx:** The main component that displays the Grid and its controls. This is the parent function of `Grid` and `Graph`.
* **Grid.tsx:** Renders the grid and manages cell states. This is the parent function of `Cell`.
* **Cell.tsx:** Represents a single cell in the grid.
* **Controls.tsx:** Contains the buttons and input fields for user controls.
* **utils/utils.ts:** Utility functions for handling cell growth logic.

# Assumptions
* The grid starts with at least one bacteria. However, this can be removed manually as well.
* The default time interval for cell division is set to 1 second but can be adjusted by the user.

# Performance Analysis
## Metrics
![image](https://github.com/adamazizi10/Cell-Growth-Simulation/assets/106051947/73cf52ae-9205-4199-afac-384b7aca5927)

*Figure 3: The initial load of the application*

The application loads quickly with minimal initial load time of 828 ms due to efficient state management and component rendering.
<br />

<img width="860" alt="image" src="https://github.com/adamazizi10/Cell-Growth-Simulation/assets/106051947/5030077c-8129-4832-a62c-73569384bc54">

*Figure 4: The initial graph with a default of one alive cell without starting the simulation*

Since the simulation is paused and there is a single cell in the grid, the performance is close to Figure 3 which is around 800-850 ms

<img width="744" alt="image" src="https://github.com/adamazizi10/Cell-Growth-Simulation/assets/106051947/b8985158-16df-4cce-a689-0ae1a3e0f610">

*Figure 5: The Simulation of the grid while not rending the exponential graph. The default grid is 16x22 and the default time interval is 1 second*


<img width="764" alt="image" src="https://github.com/adamazizi10/Cell-Growth-Simulation/assets/106051947/3f0a0e22-9d57-4e23-8be1-9c74e4e2ce31">

*Figure 6: The Simulation of the grid while rendering the exponential graph. The default grid is 16x22 and the default time interval is 1 second*

Figure 5 and Figure 6 show that the simulation starts and more cells are dividing and growing exponentially, it affects the performance. However, these metrics are reasonable for the simulation algorithm due to the 2D nature of it.


## Other Performance Optimizations
```javscript
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
```
Instead of choosing the brute force by simply checking if any adjacent cells of the alive cell are empty and filling them, this applicaton further optimizes this approach. The function `simulateCellGrowth` optimizes the simulation by first collecting all currently active cells (CellType.Alive) into an array (activeCells). This approach avoids unnecessary iterations over the entire grid and focuses only on cells that require evaluation for potential growth. This function targets active cells directly which reduces redundant checks and improves efficiency, making the growth simulation more performant especially as the grid size increases.

# Conclusion
This React application provides an interactive simulation of bacterial cell growth with various user controls and features. The application is optimized for performance and includes robust error handling. The project is deployed and available for live demo [here](https://cell-growth-simulation.vercel.app/).

# End of User Guide
