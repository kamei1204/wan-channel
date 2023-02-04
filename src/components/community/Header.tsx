import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Community } from '../../Atoms/communityAtoms'
import { SiDogecoin } from 'react-icons/si'
import useCommunityData from '../../hooks/useCommunityData'


type HeaderProps = {
    communityData: Community
}

const Header:React.FC<HeaderProps> = ({ communityData }) => {

    const { communityStateValue, onJoinOrLeaveCommunity, loading, error } = useCommunityData();
                    // !!でboolealizeする
    const isJoined = !!communityStateValue.mySnippets.find((item) => item.communityId === communityData.id) 

    return (
        <Flex flexDirection="column" width="100%" height="150px">
            <Box height="50%" bgGradient='linear(to-r, green.200, pink.500)' />
            <Flex bg="white" flexGrow={1} justify="center">
                <Flex width="95%" maxWidth="1260px" >
                    { communityStateValue.currentCommunity?.imageURL ? (
                        <Image 
                            src={communityStateValue.currentCommunity.imageURL}
                            boxSize="66px"
                            borderRadius="full"
                            position="relative"
                            top="-3px"
                            border="4px solid white"
                            color="orange.500"
                            alt='image'/>
                    ) : (
                        <Icon as={SiDogecoin} position="relative" top={-3} fontSize="60px" color="orange.300" border="2px solid white" borderRadius="50%"/>
                        )}
                    <Flex p="10px 16px">
                        <Flex flexDirection="column" mr={3}>
                            <Text fontWeight={700} fontSize="lg">{communityData.id}</Text>
                            <Text fontSize="sm" color="gray.500">1/{communityData.id}</Text>
                        </Flex>
                        <Button 
                            variant={isJoined ? "outline" : "solid"} 
                            height="30px" pl={6} pr={6} 
                            onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
                            isLoading={loading}
                        >
                            {isJoined ? "参加中" : "参加する"}
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Header