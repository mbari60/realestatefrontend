import React, { useState, useEffect } from "react";
import { api } from "../utils/utils";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const TransportList = () => {
  const [transportData, setTransportData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const fetchTransportData = async () => {
    try {
      const response = await api.get("transport/");
      setTransportData(response.data);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Failed to fetch transport data. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchTransportData();
  });

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const starArray = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      starArray.push(<Icon as={FaStar} key={i} color="yellow.400" />);
    }

    // Add half star if applicable
    if (hasHalfStar) {
      starArray.push(
        <Icon as={FaStarHalfAlt} key="half-star" color="yellow.400" />
      );
    }

    // Add remaining empty stars
    const remainingStars = 5 - starArray.length;
    for (let i = 0; i < remainingStars; i++) {
      starArray.push(
        <Icon as={FaStar} key={`empty-star-${i}`} color="gray.400" />
      );
    }

    return starArray;
  };

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" py={6}>
      <Heading as="h2" size="xl" mb={6}>
        Transport Services
      </Heading>
      <Flex
        direction="row"
        alignItems="flex-start"
        justifyContent="center"
        flexWrap="wrap"
        w="100%"
        maxW="1200px"
      >
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          transportData.map((transport) => (
            <Box
              key={transport.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              mb={4}
              mx={2}
              w={{
                base: "100%",
                sm: "calc(50% - 16px)",
                md: "calc(33.333% - 16px)",
                lg: "calc(25% - 16px)",
              }}
              maxW="800px"
              boxShadow="md"
            >
              <Image
                src={transport.photo_url}
                alt={transport.name}
                maxW="100%"
                objectFit="cover"
                mb={4}
              />
              <Heading as="h3" size="md" mb={2}>
                {transport.name}
              </Heading>
              <Text fontSize="sm" mb={2}>
                Contact Information: {transport.contact_information}
              </Text>
              <Text fontSize="sm" mb={2}>
                Service Type: {transport.service_type}
              </Text>
              <Flex mb={2}>
                <Text mr={2}>Rating:</Text>
                <Flex>{renderStars(transport.rating)}</Flex>
              </Flex>
            </Box>
          ))
        )}
      </Flex>
    </Flex>
  );
};

export default TransportList;
