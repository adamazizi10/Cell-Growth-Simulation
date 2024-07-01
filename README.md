# Cell Growth Simulation
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

### Growth Rules:
* Bacterial cells divide every fixed time interval with a default interval of 1 second. This interval is also dynamic and can be changed by the user.
* Cells can only divide if there is at least one adjacent empty cell (up, down, left, right).

### User Controls:
* There is a Start/Pause button to control the simulation.
* There is also Reset button to restart the simulation.
* There is an input field to set the time interval for cell division.
* Users are able to manually place or remove bacterial cells on the grid by clicking on the cells.

## Additional Features
### Visualizer
* There is an exponential graph that visualizes the growth rate of the number of cells over time.

### Dynamic Grid Size
* Users have the ability to dynamically change the grid size to explore different simulation scenarios.

### Accessibility - Screen Reader and Keyboard Control
* Necessary elements include descriptions to enhance compatibility with screen readers, improving accessibility.
* The user has accessibility to Keyboard Navigation Controls and is able to use the application with only a keyboard

### Keyboard Navigation Controls
![image](https://github.com/adamazizi10/Cell-Growth-Simulation/assets/106051947/4aee8f48-6092-40a6-90fb-9ae9f06efb26)

*Figure 1: Keyboard Navigation Controls*


### Assumptions
* The grid starts with at least one bacteria. However, this can be removed manually as well.
* The default time interval for cell division is set to 1 second but can be adjusted by the user.



  
![image](https://github.com/adamazizi10/Cell-Growth-Simulation/assets/106051947/77f21866-4ad6-422d-810d-9620b3cb987d)

*Figure 2: Snapshot of the Simulator and the Graph*
  
![image](https://github.com/adamazizi10/Cell-Growth-Simulation/assets/106051947/378f44c0-e4ef-4acb-b6f6-009075a2daa3)

*Figure 3: Snapshot of the Simulator and the Graph after the growth of bacteria*

# Setup the Application Locally on your Machine
### Requirements
In order for you to setup this application locally, you need the following two requirements:
1) [node.js](https://nodejs.org/en/) (version 18 or above)
2) [npm](https://www.npmjs.com/) (version 9 or above)

## Quick Setup Instructions
The following is a quick setup by one copy-paste, please navigate to the directory of your choice.

If you are using HTTPS, paste this:
```
git clone https://github.com/adamazizi10/Cell-Growth-Simulation.git
cd Cell-Growth-Simulation
npm install
npm start
```

If you are using SSH, paste this:
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

# Project Structure: src and components
![image](https://github.com/adamazizi10/Cell-Growth-Simulation/assets/106051947/9cb6d944-3c70-440f-a7df-9e2d273c0754)

*Figure 4: Project structure (src)*

Key Components
* **App.tsx:** Main application component.
* **Simulator.tsx:** The main component that displays the Grid and its controls. This is the parent function of `Grid` and `Graph`.
* **Grid.tsx:** Renders the grid and manages cell states. This is the parent function of `Cell`.
* **Cell.tsx:** Represents a single cell in the grid.
* **Controls.tsx:** Contains the buttons and input fields for user controls.
* **utils/utils.ts:** Utility functions for handling cell growth logic.

# Performance Analysis
## Metrics
![image](https://github.com/adamazizi10/Cell-Growth-Simulation/assets/106051947/73cf52ae-9205-4199-afac-384b7aca5927)

*Figure 5: The initial load of the application*

The application loads quickly with minimal initial load time of 828 ms. A score below 1000 ms is typically a well-performing application. Therefore, this application's initial load time is considered very fast.
<br />

![image](https://github.com/adamazizi10/Cell-Growth-Simulation/assets/106051947/96d38b37-fe5e-4768-8f96-c3a4aa57eb6e)

*Figure 6: Chrome Lighthouse - Navigation 1st Run*

* All scores were 100% in the first try of Chrome Lighthouse Navigation Test including Performance, Best Practices, and SEO
* However, Accessibility was 83% and after looking at the suggestions, the colours were changed to have sufficient contract ratios


![image](https://github.com/adamazizi10/Cell-Growth-Simulation/assets/106051947/16b9fcfd-4b84-4ec8-bb66-9de54c3fed23)

*Figure 7: Chrome Lighthouse - Navigation 2nd Run*

* After adding sufficient contract ratios to the colours, the scores with 100% were not affected which is great
* Accessibility increased from 83% to 92%
* After looking at the suggestions again, ‘htmlFor’ and ‘id’ were added to some elements
* PNG image converted to WebP



![image](https://github.com/adamazizi10/Cell-Growth-Simulation/assets/106051947/da8c0a1e-576f-465b-9a32-e5ce75db19bb)

*Figure 8: Chrome Lighthouse - Navigation Final Run*

* All scores achieved 100%
* First Contentful Paint and Largest Contentful Paint have scores of 0.2s and 0.6s which are great scores for these metrics
* Total Blocking time decreased from 20 ms to 10 ms which is an amazing 50% decrease
* Lastly, the speed index is 0.3s which is also considered a great score for this metric

![image](https://github.com/adamazizi10/Cell-Growth-Simulation/assets/106051947/b5bd42b8-25b8-4c36-b82f-09b01b26d0ce)

*Figure 9: Chrome Lighthouse - Timespan*

* Timespan essentially gives you a timer and allows you to use the application and when you manually end the time, it tells you the scores you have achieved
* This application achieved 100% in both Performance and Best Practices in ‘Timespan’

![image](https://github.com/adamazizi10/Cell-Growth-Simulation/assets/106051947/b1af80b1-da43-4159-8e75-23e1e24ff58d)

*Figure 10: Chrome Lighthouse - Snapshot*

* Snapshot refers to a specific point in time when metrics are captured
* This is useful when comparing multiple versions
* All scores achieved 100%


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
This React application provides an interactive simulation of bacterial cell growth with various user controls and features. The application is optimized for performance and includes robust error handling. The project is deployed and available for live demo here: [https://cell-growth-simulation.vercel.app/](https://cell-growth-simulation.vercel.app/).

# End of User Guide
