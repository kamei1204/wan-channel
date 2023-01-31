import { Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../FireBase/ClientApp';
import Direction from './Directory/Direction';
import RightComponents from './RightComponents';
import SearchInput from './SearchInput';

const Navbar = () => {

    const [user, loading, error] = useAuthState(auth)

    return (
        <Flex bg="white" height="66px" padding="6px 12px" align="center">
        <Flex align="center" ml={2}>
            <Box display={{ base: "none", md: "unset" }} mr="10px">
                <Image src="/Images/yu.png" height={35} width={35} alt="pug"/>
            </Box>
            <Image src="/Images/logo5.png" height={25} width={90} alt="iiinuyu" />
        </Flex>
        <Direction />
        <SearchInput />
        <RightComponents user={user}/>
    </Flex>
    );
};

    export default Navbar;
