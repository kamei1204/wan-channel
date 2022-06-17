import { Box, Button, Checkbox, Divider, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { HiUser, HiEye } from "react-icons/hi"
import { BsFillLockFill } from "react-icons/bs"
import { doc, runTransaction, serverTimestamp, setDoc, Transaction } from 'firebase/firestore';
import { auth, firestore } from '../../../FireBase/ClientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

type CreateCommunityModalProps = {
    open: boolean;
    handleClose: () => void;
}

const CreateCommunityModal:React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {

    const [ user ] = useAuthState(auth);
    const [ communityName, setCommunityName ] = useState("");
    const [ charsRemaining, setCharsRemaining ] = useState(21);
    const [ communityType, setCommunityType ] = useState('public');
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(false)


    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value.length > 21) return;

        setCommunityName(event.target.value);
        setCharsRemaining(21 - event.target.value.length)
    }

    const communityOnChange = (event:React.ChangeEvent<HTMLInputElement>):void => {
        setCommunityType(event?.target.name)
    }

    const handleCreateCommunity = async () => {
            // communityを使用できるか検証
            // 文字列に！@＃$％^＆*。、<> / \'";：？などの特殊文字が含まれているかどうかを確認し、文字列にこれらの文字が少なくとも1つ含まれている場合はtrueを返します。
            const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                if (format.test(communityName) || communityName.length < 3) {
                    setError("コミュニティー名は3~21字の間で文字、数字、アンダーバーのみを含めることができますのでお願いしますね"
                    );
                    return;
                }

                setLoading(true);
                try {
                    // Firebaseでコミュニティドキュメントを作成する
                    // 名前が使用されていないことを確認
                    // コミュニティーで有効な名前の場合

                    const communityDocRef = doc(firestore, "communities", communityName );

                    
                    await runTransaction(firestore, async (transaction) => {
                        //communityDocRef = doc(firestore, "communities", communityName)に存在している情報を読み込む
                            const communityDoc = await transaction.get(communityDocRef);
                            // もし存在しない場合 exists(存在しているか？) 
                            if (communityDoc.exists()) {
                            throw new Error(`ごめんなさい、r/${communityName}はすでに使われておりまする。。。他の名をお願いします`);
                        }
                        // コミュニティーを作成する
                        transaction.set(communityDocRef, {
                            // 作成者Id
                            creatorId: user?.uid,
                            // 作成日
                            createdAt: serverTimestamp(),
                            // 会員番号
                            numberOfMembers: 1,
                            // 公開方法
                            privacyType: communityType,
                        });

                        // 作成したコミュニティーをfirebaseのユーザーコミュニティースニペットの保存する
                        transaction.set(doc(firestore, `users/${user?.uid}/communitySnipetts`, communityName), {
                            communityId: communityName,
                            isModerator: true,
                        }
                        );
                    });

                } catch (error: any) {
                    console.log("handleCreateCommunity error", error)
                    setError(error.message);
                }
                setLoading(false);
    }


    return (
            <>
            <Modal isOpen={open} onClose={handleClose} size='lg'>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader fontSize="12pt" padding={3} display="flex" flexDirection="column">コミュニティを作りましょう</ModalHeader>
                <Divider />
                <ModalCloseButton />
                <Box pl={3} pr={3}>
                    <ModalBody padding="10px 0px" display="flex" flexDirection="column" >
                        <Text>name</Text>
                        <Text fontSize={11} color="gray.500">動物と共に暮らしていく中、楽しい事や困った事はありませんか？</Text>
                        <Text position="relative" top="27px" left="10px" color="gray.400" width="20%">r/</Text>
                        <Input  position="relative" pl="30px" size="sm" value={communityName} onChange={handleChange}/>
                        <Text  fontSize="10pt" color={charsRemaining === 0 ? 'red' : 'gray.500'} mt={1} ml={1} >{charsRemaining} 残り文字数</Text>
                        <Box mt={4} mb={4} >
                            <Text fontSize="10pt" color="gray.600" mb={2}>公開方法を選んでください</Text>
                            {/* チェックボックス */}
                            <Stack spacing={2}>
                                <Checkbox name='public' isChecked={communityType === "public"} onChange={communityOnChange}>
                                    <Flex align="center">
                                        <Icon as={HiUser} mr={2}/>
                                        <Text fontSize="10pt" mr={2}>普通に公開</Text>
                                        <Text fontSize="6pt" color="gray.500">誰でもこのコミュニティへの投稿とコメントを表示できます</Text>
                                    </Flex>
                                </Checkbox>
                                <Checkbox name='restricted' isChecked={communityType === "restricted"} onChange={communityOnChange}>
                                    <Flex align="center">
                                        <Icon as={HiEye} mr={2}/>
                                        <Text fontSize="10pt" mr={2}>鍵をつけて公開する</Text>
                                        <Text fontSize="6pt" color="gray.500">承認されたユーザーのみがコミュニティ表示,投稿できます</Text>
                                    </Flex></Checkbox>
                                <Checkbox name='private' isChecked={communityType === "private"} onChange={communityOnChange}>
                                    <Flex align="center">
                                        <Icon as={BsFillLockFill} mr={2}/>
                                        <Text fontSize="10pt" mr={2}>仲間うちで公開</Text>
                                        <Text fontSize="6pt" color="gray.500">誰でもこのコミュニティへの投稿とコメントを表示できます</Text>
                                    </Flex></Checkbox>
                            </Stack>

                        </Box>
                    </ModalBody>
                </Box>
        
                <ModalFooter bg="orange.100" >
                    <Button variant="outline" mr={3} onClick={handleClose} _hover={{ bg: "orange.200" }}>
                    Close
                    </Button>
                    <Button variant='solid' onClick={handleCreateCommunity} isLoading={loading}>コミュニティーを作成</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            </>
        )
}

export default CreateCommunityModal
