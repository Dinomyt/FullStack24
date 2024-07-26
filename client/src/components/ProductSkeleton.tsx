import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot, Box, Flex, Heading, Button, HStack, Avatar, Text, Badge, Skeleton, SkeletonCircle } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { useEffect, useState } from "react";
import axios, { CanceledError } from "axios";
import { BASE_URL } from "../constant";

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    isInStore: boolean;
}

const ProductSkeleton = () => {
  
    
    return (
    <>
        <Box m={32} shadow={'md'} rounded={'md'}>
            <Flex justifyContent={'space-between'} padding={'12px 24px'} alignItems="center">     
                    <Heading>
                        <Skeleton>Product List</Skeleton>
                    </Heading>
                    <Button colorScheme="teal" leftIcon={<AddIcon/>}>{" "}<Skeleton>Add Product</Skeleton></Button>
            </Flex>

            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <Thead>
                    <Tr>
                        <Th><Skeleton>Id</Skeleton></Th>
                        <Th><Skeleton>Name</Skeleton></Th>
                        <Th><Skeleton>Description</Skeleton></Th>
                        <Th><Skeleton>In Stock?</Skeleton></Th>
                        <Th isNumeric><Skeleton>Price</Skeleton></Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {Array.from({length:5}).map((_,index) => (
                        <Tr key={index}>
                            <Td><Skeleton>01</Skeleton></Td>
                            <Td>
                                <HStack>
                                    <SkeletonCircle><Avatar name={"AD"}/></SkeletonCircle>
                                    <Skeleton><Text>Product Name</Text></Skeleton>
                                </HStack>
                            </Td>

                            <Td><Skeleton>Product Description</Skeleton></Td>
                            <Td>
                                <Badge><Skeleton>Yes</Skeleton></Badge>
                            </Td>
                            <Td><Skeleton>99.99</Skeleton></Td>
                            <Td>
                                <HStack>
                                    <SkeletonCircle/>
                                    <SkeletonCircle/>
                                    <SkeletonCircle/>
                                </HStack>
                            </Td>
                        </Tr>
                    ))}
                    </Tbody>
                    <Tfoot>
                    <Tr>

                    </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Box>   
    </>
  )
}

export default ProductSkeleton