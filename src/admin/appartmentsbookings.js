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
  Button,
  Box,
  Input,
} from "@chakra-ui/react";

const AppartmentBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get("all_appartment_bookings/");
      setBookings(response.data);
      setFilteredBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterBookings(e.target.value);
  };

  const filterBookings = (searchTerm) => {
    const filtered = bookings.filter(
      (booking) =>
        booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookings(filtered);
  };

  const handleDeclareVacant = async (id) => {
    try {
      await api.post(`declare_vacant/`, { apartment: id });
      fetchBookings();
    } catch (error) {
      console.error("Error declaring apartment vacant:", error);
    }
  };

  return (
    <Center>
      <Box width="100%" maxWidth="800px" padding="20px">
        <Center>
          <Text fontSize="lg" fontWeight="bold" fontStyle="italic">
            Appartment Bookings
          </Text>
        </Center>
        <Box mb={4} width="100%">
          <Input
            type="text"
            placeholder="Search by apartment name or location"
            value={searchTerm}
            onChange={handleSearch}
            width="100%"
          />
        </Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Location</Th>
              <Th>Price per month</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredBookings.map((booking) => (
              <Tr key={booking.id}>
                <Td>{booking.name}</Td>
                <Td>{booking.location}</Td>
                <Td>{booking.price_per_month}</Td>
                <Td>
                  <Button onClick={() => handleDeclareVacant(booking.id)}>
                    Declare Vacant
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Center>
  );
};

export default AppartmentBookings;
