import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Pie chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const ApartmentAnalysis = ({ apartments, bookings }) => {
  const bookedApartments = apartments.filter(apartment => apartment.booked).length;
  const notBookedApartments = apartments.length - bookedApartments;

  const data = {
    labels: ['Booked', 'Not Booked'],
    datasets: [
      {
        data: [bookedApartments, notBookedApartments],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <div>
      <h3>Apartment Analysis</h3>
      <div style={{ width: '400px', height: '400px' }}>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default ApartmentAnalysis;
