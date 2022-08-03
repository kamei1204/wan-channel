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
            <Flex justify="center" align="center">
                <AuthModal />
                { user ? (<Icons/>) : (<AuthButton />)}
                <UserMenu user={user}/>
            </Flex>
        </>
    );
};

export default RightComponents