import React, { useState, useContext } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../utils/utils"
import {
  Box,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  VStack,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { AuthContext } from "../context/authcontext";


// Using yup for validation
const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values, { resetForm }) => {
    try {
      setIsLoading(true);
      const res = await api.post("login/", values);
      toast.success(res.data.message);
      // reset form
      resetForm();
      // 1. store inside local storage
      localStorage.setItem("session", JSON.stringify(res.data));
      console.log(res.data)
      setIsAuthenticated(true);
      // 2. navigate user to homepage
      navigate("/home");
    } catch (error) {
      const data = error.response.data;

      toast.error(data.message);
      console.log("Unable to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      bgImage="url('https://images.unsplash.com/photo-1541417904950-b855846fe074?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI2fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D')"
      bgSize="cover"
      bgPosition="center"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={{ base: 4, md: 0 }}
    >
      <Box
        p={4}
        borderRadius="md"
        bg="rgba(255,255,255,0.8)"
        shadow="md"
        w={{ base: "90%", sm: "80%", md: "60%", lg: "40%" }}
      >
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          <Form>
            <VStack spacing={4} align="stretch">
              <Field name="username">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.username &&
                      form.touched.username
                    }
                  >
                    <label style={{ color: "black" }}>
                      Enter Username
                    </label>
                    <Input
                      {...field}
                      placeholder="Username"
                      borderRadius="md"
                      borderColor="black"
                      _placeholder={{ color: "black" }}
                      _focus={{ borderColor: "black" }}
                      color="black"
                    />
                    <FormErrorMessage>
                      {form.errors.username}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <label style={{ color: "black" }}>Enter Password</label>
                    <InputGroup>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        borderRadius="md"
                        borderColor="black"
                        _placeholder={{ color: "black" }}
                        _focus={{ borderColor: "black" }}
                        color="black"
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          variant="ghost"
                          onClick={() => setShowPassword(!showPassword)}
                          icon={
                            showPassword ? (
                              <AiFillEyeInvisible />
                            ) : (
                              <AiFillEye />
                            )
                          }
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                colorScheme="green"
                type="submit"
                isLoading={isLoading}
                borderRadius="md"
                w="100%"
              >
                Log In
              </Button>
              <Link to="/sign-up">
                <p style={{ color: "black" }}>Don't have an account?</p>
                <br />
                <Button colorScheme="teal" borderRadius="md" w="100%">
                  Sign Up
                </Button>
              </Link>
            </VStack>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
