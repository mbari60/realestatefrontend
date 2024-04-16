import React, { useState } from "react";
import {
  Grid,
  GridItem,
  Flex,
  Button,
  VStack,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const displaySidebar = useBreakpointValue({ base: "block", md: "block" });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Flex direction="column" h="100vh">
      <Flex
        as="header"
        p="4"
        bg="blue.500"
        color="white"
        align="center"
        justify="space-between"
        boxShadow="md"
      >
        <Text fontSize="xl" fontWeight="bold">
          Admin Dashboard
        </Text>
        <IconButton
          aria-label="Toggle Sidebar"
          icon={isSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ base: "block", md: "none" }}
          onClick={toggleSidebar}
        />
      </Flex>
      <Flex flex="1" overflow="hidden">
        <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={4}>
          <GridItem
            colSpan={{ base: 1, md: isSidebarOpen ? 1 : 0 }}
            bg="gray.100"
            display={displaySidebar}
            borderRightWidth={{ base: 0, md: "1px" }}
          >
            <VStack spacing={4} p={4}>
              <Link to="/admin-dashboard">
                <Button variant="ghost">Add Apartment</Button>
              </Link>
              <Link to="/admin-addbnb">
                <Button variant="ghost">Add Airbnb</Button>
              </Link>
              <Link to="/admin-addtransport">
                <Button variant="ghost">Add Transport</Button>
              </Link>
              <Link to="/admin-addcleaner">
                <Button variant="ghost">Add Cleaner</Button>
              </Link>
              <Link to="/admin-maintenance">
                <Button variant="ghost">Maintenance Requests</Button>
              </Link>
              <Link to="/admin-inquiries">
                <Button variant="ghost">Inquiries</Button>
              </Link>
              <Link to="/bnbbookings">
                <Button variant="ghost">Bnb bookings</Button>
              </Link>
              <Link to="/apartmentbookings">
                <Button variant="ghost">Apartment bookings</Button>
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
    </Flex>
  );
};

export default AdminPage;
