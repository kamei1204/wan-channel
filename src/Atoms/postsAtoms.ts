import { Timestamp } from "firebase/firestore"
import { atom } from "recoil"

export type Post = {

    communityId        : string ;
    creatorId          : string ;
    creatorDisplayName : string ;
    title              : string ; 
    body               : string ;
    numberOfComments   : number ;
    voteStatus         : number ;currentUserVoteStatus?: {
        id: string;
        voteValue: number;
    };
    createdAt          : Timestamp ;
    imageURL?          : string ;
}

export type PostVote = {
    id?         : string;
    postId      : string;
    communityId : string;
    voteValue   : number;

}
interface PostState {
    selectedPost: Post | null;
    posts       : Post[];
    postVotes   : PostVote[];
}

const defaultPostState: PostState = {
    selectedPost : null,
    posts        : [],
    postVotes    : [],
}

export const postState = atom<PostState>({
    key      : "postState",
    default  : defaultPostState,
})