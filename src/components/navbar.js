import React, { useContext } from "react";
import {
  Flex,
  Box,
  Heading,
  Spacer,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Link,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { AuthContext } from "../context/authcontext";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout, isAuthenticated } = useContext(AuthContext);

  return (
    <Flex bg="blue.500" p="4" align="center">
      <Box p="2">
        <Heading size="md" color="white">
          Your Logo
        </Heading>
      </Box>
      <Spacer />
      <Box display={{ base: "none", md: "block" }}>
        <Link href="/home" color="white" mr="4">
          Home
        </Link>
        <Link href="/appartments" color="white" mr="4">
          Apartments
        </Link>
        <Link href="/bnbs" color="white" mr="4">
          Airbnbs
        </Link>
        <Link href="/services" color="white" mr="4">
          Services
        </Link>
        <Link href="/services/inquiry" color="white" mr="4">
          Contact
        </Link>
        {isAuthenticated && user && user.is_superuser && (
          <Link href="/admin" color="white" mr="4">
            Admin
          </Link>
        )}
        {isAuthenticated ? (
          <IconButton
            icon={<ArrowBackIcon />}
            variant="outline"
            colorScheme="white"
            onClick={logout}
            aria-label="Logout"
          />
        ) : (
          <>
            <Link href="/" color="white" mr="4">
              Login
            </Link>
            <Link href="/sign-up" color="white" mr="4">
              Register
            </Link>
          </>
        )}
      </Box>
      <Box display={{ base: "block", md: "none" }}>
        <IconButton
          icon={<HamburgerIcon />}
          variant="outline"
          colorScheme="white"
          onClick={onOpen}
        />
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <VStack spacing="4">
                  <Link href="#" onClick={onClose}>
                    Home
                  </Link>
                  <Link href="#" onClick={onClose}>
                    About
                  </Link>
                  <Link href="#" onClick={onClose}>
                    Services
                  </Link>
                  <Link href="#" onClick={onClose}>
                    Contact
                  </Link>
                  {isAuthenticated ? (
                    <Link href="#" onClick={logout}>
                      Logout
                    </Link>
                  ) : (
                    <>
                      <Link href="#" onClick={onClose}>
                        Login
                      </Link>
                      <Link href="#" onClick={onClose}>
                        Register
                      </Link>
                    </>
                  )}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </Flex>
  );
};

export default Navbar;
