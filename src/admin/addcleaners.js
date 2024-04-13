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

const AddCleanerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cleanerData, setCleanerData] = useState({
    name: "",
    contact_information: "",
    photo_url: "",
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCleanerData({ ...cleanerData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("cleaners/", cleanerData);
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
        Add Cleaner
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Cleaner</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={cleanerData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Contact Information</FormLabel>
              <Input
                name="contact_information"
                value={cleanerData.contact_information}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Photo URL</FormLabel>
              <Input
                name="photo_url"
                value={cleanerData.photo_url}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Rating</FormLabel>
              <Input
                type="number"
                name="rating"
                value={cleanerData.rating}
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

export default AddCleanerModal;
