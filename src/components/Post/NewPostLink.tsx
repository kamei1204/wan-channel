import { Flex, Icon } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoDocumentText } from 'react-icons/io5'
import TabItem from './TabItem';

type NewPostLinkProps = {}

const formTabs = [
    {
        title: "投稿",
        icon : IoDocumentText
    },
    {
        title: "写真 & 動画",
        icon : IoDocumentText
    },
    {
        title: "リンク",
        icon : IoDocumentText
    },
    {
        title: "音声",
        icon : IoDocumentText
    },
];

export type  TabItem = {
    title: string;
    icon : typeof Icon.arguments;
}

const NewPostLink:React.FC<NewPostLinkProps> = () => {

    const [ selectedItem, setSelectedItem ] = useState(formTabs[0].title)

    return (
        <Flex flexDirection="column" mt={2} borderRadius={4} bg="white">
            <Flex width="100%">
                {formTabs.map((item) => (
                    <TabItem  item={item} selected={item.title === selectedItem}/>
                ))}
            </Flex>
        </Flex>
    )
}

export default NewPostLink