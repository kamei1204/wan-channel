import { Button, Flex, Icon, Image, Input, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSetRecoilState } from 'recoil'
import { authModalState } from '../../Atoms/authModalAtom'
import { auth } from '../../FireBase/ClientApp'
import { IoImageOutline } from 'react-icons/io5'
import { BsLink45Deg } from 'react-icons/bs'
import { GiJumpingDog } from 'react-icons/gi'


type Props = {}

const CreatePostLink = () => {

    const router = useRouter();
    const [user] = useAuthState(auth)
    const setAuthModalState = useSetRecoilState(authModalState);

    const onClick = () => {
        if(!user) {
            setAuthModalState({ open: true, view: "ログイン"  })  
            return;    
        }
        const { communityId } = router.query;
        router.push(`/1/${communityId}/submit`)
    }
    return (
        <Flex 
            justify="space-evenly" align="center" height="56px" bg="white" 
            border="1px solid" borderRadius={5} borderColor="gray.300"
            p={2} mb={4}>
            <Icon as={GiJumpingDog} fontSize={24} color="gray.400" cursor="pointer" mr={2} textColor="pink.400"/>
            <Input 
                bg="gray.50"
                placeholder='フレブル大好き集まれ！' fontSize="10pt"  _placeholder={{ color: "gray.500" }}
                borderRadius="5px 0 0 5px" borderColor="gray.200" 
                _hover={{ bg:"white", borderColor: "orange.400", border:"1px solid orange.400" }}
                _focus={{ outline: "none", bg: "white", borderColor: "orange.400", border: "1px solid orange.400" }}
                onClick={onClick}
            />
                <Button type="submit" width="150px" mr={3}
                    borderRadius="0 5px 5px 0" cursor="pointer" bg="orange.400" color="white" fontWeight="bold" 
                    _hover={{ bg: "orange.300" }}>
                        <Text color="white">さくせい</Text>
                </Button>
                <Icon
                    as={IoImageOutline}
                    fontSize={24}
                    mr={4}
                    color="gray.400"
                    cursor="pointer"
                />
                <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" />
            </Flex>
    )
}

export default CreatePostLink