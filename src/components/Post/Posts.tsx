import { Stack } from '@chakra-ui/react';
import { collection, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { community } from '../../Atoms/communityAtoms'
import { Post } from '../../Atoms/postsAtoms';
import { auth, firestore } from '../../FireBase/ClientApp';
import usePosts from '../../hooks/usePosts';
import PostItem from './postItem';

type PostsProps = {
    communityData: community;
    userId?: "string"
}

const Posts:React.FC<PostsProps> = ({ communityData }) => {

    const [user] = useAuthState(auth)
    const [ loading, setLoading ] = useState(false);
    const { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost } = usePosts();

    const getPosts = async () => {
    
        try {

            // ドキュメントはコレクションの中にあります。コレクションは単なるドキュメントのコンテナです。
            // たとえば、users コレクションを作成して、さまざまなユーザーを表すドキュメントを格納できます
            // この場合、collectionの中のfirestoreの中の、"posts"がドキュメントにあたる
            // コレクション内のドキュメントに対してクエリを実行すれば、1 回のリクエストで複数のドキュメントを取得することも可能
            const postQuery = query(collection(firestore, "posts"),

            // ==	～と等しい	.where("userName", "==", "山田太郎") クエリ演算子
            where( "communityId", "==", communityData.id),

            // orderBy("age")とすることで、ageで昇順ソート、orderBy("age", "desc")
            // orderBy 並び替え この場合、更新日時を降順("desc")
            orderBy("createdAt", "desc")
            );

            const postDocs = await getDocs(postQuery);

            const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            // 前の情報をとる
            // そのオブジェクトの情報を展開して格納
            setPostStateValue((prev) => ({
                ...prev,
                posts: posts as Post[],
            }))

            console.log("posts", posts)
        
        } catch (error:any) {
            console.log("getPosts error", error.message)
        }
    
    };

    useEffect(() => {
        getPosts()
    }, [])
    

    return (
        <Stack>
            {postStateValue.posts.map((item) => (
                <PostItem   post={item} userCreator={user?.uid === item.creatorId} 
                            onVote={onVote} onDeletePost={onDeletePost} onSelectPost={onSelectPost}/>
            ))}
        </Stack>
    )
}

export default Posts