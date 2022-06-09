import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../Atoms/authModalAtom';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "../../../FireBase/ClientApp"
import { FIREBASE_ERRORS } from '../../../FireBase/errors';

type LoginProps = {
    // password: string; 
    // email: string;
}

const Login: React.FC<LoginProps> = () => {

    const setAuthModalState = useSetRecoilState(authModalState);

    const [ loginForm, setLoginForm ] = useState({
        email: "",
        password: "",
    })

    const [ signInWithEmailAndPassword, loading, user, error] = useSignInWithEmailAndPassword(auth)

    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        signInWithEmailAndPassword( loginForm.email, loginForm.password )
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <form onSubmit={onSubmit}>
            <Input 
                required 
                name='email' 
                placeholder='メールアドレス' 
                type='email' 
                mb={2} 
                onChange={onChange} 
                fontSize='10pt' 
                _placeholder={{ color: "gray.500" }} 
                _hover={{ bg: "white", border: "1px solid", borderColor: "orange.400" }} 
                _focus={{ bg: "white", border: "1px solid", borderColor: "orange.400" }}
                bg="gray.50"
            />
            <Input 
                required 
                name='password' 
                placeholder='パスワード' 
                type='password' 
                onChange={onChange} 
                fontSize='10pt' 
                mb={2}
                _placeholder={{ color: "gray.500" }} 
                _hover={{ bg: "white", border: "1px solid", borderColor: "orange.400" }} 
                _focus={{ bg: "white", border: "1px solid", borderColor: "orange.400" }}
                bg="gray.50"
            />
            <Text align="center" color="red" fontSize="8pt">{FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS ]}</Text>
            <Button width="100%" height="36px" mt={2} mb={2} type="submit" isLoading={loading} >ログイン</Button>
            <Flex fontSize="8pt" justify="center">
                <Text mr={2}>パスワードをお忘れですか？</Text>
                <Text 
                    color="orange.400" 
                    fontWeight={700} 
                    cursor="pointer" 
                    onClick={() => setAuthModalState((prev) => ({
                        ...prev,
                        view: "パスワードの再設定"
                    }))}
                >パスワードの再設定
                </Text>
            </Flex>
            <Flex fontSize="8pt" justify="center">
                <Text mr={2}>登録はお済みですか？</Text>
                <Text 
                    color="orange.400" 
                    fontWeight={700} 
                    cursor="pointer" 
                    onClick={() => setAuthModalState((prev) => ({
                        ...prev,
                        view: "会員登録"
                    }))}
                >登録はこちらから
                </Text>
            </Flex>
        </form>
    )
}

export default Login