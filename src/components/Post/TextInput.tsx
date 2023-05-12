import { Button, Flex, Input, Stack, Textarea } from '@chakra-ui/react'
import React from 'react'

type TextInputProps = {
    // title: "string"
    // body : "string"
    textInputs: {
        title: string;
        body : string;
    };
    onChange: (
        event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleCreatePost: () => void;
    loading: boolean;
}

const TextInput:React.FC<TextInputProps> = ({ textInputs, onChange, handleCreatePost, loading }) => {

    

    return (
        <Stack spacing={3} width="100%">
            <Input 
                //  name 属性 の値を用いて，対象要素を特定することができます。
                value={textInputs.title}
                onChange={onChange}
                name='title'
                fontSize="10pt"
                borderRadius={5}
                placeholder="title"
                _placeholder={{ color: "gray.500" }}
                _focus={{ outline:"none", border:"1px solid", borderColor:"black", bg: "white" }}/>
            <Textarea 
                value={textInputs.body}
                onChange={onChange}
                name='body'
                fontSize="10pt"
                height="250px"
                borderRadius={5}
                placeholder="気になっている事や困った事はありませんか？"
                _placeholder={{ color: "gray.500" }}
                _focus={{ outline:"none", border:"1px solid", borderColor:"black", bg: "white" }}/>
            <Flex justify="flex-end" >
                <Button height="35px" padding="0 30px" disabled={!textInputs.title} isLoading={loading} onClick={handleCreatePost}>投稿する</Button>
            </Flex>
        </Stack>
    )
}

export default TextInput