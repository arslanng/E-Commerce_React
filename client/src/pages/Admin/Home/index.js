import React, { useEffect, useState } from "react";

import { fetchProductAllList, fetchOrders, fetchAllUser } from "../../../api";
import { Flex, Text } from "@chakra-ui/react";
import { Col, Row, Statistic, Table } from "antd";
import {
  ShoppingOutlined,
  UserOutlined,
  LaptopOutlined,
} from "@ant-design/icons";

function Home() {
  const [productList, setProductList] = useState();
  const [orders, setOrders] = useState();
  const [users, setUsers] = useState();
  const rowGutter = 20
  const colSpan = 8

  const columns = [
    {
      title: "E-mail",
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: "Authorization",
      dataIndex: 'role',
      key: 'role',
    },
  ]
  useEffect(() => {
    (async () => {
      const productListData = await fetchProductAllList();
      const orderData = await fetchOrders();
      const userData = await fetchAllUser();
      setProductList(productListData);
      setOrders(orderData);
      setUsers(userData);
    })();
  }, []);
  return (
    <div style={{ textAlign: "center"}}>
      <Text fontSize="2xl">Admin Home</Text>
      <hr />
      <Row gutter={rowGutter} style={{marginTop: "50px"}}>
        <Col span={colSpan}>
          <Statistic
            title="Total Products"
            value={!productList ? "Loading..." : productList.length}
            prefix={<LaptopOutlined />}
          />
        </Col>
        <Col span={colSpan}>
          <Statistic
            title="Total Orders"
            value={!orders ? "Loading..." : orders.length}
            prefix={<ShoppingOutlined />}
          />
        </Col>
        <Col span={colSpan}>
          <Statistic
            title="Total Users"
            value={!users ? "Loading..." : users.length}
            prefix={<UserOutlined />}
          />
        </Col>
      </Row>
      <Table dataSource={users} columns={columns} style={{marginTop: "50px"}}/>;
    </div>
  );
}

export default Home;
