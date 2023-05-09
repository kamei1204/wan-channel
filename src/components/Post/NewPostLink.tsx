import { Alert, AlertIcon,  Flex, Icon, Text } from '@chakra-ui/react'
import { User } from 'firebase/auth';
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { IoDocumentText, IoImageOutline, IoLink, IoMic, IoPeopleOutline } from 'react-icons/io5'
import { Post } from '../../Atoms/postsAtoms';
import { firestore, storage } from '../../FireBase/ClientApp';
import useSelectedFile from '../../hooks/useSelectedFile';
import ImageInput from './ImageInput';
import TabItems from './TabItem';

import TextInput from './TextInput';

type NewPostLinkProps = {
    user: User;
    communityImageUrl?: string;
}

const formTabs: TabItem[] = [
    {
        title: "投稿",
        icon : IoDocumentText
    },
    {
        title: "写真 & 動画",
        icon : IoImageOutline
    },
    {
        title: "リンク",
        icon : IoLink
    },
    {
        title: "音声",
        icon : IoMic
    },
];

export type  TabItem = {
    title: string;
    icon : typeof Icon.arguments;
};

const NewPostLink:React.FC<NewPostLinkProps> = ({ user, communityImageUrl }) => {

    const router = useRouter();
    const [ selectedItem, setSelectedItem ] = useState(formTabs[0].title)
    const [ textInputs, setTextInputs ] = useState({
        title: "",
        body: "",
    });
    // const [ imageFile, setImageFile ] = useState<string>();
    const { imageFile, setImageFile, onSelectFile } = useSelectedFile();
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)  

    const handleCreatePost = async () => {
        const { communityId } = router.query;
        
        const newPost = {
            communityId        : communityId as string,
            communityImageUrl  : communityImageUrl || "",
            creatorId          : user?.uid,
            creatorDisplayName : user.email!.split("@")[0],
            title              : textInputs.title,
            body               : textInputs.body,
            numberOfComments   : 0,
            voteStatus         : 0,
            createdAt          : serverTimestamp() as Timestamp,
        };

        setLoading(true)
        try {
            //addDocでドキュメントに追加 第一引数に書き込みた場所、第二引数に書き込みたデータ
            const postDocRef = await addDoc(collection(firestore,"posts"),newPost)

            if (imageFile) {
                const imageRef = ref(storage,`posts/${postDocRef.id}/image`)
                await uploadString(imageRef, imageFile, 'data_url');

                const downLoadUrl = await getDownloadURL(imageRef)
                await updateDoc(postDocRef, {imageURL: downLoadUrl,});
            }
            
            router.back();

        } catch (error:any) {
            console.log("handleCreatePost error", error.message)
            setError(true)
        }
        setLoading(false)
    };

    // useSelectFileにまとめてhooksとして再利用できるようにした
    // リファクタリング


    // const onSelectImage = (event:React.ChangeEvent<HTMLInputElement>) => {
    //     // FileReaderクラスはテキストファイルを読み込むためのAPIで、テキストファイルの内容を元にした処理などを行うために使います。 
    //     // FileReaderクラスを使うと、ファイルは文字のストリームで読み込まれます
    //     const reader = new FileReader();

    //     if(event.target.files?.[0]) {
    //         reader.readAsDataURL(event.target.files[0])
    //     }

    //     // FileReader.onload - 読み込みが正常に完了した時に発火するイベント
    //     reader.onload = (readerEvent) => {
    //             if(readerEvent.target?.result) {
    //                 // as = 型アサーション(Type Assertion)とは、その推論された型や、既に型定義済みの変数の型を上書きします。
    //                 setImageFile(readerEvent.target.result as string)
    //             }
    //     }
    // };

    const onChangeText = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => { const { target: { name, value },
        } = event;
        setTextInputs((prev) => ({
                ...prev,
                [name]: value,
            }));
        };

    return (
        <Flex flexDirection="column" mt={2} borderRadius={4} bg="white">
            <Flex width="100%">
                {formTabs.map((item) => (
                    <TabItems key={item.title} item={item} selected={item.title === selectedItem} setSelectItem={setSelectedItem}/>
                ))}
            </Flex>
            <Flex p={3}>
                {selectedItem === "投稿" && (
                <TextInput 
                    textInputs = {textInputs}
                    handleCreatePost = {handleCreatePost}
                    onChange = {onChangeText}
                    loading = {loading}
                />)}
                {selectedItem === "写真 & 動画" && (
                    <ImageInput 
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        setSelectedItem={setSelectedItem}
                        onSelectImage={onSelectFile}
                        />
                )}
            </Flex>
            {error && (
                <Alert status='error'>
                    <AlertIcon />
                    <Text mr={2}>投稿できませんでした。。。</Text>
                </Alert>
            )}
        </Flex>
    )
}

export default NewPostLink