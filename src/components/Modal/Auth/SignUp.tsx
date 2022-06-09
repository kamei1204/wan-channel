import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../Atoms/authModalAtom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../../../FireBase/ClientApp';
import { FIREBASE_ERRORS } from '../../../FireBase/errors';

type SignUpProps = {
    // password: string; 
    // email: string;
}

const SignUp: React.FC<SignUpProps> = () => {

    const setAuthModalState = useSetRecoilState(authModalState);

    const [ signUpForm, setSignUpForm ] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [ error, setError] = useState('');

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        userError,
        ] = useCreateUserWithEmailAndPassword(auth);
    
    // firebase logic 処理の流れ
    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (error) setError("");
        // !==不等価演算子 AとBが異なっていればTRUE
        if (signUpForm.password !== signUpForm.confirmPassword) {
            setError("パスワードが違います");
            return;
        }
        // passwordがあっているか？
        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm((prev) => ({
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
                type='text' 
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
            <Input 
                required 
                name='confirmPassword' 
                placeholder='パスワードの確認' 
                type='password' 
                onChange={onChange} 
                fontSize='10pt' 
                mb={2}
                _placeholder={{ color: "gray.500" }} 
                _hover={{ bg: "white", border: "1px solid", borderColor: "orange.400" }} 
                _focus={{ bg: "white", border: "1px solid", borderColor: "orange.400" }}
                bg="gray.50"
            />
            {(error || userError) && (
            <Text align="center" fontSize="9pt" color="red.500">{error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}</Text>
            )}
            <Button type='submit'  isLoading={loading} width="100%" height="36px" mt={2} mb={2}>登録する</Button>
            <Flex fontSize="8pt" justify="center">
                <Text mr={2}>すでに登録はお済みですか？</Text>
                <Text 
                    color="orange.400" 
                    fontWeight={700} 
                    cursor="pointer" 
                    onClick={() => setAuthModalState((prev) => ({
                        ...prev,
                        view: "ログイン"
                    }))}
                >ログイン
                </Text>
            </Flex>
        </form>
    )
}

export default SignUp