import React, { useEffect, useState } from "react";
import {
  Center,
  Flex,
  Heading,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  CloseButton,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { api } from "../utils/utils";

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
  const [airbnbs, setAirbnbs] = useState([]);
  const [editingAirbnbId, setEditingAirbnbId] = useState(null);
  const [formData, setFormData] = useState({});
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [bnbData, setBnbData] = useState({
    name: "",
    location: "",
    description: "",
    price_per_night: "",
    rating: 0,
    amenities: [],
    max_guests: 1,
    photo_url: "",
  });
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("airbnbs/");
        setAirbnbs(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchAmenities = async () => {
      try {
        const response = await api.get("amenities/");
        setAmenities(response.data);
      } catch (error) {
        console.error("Error fetching amenities:", error);
      }
    };

    fetchData();
    fetchAmenities();
  }, []);

  const handleEditClick = (bnb) => {
    setEditingAirbnbId(bnb.id);
    setFormData(bnb);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async (id) => {
    try {
      const response = await api.put(`airbnbs/${id}/`, formData);
      setAirbnbs((prevAirbnbs) =>
        prevAirbnbs.map((bnb) => (bnb.id === id ? response.data : bnb))
      );
      toast({
        title: "Update Successful",
        description: "Airbnb details have been updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setEditingAirbnbId(null);
    } catch (error) {
      console.error("Error updating Airbnb:", error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the Airbnb details.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await api.delete(`airbnbs/${id}/`);
      setAirbnbs((prevAirbnbs) => prevAirbnbs.filter((bnb) => bnb.id !== id));
      toast({
        title: "Delete Successful",
        description: "Airbnb has been deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting Airbnb:", error);
      toast({
        title: "Delete Failed",
        description: "There was an error deleting the Airbnb.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
      setAirbnbs((prevAirbnbs) => [...prevAirbnbs, response.data]);
      toast({
        title: "Airbnb Added",
        description: "A new Airbnb has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error Adding Airbnb",
        description: "There was an error adding the new Airbnb.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRemoveAmenity = (id) => {
    setSelectedAmenities(selectedAmenities.filter((amenity) => amenity !== id));
  };

  return (
    <Flex direction="column" p={4} gap={4}>
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
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={bnbData.description}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Maximum Guests</FormLabel>
              <Input
                type="number"
                name="max_guests"
                value={bnbData.max_guests}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price Per Night</FormLabel>
              <Input
                name="price_per_night"
                value={bnbData.price_per_night}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Rating</FormLabel>
              <StarRating
                rating={bnbData.rating}
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
                value={bnbData.photo_url}
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
      {airbnbs.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Location</Th>
              <Th>Description</Th>
              <Th>Price Per Night</Th>
              <Th>Rating</Th>
              <Th>Max Guests</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {airbnbs.map((bnb) => (
              <Tr key={bnb.id}>
                <Td>
                  {editingAirbnbId === bnb.id ? (
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    bnb.name
                  )}
                </Td>
                <Td>
                  {editingAirbnbId === bnb.id ? (
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  ) : (
                    bnb.location
                  )}
                </Td>
                <Td>
                  {editingAirbnbId === bnb.id ? (
                    <Input
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  ) : (
                    bnb.description
                  )}
                </Td>
                <Td>
                  {editingAirbnbId === bnb.id ? (
                    <Input
                      name="price_per_night"
                      value={formData.price_per_night}
                      onChange={handleInputChange}
                    />
                  ) : (
                    bnb.price_per_night
                  )}
                </Td>
                <Td>
                  {editingAirbnbId === bnb.id ? (
                    <StarRating
                      rating={formData.rating}
                      onStarClick={(rating) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          rating: rating,
                        }))
                      }
                    />
                  ) : (
                    bnb.rating
                  )}
                </Td>
                <Td>
                  {editingAirbnbId === bnb.id ? (
                    <Input
                      type="number"
                      name="max_guests"
                      value={formData.max_guests}
                      onChange={handleInputChange}
                    />
                  ) : (
                    bnb.max_guests
                  )}
                </Td>
                <Td>
                  {editingAirbnbId === bnb.id ? (
                    <Button
                      colorScheme="teal"
                      onClick={() => handleSaveClick(bnb.id)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Flex>
                      <Button
                        colorScheme="blue"
                        onClick={() => handleEditClick(bnb)}
                        mr={2}
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDeleteClick(bnb.id)}
                      >
                        Delete
                      </Button>
                    </Flex>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Center>
          <Heading size="xl">No Airbnbs found.</Heading>
        </Center>
      )}
    </Flex>
  );
};

export default AddBnBModal;
