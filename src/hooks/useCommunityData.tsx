import { collection, doc, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil'
import { community, communityState } from '../Atoms/communityAtoms'
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

            const snippets = snippetDocs.docs.map((docs) => ({ ...docs.data()}))
        } catch (error) {
            console.log("getMySnippets error", error)
        }
    } 

    const joinCommunity = (communityData: community) => {};

    const leaveCommunity = (communityId: string) => {};


    return {
        communityStateValue,
        onJoinOrLeaveCommunity,
    }
}

export default useCommunityData