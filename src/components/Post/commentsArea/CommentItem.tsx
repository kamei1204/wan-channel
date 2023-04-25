import { Box, Flex, Icon, Image, Spinner, Stack, Text } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import { Comment } from './Comments'
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill, BsChat } from 'react-icons/bs'

type CommentItemProps = {
    userId         : string,
    comment        : Comment,
    onDeleteComment: (comment: Comment) => void,
    loadingDelete  : boolean
}

const CommentItem:React.FC<CommentItemProps> = ({ userId, comment, onDeleteComment, loadingDelete }) => {
    return (
        <Flex>
            <Box mr={2}>
                <Image src="/Images/yu.png" height={30} width={30} alt="pug" color='gray.200'/>
            </Box>
            <Stack spacing={1}>
                <Stack direction="row" align="center" fontSize="8pt">
                    <Text fontWeight={600}>{comment.displayName}</Text>
                    <Text className='gray.200'>{moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}</Text>
                    {loadingDelete && <Spinner size="small"/> }
                </Stack>
                <Text fontSize='10pt'>{comment.text}</Text>
                <Stack direction='row' align='center' color='gray.200' cursor='pointer'>
                    <Icon as={ BsFillArrowDownCircleFill } />
                    <Icon as={BsFillArrowUpCircleFill} />
                    {userId === comment.creatorId && (
                        <>
                            <Text fontSize='9pt' _hover={{ color: "orange.500"}}>編集</Text>
                            <Text fontSize='9pt' onClick={() => onDeleteComment(comment)} _hover={{ color: "orange.500"}}>削除</Text>
                        </>
                    )}
                </Stack>
            </Stack>
        </Flex>
    )
}

export default CommentItem