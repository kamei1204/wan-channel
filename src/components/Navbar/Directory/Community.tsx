import { Flex, Icon, MenuItem, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import CreateCommunityModal from '../../Modal/CreateModal/CreateCommunityModal'
import { BsPlus } from 'react-icons/bs'
import ListMenu from './ListMenu'

const Community = () => {

  const [ open, setOpen ] = useState(false)

  return (
    <>
        <CreateCommunityModal open={open}  handleClose={() => setOpen(false)}/>
          <Flex align="center" flexDirection='column'>
            <ListMenu />
          </Flex>
        
    </>
  )
}

export default Community