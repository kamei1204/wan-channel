import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { community } from '../../Atoms/communityAtoms'
import { SiDogecoin } from 'react-icons/si'
import useCommunityData from '../../hooks/useCommunityData'


type HeaderProps = {
    communityData: community
}

const Header:React.FC<HeaderProps> = ({ communityData }) => {

    const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();
                    // !!でboolealizeする
    const isJoined = !!communityStateValue.mySnippets.find((item) => item.communityId === communityData.id) 

    return (
        <Flex flexDirection="column" width="100%" height="150px">
            <Box height="50%" bg="orange.300" />
            <Flex bg="white" flexGrow={1} justify="center">
                <Flex width="100%" maxWidth="1260px" >
                    { communityData.imageUrl ? (
                        <Image />
                    ) : (
                        <Icon as={SiDogecoin} position="relative" top={-3} fontSize="60px" color="orange.300" border="2px solid white" borderRadius="50%"/>
                        )}
                    <Flex p="10px 16px">
                        <Flex flexDirection="column" mr={3}>
                            <Text fontWeight={700} fontSize="lg">{communityData.id}</Text>
                            <Text fontSize="sm" color="gray.500">1/{communityData.id}</Text>
                        </Flex>
                        <Button variant={isJoined ? "outline" : "solid"} height="30px" onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}>{isJoined ? "入る" : "出る"}</Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Header