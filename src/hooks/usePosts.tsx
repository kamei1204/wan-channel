import { deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { useRecoilState } from 'recoil'
import { Post, postState } from '../Atoms/postsAtoms'
import { firestore, storage } from '../FireBase/ClientApp'

const usePosts = () => {
    const [postStateValue, setPostStateValue ] = useRecoilState(postState)

    //投票機能
    const onVote = async() => {};

    // 投票ページに移動
    const onSelectPost = () => {};

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

    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onDeletePost,
        onSelectPost,
    }
}

export default usePosts