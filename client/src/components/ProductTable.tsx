import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Box, Flex, Heading, Button, Center, HStack, Avatar, Text, Badge, useDisclosure } from "@chakra-ui/react"
import ColorModeSwitch from "./ColorModeSwitch"
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons"
import { useEffect, useState } from "react";
import axios, { CanceledError } from "axios";
import { BASE_URL } from "../constant";
import ProductSkeleton from "./ProductSkeleton";
import ProductForm from "./ProductForm";

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    isInStore: boolean;
}

const ProductTable = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [data, setData] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading){
        return <ProductSkeleton/>
    }

    const fetchData = () =>{
        setIsLoading(true);
        axios
        .get(`${BASE_URL}/api/Product`)
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            if(error instanceof CanceledError){
                return
            }
            setError(error.message);
            console.log("error debug: "+ error);

        }).finally(()=>{
            setIsLoading(false);
        })
        console.log("Data debug: "+ data);
    }
    
    return (
    <>
        <ColorModeSwitch/>
        <Box m={32} shadow={'md'} rounded={'md'}>
            <Flex justifyContent={'space-between'} padding={'12px 24px'} alignItems="center">     
                    <Heading>
                        Product List
                    </Heading>
                    <Button colorScheme="teal" leftIcon={<AddIcon/>} onClick={onOpen}>Add Product</Button>
            </Flex>

            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Name</Th>
                        <Th>Description</Th>
                        <Th>In Stock?</Th>
                        <Th isNumeric>Price</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((product:Product) =>
                        <Tr key={product.id}>
                            <Td>{product.id}</Td>
                            <Td>
                                <HStack>
                                    <Avatar size={"sm"} name={product.name}/>
                                    <Text>{product.name}</Text>
                                </HStack>
                            </Td>

                            <Td>{product.description}</Td>
                            <Td>
                                <Badge>{product.isInStore? "Yes" : "No"}</Badge>
                            </Td>
                            <Td>{product.price}</Td>
                            <Td>
                                <HStack>
                                    <EditIcon boxSize={23} color={"orange.200"}/>
                                    <DeleteIcon boxSize={23} color={"red.400"}/>
                                    <ViewIcon boxSize={23} color={"green.300"}/>
                                </HStack>
                            </Td>
                        </Tr>
                    )}
                    </Tbody>
                    <Tfoot>
                    <Tr>

                    </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            {error && <Text color="red">{error}</Text>}
            {data.length == 0 && <Heading textAlign={"center"} fontSize={24}>No Data</Heading>}
            {isOpen && <ProductForm isOpen={isOpen} onClose={onClose}/>}
        </Box>   
    </>
  )
}

export default ProductTable