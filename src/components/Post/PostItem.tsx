import { Alert, AlertIcon, Flex, Icon, Image, Link, Skeleton, Spinner, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Post } from '../../Atoms/postsAtoms'
import { CgArrowUpO, CgArrowDownO } from 'react-icons/cg'
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill, BsChat } from 'react-icons/bs'
import { FiBookmark, FiShare } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import moment from 'moment';
import { useRouter } from "next/router"

type PostItemProps = {
    // 投稿そのもの
    post: Post;
    // 作成者
    userCreator: boolean;
    // 投票した人数
    userVoteValue?: number;
    // 投票した人にアクセスする
    onVote: ( event: any, post:Post, vote:number, communityId: string ) => void;
    // 投稿削除
    onDeletePost: (post: Post) => Promise<boolean>
    // 投稿選択
    onSelectPost?: (post: Post) => void;
    homePage?: boolean,


}

const PostItem:React.FC<PostItemProps> = ({
    post, userCreator, userVoteValue, onVote, onDeletePost, onSelectPost, homePage,
}) => {
    const [loadingImage, setLoadingImage] = useState(true);
    const [error, setError] = useState();
    const [loadingDelete, setLoadingDelete] = useState(false);
    const singlePostPage = !onSelectPost;
    const router = useRouter()

    const handleDelete = async (event: any) => {

        event.stopPropagation();

        setLoadingDelete(true)
        try {
            const success = await onDeletePost(post);
            
            if(!success) {
                throw new Error("投稿を削除できませんでした")
            }
            console.log("投稿を削除しました")
            if( singlePostPage ) {
                router.push(`/1/${post.communityId}`);
            }
        } catch (error: any) {
            setError(error.message)
            
        }
        setLoadingDelete(false)
    }
    return (
        <Flex border="1px solid" bg="white"  
                borderColor={singlePostPage ? "white" : "gray.400"}
                borderRadius={singlePostPage ? "4px 4px 0 0 " : "4px"} 
                _hover={{ borderColor: singlePostPage ? "none" : "gray.500"}} 
                cursor={singlePostPage ? "unset" : "pointer"}
                onClick={() => onSelectPost && onSelectPost(post)}>
            <Flex flexDirection="column" width="60px" bg={singlePostPage ? "white" : "gray.200"} borderRadius={4} align="center">
                <Icon as={ userVoteValue === 1 ? BsFillArrowUpCircleFill : CgArrowUpO} 
                        color={ userVoteValue === 1 ? "brand.100" : "gray.400" }
                        fontSize={18}
                        cursor="pointer"
                        onClick={(event) => onVote(event, post, 1, post.communityId)}
                        mt={4}
                />
                <Text fontSize={20}>{post.voteStatus}</Text>
                <Icon as={ userVoteValue === -1 ? BsFillArrowDownCircleFill : CgArrowDownO} 
                        color={ userVoteValue === -1 ? "blue.200" : "gray.400" }
                        fontSize={18}
                        cursor="pointer"
                        onClick={(event) => onVote(event, post, -1, post.communityId)}
                />
            </Flex>
            <Flex flexDirection="column" width="100%" >
                {error && (
                <Alert status='error'>
                    <AlertIcon />
                    <Text mr={2}>{error}</Text>
                </Alert>
                )}
                <Stack spacing={1} p='10px '>
                    <Stack direction="row" spacing={0.6} fontSize="8pt" align="center">
                        {homePage && (
                            <>
                                {post.imageURL ? (
                                    <Image src={post.imageURL} borderRadius='full' boxSize='18px' mr={2}/>
                                ) : (
                                        <Icon as={BsFillArrowDownCircleFill} fontSize='18pt' mr={1} color='orange.400'/>
                                )}
                                <Link href={`1/${post.communityId}`}>
                                    <Text fontWeight={700} _hover={{textDecoration: "underline"}}>{`1/${post.communityId}`}</Text>
                                </Link>
                            </>
                        )}
                        <Text>
                            {/* 「Moment.js」は、Dateオブジェクトをラップして、日付操作に関する様々な機能を提供します。 */}
                            Post by u/{post.creatorDisplayName} 
                            {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
                        </Text>
                    </Stack>
                    <Text fontSize="12pt" fontWeight={600} >{post.title}</Text>
                    <Text fontSize="10pt">{post.body}</Text>
                    {post.imageURL && (
                        <Flex justify="center" align="center" p={2} width="100%">
                            {loadingImage && (
                                <Skeleton height="200px" width="100%" borderRadius={4}/>
                            )}
                            <Image src={post.imageURL} maxHeight="460px"alt="post image" display={loadingImage ? "none" : "unset"} onLoad={() => setLoadingImage(false)}/>
                        </Flex>
                    )}
                    <Flex ml={1} mb={0.8} fontWeight={600} color="gray.500">
                        <Flex p="8px 10px" align="center" borderRadius={4} _hover={{ color: "gray.300" }} cursor="pointer">
                            <Icon as={BsChat}/>
                            <Text ml={2} fontSize="9pt">{post.numberOfComments}</Text>
                        </Flex>
                        <Flex ml={1} mb={0.8} fontWeight={600} color="gray.500">
                            <Flex p="8px 10px" align="center" borderRadius={4} _hover={{ color: "gray.300" }} cursor="pointer">
                                <Icon as={FiShare}/>
                                <Text ml={2} fontSize="9pt">共有</Text>
                            </Flex>
                        </Flex>
                        <Flex ml={1} mb={0.8} fontWeight={600} color="gray.500">
                            <Flex p="8px 10px" align="center" borderRadius={4} _hover={{ color: "gray.300" }} cursor="pointer">
                                <Icon as={FiBookmark}/>
                                <Text ml={2} fontSize="9pt">保存</Text>
                            </Flex>
                        </Flex>
                        {userCreator && (
                            <Flex ml={1} mb={0.8} fontWeight={600} color="gray.500">
                            <Flex p="8px 10px" align="center" borderRadius={4} _hover={{ color: "gray.300" }} cursor="pointer" onClick={handleDelete}>
                                {loadingDelete ? (
                                    <Spinner size="sm" />
                                ) : (
                                    <>
                                        <Icon as={RiDeleteBin6Line}/>
                                        <Text ml={2} fontSize="9pt">投稿を削除</Text>
                                    </>
                                )}
                            </Flex>
                        </Flex>
                        )}
                    </Flex>
                </Stack>
            </Flex>
        </Flex>
    )
}
export default PostItem

