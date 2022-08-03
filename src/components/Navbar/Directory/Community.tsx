import { Flex, Icon, MenuItem, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import CreateCommunityModal from '../../Modal/CreateModal/CreateCommunityModal'
import { BsPlus } from 'react-icons/bs'

const Community = () => {

  const [ open, setOpen ] = useState(false)

  return (
    <>
        <CreateCommunityModal open={open}  handleClose={() => setOpen(false)}/>
        <MenuItem fontSize="10pt" width="100%" _hover={{ bg: "gray.100" }} onClick={() =>setOpen(true)} >
          <Flex align="center">
            <Icon as={BsPlus} mr={2} fontSize={20}/>
            <Text fontWeight={600}>community</Text>
          </Flex>
        </MenuItem>
    </>
  )
}

export default Community