import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'
import { authModalState } from '../../../Atoms/authModalAtom'
import { auth } from '../../../FireBase/ClientApp'
import AuthButtons from './AuthButtons'
import AuthInput from './AuthInput'
import ResetPassword from './ResetPassword'

type AuthModalProps = {}
// AuthButtonをonClickした際に開くmodal
const AuthModal:React.FC<AuthModalProps> = () => {
    const [modalState, setModalState] = useRecoilState(authModalState);
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if(user) handleClose()
        console.log(user)
    },[user])

    const handleClose = () => {
        setModalState((prev) => ({
            ...prev,
            open: false,
        }));
    }
    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        {modalState.view === "ログイン" && "ログイン"}
                        {modalState.view === "会員登録" && "会員登録"}
                        {modalState.view === "パスワードの再設定" && "パスワードの再設定"}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Flex direction="column" align="center" justify="center" width="70%">
                            {modalState.view === "ログイン" || modalState.view === "会員登録" ? (
                            <>
                                <AuthButtons />
                                <Text color="gray.500" fontWeight={500}>OR</Text>
                                <AuthInput /> 
                            </>
                            ) : ( <ResetPassword/>)
                            }
                            
                        </Flex>
                    </ModalBody>
                </ModalContent >
            </Modal>
        </>
    )
}

export default AuthModal
