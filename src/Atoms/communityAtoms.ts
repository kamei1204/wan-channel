import { Timestamp } from "firebase/firestore"


export interface community {
    id              : string ;
    creatorId       : string ;
    numberOfMembers : number ;
    privacyType     : 'public' | 'restricted' | 'private' ;
    createdAt?      : Timestamp;
    imageUrl ?      : string;
}