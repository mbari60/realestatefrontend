import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate} from "react-router-dom";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  VStack,
  Heading,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { api } from "../utils/utils";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    username: Yup.string()
      .required("Invalid username")
      .required("username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      setIsLoading(true);
      const response = await api.post("signup/", values);
      toast.success(response.data.message);
      actions.resetForm();
      navigate("/") // now he can use his details to login
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message)
      setIsLoading(false);
    }
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="10"
      p="6"
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <Heading as="h2" size="lg" mb="6" textAlign="center">
        Sign Up
      </Heading>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <VStack spacing={4} align="stretch">
              <Field name="username">
                {({ field }) => (
                  <FormControl isInvalid={errors.username && touched.username}>
                    <Input {...field} placeholder="Username" />
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>


              <Field name="password">
                {({ field }) => (
                  <FormControl isInvalid={errors.password && touched.password}>
                    <Input {...field} type="password" placeholder="Password" />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isLoading}
                loadingText="Signing Up"
              >
                Sign Up
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Signup;
