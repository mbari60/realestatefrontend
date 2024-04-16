// Updated ApartmentCard component with reduced space between cards
import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  Icon,
  Stack,
  Center,
} from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const ApartmentCard = ({
  name,
  location,
  description,
  price_per_month,
  rating,
  amenities,
  booked,
  photo_url,
  isLoading,
  onBookNow,
}) => {
  const renderStars = () => {
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
    <Box
      borderWidth="1px"
      rounded="md"
      p={4}
      maxW="sm"
      textAlign="center"
      boxShadow="md"
      mb={4}
    >
      <Image
        src={photo_url}
        alt={location}
        boxSize="200px"
        objectFit="cover"
        mx="auto"
        mb={4}
      />
      <Stack spacing={2}>
        <Heading as="h2" size="md">
          {name}
        </Heading>
        <Text fontSize="md" fontStyle="italic">
          {location}
        </Text>
        <Text fontSize="md">{description}</Text>
        <Text fontSize="md">Price: Ksh.{price_per_month} per month</Text>
        <Stack direction="row" alignItems="center" justify="center">
          <Text fontSize="md">Rating: </Text>
          <Box>{renderStars()}</Box>
        </Stack>
        <Text fontSize="md">Amenities: {amenities.join(", ")}</Text>
        <Text fontSize="md">{booked ? "Booked" : "Available"}</Text>
        {!booked && (
          <Center>
            <Button
              colorScheme="blue"
              size="md"
              mt={4}
              onClick={onBookNow}
              isLoading={isLoading}
              loadingText="booking"
            >
              Book Now
            </Button>
          </Center>
        )}
      </Stack>
    </Box>
  );
};

export default ApartmentCard;
