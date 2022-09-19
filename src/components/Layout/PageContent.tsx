import { Flex } from '@chakra-ui/react'
import React from 'react'

type PageContentProps = {
    children: any;
}

const PageContent:React.FC<PageContentProps> = ({ children }) => {
    console.log("children HERE", children)
    return (
        <Flex border="1px solid red" justify="center" p={6}>
            <Flex  width="100%" justify="center" maxWidth="1240px">
                {/* 左側 */}
                {/* && 両方成立する必要がある */}
                <Flex flexDirection="column" width={{ base: "100%", md: "60%"}} mr={{ base: "0", md: "6" }}>{children && children[0 as keyof typeof children]}</Flex>
                {/* 右側 */}
                <Flex flexDirection="column" display={{ base:"none", md:"flex" }} flexGrow={1}>{children && children[1 as keyof typeof children]}</Flex>
            </Flex>
        </Flex>
    )
}

export default PageContent