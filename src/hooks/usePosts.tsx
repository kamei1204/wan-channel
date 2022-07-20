import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { postState } from '../Atoms/postsAtoms'

const usePosts = () => {
    const [postStateValue, setPostStateValue ] = useRecoilState(postState)

    //投票機能
    const onVote = async() => {};

    // 投票ページに移動
    const onSelectPost = () => {};

    // 投票の削除
    const onDeletePost = () => {};

    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onDeletePost,
        onSelectPost,
    }
}

export default usePosts