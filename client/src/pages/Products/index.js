import { Box, Grid, Flex, Button } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

import { fetchProductList } from "../../api";
import Card from "../../components/Card";

function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["products"], fetchProductList,
    {
    getNextPageParam: (lastGroup, allGroup) => {
      const morePagesExist = lastGroup?.length === 12;
      if (!morePagesExist) {
        return;
      }

      return allGroup.length + 1;
    },
  }
  );

  if (status === "loading") return "Loading...";

  if (status === "error") return "An error has occurred: " + error.message;

  return (
    <div>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {
          data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {
                group.map((item) => (
                  <Box w="100" key={item._id}>
                    <Card item={item} />
                  </Box>
                ))
              }
            </React.Fragment>
          ))
        }

      </Grid>

      <Flex mt="10" justifyContent="center">
        <Button
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      </Flex>
    </div>
  );
}

export default Products;
