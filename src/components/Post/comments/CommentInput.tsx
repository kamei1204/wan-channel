import { Button, Flex, Text, Textarea } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react'
import AuthButtons from '../../Modal/Auth/AuthButtons';
import AuthButton from '../../Navbar/AuthButton';

type CommentInputProps = {
    user            : User;
    commentText     : string;
    setCommentText  : (value:string) => void;
    createLoading   : boolean;
    onCreateComment : (commentText:string) => void;
}

const CommentInput:React.FC<CommentInputProps> = (
        {user,commentText,setCommentText,createLoading,onCreateComment}
    ) => {
    return (
        <Flex direction="column" position="relative">
            {user ? (
                <>
                    <Text mb={2}>
                        community as {""}
                        <span>
                            {user?.email?.split("@")[0]}
                        </span>
                        <Textarea
                            value={commentText}
                            onChange={(event) => setCommentText(event.target.value)}
                            placeholder="コメントはこちらから"
                            _placeholder={{_hover: "gray.200"}}
                            fontSize="10pt"
                            borderRadius={4}
                            minHeight="160px"
                            _focus={{ bg: "white", border: "1px solid black", outline: "none"}}
                        >
                            <Flex
                                position="absolute"
                                left="1px"
                                right={0.2}
                                bottom="2px"
                                justify="flex-end"
                                borderRadius="0px 0px 4px 4px"
                                p="6px 8px"
                                bg="gray.200">
                                <Button
                                    height="26px"
                                    disabled={!commentText.length}
                                    isLoading={createLoading}
                                    onClick={() => onCreateComment(commentText)}>
                                    コメントする
                                </Button>
                            </Flex>
                        </Textarea>
                    </Text>
                </>
            ) : (
                <>
                    <Flex 
                        align="center" 
                        justify="space-between" 
                        borderRadius={2} 
                        p={4}
                        border="1px solid"
                        borderColor="gray.500">
                        <Text fontWeight={600}>ログインかサインイン後コメントしてください</Text>
                        <Flex >
                        <AuthButton />
                        </Flex>
                    </Flex>
                </>
            )}
        </Flex>
    )
}

export default CommentInput