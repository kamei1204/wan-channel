import { Box, Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'
import React from 'react'

const PostLoader = () => {
    return (
        <Stack spacing={6}>
            <Box padding='6' boxShadow='lg' bg='white'>
                <SkeletonText mt='4' noOfLines={4} spacing='4' />
                <SkeletonText mt='4' noOfLines={4} spacing='4' />
                <Skeleton height="200px"/>
            </Box>
            <Box padding='6' boxShadow='lg' bg='white'>
                <SkeletonText mt='4' noOfLines={4} spacing='4' />
                <SkeletonText mt='4' noOfLines={4} spacing='4' />
                <Skeleton height="200px"/>
            </Box>
        </Stack>
    )
}

export default PostLoader
