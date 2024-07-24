import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Box, Flex, Heading, Button, Center } from "@chakra-ui/react"
import ColorModeSwitch from "./ColorModeSwitch"
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

const ProductTable = () => {
  
    const [data, setData] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

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
                    <Button colorScheme="teal" leftIcon={<AddIcon/>}>Add Product</Button>
            </Flex>

            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
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
                            <Td>{product.name}</Td>
                            <Td>{product.description}</Td>
                            <Td>{product.isInStore}</Td>
                            <Td>{product.price}</Td>
                        </Tr>
                    )}
                    </Tbody>
                    <Tfoot>
                    <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                    </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Box>   
    </>
  )
}

export default ProductTable