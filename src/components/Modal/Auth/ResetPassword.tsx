import { Button, Flex, Icon, Image, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil'
import { authModalState } from '../../../Atoms/authModalAtom'
import { auth } from '../../../FireBase/ClientApp';

// type ResetPasswordProps = {
//     toggleView: (view: ModalView) => void;
// };

const ResetPassword: React.FC= () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [ email, setEmail ] = useState("");
    const [ success, setSuccess ] = useState(false);
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);


    const onSubmit = async ( event:React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();

        await sendPasswordResetEmail(email);
        setSuccess(true);
    }
    return (
        <Flex direction="column" alignItems="center">
            <Image src="/Images/wan-cannel.logo.PNG" height="35px" width="35px"/>
            <Text mt={2} fontWeight={700}>パスワードの再設定はこちらから！</Text>
            {success ? ( <Text mb={4}>メールアドレスが違います</Text> ) : (
            <>
            <Text mt={2} textAlign="center">記載頂いたメールアドレスにパスワード再設定用のリンクをお送りします</Text>
            <form onSubmit={onSubmit} style={{ width: "100%" }}>
                <Input 
                required 
                name='email' type='email' placeholder='メールアドレスを入力' 
                mt={2}
                onChange={(event) => setEmail(event.target.value)}
                fontSize="10pt"
                _placeholder={{ color: "gray.500" }} 
                _hover={{ bg: "white", border: "1px solid", borderColor: "orange.400" }} 
                _focus={{ bg: "white", border: "1px solid", borderColor: "orange.400" }}
                bg="gray.50"
                />
                <Text textAlign="center" fontSize="10pt" color="red">
                {error?.message}
                </Text>
                <Button
                    width="100%"
                    height="36px"
                    mb={2}
                    mt={2}
                    type="submit"
                    isLoading={sending}
                >
                パスワードを再設定
                </Button>
            </form>
            </>
            )}
            <Flex
                alignItems="center"
                fontSize="9pt"
                color="orange.400"
                fontWeight={700}
                cursor="pointer"
                >
                <Text
                    onClick={() =>
                        setAuthModalState((prev) => ({
                        ...prev,
                        view: "ログイン",
                        }))
                    }
                >
                ログイン
                </Text>
                <Text ml={2} mr={2} color="gray.400" fontSize="4pt">OR</Text>
                <Text
                onClick={() =>
                    setAuthModalState((prev) => ({
                    ...prev,
                    view: "会員登録",
                    }))
                }
                >
                会員登録
                </Text>
            </Flex>
        </Flex>
    );
};

export default ResetPassword