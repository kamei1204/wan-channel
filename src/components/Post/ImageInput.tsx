import { Button, Flex, Image, Stack } from '@chakra-ui/react'

import React, { useRef } from 'react'

type ImageInputProps = {
    imageFile?: string;
    // selectFileRef: React.RefObject<HTMLInputElement>;
    setImageFile: (value: string) => void;
    setSelectedItem: (value: string) => void;
    onSelectImage:(event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageInput:React.FC<ImageInputProps> = ({ imageFile, setImageFile, setSelectedItem, onSelectImage }) => {

    const selectFileRef = useRef<HTMLInputElement>(null)

    return (
        <Flex flexDirection="column" justify="center" align="center" width="100%">
            {imageFile ? (
                <>
                <Image src={imageFile} maxWidth="400px" maxHeight="400px"/>
                <Stack direction="row" mt={4}>
                    <Button height="30px" onClick={() => setSelectedItem("投稿")}>投稿に戻る</Button>
                    <Button 
                        variant="outline" height="30px" 
                        onClick={() => setImageFile("")}
                        >閉じる
                    </Button>
                </Stack>
                </>
            ) : (
                <Flex justify="center" align="center" p={20} border="1px dashed" borderColor="gray.200" borderRadius={4} width="100%">
                <Button variant="outline" height="24px" onClick={() => selectFileRef.current?.click()}
                >
                    アップロード
                </Button>
                <input ref={selectFileRef}  type="file" hidden onChange={onSelectImage}/>

                
            </Flex>
            )}
            
        </Flex>
    )
}

export default ImageInput