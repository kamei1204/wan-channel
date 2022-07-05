import { Button, Flex, Image, Img } from '@chakra-ui/react'

import React, { useRef } from 'react'

type ImageInputProps = {
    imageFile?: string
    setImageFile: (value: string) => void
    setSelectedItem: (value: string) => void
    onSelectImage:(event: React.ChangeEvent<HTMLInputElement>) => void
}

const ImageInput:React.FC<ImageInputProps> = ({ imageFile, setImageFile, setSelectedItem, onSelectImage }) => {

    const selectFileRef = useRef<HTMLInputElement>(null)

    return (
        <Flex justify="center" align="center" width="100%">
            {imageFile ? (
                <Image src={imageFile} />
            ) : (
                <Flex justify="center" align="center" p={20} border="1px dashed" borderColor="gray.200" borderRadius={4} width="100%">
                <Button variant="outline" height="24px" onClick={() => selectFileRef.current?.click()}>アップロード</Button>
                <input ref={selectFileRef}  type="file" hidden onChange={onSelectImage}/>
                <img src={imageFile}/>
            </Flex>
            )}
            
        </Flex>
    )
}

export default ImageInput