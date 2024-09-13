import React, { useEffect, useState } from 'react';
import { api } from '../utils/utils';
import ApartmentAnalysis from './ApartmentAnalysis';
import BnBAnalysis from './BnBAnalysis';
import CleanerAnalysis from './CleanerAnalysis';
import TransportAnalysis from './TransportAnalysis';
import MaintenanceRequestAnalysis from './MaintenanceRequestAnalysis';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

// Register Chart.js components for pie and bar charts
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function Analysis() {
  const [apartments, setApartments] = useState([]);
  const [bnbs, setBnBs] = useState([]);
  const [transports, setTransports] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const [apartBookings, setApartBookings] = useState([]);
  const [bnbBookings, setBnBBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnalysis, setSelectedAnalysis] = useState('apartment');

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [apartmentRes, bnbRes, transRes, cleanersRes, apartBookingRes, bnbBookingRes] = await Promise.all([
          api.get('apartments/'),
          api.get('bnb_bookings/'),
          api.get('transport/'),
          api.get('cleaners/'),
          api.get('appartment_bookings/'),
          api.get('bnb_bookings/'),
        ]);

        // Set state for each data type
        setApartments(apartmentRes.data);
        setBnBs(bnbRes.data);
        setTransports(transRes.data);
        setCleaners(cleanersRes.data);
        setApartBookings(apartBookingRes.data);
        setBnBBookings(bnbBookingRes.data);
        
        // Log fetched data
        console.log("Fetched Apartments:", apartmentRes.data);
        console.log("Fetched BnB Bookings:", bnbBookingRes.data);
        console.log("Fetched Cleaners:", cleanersRes.data);
        console.log("Fetched Transports:", transRes.data);
        console.log("Fetched Apartment Bookings:", apartBookingRes.data);
        console.log("Fetched BnB Names:", bnbRes.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle dropdown selection
  const handleSelectChange = (e) => {
    setSelectedAnalysis(e.target.value);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <main>
      <h2>Overall Analysis</h2>
      {/* Dropdown Filter */}
      <div>
        <label htmlFor="analysis-select">Select Analysis Type:</label>
        <select id="analysis-select" value={selectedAnalysis} onChange={handleSelectChange}>
          <option value="apartment">Apartment Analysis</option>
          <option value="bnb">BnB Analysis</option>
          <option value="cleaner">Cleaner Analysis</option>
          <option value="transport">Transport Service Analysis</option>
          <option value="maintenance">Maintenance Request Analysis</option>
        </select>
      </div>

      {/* Conditionally render the selected analysis */}
      {selectedAnalysis === 'apartment' && <ApartmentAnalysis apartments={apartments} bookings={apartBookings} />}
      {selectedAnalysis === 'bnb' && <BnBAnalysis bnbs={bnbBookings} />}
      {selectedAnalysis === 'cleaner' && <CleanerAnalysis cleaners={cleaners} />}
      {selectedAnalysis === 'transport' && <TransportAnalysis transports={transports} />}
      {selectedAnalysis === 'maintenance' && <MaintenanceRequestAnalysis />}
    </main>
  );
}

export default Analysis;
