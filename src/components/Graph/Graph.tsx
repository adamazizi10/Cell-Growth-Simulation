import React, { useRef, useEffect } from 'react';

interface GraphProps {
  data: { time: number; count: number }[];
  width?: number;
  height?: number;
}

const Graph: React.FC<GraphProps> = ({ data, width = 600, height = 400 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
  
    if (ctx) {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
  
      // Draw axes
      ctx.beginPath();
      ctx.moveTo(50, 10); 
      ctx.lineTo(50, height - 30);
      ctx.lineTo(width - 10, height - 30);
      ctx.stroke();
  
      // Draw labels
      ctx.font = '12px Arial';
  
      const xAxisTitle = 'Time (seconds)';
      const xAxisTitleWidth = ctx.measureText(xAxisTitle).width;
      ctx.fillText(xAxisTitle, width / 2 - xAxisTitleWidth / 2, height -3);
  
      const yAxisTitle = 'Number of Bacteria';
      const yAxisTitleWidth = ctx.measureText(yAxisTitle).width;
      ctx.save();
      ctx.translate(20, height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(yAxisTitle, -yAxisTitleWidth / 2, -11);
      ctx.restore();
  
      if (data.length === 0) {
        // Draw graph title
        ctx.font = 'bold 16px Arial';
        const graphTitle = 'Bacterial Growth Over Time';
        const graphTitleWidth = ctx.measureText(graphTitle).width;
        ctx.fillText(graphTitle, width / 2 - graphTitleWidth / 2, 20);
      } else {
        // Plot the data points
        ctx.beginPath();
        ctx.moveTo(50, height - 30 - data[0].count);
        data.forEach((point, index) => {
          const x = 50 + (index * (width - 60) / data.length);
          const y = height - 30 - (point.count * (height - 60) / Math.max(...data.map(d => d.count), 1));
          ctx.lineTo(x, y);
        });
        ctx.stroke();
  
        // tick marks and values on x-axis
        ctx.beginPath();
        data.forEach((point, index) => {
          const x = 50 + (index * (width - 60) / data.length);
          const y = height - 28;
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + 5);
          ctx.fillText(`${point.time}`, x - 5, y + 15);
        });
        ctx.stroke();
  
        // tick marks and values on y-axis
        ctx.beginPath();
        const maxBacteria = Math.max(...data.map(d => d.count), 1);
        for (let i = 0; i <= 10; i++) {
          const y = height - 30 - (i * (height - 60) / 10);
          ctx.moveTo(48, y);
          ctx.lineTo(52, y);
          ctx.fillText(`${Math.round(i * maxBacteria / 10)}`, 20, y + 5);
        }
        ctx.stroke();
  
        // Draw graph title
        ctx.font = 'bold 16px Arial';
        const graphTitle = 'Bacterial Growth Over Time';
        const graphTitleWidth = ctx.measureText(graphTitle).width;
        ctx.fillText(graphTitle, width / 2 - graphTitleWidth / 2, 20);
      }
    }
  }, [data, width, height]);
  

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
};

export default Graph;
