import React, { useEffect, useState } from "react";
import {
  Flex,
  Input,

  Select,
  SimpleGrid,
  Heading,
  Center,
} from "@chakra-ui/react";
import AirbnbCard from "./bnbcard";
import { api } from "../utils/utils";

const Airbnbs = () => {
  const [airbnbs, setAirbnbs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`airbnbs/`);
        setAirbnbs(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Extract unique locations from airbnbs
  const locations = Array.from(
    new Set(airbnbs.map((airbnb) => airbnb.location))
  );

  // Function to handle location filter
  const handleLocationFilter = (location) => {
    setSelectedLocation(location);
  };

  // Function to handle booking
  const handleBookNow = (id) => {
    api
      .post(`bookings`, { id })
      .then((response) => {
        console.log("Booking successful:", response.data);
      })
      .catch((error) => {
        console.error("Error booking:", error);
      });
  };

  // Filter airbnbs based on search term and selected location
  const filteredAirbnbs = airbnbs.filter(
    (airbnb) =>
      airbnb.location.toLowerCase().includes(selectedLocation.toLowerCase()) &&
      (searchTerm === "" ||
        airbnb.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Flex direction="column" p={4} gap={4}>
      <Input
        placeholder="Search by description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Flex gap={2}>
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
      </Flex>
      {filteredAirbnbs.length > 0 ? (
        <SimpleGrid columns={{ sm: 1, md: 3, lg: 4 }} spacing={5}>
          {filteredAirbnbs.map((airbnb, index) => (
            <AirbnbCard
              key={index}
              {...airbnb}
              onBookNow={() => handleBookNow(airbnb.id)}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Center>
          <Heading size="xl">No Airbnbs found.</Heading>
        </Center>
      )}
    </Flex>
  );
};

export default Airbnbs;
