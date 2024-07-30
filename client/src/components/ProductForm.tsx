import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, VStack, Textarea, Text, Switch, HStack, useToast } from "@chakra-ui/react"
import { useState } from "react";
import { BASE_URL } from "../constant";
import axios from "axios";
import { Product } from "./ProductTable";

interface ProductFormProps{
    isOpen: boolean;
    onClose: () => void;
    fetchProduct: () => void;
    currentData?: Product
}

const ProductForm = ({isOpen, onClose, fetchProduct, currentData}:ProductFormProps) => {
    const [product, setProduct] = useState({
      id: currentData?.id || 0,
      name: currentData?.name || '',
      description: currentData?.description || '',
      price: currentData?.price || '',
      isInStore: currentData?.isInStore ||false
    })

    const toast= useToast();

    const onSave = () => {
      console.log(product);
      if (currentData?.id){
        editProduct();
      } else {
        addProduct();
        console.log(product);
      }

    }

    const addProduct = () => {
      axios.post(`${BASE_URL}/api/Product`, product)
           .then(response => {
            console.log(response);
            onClose();
            fetchProduct();
            toast({
              title: 'Product Added',
              description: `${product.name} successfully added`,
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
           })
           .catch(error => {
            console.log(error);
           })
    }

    const editProduct = () => {
      axios.put(`${BASE_URL}/api/Product/${currentData?.id}`, product)
      .then(() => {
        onClose();
        fetchProduct();

        toast({
          title: 'Product Edited',
          description: `${product.name} successfully edited`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
      .catch(error => {
        console.log(error);
      })
    }

    return (
      <>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack gap={3} alignItems={'self-start'}>
                <Input type="text" placeholder="Name" value={product.name} onChange={(e)=> setProduct({...product, name:e.target.value})}/>
                <Textarea placeholder="Description" value={product.description} onChange={(e)=> setProduct({...product, description:e.target.value})}/>
                <Input type="text" placeholder="Price" value={product.price} onChange={(e)=> setProduct({...product, price:e.target.value})}/>
                <Text>
                  In stock?
                </Text>
                <Switch isChecked={product.isInStore} onChange={(e)=> setProduct({...product, isInStore:e.target.checked})}/>
              </VStack>
            </ModalBody>
            {JSON.stringify({product})}
            <ModalFooter>
              <HStack>
                <Button colorScheme='blue' onClick={onSave}>Save</Button>
                <Button colorScheme='red' mr={3} onClick={onClose}>
                  Close
                </Button>
              </HStack>


            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default ProductForm