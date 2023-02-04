import { Flex, Icon, MenuItem, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import CreateCommunityModal from '../../Modal/CreateModal/CreateCommunityModal'
import { BsPlus } from 'react-icons/bs'

const Community = () => {

  const [ open, setOpen ] = useState(false)

  return (
    <>
        <CreateCommunityModal open={open}  handleClose={() => setOpen(false)}/>
          <MenuItem onClick={() => setOpen(true)}>
            <Flex align="center">
              <Icon as={BsPlus} mr={2}/>
                <Text fontSize='10pt' fontWeight='bold'>
                  コミュニティーの作成
                </Text>
            </Flex>
          </MenuItem>
        
    </>
  )
}

export default Community
