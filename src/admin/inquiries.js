import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { api } from "../utils/utils";

const InquiriesTable = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = () => {
    api
      .get("inquiries/")
      .then((response) => {
        setInquiries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inquiries:", error);
      });
  };

  const handleDeleteInquiry = (id) => {
    api
      .delete(`inquiries/${id}/`)
      .then(() => {
        const updatedInquiries = inquiries.filter(
          (inquiry) => inquiry.id !== id
        );
        setInquiries(updatedInquiries);
      })
      .catch((error) => {
        console.error("Error deleting inquiry:", error);
      });
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Email</Th>
          <Th>Message</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {inquiries.map((inquiry) => (
          <Tr key={inquiry.id}>
            <Td>{inquiry.email}</Td>
            <Td>{inquiry.message}</Td>
            <Td>
              <IconButton
                colorScheme="red"
                aria-label="Delete"
                icon={<DeleteIcon />}
                onClick={() => handleDeleteInquiry(inquiry.id)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default InquiriesTable;
