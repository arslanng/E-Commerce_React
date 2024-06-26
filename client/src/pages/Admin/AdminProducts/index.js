import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchProductAllList, deleteProduct } from "../../../api";

import { Link } from "react-router-dom";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Table, Popconfirm } from "antd";

function Products() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery(
    ["admin:products"],
    fetchProductAllList
  );

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  const columns = useMemo(() => {
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>Edit</Link>

            <Popconfirm
              title="Are you sure?"
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onSuccess: () => {
                    console.log("success");
                  },
                });
              }}
              onCancel={() => console.log("iptal edildi")}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <Link style={{ marginLeft: 10 }}>Delete</Link>
            </Popconfirm>
          </>
        ),
      },
    ];
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error {error.message}</div>;
  }
  console.log(data);
  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" p="5">
          Products
        </Text>

        <Link to={"/admin/products/new"}>
          <Button>New Product</Button>
        </Link>
      </Flex>
      <Table dataSource={data} columns={columns} rowKey="_id" />;
    </div>
  );
}

export default Products;
