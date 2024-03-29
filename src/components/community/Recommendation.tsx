import { Box, Button, Flex, Icon, Image, Link, Skeleton, SkeletonCircle, Stack, Text } from '@chakra-ui/react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Community } from '../../Atoms/communityAtoms'
import { firestore } from '../../FireBase/ClientApp';
import useCommunityData from '../../hooks/useCommunityData';
import { CgArrowUpO } from 'react-icons/cg'

type Props = {}

const Recommendation = (props: Props) => {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [loading, setLoading] = useState(false);
    const { communityStateValue, onJoinOrLeaveCommunity} = useCommunityData();

    const getCommunityRecommendation = async () => {
        setLoading(true);
        try {
            const communityQuery = query(collection(firestore, "communities"),
            orderBy("numberOfMembers", "desc"),
            limit(5));
            const communityDocs = await getDocs(communityQuery);
            const communities = communityDocs.docs.map((doc) => ({id: doc.id, ...doc.data(),}))
            setCommunities(communities as Community[]);
        } catch (error) {
            console.log("getCommunityRecommendationError", error)
        }
        setLoading(false);
    };

    useEffect(() => {
        getCommunityRecommendation()
    },[]);

return (
    <Flex 
        direction='column' 
        bg='white' 
        borderRadius={4} 
        border='1px solid' 
        borderColor='gray.300'>
        <Flex 
            align='flex-end' 
            color='white' 
            p='6px 10px' 
            height='70px' 
            borderRadius='4px 4px 0px 0px' 
            fontWeight={700} 
            bgImage='url(/images/sunny.png)' 
            backgroundSize='cover'
            >
                Top Communities
        </Flex>
        <Flex 
            direction='column'>
                {loading ? (
                    <Stack mt={2} p={3}>
                        <Flex justify='space-between' align='center'>
                            <SkeletonCircle size='10' />
                            <Skeleton height='10px' width='70%' />
                        </Flex>
                        <Flex justify='space-between' align='center'>
                            <SkeletonCircle size='10' />
                            <Skeleton height='10px' width='70%' />
                        </Flex>
                        <Flex justify='space-between' align='center'>
                            <SkeletonCircle size='10' />
                            <Skeleton height='10px' width='70%' />
                        </Flex>
                    </Stack>
                ) : (
                    <>
                        {communities.map((item, index) => {
                            const isJoined = !!communityStateValue.mySnippets.find((snippet) => snippet.communityId === item.id);
                            return (
                                <Link key={item.id} href={`/1/${item.id}`}>
                                    <Flex
                                    position='relative'
                                    align='center'
                                    fontSize='10pt'
                                    borderBottom='1px solid'
                                    borderColor='gray.200'
                                    p='10px 12px'>
                                        <Flex width='80%' align='center'>
                                            <Flex width="15%">
                                                <Text>{index + 1}</Text>
                                            </Flex>
                                            <Flex align='center' width='80%'>
                                                {item.imageURL ? (
                                                    <Image src={item.imageURL} borderRadius='full' boxSize='28px' mr={2}/>
                                                ) : (
                                                    <Icon as={CgArrowUpO} fontSize={30} color='brand.100' mr={2}/>
                                                )}
                                                <span style={{
                                                    whiteSpace: 'nowrap',
                                                    overflow  : 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    }}>
                                                    {`1/${item.id}`}
                                                </span>
                                            </Flex>
                                        </Flex>
                                        <Box position='absolute' right='10px'>
                                            <Button 
                                                height='22px'
                                                fontSize='8pt'
                                                variant={isJoined ? 'outline' : 'solid'}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    onJoinOrLeaveCommunity(item, isJoined);
                                                }}
                                            >{isJoined ? "joined" : "join"}
                                            </Button>
                                        </Box>
                                    </Flex>
                                </Link>
                            )
                        })}
                        {/* <Box p="10px 20px">
                        <Button height="30px" width="100%">
                            View All
                        </Button>
                        </Box> */}
                    </>
                )}
            </Flex>

    </Flex>
)
}

export default Recommendation