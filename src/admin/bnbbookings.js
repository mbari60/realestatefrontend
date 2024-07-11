import React, { useState, useEffect } from "react";
import { api } from "../utils/utils";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Center,
  Input,
  Box,
} from "@chakra-ui/react";

const BnbBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateSearchTerm, setDateSearchTerm] = useState("");
  const [userData, setUserData] = useState({});
  const [airbnbData, setAirbnbData] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []); // Empty dependency array to run once on mount

  const fetchBookings = async () => {
    try {
      const response = await api.get("bnb_bookings/");
      const bookingsData = response.data;
      setBookings(bookingsData);
      setFilteredBookings(bookingsData);
      fetchUserData(bookingsData);
      fetchAirbnbData(bookingsData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchUserData = async (bookings) => {
    const users = [...new Set(bookings.map((booking) => booking.user))];
    for (const userId of users) {
      try {
        const response = await api.get(`users/${userId}/`);
        setUserData((prevData) => ({
          ...prevData,
          [userId]: response.data.username,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const fetchAirbnbData = async (bookings) => {
    const airbnbs = [...new Set(bookings.map((booking) => booking.airbnb))];
    for (const airbnbId of airbnbs) {
      try {
        const response = await api.get(`airbnbs/${airbnbId}/`);
        setAirbnbData((prevData) => ({
          ...prevData,
          [airbnbId]: response.data.name,
        }));
      } catch (error) {
        console.error("Error fetching Airbnb data:", error);
      }
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    filterBookings(value, dateSearchTerm);
  };

  const handleDateSearch = (e) => {
    const { value } = e.target;
    setDateSearchTerm(value);
    filterBookings(searchTerm, value);
  };

  const filterBookings = (searchTerm, dateSearchTerm) => {
    const filtered = bookings.filter((booking) => {
      const airbnbName = airbnbData[booking.airbnb];
      return (
        airbnbName &&
        airbnbName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (booking.start_date.includes(dateSearchTerm) ||
          booking.end_date.includes(dateSearchTerm))
      );
    });
    setFilteredBookings(filtered);
  };

  return (
    <Center>
      <Box width="100%" maxWidth="800px" padding="20px">
        <Center>
          <Text fontSize="lg" fontWeight="bold" fontStyle="italic">
            Airbnb Bookings
          </Text>
        </Center>
        <br />
        <hr />
        <Input
          type="text"
          placeholder="Search by airbnb name"
          value={searchTerm}
          onChange={handleSearch}
          mb={4}
        />
        <Input
          type="text"
          placeholder="Search by date (YYYY-MM-DD)"
          value={dateSearchTerm}
          onChange={handleDateSearch}
          mb={4}
        />
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Airbnb</Th>
              <Th>Start Date</Th>
              <Th>End Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredBookings.map((booking) => (
              <Tr key={booking.id}>
                <Td>{userData[booking.user]}</Td>
                <Td>{airbnbData[booking.airbnb]}</Td>
                <Td>{booking.start_date}</Td>
                <Td>{booking.end_date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Center>
  );
};

export default BnbBookings;
