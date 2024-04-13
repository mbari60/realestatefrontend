import React, { useState } from "react";
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
} from "@chakra-ui/react";

const AddTransportModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [transportData, setTransportData] = useState({
    name: "",
    contact_information: "",
    service_type: "",
    photo_url: "",
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransportData({ ...transportData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("transport/", transportData);
      console.log(response.data);
      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button colorScheme="blue" onClick={() => setIsOpen(true)}>
        Add Transport
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Transport Service</ModalHeader>
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
            <Button colorScheme="green" onClick={handleSubmit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTransportModal;
