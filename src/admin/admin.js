import React, { useState } from "react";
import {
  Grid,
  GridItem,
  Flex,
  Button,
  VStack,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const displaySidebar = useBreakpointValue({ base: "none", md: "block" });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Flex direction="column" h="100vh">
      <Flex as="header" p="4" bg="blue.200" color="white" align="center">
        Admin Dashboard
      </Flex>
      <Flex flex="1" overflow="hidden">
        <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={4}>
          <GridItem
            colSpan={{ base: 1, md: isSidebarOpen ? 1 : 0 }}
            bg="gray.200"
            display={displaySidebar}
          >
            <VStack spacing={4} p={4}>
              <Link to="/admin-dashboard">
                <Button variant="link" color="blue.500" onClick={toggleSidebar}>
                  add Appartment
                </Button>
              </Link>
              <Link to="/admin-addbnb">
                <Button variant="link" color="blue.500" onClick={toggleSidebar}>
                  add Airbnbs
                </Button>
              </Link>
              <Link to="/admin-addtransport">
                <Button variant="link" color="blue.500" onClick={toggleSidebar}>
                  add Transport
                </Button>
              </Link>
              <Link to="/admin-addcleaner">
                <Button variant="link" color="blue.500" onClick={toggleSidebar}>
                  add cleaner
                </Button>
              </Link>{" "}
              <Link to="/admin-maintenance">
                <Button variant="link" color="blue.500" onClick={toggleSidebar}>
                  Maintenance requests
                </Button>
              </Link>
              <Link to="/admin-inquiries">
                <Button variant="link" color="blue.500" onClick={toggleSidebar}>
                  inquiries
                </Button>
              </Link>
            </VStack>
          </GridItem>
          <GridItem
            colSpan={{ base: 4, md: isSidebarOpen ? 4 : 5 }}
            bg="white"
            p={4}
          ></GridItem>
        </Grid>
      </Flex>
      <Flex
        as="footer"
        p="4"
        bg="blue.500"
        color="white"
        align="center"
        justify="center"
      >
        &copy; {new Date().getFullYear()} All Rights Reserved
      </Flex>
      <IconButton
        aria-label="Toggle Sidebar"
        icon={isSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
        position="fixed"
        bottom="4"
        right="4"
        display={{ base: "block", md: "none" }}
        onClick={toggleSidebar}
      />
    </Flex>
  );
};

export default AdminPage;
