import { ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, Icon, Image, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react'
import React from 'react'
import { GoHome } from "react-icons/go"
import useDirectory from '../../../hooks/useDirectory'
import Communities from './Communities'

const Direction: React.FC = () => {
    
    const { directoryState, toggleMenuOpen } = useDirectory()

    return (
        <Menu isOpen={directoryState.isOpen}>
            <MenuButton p="0px 8px" cursor="pointer" _hover={{ outline: "1px solid", color: "gray.200" }} borderRadius={4} mr={2} ml={{ base: 0, md: 2 }} height='27px' onClick={toggleMenuOpen}>
                <Flex align="center" justify="space-between" width={{ base: "auto", lg: "200px"}}>
                    <Flex align="center" >
                        {directoryState.selectedItem.imageUrl ? (
                            <Image src={directoryState.selectedItem.imageUrl} alt="" borderRadius="full" mr={2} boxSize="24px" />
                        ) : (
                            <Icon as={directoryState.selectedItem.icon} fontSize={24} mr={{ base: 1, md: 2 }}/>
                            )}
                            <Flex display={{ base: "none", lg: "flex"}}>
                                <Text fontSize={12} fontWeight={700} >{ directoryState.selectedItem.displayText}</Text>
                            </Flex>
                            {/* 下矢印ダウンアイコン */}
                            <ChevronDownIcon />
                        </Flex>
                    </Flex>
                </MenuButton>
                    
                <MenuList>
                    <Communities />
                </MenuList>
            </Menu>
        )
    }
    
    export default Direction
