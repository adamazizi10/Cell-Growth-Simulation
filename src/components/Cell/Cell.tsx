import React from 'react';
import './Cell.css';

interface CellProps {
  isAlive: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ isAlive, onClick }) => {
  return (
    <div className={`cell ${isAlive ? 'alive' : 'dead'}`} onClick={onClick}>
    </div>
  );
};

export default Cell;
