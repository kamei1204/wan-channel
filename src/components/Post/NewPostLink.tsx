import { Flex, Icon } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoDocumentText, IoImageOutline, IoLink, IoMic, IoPeopleOutline } from 'react-icons/io5'
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

    const onSelectImage = () => {};

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
                    <TabItem  item={item} selected={item.title === selectedItem} setSelectItem={setSelectedItem}/>
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
            </Flex>
        </Flex>
    )
}

export default NewPostLink