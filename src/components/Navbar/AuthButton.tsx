import { Button } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import { authModalState } from '../../Atoms/authModalAtom'

const AuthButton:React.FC = () => {

    const setAuthModalState = useSetRecoilState(authModalState);

    return (
        <>
            <Button 
            variant="outline" 
            height="28px" 
            display={{ base: "none", sm: "flex" }} 
            width={{ base: "70px", md: "110px" }} 
            mr={2} 
            onClick={() => setAuthModalState({ open: true, view: "ログイン"})}>ログイン</Button>
            <Button 
                height="26px" 
                display={{ base: "none", sm: "flex" }} 
                width={{ base: "70px", md: "110px" }} 
                mr={2}
                onClick={() => setAuthModalState({ open: true, view: "会員登録" })}
                >会員登録</Button>
        </>
    )
}

export default AuthButton
        