import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import PageContent from '../../../../components/Layout/PageContent'
import PostItem from '../../../../components/Post/PostItem'
import { auth, firestore } from '../../../../FireBase/ClientApp'
import usePosts from "../../../../hooks/usePosts"
import { useRouter } from "next/router"
import { doc, getDoc } from 'firebase/firestore'
import { Post } from '../../../../Atoms/postsAtoms'
import About from '../../../../components/community/About'
import useCommunityData from '../../../../hooks/useCommunityData'
import { communityState } from '../../../../Atoms/communityAtoms'
import Comments from '../../../../components/Post/comments/comments'

const postPage: React.FC = () => {

    const [user] = useAuthState(auth)
    const { postStateValue, setPostStateValue, onVote, onDeletePost, onSelectPost, } = usePosts();
    const router = useRouter();
    const { communityStateValue } = useCommunityData();

    const fetchPost = async (postId :string) => {
        try {
            const fetchDoc = doc(firestore,"posts",postId);
            const postDoc = await getDoc(fetchDoc);
            setPostStateValue((prev) => ({
                ...prev,
                selectedPost: { id: postDoc.id, ...postDoc.data() } as Post
            })
        )} catch (error) {
            console.log(error,"エラー")
        }
    };

    // ページがレンダリングされた時の処理
    useEffect(() => {
        const {pid} = router.query;

        //pidに選択した投稿がなかった場合//fetchPostでデータを取ってくる
        if( pid && !postStateValue.selectedPost ) {
            fetchPost(pid as string);
        }
    }, [router.query,postStateValue.selectedPost]);
    

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
                <Comments />
            </>
            <>
                {communityStateValue.currentCommunity &&
                <About communityData={communityStateValue.currentCommunity}/>
                }
            </>
        </PageContent>
    )
}

export default postPage