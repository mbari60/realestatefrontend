import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Flex, Box, Text, Link as ChakraLink } from "@chakra-ui/react";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const { pathname } = useLocation();
  const excludes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset",
    "/dashboard",
  ];

  if (excludes.some((excludePath) => pathname.startsWith(excludePath)))
    return null;

  return (
    <footer className="text-white py-8" style={{ backgroundColor: "#2C5282" }}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="6xl"
        mx="auto"
        px={4}
      >
        {/* Social Icons */}
        <Flex spaceX="4">
          <Link to="#" className="text-white hover:text-gray-400">
            <FaInstagram size={24} />
          </Link>
          <Link to="#" className="text-white hover:text-gray-400">
            <FaFacebook size={24} />
          </Link>
          <Link to="#" className="text-white hover:text-gray-400">
            <FaLinkedin size={24} />
          </Link>
          <Link to="#" className="text-white hover:text-gray-400">
            <FaWhatsapp size={24} />
          </Link>
          <Link to="#" className="text-white hover:text-gray-400">
            <FaYoutube size={24} />
          </Link>
          <Link to="#" className="text-white hover:text-gray-400">
            <FaTwitter size={24} />
          </Link>
        </Flex>
        {/* Additional Content */}
        <Box
          textAlign={{ base: "center", md: "left" }}
          mt={{ base: 4, md: 0 }}
          color="white"
        >
          <Text mb={2}>Stay Connected:</Text>
          <Flex flexWrap="wrap" gap="4">
            <NavLink to={"/contact-us"}>Contact us</NavLink>
            <NavLink to={"/feedback"}>Feedback</NavLink>
            <NavLink to={"/faqs"}>FAQs</NavLink>
            <ChakraLink href="#" _hover={{ color: "gray.400" }}>
              Privacy
            </ChakraLink>
            <ChakraLink href="#" _hover={{ color: "gray.400" }}>
              Terms
            </ChakraLink>
          </Flex>
          <Box mt={4}>
            <Text fontSize="sm">
              For support or inquiries, email us at{" "}
              <ChakraLink
                href="mailto:info@propertyhubkenya.com"
                color="green.300"
              >
                info@propertyhubkenya.com
              </ChakraLink>
            </Text>
          </Box>
        </Box>
        <Box
          textAlign={{ base: "center", md: "right" }}
          mt={{ base: 4, md: 0 }}
          color="white"
        >
          <Text>
            &copy; {new Date().getFullYear()} All Rights Reserved{" "}
            <ChakraLink href="#" color="green.300" ml={1}>
              PropertyHub Kenya
            </ChakraLink>
          </Text>
        </Box>
      </Flex>
    </footer>
  );
};

export default Footer;
