import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react'
import { TabItem } from './NewPostLink';

type TabItemProps = {
    item: TabItem;
    selected: boolean;
}

const TabItem:React.FC<TabItemProps> = ({ item, selected }) => {
    return (
        <Flex justify="center" align="center" flexGrow={1} padding="14px 0" cursor="pointer" _hover={{ bg: "gray.50" }}>
            <Flex align="center" mr={2} height="20px">
                <Icon as={item.icon}/>
            </Flex>
            <Text fontSize="10pt">{item.title}</Text>
        </Flex>
    )
}

export default TabItem