import { Stack } from '@chakra-ui/react';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';
import { communityState } from '../Atoms/communityAtoms';
import { Post } from '../Atoms/postsAtoms';
import PageContent from '../components/Layout/PageContent'
import CreatePostLink from '../components/Post/CreatePostLink';
import PostItem from '../components/Post/PostItem';
import PostLoader from '../components/Post/PostLoader';
import { auth, firestore } from '../FireBase/ClientApp';
import usePosts from '../hooks/usePosts';

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth)
  const [loading, setLoading] = useState(false);
  const { postStateValue, setPostStateValue, onDeletePost, onSelectPost, onVote } = usePosts();
  const communityStateValue = useRecoilValue(communityState);

  const buildUserHomeFeed = async() => { 
    setLoading(true);
    try {
      if (communityStateValue.mySnippets.length) {
        const communityStateIds = communityStateValue.mySnippets.map((snippet) => {
          snippet.communityId
        });
        const postQuery = query(collection(firestore, "posts"), where("communityId", "in", communityStateIds), limit(10))
        const postDocs = await getDocs(postQuery);
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setPostStateValue((prev) => ({
          ...prev,
          posts: posts as Post[],
        }))
      } else {
        buildNoUserHomeFeed
      }
    } catch (error) {
      console.log('buildUserHomeFeed Error', error)
    }
  };

  //ユーザーがいない場合、最も人気の高い10件のデータを取得する
  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(collection(firestore, 'posts'), orderBy('voteStatus', 'desc'), limit(10));
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }))
    } catch (error) {
      console.log('buildNoUserHomeFeed error',error)
    }
    setLoading(false)
  };

  const getUserPostVotes = () => { };

  //useEffects
  useEffect(() => {
    if (communityStateValue.mySnippets.length) buildUserHomeFeed();
  })

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser]);

  return (
    <PageContent>
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
            <Stack>
              {postStateValue.posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              onDeletePost={onDeletePost}
              onSelectPost={onSelectPost}
              onVote={onVote}
              userVoteValue={
                postStateValue.postVotes.find((item) => item.postId === post.id)?.voteValue
              }
              userCreator={user?.uid === post.creatorId}
              homePage
            />
        ))}</Stack>)}
      </>
      <>
      </>
    </PageContent>
  )
}

export default Home
