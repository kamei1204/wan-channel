import { ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, Icon, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react'
import React from 'react'
import { GoHome } from "react-icons/go"
import Community from './Community'

const Direction:React.FC = () => {
    return (
        <Menu>
            <MenuButton p="0px 6px" cursor="pointer" _hover={{ outline: "1px solid", color: "gray.500" }} borderRadius="10px" ml={2}>
                <Flex align="center">
                    <Flex align="center">
                        <Icon as={GoHome} fontSize={20}/>
                        <Flex >
                            <Text fontSize={12} fontWeight={700} display={{ base: "none", lg: "flex" }} ml="1" >HOME</Text>
                        </Flex>
                        {/* 下矢印ダウンアイコン */}
                        <ChevronDownIcon />
                    </Flex>
                </Flex>
            </MenuButton>
                
            <MenuList>
                <Community />
            </MenuList>
        </Menu>
    )
}

export default Direction