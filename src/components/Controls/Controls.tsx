import React from 'react';

interface ControlsProps {
    isRunning: boolean;
    intervalTime: number;
    rows: number;
    cols: number;
    handleIntervalChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleRowChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleColChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    startSimulation: () => void;
    pauseSimulation: () => void;
    resetSimulation: () => void;
}

const Controls: React.FC<ControlsProps> = ({
    isRunning,
    intervalTime,
    rows,
    cols,
    handleIntervalChange,
    handleRowChange,
    handleColChange,
    startSimulation,
    pauseSimulation,
    resetSimulation,
}) => (
    <div className="controls">
        <div className='main-btns-container'>
            <button className={`start-stop-btn ${isRunning ? 'btn-blue' : 'btn-green'}`} onClick={isRunning ? pauseSimulation : startSimulation}>
                {isRunning ? 'Pause' : 'Start'}
            </button>
            <button className='reset-btn btn-red' onClick={resetSimulation}>Reset</button>
        </div>
        <div className='time-and-grid-container'>
            <label className='time-and-grid-label'>
                Interval (ms):
                <input
                    className={`time-and-grid-input ${isRunning ? 'readonly' : ''}`}
                    type="number"
                    min="1000"
                    max="20000"
                    step="500"
                    value={intervalTime}
                    readOnly={isRunning}
                    onChange={handleIntervalChange}
                />&nbsp;
                Grid Size:
                <label>
                    <input
                        className={`time-and-grid-input ${isRunning ? 'readonly' : ''}`}
                        type="number"
                        min="1"
                        max="50"
                        value={rows}
                        readOnly={isRunning}
                        onChange={handleRowChange}
                    /> &nbsp;x&nbsp;
                </label>
                <label>
                    <input
                        className={`time-and-grid-input ${isRunning ? 'readonly' : ''}`}
                        type="number"
                        min="1"
                        max="50"
                        value={cols}
                        readOnly={isRunning}
                        onChange={handleColChange}
                    />
                </label>
            </label>
        </div>
    </div>
);

export default Controls;
