import React, { useEffect, useState, useContext } from "react";
import {
  Center,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Select,
  useToast,
} from "@chakra-ui/react";
import { api } from "../utils/utils";
import ApartmentCard from "./apartmentcard";
import { AuthContext } from "../context/authcontext";

const Apartments = () => {
  const [apartments, setApartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const toast = useToast();
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
      if (!user) {
       toast({
        title: "Login Required",
        description: "You need to login before booking.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
      }
      const res = await api.post(`appartment_bookings/`, { apartment: id, user: user.id }); // Send user ID along with apartment ID
      // Update UI or show success message
      toast({
        title: "succees",
        description: "you have succefully booked this apartment an email will be sent to you",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Update booked status of the apartment
      setApartments((prevApartments) =>
        prevApartments.map((apartment) =>
          apartment.id === id ? { ...apartment, booked: true } : apartment
        )
      );
    } catch (error) {
      console.log(error)
    }
  };

  // Filter apartments based on search term and selected location
  const filteredApartments = apartments.filter(
    (apartment) =>
      !apartment.booked &&
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
              user={user} // Pass user object to ApartmentCard
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
