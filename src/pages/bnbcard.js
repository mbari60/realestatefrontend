import React, { useState } from "react";
import {
  Box,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  Spacer,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import BookingModal from "./bookingbnb";

const AirbnbCard = ({
  id,
  name,
  location,
  description,
  price_per_night,
  rating,
  amenities,
  max_guests,
  photo_url,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const starArray = [];

    for (let i = 0; i < fullStars; i++) {
      starArray.push(<Icon as={FaStar} key={i} color="yellow.400" />);
    }

    if (hasHalfStar) {
      starArray.push(
        <Icon as={FaStarHalfAlt} key="half-star" color="yellow.400" />
      );
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < remainingStars; i++) {
      starArray.push(<Icon as={FaStar} key={`empty-${i}`} color="gray.400" />);
    }

    return starArray;
  };

  const handleBookNow = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Box borderWidth="1px" rounded="md" p={2} maxW="md" textAlign="center">
        <Image
          src={photo_url}
          alt={location}
          boxSize="200px"
          objectFit="cover"
          mx="auto"
        />
        <VStack spacing={1} mt={1}>
          <Text fontSize="md" fontWeight="bold">
            {name}
          </Text>
          <Text fontSize="md">Location: {location}</Text>
          <Text fontSize="md">Description: {description}</Text>
          <Text fontSize="md">Price per night: Ksh.{price_per_night}</Text>
          <Stack direction="row" alignItems="center" justify="center">
            <Text fontSize="md">Rating: </Text>
            <Box>{renderStars()}</Box>
          </Stack>
          <Text fontSize="md">Max guests: {max_guests}</Text>
          <Text fontSize="md">Amenities: {amenities.join(", ")}</Text>
        </VStack>
        <Spacer />
        <HStack mt={4} justify="center">
          <Button colorScheme="blue" size="md" onClick={handleBookNow}>
            Book Now
          </Button>
        </HStack>
      </Box>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        airbnb={id}
      />
    </>
  );
};

export default AirbnbCard;
