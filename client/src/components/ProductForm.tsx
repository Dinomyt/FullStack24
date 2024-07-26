import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, VStack, Textarea, Text, Switch, HStack } from "@chakra-ui/react"
import React, { useState } from "react";
import { BASE_URL } from "../constant";
import axios from "axios";

interface ProductFormProps{
    isOpen: boolean;
    onClose: () => void;
}

const ProductForm = ({isOpen, onClose}:ProductFormProps) => {
    const [product, setProduct] = useState({
      id:0,
      name: '',
      description: '',
      price: '',
      isInStore: false
    })

    const onSave = () => {
      console.log(product);
      axios.post(`${BASE_URL}/api/Product`, product)
           .then(response => {
            console.log(response);
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