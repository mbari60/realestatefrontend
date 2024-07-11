import React, { useEffect, useState } from "react";
import {
  Center,
  Flex,
  Heading,
  Input,
  Select,
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

const AddApartmentModal = () => {
  const [apartments, setApartments] = useState([]);
  const [editingApartmentId, setEditingApartmentId] = useState(null);
  const [formData, setFormData] = useState({});
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [apartmentData, setApartmentData] = useState({
    location: "",
    name: "",
    description: "",
    price_per_month: "",
    rating: 0,
    amenities: [],
    booked: false,
    photo_url: "",
  });
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("apartments/");
        setApartments(response.data);
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

  const handleEditClick = (apartment) => {
    setEditingApartmentId(apartment.id);
    setFormData(apartment);
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
      const response = await api.put(`apartments/${id}/`, formData);
      setApartments((prevApartments) =>
        prevApartments.map((apartment) =>
          apartment.id === id ? response.data : apartment
        )
      );
      toast({
        title: "Update Successful",
        description: "Apartment details have been updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setEditingApartmentId(null);
    } catch (error) {
      console.error("Error updating apartment:", error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the apartment details.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
    setIsLoading(true);
    try {
      const dataToSend = { ...apartmentData, amenities: selectedAmenities };
      const response = await api.post("apartments/", dataToSend);
      setApartments((prevApartments) => [...prevApartments, response.data]);
      toast({
        title: "Apartment Added",
        description: "A new apartment has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error Adding Apartment",
        description: "There was an error adding the new apartment.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRemoveAmenity = (id) => {
    setSelectedAmenities(selectedAmenities.filter((amenity) => amenity !== id));
  };

 const handleDeleteApartment = async (id) => {
   try {
     await api.delete(`apartments/${id}/`);
     setApartments((prevApartments) =>
       prevApartments.filter((apartment) => apartment.id !== id)
     );
     toast({
       title: "Delete Successful",
       description: "Apartment has been deleted.",
       status: "success",
       duration: 3000,
       isClosable: true,
     });
   } catch (error) {
     console.error("Error deleting apartment:", error);
     toast({
       title: "Delete Failed",
       description: "There was an error deleting the apartment.",
       status: "error",
       duration: 3000,
       isClosable: true,
     });
   }
 };


  return (
    <Flex direction="column" p={4} gap={4}>
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
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={apartmentData.name}
                onChange={handleChange}
              />
            </FormControl>
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
            <Button
              colorScheme="green"
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {apartments.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Location</Th>
              <Th>Description</Th>
              <Th>Price per Month</Th>
              <Th>Rating</Th>
              <Th>Booked</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {apartments.map((apartment) => (
              <Tr key={apartment.id}>
                <Td>
                  {editingApartmentId === apartment.id ? (
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    apartment.name
                  )}
                </Td>
                <Td>
                  {editingApartmentId === apartment.id ? (
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  ) : (
                    apartment.location
                  )}
                </Td>
                <Td>
                  {editingApartmentId === apartment.id ? (
                    <Input
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  ) : (
                    apartment.description
                  )}
                </Td>
                <Td>
                  {editingApartmentId === apartment.id ? (
                    <Input
                      name="price_per_month"
                      value={formData.price_per_month}
                      onChange={handleInputChange}
                    />
                  ) : (
                    apartment.price_per_month
                  )}
                </Td>
                <Td>
                  {editingApartmentId === apartment.id ? (
                    <Input
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                    />
                  ) : (
                    apartment.rating
                  )}
                </Td>
                <Td>
                  {editingApartmentId === apartment.id ? (
                    <Select
                      name="booked"
                      value={formData.booked}
                      onChange={handleInputChange}
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </Select>
                  ) : apartment.booked ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </Td>
                <Td>
                  {editingApartmentId === apartment.id ? (
                    <Button
                      colorScheme="teal"
                      onClick={() => handleSaveClick(apartment.id)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Stack direction="row" spacing={2}>
                      <Button
                        colorScheme="blue"
                        onClick={() => handleEditClick(apartment)}
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDeleteApartment(apartment.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Center>
          <Heading size="xl">No apartments found.</Heading>
        </Center>
      )}
    </Flex>
  );
};

export default AddApartmentModal;
