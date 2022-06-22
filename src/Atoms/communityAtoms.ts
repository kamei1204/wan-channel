import { Timestamp } from "firebase/firestore"
import { atom } from "recoil";

// ここにあるインターフェイスにより、コードを強固にしエラーやバグを防ぐ


export interface community {
    id              : string ;
    creatorId       : string ;
    numberOfMembers : number ;
    privacyType     : 'public' | 'restricted' | 'private' ;
    createdAt?      : Timestamp;
    imageUrl ?      : string;
}

export interface CommunitySnippet {
    communityId: string;
    // Moderator(モデレーター)Web上の掲示板やコミュニティサイト、Webサイト内で意見を交換し合う際に、仲介者となってことを取りまとめる立ち位置の人をモデレータと言い、常に中立な立場が求められます。
    isModerator?: boolean;
    imageUrl?: string;
}
// 実際にコミュニティーをモデル化し何が入っているのかを正確に知ることができ、コミュニティーの状態をmySnippetsに配列で保存する
interface CommunityState {
    mySnippets: CommunitySnippet[];
}


const defaultCommunityState: CommunityState = {
    mySnippets: [],
}

export const communityState = atom<CommunityState>({
    key: "communitiesState",
    default: defaultCommunityState,
})