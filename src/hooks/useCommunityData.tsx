import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil'
import { authModalState } from '../Atoms/authModalAtom';
import { community, CommunitySnippet, communityState } from '../Atoms/communityAtoms'
import { auth, firestore } from '../FireBase/ClientApp';

const useCommunityData = () => {
    const [user] = useAuthState(auth)
    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
    const setAuthModalState = useSetRecoilState(authModalState);

    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState("")

    // この関数の内部で最初にサインインしたユーザーを確認して
    // if not() 存在しない場合は、登録Modalを開く
    const onJoinOrLeaveCommunity = (communityDate: community, isJoined: boolean) => {
        // ユーザーが存在しない場合ログインModalを開く
        if(!user) {
            setAuthModalState({open: true, view: "ログイン"});
            return
        }

        // ユーザーが存在する場合、ローディングを開始
        setLoading(true)
        // すでに参加している場合は、退室処理が走る
        if(isJoined) {
            leaveCommunity(communityDate.id)
            return;
        }
        // 参加する
        joinCommunity(communityDate)
    };   

    const getMySnippets = async () => {
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
                imageURL: communityData.imageURL || ""
            }

            // doc関数の第3の引数に新しく作成されたIDを指定して、newSnippetsが新しくなる
            batch.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityData.id),newSnippet)

            // メンバー数を更新する //update第二引数のオブジェクトに更新したいアカウントを指定する
            batch.update(doc(firestore, "communities", communityData.id), {
                numberOfMembers: increment(1)
            });
            // batchを適用するためにcommitする必要がある //
            await batch.commit()
            //recoilStateをアップデート,recoilの状態を更新する
            setCommunityStateValue(prev => ({
                ...prev,
                //
                mySnippets: [...prev.mySnippets,newSnippet]
            }))

        } catch (error:any) {
            console.log("参加時のエラー", error)
            setError(error.message)
        }
        setLoading(false)
    };
    
    //退出時のmySnippetsの削除
    const leaveCommunity = async (communityId: string) => {
        try {
            const batch = writeBatch(firestore);
            
            // batch.delete = docの個人情報を削除
            batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`, communityId));

            // doc内communitiesのメンバーを1減らす
            batch.update(doc(firestore, "communities", communityId), {
                numberOfMembers: increment(-1)
            });

            await batch.commit();
            //recoilStateをアップデート,recoilの状態を更新する,prev = 以前の値を...(スプレッド構文)で展開
            setCommunityStateValue((prev) => ({
                ...prev,
                // 以前のmySnippetsに今回更新された値からfilter関数でitemを取り出しその中から異なる値を取り除く
                mySnippets: prev.mySnippets.filter((item) => item.communityId !== communityId),
            }));
        } catch (error:any) {
            console.log('退出時のエラー', error)
            setError(error.message)
        }
    };
    
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