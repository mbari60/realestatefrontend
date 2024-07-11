import React, { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { api } from "../utils/utils";
import { AuthContext } from "../context/authcontext";

const BookingModal = ({ isOpen, onClose, airbnb }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const { user } = useContext(AuthContext);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!user) {
      // If user is not logged in, display an error message
      toast({
        title: "Login Required",
        description: "You need to login before booking.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true); // Set loading state to true while booking
      // Convert start and end dates to ISO 8601 format
      const formattedStartDate = new Date(startDate)
        .toISOString()
        .split("T")[0];
      const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

      const response = await api.post("bnb_bookings/", {
        airbnb,
        user: user.id,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      });
      console.log(response.data);
      toast({
        title: "Booking successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.log("Error:", error);
      toast({
        title: "Booking failed",
        description: error.response.data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Reset loading state after booking attempt
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Book Airbnb</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Start Date</FormLabel>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>End Date</FormLabel>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isLoading={isLoading} // Set isLoading to show loading state
            loadingText="Booking..."
            disabled={!startDate || !endDate || isLoading} // Disable button when loading or dates are not selected
          >
            Book Now
          </Button>
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BookingModal;
