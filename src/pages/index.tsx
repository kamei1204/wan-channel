import { Stack } from '@chakra-ui/react';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';
import { communityState } from '../Atoms/communityAtoms';
import { Post, PostVote } from '../Atoms/postsAtoms';
import PersonalHome from '../components/community/PersonalHome';
import Premium from '../components/community/Premium';
import Recommendation from '../components/community/Recommendation';
import PageContent from '../components/Layout/PageContent'
import CreatePostLink from '../components/Post/CreatePostLink';
import PostItem from '../components/Post/PostItem';
import PostLoader from '../components/Post/PostLoader';
import { auth, firestore } from '../FireBase/ClientApp';
import useCommunityData from '../hooks/useCommunityData';
import usePosts from '../hooks/usePosts';

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth)
  const [loading, setLoading] = useState(false);
  const { postStateValue, setPostStateValue, onDeletePost, onSelectPost, onVote } = usePosts();
  const { communityStateValue } = useCommunityData()

  const buildUserHomeFeed = async() => { 
    setLoading(true);
    try {
      if (communityStateValue.mySnippets.length) {
        //コミュニティからpost情報を取得する
        const communityStateIds = communityStateValue.mySnippets.map((snippet) => 
          snippet.communityId);
        const postQuery = query(collection(firestore, "posts"), where("communityId", "in", communityStateIds), limit(10));
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
    setLoading(false);
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

  const getUserPostVotes = async () => {
      try {
        const postIds = postStateValue.posts.map((post) => post.id);
        const postVotesQuery = query(collection(firestore,`users/${user?.uid}/postVotes`),
        where("postId", "in", postIds));
        const postVoteDocs = await getDocs(postVotesQuery);
        const postVotes = postVoteDocs.docs.map((doc) => ({ id: doc.id, ...doc.data(),}));

        setPostStateValue((prev) => ({
          ...prev,
          postVotes: postVotes as PostVote[],
        }));
      } catch (error) {
        console.log("getUserPostError", error)
      }
  };

  //useEffects
  useEffect(() => {
    if (communityStateValue.snippetsFetched) buildUserHomeFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[communityStateValue.snippetsFetched])
  

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loadingUser]);

  useEffect(() => {
      if(user && postStateValue.posts.length) getUserPostVotes();
      return () => {
        setPostStateValue((prev) => ({
          ...prev,
          postVotes: [],
        }));
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user, postStateValue.posts])

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
      <Stack spacing={5}>
        <Recommendation />
        <Premium />
        <PersonalHome />
      </Stack>
      </>
    </PageContent>
  )
}

export default Home
