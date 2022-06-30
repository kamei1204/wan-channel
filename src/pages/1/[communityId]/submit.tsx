import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import PageContent from '../../../components/Layout/PageContent'
import NewPostLink from '../../../components/Post/NewPostLink'

type Props = {}

const submit:React.FC = () => {
    return (
        <PageContent>
            <>
                <Box padding="14px 0px" borderBottom="1px solid" borderColor="white">
                    <NewPostLink />
                </Box>
            </>
            <></>
        </PageContent>
    )
}

export default submit