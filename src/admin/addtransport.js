import React, { useState, useEffect } from "react";
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Center,
  Heading,
} from "@chakra-ui/react";
import { api } from "../utils/utils";

const AddTransportModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [transports, setTransports] = useState([]);
  const [transportData, setTransportData] = useState({
    name: "",
    contact_information: "",
    service_type: "",
    rating: 0,
    photo_url: "", // Include photo_url for adding transport
  });
  const [editingTransportId, setEditingTransportId] = useState(null); // Track editing transport ID
  const toast = useToast();

  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const response = await api.get("transport/");
        setTransports(response.data);
      } catch (error) {
        console.error("Error fetching transports:", error);
      }
    };

    fetchTransports();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransportData({ ...transportData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("transport/", transportData);
      setTransports((prevTransports) => [...prevTransports, response.data]);
      toast({
        title: "Transport Service Added",
        description: "A new transport service has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsOpen(false);
      setTransportData({
        name: "",
        contact_information: "",
        service_type: "",
        rating: 0,
        photo_url: "",
      }); // Clear form data after submission
    } catch (error) {
      console.error("Error adding transport service:", error);
      toast({
        title: "Error Adding Transport Service",
        description: "There was an error adding the new transport service.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEditClick = (transport) => {
    setEditingTransportId(transport.id);
    setTransportData({
      name: transport.name,
      contact_information: transport.contact_information,
      service_type: transport.service_type,
      rating: transport.rating,
      photo_url: transport.photo_url,
    });
    setIsOpen(true); // Open modal for editing
  };

  const handleSaveClick = async () => {
    try {
      const response = await api.put(
        `transport/${editingTransportId}/`,
        transportData
      );
      setTransports((prevTransports) =>
        prevTransports.map((transport) =>
          transport.id === editingTransportId ? response.data : transport
        )
      );
      toast({
        title: "Update Successful",
        description: "Transport service details have been updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsOpen(false);
      setEditingTransportId(null);
      setTransportData({
        name: "",
        contact_information: "",
        service_type: "",
        rating: 0,
        photo_url: "",
      }); // Clear form data after update
    } catch (error) {
      console.error("Error updating transport service:", error);
      toast({
        title: "Update Failed",
        description:
          "There was an error updating the transport service details.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await api.delete(`transport/${id}/`);
      setTransports((prevTransports) =>
        prevTransports.filter((transport) => transport.id !== id)
      );
      toast({
        title: "Transport Service Deleted",
        description: "Transport service has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting transport service:", error);
      toast({
        title: "Error Deleting Transport Service",
        description: "There was an error deleting the transport service.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingTransportId(null); // Reset editing state on modal close
    setTransportData({
      name: "",
      contact_information: "",
      service_type: "",
      rating: 0,
      photo_url: "",
    }); // Clear form data on modal close
  };

  return (
    <>
      <Center marginTop={2}>
        <Button colorScheme="blue" onClick={() => setIsOpen(true)}>
          Add Transport
        </Button>
      </Center>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingTransportId ? "Edit" : "Add"} Transport Service
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={transportData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Contact Information</FormLabel>
              <Input
                name="contact_information"
                value={transportData.contact_information}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Service Type</FormLabel>
              <Input
                name="service_type"
                value={transportData.service_type}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Photo URL</FormLabel>
              <Input
                name="photo_url"
                value={transportData.photo_url}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Rating</FormLabel>
              <Input
                type="number"
                name="rating"
                value={transportData.rating}
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
              onClick={editingTransportId ? handleSaveClick : handleSubmit}
            >
              {editingTransportId ? "Save" : "Add"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {transports.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Contact Information</Th>
              <Th>Service Type</Th>
              <Th>Rating</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transports.map((transport) => (
              <Tr key={transport.id}>
                <Td>{transport.name}</Td>
                <Td>{transport.contact_information}</Td>
                <Td>{transport.service_type}</Td>
                <Td>{transport.rating}</Td>
                <Td>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleEditClick(transport)}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    ml={2}
                    onClick={() => handleDeleteClick(transport.id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Center>
          <Heading size="xl">No Transports available.</Heading>
        </Center>
      )}
    </>
  );
};

export default AddTransportModal;
