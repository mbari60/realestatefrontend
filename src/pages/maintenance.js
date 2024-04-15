import React, { useState , useContext } from "react";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { api } from "../utils/utils";
import { AuthContext } from "../context/authcontext";

const MaintenanceRequestForm = () => {
  const {user} = useContext(AuthContext)
  const [apartment, setApartment] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Combine apartment and houseNumber as a single string
      const apartmentAddress = `Apartment name: ${apartment}, House number: ${houseNumber}`;

      // Make API call to submit maintenance request
      const response = await api.post("maintenance/", {
        apartment: apartmentAddress,
        issue_description: issueDescription,
        user:user.id,
      });

      console.log("Maintenance request submitted:", response.data);

      toast({
        title: "Maintenance Request Submitted",
        description:
          "Your maintenance request has been submitted successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset form fields
      setApartment("");
      setHouseNumber("");
      setIssueDescription("");
    } catch (error) {
      console.error("Error submitting maintenance request:", error);

      toast({
        title: "An error occurred",
        description:
          "Failed to submit maintenance request. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" py={6}>
      <Heading as="h2" size="xl" mb={6}>
        Maintenance Request Form
      </Heading>
      <Box
        w="100%"
        maxW="600px"
        p={6}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
      >
        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="apartment">Apartment Name</FormLabel>
            <Input
              id="apartment"
              type="text"
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
              placeholder="Enter apartment name"
            />
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="houseNumber">House Number</FormLabel>
            <Input
              id="houseNumber"
              type="number"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              placeholder="Enter house number"
            />
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="issueDescription">Issue Description</FormLabel>
            <Textarea
              id="issueDescription"
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              placeholder="Describe the issue..."
              rows={4}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isLoading}
            loadingText="Submitting..."
          >
            Submit Maintenance Request
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default MaintenanceRequestForm;
