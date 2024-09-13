import React, { useEffect, useState } from 'react';
import { api } from '../utils/utils';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Pie chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const MaintenanceRequestAnalysis = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get('maintenance/');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching maintenance requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const solvedRequests = requests.filter(request => request.solved).length;
  const unsolvedRequests = requests.length - solvedRequests;

  const data = {
    labels: ['Solved', 'Unsolved'],
    datasets: [
      {
        data: [solvedRequests, unsolvedRequests],
        backgroundColor: ['#FF6384', '#FFCE56'],
      },
    ],
  };

  return (
    <div>
      <h3>Maintenance Request Analysis</h3>
      <div style={{ width: '400px', height: '400px' }}>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default MaintenanceRequestAnalysis;
