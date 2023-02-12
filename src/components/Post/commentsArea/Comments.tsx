import { Box, Flex } from '@chakra-ui/react';
import { User } from 'firebase/auth'
import { collection, doc, increment, serverTimestamp, Timestamp, writeBatch } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil';
import { Post, postState } from '../../../Atoms/postsAtoms'
import { firestore } from '../../../FireBase/ClientApp';
import CommentInput from './CommentInput';

type CommentsProps = {
    user         : User,
    selectedPost : Post | null,
    communityId  : string,
};

type Comment = {
    id?         : string,
    creatorId   : string,
    displayName : string,
    postId      : string,
    postTitle   : string,
    text        : string ,
    createdAt   : Timestamp,

}

const Comments:React.FC<CommentsProps> = ({ user, selectedPost, communityId }) => {

    const [ commentText, setCommentText ] = useState("");
    const [ comment, setComment ] = useState<Comment[]>([]);
    const [ createLoading, setCreateLoading ] = useState(false);
    const [ fetchLoading, setFetchLoading ] = useState(false);
    const setPostState = useSetRecoilState(postState);

    const onCreateComment = async() => {

        setCreateLoading(true);

        try {
            const batch = writeBatch(firestore);

            //新しくcommentsドキュメントを作成
            const commentDocRef = doc(collection(firestore, "comments"))
            const newComment: Comment = {
                id: commentDocRef.id,
                creatorId : user.uid,
                displayName : user.email!.split("@")[0],
                postId      : selectedPost?.id!,
                postTitle   : selectedPost?.title!,
                text        : commentText,
                createdAt   : serverTimestamp() as Timestamp
            }

            batch.set(commentDocRef, newComment);
            //コメントの数を増やす
            const postDocRef = doc(firestore, "posts", selectedPost?.id!)
            batch.update(postDocRef, {
                numberOfComments : increment(1),
            });

            await batch.commit();

            //recoil stateの更新
            setCommentText("");
            //新しいコメントが上にくるように配列をセットし直す
            setComment((prev) => [newComment, ...prev])
            //
            setPostState((prev) => ({
                ...prev,
                selectedPost: {
                    ...prev.selectedPost,
                    numberOfComments : prev.selectedPost?.numberOfComments! + 1
                } as Post
            }))
        } catch (error) {
            console.log("onCreateCommentError", error)
        }
        setCreateLoading(false);
    };

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