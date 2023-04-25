import { Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { defaultMenuItem } from '../../Atoms/directoryMenuItem';
import { auth } from '../../FireBase/ClientApp';
import useDirectory from '../../hooks/useDirectory';
import Direction from './Directory/Direction';
import RightComponents from './RightComponents';
import SearchInput from './SearchInput';

const Navbar = () => {

    const [user, loading, error] = useAuthState(auth)

    const { onSelectMenuItem } = useDirectory()

    return (
        <Flex bg="white" height="66px" padding="6px 12px" align="center">
        <Flex align="center" mr={{ base: 0 , md: 2}} cursor="pointer" onClick={() => onSelectMenuItem(defaultMenuItem)}>
            {/* <Box display={{ base: "none", md: "unset" }} mr="10px">
                <Image src="/Images/yu.png" height={35} width={35} alt="pug"/>
            </Box> */}
            <Image src="/Images/logo5.png" height={25} width={90} alt="iiinuyu" />
            {/* <h2 className='font-bold'>wan-channel</h2> */}
        </Flex>
        <Direction />
        <SearchInput />
        <RightComponents user={user}/>
    </Flex>
    );
};

    export default Navbar;
