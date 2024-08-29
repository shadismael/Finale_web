import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
// Component to render charts for metrics

const MetricsGraph = ({ lineChartData, barChartData, buttonColor, navigate }) => {
  return (
    <div className={`p-6 rounded-lg shadow-lg mb-8 w-full max-w-4xl`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Patient Metrics</h2>
        <button 
          className="text-white px-4 py-2 rounded"
          style={{ backgroundColor: buttonColor }}
          onClick={() => navigate('/graphs')}
        >
          Show All The Graphs
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl mb-2">Blood Pressure</h3>
          <Line data={lineChartData} />
        </div>
        <div>
          <h3 className="text-xl mb-2">Cholesterol</h3>
          <Bar data={barChartData} />
        </div>
      </div>
    </div>
  );
};

export default MetricsGraph;
