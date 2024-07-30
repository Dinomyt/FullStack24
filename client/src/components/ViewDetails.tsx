import { Avatar, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, HStack, Text, VStack} from '@chakra-ui/react'
import { Product } from './ProductTable';

interface ViewDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    currentData: Product
}

const ViewDetails = ({isOpen,onClose,currentData}:ViewDetailsProps) => {


  return (
    <>
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>View Details: {currentData.name}</DrawerHeader>

            <DrawerBody>
                <HStack>
                    <Avatar size={'lg'} name={currentData.name}/>
                    <VStack>
                        <Heading fontSize={16}>
                            {currentData.name}
                        </Heading>
                        <Heading fontSize={20}>{currentData.price}</Heading>
                        <Text>{currentData.description}</Text>

                    </VStack>

                </HStack>

            </DrawerBody>

            <DrawerFooter>
                <Button colorScheme='red' variant='outline' mr={3} onClick={onClose}>
                Close
                </Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default ViewDetails