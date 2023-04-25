import { Flex, Icon, Image, MenuItem } from '@chakra-ui/react';
import React from 'react'
import { IconType } from 'react-icons/lib'
import useDirectory from '../../../hooks/useDirectory';

type Props = {
    displayText: string;
    link: string;
    imageUrl?: string;
    iconColor: string;
    icon: IconType;

}

const MenuListItem: React.FC<Props> = ({ displayText, link, iconColor, icon, imageUrl }) => {
    const { onSelectMenuItem } = useDirectory()
    return (
        <MenuItem width="100%" fontSize="10pt" _hover={{ bg: "gray.50" }} onClick={() => onSelectMenuItem({displayText, link, iconColor, icon, imageUrl})}>
            <Flex>
                {imageUrl ?
                    (<Image src={imageUrl} borderRadius="full" boxSize="18px" mr={2} alt=""/>) : (<Icon as={icon} borderRadius="full" boxSize="18px" mr={2}/>)
                }
                {displayText}
            </Flex>
        </MenuItem>
    )
}

export default MenuListItem