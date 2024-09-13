import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";

// Register Bar chart components
ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const CleanerAnalysis = ({ cleaners }) => {
  const cleanerNames = cleaners.map(cleaner => cleaner.name);
  const cleanerRatings = cleaners.map(cleaner => cleaner.rating);

  const data = {
    labels: cleanerNames,
    datasets: [
      {
        label: 'Cleaner Ratings',
        data: cleanerRatings,
        backgroundColor: '#4BC0C0',
      },
    ],
  };

  return (
    <div>
      <h3>Cleaner Analysis</h3>
      <div style={{ width: '400px', height: '400px' }}>
        <Bar data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default CleanerAnalysis;
