import React, { useState } from "react";
import {
  Textarea,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  Center,
  Box,
  Input,
  Text,
} from "@chakra-ui/react";
import { api } from "../utils/utils";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  message: yup.string().required("Message is required"),
});

const InquiryForm = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await validationSchema.validate(
        { email, message },
        { abortEarly: false }
      );

      const response = await api.post("inquiries/", { email, message });
      console.log("Inquiry sent:", response.data);
      setMessage("");
      setEmail("");
      toast({
        title: "Inquiry Submitted",
        description: "Your inquiry has been submitted successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = error.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setError(errors);
      } else {
        console.error("Error submitting inquiry:", error);
        setError("Failed to submit inquiry. Please try again later.");
      }
    }

    setIsLoading(false);
  };

  return (
    <Center minH="100vh">
      <Box
        w={{ base: "90%", sm: "80%", md: "60%", lg: "40%" }}
        p={8}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Text fontSize="md" fontStyle="italic">
          Make your inquiry here or{" "}
          <a href="mailto:propertyhubkenya@gmail.com" color="blue">
            Email us propertyhubkenya@gmail.com
          </a>
        </Text>
        <br />
        <hr />
        <form onSubmit={handleSubmit}>
          <FormControl isRequired isInvalid={!!error.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isDisabled={isLoading}
            />
            <FormErrorMessage>{error.email}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!error.message}>
            <FormLabel htmlFor="message">Message</FormLabel>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              placeholder="Type your message here..."
              isDisabled={isLoading}
            />
            <FormErrorMessage>{error.message}</FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            mt={4}
            colorScheme="blue"
            isLoading={isLoading}
            loadingText="Submitting..."
          >
            Submit
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default InquiryForm;
