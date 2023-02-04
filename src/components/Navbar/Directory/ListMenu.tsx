import { Flex, Icon, Link, MenuItem, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsBookmarkStar, BsPersonLinesFill, BsBell } from 'react-icons/bs'
import { AiOutlineMessage, AiOutlineSearch } from 'react-icons/ai'
import { IoSettingsOutline } from 'react-icons/io5'
import { GoHome } from 'react-icons/go'

const ListMenu = () => {

    const [ open, setOpen ] = useState(false)

    return (
        <>
            <MenuItem flexDirection="column" fontSize="10pt" width="100%" _hover={{ bg: "gray.100" }} onClick={() =>setOpen(true)} >
            <Flex align="center">
                <Icon as={GoHome} mr={2} fontSize={20}/>
                <Text fontWeight={600}>ホーム</Text>
            </Flex>
            </MenuItem>
            <MenuItem flexDirection="column" fontSize="10pt" width="100%" _hover={{ bg: "gray.100" }} onClick={() =>setOpen(true)} >
            <Flex align="center">
                <Icon as={AiOutlineSearch} mr={2} fontSize={20}/>
                <Text fontWeight={600}>検索</Text>
            </Flex>
            </MenuItem>
            <MenuItem flexDirection="column" fontSize="10pt" width="100%" _hover={{ bg: "gray.100" }} onClick={() =>setOpen(true)} >
            <Flex align="center">
                <Icon as={BsBell} mr={2} fontSize={20}/>
                <Text fontWeight={600}>通知</Text>
            </Flex>
            </MenuItem>
            <MenuItem flexDirection="column" fontSize="10pt" width="100%" _hover={{ bg: "gray.100" }} onClick={() =>setOpen(true)} >
            <Flex align="center">
                <Icon as={AiOutlineMessage} mr={2} fontSize={20}/>
                <Text fontWeight={600}>メッセージ</Text>
            </Flex>
            </MenuItem>
            <MenuItem flexDirection="column" fontSize="10pt" width="100%" _hover={{ bg: "gray.100" }} onClick={() =>setOpen(true)} >
            <Flex align="center">
                <Icon as={BsBookmarkStar} mr={2} fontSize={20}/>
                <Text fontWeight={600}>お気に入り</Text>
            </Flex>
            </MenuItem>
            <MenuItem flexDirection="column" fontSize="10pt" width="100%" _hover={{ bg: "gray.100" }} onClick={() =>setOpen(true)} >
            <Flex align="center">
                <Icon as={BsPersonLinesFill} mr={2} fontSize={20}/>
                <Text fontWeight={600}>会員情報</Text>
            </Flex>
            </MenuItem>
            <MenuItem flexDirection="column" fontSize="10pt" width="100%" _hover={{ bg: "gray.100" }} onClick={() =>setOpen(true)} >
            <Flex align="center">
                <Icon as={IoSettingsOutline} mr={2} fontSize={20}/>
                <Text fontWeight={600}>設定</Text>
            </Flex>
            </MenuItem>
        </>
    )
}

export default ListMenu