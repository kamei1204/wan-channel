import { Flex, Text } from '@chakra-ui/react'
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
        <Flex bg="white" height="44px" padding="6px 12px">
            <Flex align="center">
                <Image src="/Images/wan-cannel.logo.PNG" height="35px" width="35px" layout="intrinsic" />
                <Text display={{ base: "none", md: "unset" }} marginLeft="20px">1 チャンネル</Text>
            </Flex>
            <Direction />
            <SearchInput />
            <RightComponents user={user}/>
        </Flex>
        );
    };

    export default Navbar;
