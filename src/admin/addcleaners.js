import React, { useEffect, useState } from "react";
import {
  Flex,
  Center,
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
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { api } from "../utils/utils";

const AddCleanerModal = () => {
  const [cleaners, setCleaners] = useState([]);
  const [editingCleanerId, setEditingCleanerId] = useState(null);
  const [formData, setFormData] = useState({});
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("cleaners/");
        setCleaners(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (cleaner) => {
    setEditingCleanerId(cleaner.id);
    setFormData(cleaner);
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
      const response = await api.put(`cleaners/${id}/`, formData);
      setCleaners((prevCleaners) =>
        prevCleaners.map((cleaner) =>
          cleaner.id === id ? response.data : cleaner
        )
      );
      toast({
        title: "Update Successful",
        description: "Cleaner details have been updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setEditingCleanerId(null);
    } catch (error) {
      console.error("Error updating Cleaner:", error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the Cleaner details.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await api.delete(`cleaners/${id}/`);
      setCleaners(cleaners.filter((cleaner) => cleaner.id !== id));
      toast({
        title: "Delete Successful",
        description: "Cleaner has been deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting Cleaner:", error);
      toast({
        title: "Delete Failed",
        description: "There was an error deleting the Cleaner.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAddCleaner = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("cleaners/", formData);
      setCleaners((prevCleaners) => [...prevCleaners, response.data]);
      toast({
        title: "Cleaner Added",
        description: "A new Cleaner has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error Adding Cleaner",
        description: "There was an error adding the new Cleaner.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex direction="column" p={4} gap={4}>
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
                value={formData.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Contact Information</FormLabel>
              <Input
                name="contact_information"
                value={formData.contact_information}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Photo URL</FormLabel>
              <Input
                name="photo_url"
                value={formData.photo_url}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Rating</FormLabel>
              <Input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button
              colorScheme="green"
              onClick={handleAddCleaner}
              isLoading={isLoading}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {cleaners.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Contact Information</Th>
              <Th>Rating</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cleaners.map((cleaner) => (
              <Tr key={cleaner.id}>
                <Td>
                  {editingCleanerId === cleaner.id ? (
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    cleaner.name
                  )}
                </Td>
                <Td>
                  {editingCleanerId === cleaner.id ? (
                    <Input
                      name="contact_information"
                      value={formData.contact_information}
                      onChange={handleInputChange}
                    />
                  ) : (
                    cleaner.contact_information
                  )}
                </Td>
                <Td>
                  {editingCleanerId === cleaner.id ? (
                    <Input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                    />
                  ) : (
                    cleaner.rating
                  )}
                </Td>
                <Td>
                  {editingCleanerId === cleaner.id ? (
                    <Button
                      colorScheme="teal"
                      onClick={() => handleSaveClick(cleaner.id)}
                    >
                      Save
                    </Button>
                  ) : (
                    <>
                      <Button
                        colorScheme="blue"
                        onClick={() => handleEditClick(cleaner)}
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDeleteClick(cleaner.id)}
                        ml={2}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Center>
          <Heading size="xl">No Cleaners found.</Heading>
        </Center>
      )}
    </Flex>
  );
};

export default AddCleanerModal;
