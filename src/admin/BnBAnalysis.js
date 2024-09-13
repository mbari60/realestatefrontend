import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { api } from '../utils/utils';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components for pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

function BnBAnalysis({ bnbs = [] }) {
  // State to store BnB names and locations fetched from the API
  const [bnbNames, setBnbNames] = useState({});
  const [bnbLocations, setBnbLocations] = useState({});
  // State to store data for the pie chart
  const [chartData, setChartData] = useState({});
  // State to store location analysis
  const [locationAnalysis, setLocationAnalysis] = useState({});

  useEffect(() => {
    // Function to fetch BnB data and update state
    const fetchBnbData = async () => {
      try {
        // Extract unique BnB IDs from the bnbs array
        const ids = [...new Set(bnbs.map(bnb => bnb.airbnb))];
        if (ids.length === 0) return []; // Return array if no BnB IDs to fetch

        // Create an array of promises to fetch data for each BnB ID
        const namePromises = ids.map(id => api.get(`airbnbs/${id}/`));
        // Wait for all promises to resolve
        const responses = await Promise.all(namePromises);

        // Initialize objects to hold names and locations
        const names = {};
        const locations = {};
        // Process each response
        responses.forEach(response => {
          const bnb = response.data;
          names[bnb.id] = bnb.name; // Store BnB name
          locations[bnb.id] = bnb.location; // Store BnB location (assuming available)
        });

        // Update state with fetched names and locations
        setBnbNames(names);
        setBnbLocations(locations);

        // Calculate bookings count for each BnB
        const bookingCounts = {};
        bnbs.forEach((booking) => {
          const bnbId = booking.airbnb;
          if (!bookingCounts[bnbId]) {
            bookingCounts[bnbId] = 0;
          }
          if (!booking.booked) {
            bookingCounts[bnbId] += 1; // Increment count if not booked
          }
        });

        // Prepare data for the pie chart
        setChartData({ // getting only keys from the bookingCounts
          labels: Object.keys(bookingCounts).map(id => names[id] || `BnB ${id}`),
          datasets: [
            {
              label: "Bookings",
              data: Object.values(bookingCounts), // getting only values from the bookingCounts
              backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
              borderColor: "#fff",
              borderWidth: 1,
            },
          ],
        });

        // Analyze location data
        const locationCounts = {};
        bnbs.forEach((booking) => {
          const location = locations[booking.airbnb];
          if (!locationCounts[location]) {
            locationCounts[location] = 0;
          }
          if (!booking.booked) {
            locationCounts[location] += 1; // Increment count for the location
          }
        });
        
        // Update state with location analysis data
        setLocationAnalysis(locationCounts);

      } catch (error) {
        // Handle errors if fetching data fails
        console.error("Error fetching BnB data:", error);
      }
    };

    // Call the function to fetch data when the component mounts or bnbs change
    fetchBnbData();
  }, [bnbs]);

  return (
    <div>
      <h2>BnB Booking Distribution</h2>
      <div style={{ width: '400px', height: '400px' }}>
        {chartData.labels ? <Pie data={chartData} /> : <p>Loading chart...</p>}
      </div>
      <div>
        <h3>Most Popular Locations</h3>
        {Object.keys(locationAnalysis).length > 0 ? (
          <ul>
            {Object.entries(locationAnalysis).map(([location, count]) => (
              <li key={location}>{location}: {count} bookings</li>
            ))}
          </ul>
        ) : (
          <p>Loading location analysis...</p>
        )}
      </div>
    </div>
  );
}

export default BnBAnalysis;
