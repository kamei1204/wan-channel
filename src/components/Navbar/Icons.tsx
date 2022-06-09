import { Flex, Icon } from '@chakra-ui/react'
import React from 'react'
import { BsArrow90DegUp, BsCameraVideo, BsChatRightText, BsPlus, BsBell, BsChatDots } from 'react-icons/bs'

// type Props = {}

const Icons: React.FC = () => {
    return (
        <Flex>
            <Flex 
                display={{ base: "none", md: "flex" }}
                align="center"
                borderRight="1px solid"
                borderColor="gray.200"
                mr={1}
                >
                <Flex
                    ml={2} mr={2} padding={1} fontSize={20} 
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: "gray.200" }}
                >
                    <Icon as={BsArrow90DegUp}/>
                </Flex>
                <Flex
                    ml={2} mr={2} padding={1} fontSize={22}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: "gray.200" }}
                >
                    <Icon as={BsChatRightText}/>
                </Flex>
                <Flex
                    ml={2} mr={2} padding={1} fontSize={22}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: "gray.200" }}
                >
                    <Icon as={BsCameraVideo}/>
                </Flex>
            </Flex>
            <>
            <Flex
                    ml={1} mr={1} padding={1} fontSize={22} 
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: "gray.200" }}
                >
                    <Icon as={BsChatDots}/>
                </Flex>
                <Flex
                    ml={1} mr={1} padding={1} fontSize={22}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: "gray.200" }}
                >
                    <Icon as={BsBell}/>
                </Flex>
                <Flex
                    display={{ base: "none", md: "flex" }}
                    ml={1} mr={1} padding={1} fontSize={22}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: "gray.200" }}
                >
                    <Icon as={BsPlus}/>
                </Flex>
            </>
        </Flex>
    )
}

export default Icons