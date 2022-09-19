import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import PageContent from '../../../../components/Layout/PageContent'
import PostItem from '../../../../components/Post/PostItem'
import { auth } from '../../../../FireBase/ClientApp'
import usePosts from "../../../../hooks/usePosts"

const postPage = () => {

    const [user] = useAuthState(auth)
    const { postStateValue, setPostStateValue, onVote, onDeletePost, onSelectPost, } = usePosts()

    return (
        <PageContent>
            <>
            { postStateValue.selectedPost &&
                <PostItem 
                    post={postStateValue.selectedPost}
                    onVote={onVote}
                    onDeletePost={onDeletePost}
                    userVoteValue={postStateValue.postVotes.find((item) => item.postId === postStateValue.selectedPost?.id)?.voteValue}
                    userCreator={user?.uid === postStateValue.selectedPost?.creatorId}
                    />
            }
            </>
            <></>
        </PageContent>
    )
}

export default postPage