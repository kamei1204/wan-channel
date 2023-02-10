import { Box, Flex } from '@chakra-ui/react';
import { User } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Post } from '../../../Atoms/postsAtoms'
import CommentInput from './CommentInput';

type CommentsProps = {
    user         : User,
    selectedPost : Post,
    communityId  : string,
};

const Comments:React.FC<CommentsProps> = ({ user, selectedPost, communityId }) => {

    const [ commentText, setCommentText ] = useState("");
    const [ comment, setComment ] = useState([]);
    const [ createLoading, setCreateLoading ] = useState(false);
    const [ fetchLoading, setFetchLoading ] = useState(false);

    const onCreateComment = (commentText:string) => {};
    const deleteComment = (comment:string) => {};
    const getComments    = () => {};
    
    useEffect(() => {
        getComments()
    },[])

    return (
        <Box bg="white" p={2} borderRadius="0px 0px 4px 4px">
            <Flex 
                flexDirection="column" 
                width="100%" 
                pl={10} 
                pr={4} 
                pb={6} 
                fontSize="10pt">
            <CommentInput 
                commentText={commentText} 
                setCommentText={setCommentText} 
                createLoading={createLoading} 
                user={user}
                onCreateComment={onCreateComment}/>
            </Flex>
        </Box>
    )
}

export default Comments