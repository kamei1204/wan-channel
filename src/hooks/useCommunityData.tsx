import { async } from '@firebase/util';
import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil'
import { community, CommunitySnippet, communityState } from '../Atoms/communityAtoms'
import { auth, firestore } from '../FireBase/ClientApp';

const useCommunityData = () => {
    const [user] = useAuthState(auth)
    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);

    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState("")

    // この関数の内部で最初にサインインしたユーザーを確認して
    // if not() 存在しない場合は、登録Modalを開く
    const onJoinOrLeaveCommunity = (communityDate: community, isJoined: boolean) => {
        if(isJoined) {
            leaveCommunity(communityDate.id)
            return;
        }
        joinCommunity(communityDate)
    };   

    const getMySnippets = async() => {
        setLoading(true);
        try {
            const snippetDocs = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippets`))

            const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data()}));
                setCommunityStateValue(prev => ({
                    ...prev,
                    mySnippets: snippets as CommunitySnippet[],
                }))
            // データを文書化する
            console.log('here snippet' , snippets)
        } catch (error:any) {
            console.log("getMySnippets error", error)
            setError(error.message)
        }
        setLoading(false)
    }; 

    
    
    const joinCommunity = async (communityData: community) => {
        try {
            // writeBatchによってfirestoreに書き込みをする
            const batch = writeBatch(firestore)

            const newSnippet: CommunitySnippet = {
                communityId: communityData.id,
                imageUrl: communityData.imageUrl || ""
            }

            // doc関数の第3の引数に新しく作成されたIDを指定して、newSnippetsが新しいオブジェクトになる
            batch.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityData.id),newSnippet)

            // メンバー数を更新する //第二引数のオブジェクトに更新したいアカウントを指定する
            batch.update(doc(firestore, "communities", communityData.id), {
                numberOfMembers: increment(1)
            });
            // batchを適用するためにcommitする必要がある　//
            await batch.commit()
            //recoilStateをアップデート
            setCommunityStateValue(prev => ({
                ...prev
            }))

        } catch (error:any) {
            console.log("参加時のエラー", error)
            setError(error.message)
        }
    };
    
    const leaveCommunity = (communityId: string) => {};
    
    useEffect(() => {
        if(!user) return;
        getMySnippets()
    },[user])

    return {
        // データの関数
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading,
    };
};

export default useCommunityData