import React, { useEffect, useState } from "react";
import {
  Center,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Select,
} from "@chakra-ui/react";
import { api } from "../utils/utils";
import ApartmentCard from "./apartmentcard";

const Apartments = () => {
  const [apartments, setApartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`apartments`);
        setApartments(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Extract unique locations from apartments
  const locations = Array.from(
    new Set(apartments.map((apartment) => apartment.location))
  );

  // Function to handle location filter
  const handleLocationFilter = (location) => {
    setSelectedLocation(location);
  };

  // Function to handle booking
  const handleBookNow = async (id) => {
    try {
      await api.post(`/bookings`, { apartmentId: id });
      // Optional: Show success message or update UI
      console.log("Booking successful!");
    } catch (error) {
      console.error("Error booking apartment:", error);
      // Optional: Show error message or handle error
    }
  };

  // Filter apartments based on search term and selected location
  const filteredApartments = apartments.filter(
    (apartment) =>
      apartment.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLocation === "" || apartment.location === selectedLocation)
  );

  return (
    <Flex direction="column" p={4} gap={4}>
      <Input
        placeholder="Search by location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Select
        placeholder="Select location..."
        value={selectedLocation}
        onChange={(e) => handleLocationFilter(e.target.value)}
      >
        <option value="">All Locations</option>
        {locations.map((location, index) => (
          <option key={index} value={location}>
            {location}
          </option>
        ))}
      </Select>
      {filteredApartments.length > 0 ? (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
          {filteredApartments.map((apartment, index) => (
            <ApartmentCard
              key={index}
              {...apartment}
              onBookNow={() => handleBookNow(apartment.id)}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Center>
          <Heading size="xl">No apartments found.</Heading>
        </Center>
      )}
    </Flex>
  );
};

export default Apartments;
