import { Box, Divider, Flex, Icon, Stack, Text, Button, Image, Spinner } from '@chakra-ui/react'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { community, communityState } from '../../Atoms/communityAtoms'
import { RiCake2Line } from 'react-icons/ri'
import { GiBalloonDog } from 'react-icons/gi'
import { SiDogecoin } from 'react-icons/si'

import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore, storage } from '../../FireBase/ClientApp'
import useSelectedFile from '../../hooks/useSelectedFile'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import { useSetRecoilState } from 'recoil'
import { useRouter } from 'next/router'

type aboutProps = {
    communityData: community
}

const About:React.FC<aboutProps> = ({ communityData }) => {
    const [user] = useAuthState(auth)
    const imageFileRef = useRef<HTMLInputElement>(null);
    const { setImageFile, imageFile, onSelectFile } = useSelectedFile();
    const [ uploadImage, setUpLoadImage ] = useState(false);
    const setCommunityStateValue = useSetRecoilState(communityState)
    const router = useRouter()

    const onUpLoad = async () => {
        if(!imageFile) return;
        setUpLoadImage(true)
        try {
            // ストレージにアップロード
            const imageRef = ref(storage, `communities/${communityData.id}/image`);

            // POST メソッドを使用して、指定したリソースに指定した文字列をアップロード。
            await uploadString(imageRef, imageFile, 'data_url');

            // アップロードした画像のURLを取得
            const downLoadUrl = await getDownloadURL(imageRef)

            // ドキュメントの(firestore, "communities", communityData.id)を更新する
            // updateDocは引数二つ
            await updateDoc(doc(firestore, "communities", communityData.id), {
                imageURL: downLoadUrl,
            })

            setCommunityStateValue((prev) => ({
                // 配列やオブジェクトの要素を文字通り展開する構文。
                ...prev,
                currentCommunity: {
                    ...prev.currentCommunity,
                    imageURL: downLoadUrl,
                } as community,
            }));

        } catch (error:any) {
            console.log("onUploadError", error)
        }
        setUpLoadImage(false)
    }

    return (
        <Box position="sticky" top="20px">
            <Flex justify="space-between" align="center" bg="orange.400" color="white" p={3} borderRadius="0px 0px 4px 4px">
                <Text fontSize="10pt">こんな投稿もあります</Text>
                <Icon as={GiBalloonDog}/>
            </Flex>
            <Flex flexDirection="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
                {/* Stack：子要素を縦方向や横方向に並べる */}
                <Stack>
                    <Flex width="100%" fontSize="10pt" p={2}>
                        <Flex flexDirection="column" flexGrow={1} fontWeight={700}>
                            {/* toLocalString === 数字に[,]つける */}
                            <Text>{communityData.numberOfMembers?.toLocaleString()}</Text>
                            <Text>フォロワー</Text>
                        </Flex>
                        <Flex flexDirection="column" flexGrow={1} fontWeight={700}>
                            <Text>1</Text>
                            <Text>outline</Text>
                        </Flex>
                    </Flex>

                        {/* Divider === 仕切り */}
                        <Divider />
                    
                    <Flex align="center" fontSize="10pt" p={1} width="100%" fontWeight={500}>
                        <Icon as={RiCake2Line} mr={2}/>
                        {communityData.createdAt && (<Text>Created{" "} 
                        {/* yyyy：年を略さずに 4 桁の数値で表します。 MMM：月を表す 3 文字の略語（英語の Jan、Feb、Oct など）。 dd：日を数値で表し、数値が 1 桁の場合は先頭にゼロを付けます*/}
                        {moment(new Date(communityData.createdAt.seconds * 1000)).format("MMM DD, YYYY")}</Text>)}
                    </Flex>
                    <Link href={`/1/${router.query.communityId}/submit`}>
                        <Button mt={3} height='30px' >
                            投稿する
                        </Button>
                    </Link>
                    {user?.uid === communityData.creatorId && (
                        <>
                            <Divider />
                            <Stack spacing={1} fontSize="10pt">
                                <Text fontWeight={500}>投稿者</Text>
                                <Flex justifyContent="space-between" alignItems="center">
                                    <Text color="orange.500" cursor="pointer" _hover={{ textDecor: "none" }} onClick={() => imageFileRef.current?.click()}>イメージの変更</Text>
                                    {communityData.imageURL || imageFile ? (
                                        <Image src={ imageFile || communityData.imageURL} borderRadius="full" boxSize="40px" alt='コミュニティーイメージ'/>
                                    ) : (
                                        <Icon as={SiDogecoin} position="relative" top={-3} fontSize="60px" color="orange.300" border="2px solid white" borderRadius="50%"/>
                                    )}
                                </Flex>
                                {imageFile && (
                                    uploadImage ? (
                                        <Spinner />
                                    ) : (
                                        <Text cursor="pointer" onClick={onUpLoad}>画像を登録してね</Text>
                                    ))}
                                    <input 
                                        id='file-upload'
                                        type='file'
                                        accept='image/x-png,image/gif,image/jpeg'
                                        hidden
                                        ref={imageFileRef}
                                        onChange={onSelectFile}
                                    />
                            </Stack>
                        </>
                    )} 
                </Stack>
            </Flex>
        </Box>
    )
}

export default About