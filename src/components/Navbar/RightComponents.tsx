import { Flex } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import React from 'react'
import AuthModal from '../Modal/Auth/AuthModal'
import AuthButton from './AuthButton'
import Icons from './Icons'
import UserMenu from './UserMenu'

type RightComponentsProps = {
    user?: User | null;
}

const RightComponents:React.FC<RightComponentsProps> = ({ user }) => {
    return (
        <>
            <AuthModal />
            <Flex align="center" justify="center">
                { user ? <Icons /> : <AuthButton />}
            </Flex>
            <UserMenu user={user}/>
        </>
    );
};

export default RightComponents