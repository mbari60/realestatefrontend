import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";

// Register Bar chart components
ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const TransportAnalysis = ({ transports }) => {
  const transportNames = transports.map(transport => transport.name);
  const transportRatings = transports.map(transport => transport.rating);

  const data = {
    labels: transportNames,
    datasets: [
      {
        label: 'Transport Ratings',
        data: transportRatings,
        backgroundColor: '#36A2EB',
      },
    ],
  };

  return (
    <div>
      <h3>Transport Service Analysis</h3>
      <div style={{ width: '400px', height: '400px' }}>
        <Bar data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default TransportAnalysis;
