import { Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react'
import { Post } from '../../Atoms/postsAtoms'
import { CgArrowUpO, CgArrowDownO } from 'react-icons/cg'
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill, BsChat } from 'react-icons/bs'
import { FiBookmark, FiShare } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import moment from 'moment';

type PostItemProps = {
    // 投稿そのもの
    post: Post;
    // 作成者
    userCreator: boolean;
    // 投票した人数
    userVoteValue?: number;
    // 投票した人にアクセスする
    onVote: () => {};
    // 投稿削除
    onDeletePost: () => {};
    // 投稿選択
    onSelectPost: () => {};


}

const PostItem:React.FC<PostItemProps> = ({
    post, userCreator, userVoteValue, onVote, onDeletePost, onSelectPost
}) => {
    return (
        <Flex border="1px solid" bg="white" 
                borderColor="gray.300" borderRadius={4} 
                _hover={{ borderColor: "gray.500" }} 
                cursor="pointer"
                onClick={onSelectPost}>
        <Flex flexDirection="column" width="40px" bg="gray.100" borderRadius={4} align="center">
                <Icon as={ userVoteValue === 1 ? BsFillArrowUpCircleFill : CgArrowUpO} 
                        color={ userVoteValue === 1 ? "brand.100" : "gray.400" }
                        fontSize={18}
                        cursor="pointer"
                        onClick={onVote}
                />
            <Text fontSize={20}>{post.voteStatus}</Text>
            <Icon as={ userVoteValue === 1 ? BsFillArrowDownCircleFill : CgArrowDownO} 
                        color={ userVoteValue === 1 ? "blue.200" : "gray.400" }
                        fontSize={18}
                        cursor="pointer"
                        onClick={onVote}
                />
        </Flex>
            <Flex flexDirection="column" width="100%" >
                <Stack spacing={1} p='10px'>
                    <Stack direction="row" spacing={0.6} fontSize="8pt" align="center">
                        <Text>
                            {/* 「Moment.js」は、Dateオブジェクトをラップして、日付操作に関する様々な機能を提供します。 */}
                            Post by u/{post.creatorDisplayName} {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
                        </Text>
                    </Stack>
                    <Text fontSize="12pt" fontWeight={600} >{post.title}</Text>
                    <Text fontSize="10pt">{post.body}</Text>
                    {post.imageURL && (
                        <Flex justify="center" align="center" p={2}>
                            <Image src={post.imageURL} maxWidth="460px" alt="post image"/>
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
                            <Flex p="8px 10px" align="center" borderRadius={4} _hover={{ color: "gray.300" }} cursor="pointer">
                                <Icon as={RiDeleteBin6Line}/>
                                <Text ml={2} fontSize="9pt">投稿を削除</Text>
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

