import { Button, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useSignInWithGoogle } from"react-firebase-hooks/auth"
import { auth } from "../../../FireBase/ClientApp" 

type AuthButtonsProps = {}

const AuthButtons:React.FC<AuthButtonsProps> = () => {
    const [ signInWithGoogle, user, loading, error ] = useSignInWithGoogle(auth)
    return (
        <>
            <Flex direction="column" width="100%" mb={4}>
                <Button variant="oauth" mb={2} isLoading={loading} onClick={() => signInWithGoogle()}>
                    <Image src='Images/icons8-google-64.png' height="20px" mr={2} fontWeight={600}/>
                        Googleアカウントでログイン
                </Button>
                <Button variant="oauth">その他アカウントをお持ちの方</Button>
                {error && <Text>{error.message}</Text>}
            </Flex>
        </>
    )
}

export default AuthButtons