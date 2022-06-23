import { Button, Flex, Icon, Image, Input, Text, transition } from '@chakra-ui/react'
import React from 'react'
import { motion } from "framer-motion"

type Props = {}

const CreatePostLink = () => {
    return (
        <Flex justify="space-evenly" align="center" height="50px">
                <Flex >
                    <Image src="/Images/wan-cannel.logo.PNG" height="35px" width="35px" ml={5}/>
                    <Input type="text" placeholder='フレブル大好き集まれ！' 
                        fontSize="15px" width="500px" padding="0 20px" ml={5} 
                        borderRadius="25px 0 0 25px" bg="white" borderColor="white" transition="0.5s"/>
                    <Button type="submit" width="200px" mr={5} 
                        borderRadius="0 25px 25px 0" cursor="pointer" bg="orange.200" color="white" fontWeight="bold" 
                        _hover={{ bg: "orange.400" }}>
                            <Text color="white">いい出会いを</Text>
                    </Button>
                </Flex>
                
        </Flex>
    )
}

export default CreatePostLink