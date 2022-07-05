import { Flex, Icon } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoDocumentText, IoImageOutline, IoLink, IoMic, IoPeopleOutline } from 'react-icons/io5'
import ImageInput from './Imageinput';
import TabItem from './TabItem';
import TextInput from './TextInput';

type NewPostLinkProps = {}

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
        title: "フォロワー",
        icon : IoPeopleOutline
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

const NewPostLink:React.FC<NewPostLinkProps> = () => {

    const [ selectedItem, setSelectedItem ] = useState(formTabs[0].title)
    const [ textInputs, setTextInputs ] = useState({
        title: "",
        body: "",
    });
    const [ imageFile, setImageFile ] = useState<string>("");
    const [ loading, setLoading ] = useState(false)

    const handleCreatePost = async () => {};

    const onSelectImage = (event:React.ChangeEvent<HTMLInputElement>) => {
        // FileReaderクラスはテキストファイルを読み込むためのAPIで、テキストファイルの内容を元にした処理などを行うために使います。 
        // FileReaderクラスを使うと、ファイルは文字のストリームで読み込まれます
        const reader = new FileReader();

        if(event.target.files?.[0]) {
            reader.readAsDataURL(event.target.files?.[0])
        }

        // FileReader.onload - 読み込みが正常に完了した時に発火するイベント
        reader.onload = (readerEvent) => {
                if(readerEvent.target?.result) {
                    // as = 型アサーション(Type Assertion)とは、その推論された型や、既に型定義済みの変数の型を上書きします。
                    setImageFile(readerEvent.target.result as string)
                }
        }
    };

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
                    <TabItem key={item.title} item={item} selected={item.title === selectedItem} setSelectItem={setSelectedItem}/>
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
                        onSelectImage={onSelectImage}
                        />
                )}
            </Flex>
        </Flex>
    )
}

export default NewPostLink