import { Box, Flex, Icon, MenuItem, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import CreateCommunityModal from '../../Modal/CreateModal/CreateCommunityModal'
import { BsAlarm, BsPlus } from 'react-icons/bs'
import { useRecoilValue } from 'recoil'
import { communityState } from '../../../Atoms/communityAtoms'
import MenuListItem from './MenuListItem'

const Communities = () => {

  const [open, setOpen] = useState(false);
  const mySnippets = useRecoilValue(communityState).mySnippets;

  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Box mt={4} mb={4}>
        <Text ml={7} mb={1} fontSize="7pt" fontWeight={700} color="gray.400">管理中のコミュニティー</Text>
        {mySnippets.filter((snippet) => snippet.isModerator).map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={BsAlarm}
            displayText={`1/${snippet.communityId}`}
            link={`/1/${snippet.communityId}`}
            imageUrl={snippet.imageURL}
            iconColor="orange.500"
            />
        ))}
      </Box>
      <Box mt={4} mb={4}>
        <Text ml={7} mb={1} fontSize="7pt" fontWeight={700} color="gray.400">参加中のコミュニティー</Text>
          <MenuItem onClick={() => setOpen(true)}>
            <Flex align="center">
              <Icon as={BsPlus} mr={2}/>
                <Text fontSize='10pt' fontWeight='bold'>
                  コミュニティーの作成
                </Text>
            </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={BsAlarm}
            displayText={`1/${snippet.communityId}`}
            link={`/1/${snippet.communityId}`}
            imageUrl={snippet.imageURL}
            iconColor="orange.500"
            />
        ))}
        </Box>
    </>
  )
}

export default Communities
