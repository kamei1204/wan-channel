import { Button, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFound:React.FC = () => {
    return (
        <Flex flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh" mt={10} pt="30px">
            <Text mb={10}>ごめんなさい。。。全力でページを探しましたが見つかりません</Text>
            <Flex mb={10}>
                <Image src="/Images/wan-cannel.logo.PNG" height="120px" width="120px" layout="intrinsic" />
            </Flex>
            <Link href="/">
            <Button>ホームに戻る</Button>
            </Link>
        </Flex>
    )
}

export default NotFound
