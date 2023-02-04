import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react'
import { TabItem } from './NewPostLink';

type TabItemProps = {
    item: TabItem;
    selected: boolean;
    setSelectItem: (value: string) => void;
}

const TabItems:React.FC<TabItemProps> = ({ item, selected, setSelectItem }) => {
    return (
        <Flex justify="center" align="center" flexGrow={1} padding="14px 0"
                fontWeight={700}
                cursor="pointer" 
                _hover={{ bg: "gray.50" }}
                color={selected? "orange.500" : "gray.500"}
                borderWidth={selected? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
                borderBottomColor={selected? "orange.500" : "gray.200"}
                borderRightColor="gray.200"
                onClick={() => setSelectItem(item.title)}>
                <Flex align="center" mr={2} height="20px">
                    <Icon as={item.icon}/>
                </Flex>
            <Text fontSize="10pt">{item.title}</Text>
        </Flex>
    )
}

export default TabItems