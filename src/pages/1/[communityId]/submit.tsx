import { Box } from '@chakra-ui/react'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import PageContent from '../../../components/Layout/PageContent'
import NewPostLink from '../../../components/Post/NewPostLink'
import { auth } from '../../../FireBase/ClientApp'

type Props = {}

const submit:React.FC = () => {
    const [user] = useAuthState(auth) 
    return (
        <PageContent>
            <>
                <Box padding="14px 0px" borderBottom="1px solid" borderColor="white">
                    {user && <NewPostLink  user={user}/>}
                </Box>
            </>
            <></>
        </PageContent>
    )
}

export default submit