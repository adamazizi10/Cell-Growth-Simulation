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
            <button title="button for starting and pausing the simulation" className={`start-stop-btn ${isRunning ? 'btn-blue' : 'btn-green'}`} onClick={isRunning ? pauseSimulation : startSimulation}>
                {isRunning ? 'Pause' : 'Start'}
            </button>
            <button title="button for resetting the simulation" className='reset-btn btn-red' onClick={resetSimulation}>Reset</button>
        </div>
        <div className='time-and-grid-container'>
            <label className='time-and-grid-label'>
                <label htmlFor='interval-input'>Interval (ms):</label>
                <input
                    title="This is the input field for the time interval"
                    id='interval-input'
                    className={`time-and-grid-input ${isRunning ? 'readonly' : ''}`}
                    type="number"
                    min="1000"
                    max="20000"
                    step="500"
                    value={intervalTime}
                    readOnly={isRunning}
                    onChange={handleIntervalChange}
                />&nbsp;
                <label htmlFor='rows-input'>Grid Size:</label>
                <input
                    title="This is the input field for the number of rows in the grid"
                    id='rows-input'
                    className={`time-and-grid-input ${isRunning ? 'readonly' : ''}`}
                    type="number"
                    min="1"
                    max="1000"
                    value={rows}
                    readOnly={isRunning}
                    onChange={handleRowChange}
                /> &nbsp;x&nbsp;
                <input
                    title="This is the input field for the number of columns in the grid"
                    id='cols-input'
                    className={`time-and-grid-input ${isRunning ? 'readonly' : ''}`}
                    type="number"
                    min="1"
                    max="1000"
                    value={cols}
                    readOnly={isRunning}
                    onChange={handleColChange}
                />
            </label>
        </div>
    </div >
);


export default Controls;
