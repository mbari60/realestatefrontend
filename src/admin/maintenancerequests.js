import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { api } from "../utils/utils";

const MaintenanceTable = () => {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);

  useEffect(() => {
    api
      .get("maintenance/")
      .then((response) => {
        setMaintenanceRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching maintenance requests:", error);
      });
  }, []);

  const handleSolveIssue = (id) => {
    api
      .post(`solved_maintenance/${id}/`)
      .then((response) => {
        const updatedRequests = maintenanceRequests.map((request) =>
          request.id === id ? { ...request, solved: true } : request
        );
        setMaintenanceRequests(updatedRequests);
      })
      .catch((error) => {
        console.error("Error solving maintenance issue:", error);
      });
  };

  const handleDeleteRequest = (id) => {
    api
      .delete(`maintenance/${id}/`)
      .then(() => {
        const updatedRequests = maintenanceRequests.filter(
          (request) => request.id !== id
        );
        setMaintenanceRequests(updatedRequests);
      })
      .catch((error) => {
        console.error("Error deleting maintenance request:", error);
      });
  };

  // Sort maintenance requests based on solved status (solved requests at the bottom)
  const sortedMaintenanceRequests = [
    ...maintenanceRequests.sort((a, b) => {
      if (a.solved && !b.solved) return 1;
      if (!a.solved && b.solved) return -1;
      return 0;
    }),
  ];

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Apartment</Th>
          <Th>Issue</Th>
          <Th>Status</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sortedMaintenanceRequests.map((request) => (
          <React.Fragment key={request.id}>
            <Tr>
              <Td>{request.apartment}</Td>
              <Td>{request.issue_description}</Td>
              <Td>{request.solved ? "Solved" : "Pending"}</Td>
              <Td>
                {!request.solved && (
                  <Button
                    colorScheme="teal"
                    onClick={() => handleSolveIssue(request.id)}
                  >
                    Mark as Solved
                  </Button>
                )}
                <IconButton
                  ml={2}
                  colorScheme="red"
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  onClick={() => handleDeleteRequest(request.id)}
                />
              </Td>
            </Tr>
          </React.Fragment>
        ))}
      </Tbody>
    </Table>
  );
};

export default MaintenanceTable;
