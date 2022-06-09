import { Box, Button, Divider, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import React, { useState } from 'react'

type CreateCommunityModalProps = {
    open: boolean;
    handleClose: () => void;
}

const CreateCommunityModal:React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {

    const [ communityName, setCommunityName ] = useState("");
    const [ charsRemaining, setCharsRemaining ] = useState(21)

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value.length > 21) return;

        setCommunityName(event.target.value);
        setCharsRemaining(21 - event.target.value.length)
    }

    return (
            <>
            <Modal isOpen={open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader fontSize="12pt" padding={3} display="flex" flexDirection="column">コミュニティを作りましょう</ModalHeader>
                <Divider />
                <ModalCloseButton />
                <Box pl={3} pr={3}>
                    <ModalBody padding="10px 0px" display="flex" flexDirection="column" >
                        <Text>name</Text>
                        <Text fontSize={11} color="gray.500">動物と共に暮らしていく中、楽しい事や困った事はありませんか？</Text>
                        <Text position="relative" top="27px" left="10px" color="gray.400" width="20%">r/</Text>
                        <Input  position="relative" pl="30px" size="sm" value={communityName} onChange={handleChange}/>
                        <Text  fontSize="10pt" color="gray.500" mt={1} ml={1}>{charsRemaining}</Text>
                    </ModalBody>
                </Box>
        
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            </>
        )
}

export default CreateCommunityModal
