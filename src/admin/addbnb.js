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

const AddBnBModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bnbData, setBnbData] = useState({
    name: "",
    location: "",
    description: "",
    price_per_night: "",
    rating: 0, // Initialize rating as 0
    amenities: [],
    max_guests: 1,
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
    setBnbData({ ...bnbData, [name]: value });
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
    setBnbData({ ...bnbData, rating: rating });
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = { ...bnbData, amenities: selectedAmenities };
      const response = await api.post("airbnbs/", dataToSend);
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
        Add BnB
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add BnB</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={bnbData.name} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input
                name="location"
                value={bnbData.location}
                onChange={handleChange}
                isRequired
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={bnbData.description}
                onChange={handleChange}
                isRequired
              />
            </FormControl>
            <FormControl>
              <FormLabel>Maximum guests</FormLabel>
              <Input
                type="number"
                name="max_guests"
                value={bnbData.max_guests}
                onChange={handleChange}
                isRequired
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price Per Night</FormLabel>
              <Input
                name="price_per_night"
                value={bnbData.price_per_night}
                onChange={handleChange}
                isRequired
              />
            </FormControl>
            <FormControl>
              <FormLabel>Rating</FormLabel>
              <StarRating
                rating={bnbData.rating}
                onStarClick={handleStarClick}
                isRequired
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
                value={bnbData.photo_url}
                onChange={handleChange}
                isRequired
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

export default AddBnBModal;
