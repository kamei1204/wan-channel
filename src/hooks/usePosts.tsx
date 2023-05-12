import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { authModalState } from '../Atoms/authModalAtom'
import { communityState } from '../Atoms/communityAtoms'
import { Post, postState, PostVote } from '../Atoms/postsAtoms'
import { auth, firestore, storage } from '../FireBase/ClientApp'
import { useRouter } from 'next/router'

const usePosts = () => {
    const [user] = useAuthState(auth)
    const [postStateValue, setPostStateValue ] = useRecoilState(postState);
    const currentCommunity = useRecoilValue(communityState).currentCommunity;
    const setAuthModalState = useSetRecoilState(authModalState)
    const router = useRouter()

    //投票機能
    const onVote = async ( event: React.MouseEvent<SVGAElement, MouseEvent>, post:Post, vote:number, communityId: string) => {

        event.stopPropagation();

        if(!user?.uid) {
            setAuthModalState({ open: true , view: "ログイン"})
            return;
        }

        try{
            const { voteStatus } = post;
            // idの一致を確認して、投票があるかを確認する
            const exitsInVote = postStateValue.postVotes.find((vote) => vote.postId === post.id);
            
            let voteChange = vote;
            const batch = writeBatch(firestore);
            const updatedPost = { ...post };
            const updatedPosts = [ ...postStateValue.posts ];
            let   updatedVotes = [ ...postStateValue.postVotes ];

            if (!exitsInVote) {
                // 新しく投票のドキュメントを作成
                const postVoteRef = doc(collection(firestore, "users", `${user?.uid}/postVotes`));

                const newVote:PostVote = {
                    id: postVoteRef.id,
                    postId: post.id,
                    communityId,
                    voteValue: vote, // +1 or -1 //
                };

                // batch オブジェクトを作り、命令を batch に set し、最後にその batch を commit すると可能です。
                batch.set(postVoteRef, newVote)

                // await batch.commit

                // 現在の投票ステータスに +1 or -1 を付け加える
                updatedPost.voteStatus = voteStatus + vote;
                updatedVotes = [...updatedVotes, newVote];
            } 
            else {

                const postVoteRef = doc(firestore, "users", `${user?.uid}/postVotes/${exitsInVote.id}`);

                if (exitsInVote.voteValue === vote) {
                    voteChange *= -1;
                    updatedPost.voteStatus = voteStatus - vote;
                    updatedVotes = updatedVotes.filter((vote) => vote.id !== exitsInVote.id);

                    batch.delete(postVoteRef);

                } else {
                    voteChange = 2 * vote;
                    updatedPost.voteStatus = voteStatus + 2 * vote;

                    const voteIdx = postStateValue.postVotes.findIndex((vote) => vote.id === exitsInVote.id);
                    console.log("HERE IS VOTE INDEX", voteIdx);

                    if (voteIdx !== -1)
                    updatedVotes[voteIdx] = {
                        ...exitsInVote,
                        voteValue: vote,
                    };

                    batch.update(postVoteRef, {
                        voteValue: vote,
                    });
                }
            } 

            
            const postIdx = postStateValue.posts.findIndex((item) => item.id === post.id);

            updatedPosts[postIdx] = updatedPost;
            setPostStateValue((prev) => ({
                ...prev,
                posts     : updatedPosts,
                postVotes : updatedVotes,
            }));
            
            const postRef = doc(firestore, "posts", post.id!)
            batch.update(postRef, { voteStatus: voteStatus + voteChange });

            await batch.commit();
        } catch (error:any) {
            console.log('onVote', error)            
        }
    };

    // 投稿ページに移動
    const onSelectPost = (post: Post) => {
        setPostStateValue((prev) => ({
            ...prev,
            selectedPost: post,
        }))
        router.push(`/1/${post.communityId}/comments/${post.id}`)
    };

    // 投票の削除
    const onDeletePost = async (post:Post): Promise<boolean> => {
        try {
            // ストレージの画像を参照して、削除する
            if(post.imageURL) {
                const imageRef = ref(storage, `posts/${post.id}/image`);
                await deleteObject(imageRef)
            }
            
            // 投稿を削除する
            const postDocRef = doc(firestore, "posts", post.id!)
            await deleteDoc(postDocRef)

            setPostStateValue((prev) => ({
                ...prev,
                posts: prev.posts.filter((item) => item.id !== post.id)
            }))

            return true
        } catch (error) {
            return false
        }
    };

    const getCommunityPostVotes = async (communityId:string) => {
        // コレクションにはドキュメントを保存することができる。コレクションの中にはコレクションを保存することはできない。それぞれのコレクションはIDを持つ。
        // const q = query(collection(db, "cities"), where("capital", "==", true));
        const postVotesQuery = query(collection(firestore, "users", `${user?.uid}/postVotes`),
        where("communityId", "==", communityId))

        const getVoteDocs = await getDocs(postVotesQuery);
        const postVotes = getVoteDocs.docs.map((doc) => ({ id: doc.id, ...doc.data(), }));
        setPostStateValue((prev) => ({
            ...prev,
            postVotes: postVotes as PostVote[],
        }));
    };

    useEffect(() => {
        if(!user || !currentCommunity?.id) return;
        getCommunityPostVotes(currentCommunity?.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user,currentCommunity])

    // ユーザーがいない時の解除、配列の値をバラバラにして、空にする
    useEffect(() => {
        if(!user) {
            setPostStateValue((prev) => ({
                ...prev,
                postVotes: [],
            }));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user]);

    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onDeletePost,
        onSelectPost,
    }
}

export default usePosts