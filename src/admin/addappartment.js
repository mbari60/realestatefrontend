import React, { useState, useEffect } from "react";
import { api } from "../utils/utils";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Checkbox,
  Text,
  Stack,
  CloseButton,
  Box,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, onStarClick }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (star) => {
    onStarClick(star);
  };

  const handleMouseEnter = (star) => {
    setHoverRating(star);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Box
            as="button"
            key={starValue}
            color={
              starValue <= (hoverRating || rating) ? "yellow.500" : "gray.300"
            }
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
          >
            <FaStar />
          </Box>
        );
      })}
    </div>
  );
};

const AddApartmentModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apartmentData, setApartmentData] = useState({
    location: "",
    description: "",
    price_per_month: "",
    rating: 0, // Initialize rating as 0
    amenities: [],
    booked: false,
    photo_url: "",
  });
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await api.get("amenities/");
        setAmenities(response.data);
      } catch (error) {
        console.error("Error fetching amenities:", error);
      }
    };

    fetchAmenities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApartmentData({ ...apartmentData, [name]: value });
  };

  const handleAmenityChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedAmenities([...selectedAmenities, value]);
    } else {
      setSelectedAmenities(
        selectedAmenities.filter((amenity) => amenity !== value)
      );
    }
  };

  const handleStarClick = (rating) => {
    setApartmentData({ ...apartmentData, rating: rating });
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = { ...apartmentData, amenities: selectedAmenities };
      const response = await api.post("apartments/", dataToSend);
      console.log(response.data);
      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRemoveAmenity = (id) => {
    setSelectedAmenities(selectedAmenities.filter((amenity) => amenity !== id));
  };

  return (
    <>
      <Button colorScheme="blue" onClick={() => setIsOpen(true)}>
        Add Apartment
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Apartment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input
                name="location"
                value={apartmentData.location}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={apartmentData.description}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price Per Month</FormLabel>
              <Input
                name="price_per_month"
                value={apartmentData.price_per_month}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Rating</FormLabel>
              <StarRating
                rating={apartmentData.rating}
                onStarClick={handleStarClick}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Amenities</FormLabel>
              <Stack spacing={2}>
                {amenities.map((amenity) => (
                  <Checkbox
                    key={amenity.id}
                    value={amenity.id}
                    onChange={handleAmenityChange}
                  >
                    {amenity.name}
                  </Checkbox>
                ))}
              </Stack>
            </FormControl>
            {selectedAmenities.length > 0 && (
              <FormControl>
                <FormLabel>Selected Amenities</FormLabel>
                <Stack spacing={2}>
                  {selectedAmenities.map((id) => {
                    const selectedAmenity = amenities.find(
                      (amenity) => amenity.id === id
                    );
                    return (
                      <Stack direction="row" key={id} alignItems="center">
                        <Text>{selectedAmenity && selectedAmenity.name}</Text>
                        <CloseButton onClick={() => handleRemoveAmenity(id)} />
                      </Stack>
                    );
                  })}
                </Stack>
              </FormControl>
            )}
            <FormControl>
              <FormLabel>Photo URL</FormLabel>
              <Input
                name="photo_url"
                value={apartmentData.photo_url}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={handleSubmit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddApartmentModal;
