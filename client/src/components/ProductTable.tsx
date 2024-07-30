import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot, Box, Flex, Heading, Button, Center, HStack, Avatar, Text, Badge, useDisclosure, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverHeader, PopoverFooter, useToast } from "@chakra-ui/react"
import ColorModeSwitch from "./ColorModeSwitch"
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons"
import { useEffect, useState } from "react";
import axios, { CanceledError } from "axios";
import { BASE_URL } from "../constant";
import ProductSkeleton from "./ProductSkeleton";
import ProductForm from "./ProductForm";
import ViewDetails from "./ViewDetails";

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    isInStore: boolean;
}

const ProductTable = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen:isView, onOpen:onViewOpen, onClose:onViewClose } = useDisclosure();

    const toast= useToast();

    const [data, setData] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState('');
    const [currentData, setCurrentData] = useState<Product>({} as Product);

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

    useEffect(() => {
        fetchData();
    }, []);

    const getProduct =(id:number) => {
        axios
        .get(`${BASE_URL}/api/Product/${id}`)
        .then(res => {
            setCurrentData(res.data);
        })
        .catch(error =>{
            console.log(error);
        })
    }

    if (isLoading){
        return <ProductSkeleton/>
    }

    const handleAdd = () => {
        onOpen();
        setCurrentData({} as Product);
    }

    const handleDelete = (id:number) => {
        axios.delete(`${BASE_URL}/api/Product/${id}`)
         .then(() => {
            fetchData();
            toast({
                title: 'Product Deleted',
                description: `Product successfully deleted`,
                status: 'success',
                duration: 9000,
                isClosable: true,
              });
            })
            .catch(error => {
            console.log(error)
            })

    }

    const handleViewDetail = (id:number) => {
        axios
        .get(`${BASE_URL}/api/Product/${id}`)
        .then(res => {
            setCurrentData(res.data);
            onViewOpen();

        })
        .catch(error =>{
            console.log(error);
        })
    }

    return (
    <>
        <ColorModeSwitch/>
        <Box m={32} shadow={'md'} rounded={'md'}>
            <Flex justifyContent={'space-between'} padding={'12px 24px'} alignItems="center">     
                    <Heading>
                        Product List
                    </Heading>
                    <Button colorScheme="teal" leftIcon={<AddIcon/>} onClick={handleAdd}>Add Product</Button>
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
                                    <EditIcon onClick={() => getProduct(product.id)} boxSize={23} color={"orange.200"}/>
                                    <Popover>
                                        <PopoverTrigger>
                                            <DeleteIcon boxSize={23} color={"red.400"}/>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverHeader>WARNING</PopoverHeader>
                                            <PopoverBody>Are you sure you want delete {product.name}?</PopoverBody>
                                            <PopoverFooter>
                                                <Button onClick={() => handleDelete(product.id)} colorScheme="red" variant={"outline"}>Delete</Button>
                                            </PopoverFooter>
                                        </PopoverContent>
                                    </Popover>
                                    <ViewIcon onClick={() => handleViewDetail(product.id)} boxSize={23} color={"green.300"}/>
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
            {isOpen && <ProductForm currentData={currentData} isOpen={isOpen} onClose={onClose} fetchProduct={fetchData}/>}
            {isView && <ViewDetails isOpen={isView} onClose={onViewClose} currentData={currentData}/>}
        </Box>   
    </>
  )
}

export default ProductTable

