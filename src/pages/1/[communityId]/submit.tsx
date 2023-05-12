import { Box } from '@chakra-ui/react'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import About from '../../../components/community/About'
import PageContent from '../../../components/Layout/PageContent'
import NewPostLink from '../../../components/Post/NewPostLink'
import { auth } from '../../../FireBase/ClientApp'
import useCommunityData from '../../../hooks/useCommunityData'

const Submit:React.FC = () => {
    const [user] = useAuthState(auth);
    // const communityStateValue = useRecoilValue(communityState)
    const { communityStateValue } = useCommunityData();
    console.log(communityStateValue.currentCommunity)
    return (
        <PageContent>
            <>
                <Box padding="14px 0px" borderBottom="1px solid" borderColor="white">
                    {user && <NewPostLink user={user}/>}
                </Box>
            </>
            <>
            <Box mt={6} borderBottom="1px solid" borderColor="white">
                {communityStateValue.currentCommunity && (
                <About communityData={communityStateValue.currentCommunity}/>
                )}
                </Box>
            </>
        </PageContent>
    )
}

export default Submit