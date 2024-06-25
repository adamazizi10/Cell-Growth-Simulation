import React from 'react';
import Cell from '../Cell/Cell';
import './Grid.css'
import { CellType } from '../../utils/utils';

interface GridProps {
    grid: CellType[][];
    toggleCell: (row: number, col: number) => void;
}

const Grid: React.FC<GridProps> = ({ grid, toggleCell }) => {
    return (
        <div className="grid">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            isAlive={cell === CellType.Alive}
                            onClick={() => toggleCell(rowIndex, colIndex)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Grid;
