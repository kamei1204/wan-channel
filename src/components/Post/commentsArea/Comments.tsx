import { Box, Flex, SkeletonCircle, SkeletonText, Stack, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, increment, orderBy, query, serverTimestamp, Timestamp, where, writeBatch } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil';
import { Post, postState } from '../../../Atoms/postsAtoms'
import { firestore } from '../../../FireBase/ClientApp';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';


type CommentsProps = {
    user         : User,
    selectedPost : Post | null,
    communityId  : string,
};

export type Comment = {
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
    const [ comments, setComments ] = useState<Comment[]>([]);
    const [ createLoading, setCreateLoading ] = useState(false);
    const [ fetchLoading, setFetchLoading ] = useState(true);
    const setPostState = useSetRecoilState(postState);
    const [loadingDeleteId, setLoadingDeleteId] = useState('');

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

            newComment.createdAt = { seconds : Date.now() / 1000 } as Timestamp
            //コメントの数を増やす
            const postDocRef = doc(firestore, "posts", selectedPost?.id!)
            batch.update(postDocRef, {
                numberOfComments : increment(1),
            });

            await batch.commit();

            //recoil stateの更新
            setCommentText("");
            //新しいコメントが上にくるように配列をセットし直す
            console.log("comment" , newComment)
            setComments((prev) => [newComment, ...prev]);
            //
            setPostState((prev) => ({
                ...prev,
                selectedPost: {
                    ...prev.selectedPost,
                    numberOfComments : prev.selectedPost?.numberOfComments! + 1
                } as Post
            }));
        } catch (error) {
            console.log("onCreateCommentError", error)
        }
        setCreateLoading(false);
    };

    const onDeleteComment = async (comment: Comment) => {
        setLoadingDeleteId(comment.id!)
        try {
            const batch = writeBatch(firestore);

            //dbから削除
            const commentDocRef = doc(firestore, "comments", comment.id!)
            batch.delete(commentDocRef);

            //コメント数を減らす
            const postDocRef = doc(firestore, "posts", selectedPost?.id!)
            batch.update(postDocRef, {
                numberOfComments: increment(-1),
            });

            await batch.commit();
            //状態管理
            setPostState((prev) => ({
                ...prev,
                selectedPost: {
                    ...prev.selectedPost,
                    numberOfComments: prev.selectedPost?.numberOfComments! - 1
                } as Post
            }));

            setComments((prev) => prev.filter((item) => item.id !== comment.id));

        } catch (error) {
            console.log("onDeleteCommentError", error)
        };
        setLoadingDeleteId('')
    }

    const getComments = async () => {
        try {
            const commentsQuery = query(
                collection(firestore, "comments"),
                where("postId", "==", selectedPost?.id),
                orderBy("createdAt", "desc"));
            const commentDocs = await getDocs(commentsQuery);
            const comments = commentDocs.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setComments(comments as Comment[]);
        } catch (error) {
            console.log("getCommentsError", error)
        } 
        setFetchLoading(false)
};
    
    useEffect(() => {
        if (!selectedPost) return
        getComments()
    },[selectedPost])

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
            <Stack spacing={6} p={2}>
                {fetchLoading ? (
                    <>
                        {[0, 1, 2].map((item) => (
                        <Box key={item} padding="6" bg="white">
                            <SkeletonCircle size="10" />
                            <SkeletonText mt="4" noOfLines={2} spacing="4" />
                        </Box>
                        ))}
                    </>
                ) : (
                    <>
                        {comments.length === 0 ? (
                            <Flex
                                direction="column"
                                justify="center"
                                align="center"
                                borderTop="1px solid"
                                borderColor="gray.100"
                                p={20}
                            >
                                <Text fontWeight={700} opacity={0.3}>
                                まだコメントはありません
                                </Text>
                            </Flex>
                            ) : (
                            <>
                                {comments.map((comment)=> (
                                <CommentItem 
                                    comment={comment} 
                                    onDeleteComment={onDeleteComment} 
                                    loadingDelete={loadingDeleteId === comment.id} 
                                    userId={user.uid}/>
                                ))}         
                            </>
                        )}
                    </>
                )}
            </Stack>
        </Box>
    )
}

export default Comments