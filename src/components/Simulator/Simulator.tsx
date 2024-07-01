import React, { useState, useEffect, useRef } from 'react';
import Grid from '../Grid/Grid';
import './Simulator.css';
import '../../styles/App.css';
import { CellType, createEmptyGrid, simulateCellGrowth } from '../../utils/utils';
import Graph from '../Graph/Graph';
import Controls from '../Controls/Controls';


const Simulator: React.FC = () => {
   const [rows, setRows] = useState<number>(16);
   const [cols, setCols] = useState<number>(22);
   const [grid, setGrid] = useState<CellType[][]>(createEmptyGrid(rows, cols));
   const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
   const [intervalTime, setIntervalTime] = useState<number>(1000);
   const [isRunning, setIsRunning] = useState<boolean>(false);
   const [data, setData] = useState<{ time: number, count: number }[]>([]);
   const startTimeRef = useRef<number>(Date.now());


   const toggleCell = (row: number, col: number) => {
       const newGrid = [...grid];
       newGrid[row][col] = newGrid[row][col] === CellType.Dead ? CellType.Alive : CellType.Dead;
       setGrid(newGrid);
   };


   const countBacteria = (grid: CellType[][]): number => {
       return grid.flat().filter(cell => cell === CellType.Alive).length;
   };


   const startSimulation = () => {
       if (isGridFilled(grid)) resetSimulation()
       startTimeRef.current = Date.now();
       // Calculate initial number of bacteria
       const initialBacteriaCount = countBacteria(grid);
       setData([{ time: 0, count: initialBacteriaCount }]);
       const id = setInterval(() => {
           setGrid((prevGrid) => {
               const newGrid = simulateCellGrowth(prevGrid, rows, cols);
               const timeElapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
               setData(prevData => [...prevData, { time: timeElapsed, count: countBacteria(newGrid) }]);
               return newGrid;
           });
       }, intervalTime);
       setIntervalId(id);
       setIsRunning(true);
   };


   const pauseSimulation = () => {
       if (intervalId) {
           clearInterval(intervalId);
           setIntervalId(null);
           setIsRunning(false);
       }
   };


   const resetSimulation = () => {
       pauseSimulation();
       setGrid(createEmptyGrid(rows, cols));
       setData([]);
   };


   const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       setIntervalTime(parseInt(event.target.value));
   };


   const handleRowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       let newRows = parseInt(event.target.value);
       if (!newRows || newRows < 1) newRows = 1;
       if (newRows > 1000) newRows = 1000;
       setRows(newRows);
   };


   const handleColChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       let newCols = parseInt(event.target.value);
       if (!newCols || newCols < 1) newCols = 1;
       if (newCols > 1000) newCols = 1000;
       setCols(newCols);
   };


   const isGridFilled = (grid: CellType[][]): boolean => {
       return grid.every(row => row.every(cell => cell === CellType.Alive));
   };


   useEffect(() => {
       if (isGridFilled(grid)) {
           pauseSimulation();
           pauseSimulation()
       }
   }, [grid]);




   useEffect(() => {
       if (isRunning) {
           startSimulation();
       }
   }, [intervalTime]);


   useEffect(() => {
       setGrid(createEmptyGrid(rows, cols));
   }, [rows, cols]);


   return (
       <div className="app">
           <div className='Simulator'>
               <h1 className='simulator-title'>Cell Growth Simulation</h1>
               <Controls
                   isRunning={isRunning}
                   intervalTime={intervalTime}
                   rows={rows}
                   cols={cols}
                   handleIntervalChange={handleIntervalChange}
                   handleRowChange={handleRowChange}
                   handleColChange={handleColChange}
                   startSimulation={startSimulation}
                   pauseSimulation={pauseSimulation}
                   resetSimulation={resetSimulation}
               />
               <Grid grid={grid} toggleCell={toggleCell} />


           </div>
           <div className='Graph-And-Keyboard-Texts-Container'>
               <div className='Graph-Container'>
                   <Graph data={data} />
               </div>
               <div className='Keyboard-Navigation-Texts'>
                   <table className='Keyboard-Navigation-Table'>
                       <thead className='Keyboard-Navigation-Table-Head'>
                           <tr className='Keyboard-Navigation-Table-Head-Row'>
                               <th className='Keyboard-Navigation-Table-Header' colSpan={2}>
                                   <h2>Keyboard Navigation Controls</h2>
                               </th>
                           </tr>
                       </thead>
                       <tbody className='Keyboard-Navigation-Table-Body'>
                           <tr className='Keyboard-Navigation-Table-Row'>
                               <td className='Keyboard-Navigation-Table-Cell'>1</td>
                               <td className='Keyboard-Navigation-Table-Cell'><b>Tab</b> to navigate forward</td>
                           </tr>
                           <tr className='Keyboard-Navigation-Table-Row'>
                               <td className='Keyboard-Navigation-Table-Cell'>2</td>
                               <td className='Keyboard-Navigation-Table-Cell'><b>Shift + Tab</b> to navigate backwards</td>
                           </tr>
                           <tr className='Keyboard-Navigation-Table-Row'>
                               <td className='Keyboard-Navigation-Table-Cell'>3</td>
                               <td className='Keyboard-Navigation-Table-Cell'><b>Space</b> to press a button</td>
                           </tr>
                           <tr className='Keyboard-Navigation-Table-Row'>
                               <td className='Keyboard-Navigation-Table-Cell'>4</td>
                               <td className='Keyboard-Navigation-Table-Cell'><b>Up arrow</b> to increase numbers</td>
                           </tr>
                           <tr className='Keyboard-Navigation-Table-Row'>
                               <td className='Keyboard-Navigation-Table-Cell'>5</td>
                               <td className='Keyboard-Navigation-Table-Cell'><b>Down arrow</b> to decrease numbers</td>
                           </tr>
                       </tbody>
                   </table>
               </div>
           </div>
       </div>
   );
};


export default Simulator;
