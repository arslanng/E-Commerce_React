import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import { fetchOrders } from "../../../api";
import { Link } from "react-router-dom";

function Orders() {
  const [order, setOrder] = useState([]);
  const total = order.reduce((acc, obj) => acc + obj.price, 0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const getDetail = (orderData) => {
    onOpen();
    setOrder(orderData);
  };

  const { isLoading, isError, data, error } = useQuery(
    ["admin:orders"],
    fetchOrders
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error {error.message}</div>;
  }

  return (
    <div>
      <Text fontSize="2xl" padding={5}>
        Orders
      </Text>

      <Table variant="simple">
        <TableCaption>Order Page - Total order(s) = {data.length}</TableCaption>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Address</Th>
            <Th isNumeric>Items</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item._id}>
              <Td>{item.user.email}</Td>
              <Td>{item.adress}</Td>
              <Td isNumeric>{item.items.length}</Td>
              <Td>
                <Button onClick={() => getDetail(item.items)}>Detail</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Order Detail: {order.length} <br />
            <Table variant="simple">
              <TableCaption>Order Total Price = {total}</TableCaption>
              <Thead>
                <Tr>
                  <Th>Item</Th>
                  <Th isNumeric>Price</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {order &&
                  order.map((item) => (
                      <Tr key={item._id}>
                        <Td>{item.title}</Td>
                        <Td>{item.price} TL</Td>
                        <Td>
                          <Button>
                            <Link to={`../../product/${item._id}`}>
                              item detail
                            </Link>
                          </Button>
                        </Td>
                      </Tr>
                  ))}
              </Tbody>
            </Table>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Orders;
