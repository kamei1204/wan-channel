import { SearchIcon } from '@chakra-ui/icons'
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'

// type SearchInputProps = {
//     // user
// }

const SearchInput:React.FC = () => {
    return (
        <Flex flexGrow={1} mr={2}  ml={2} align="center">
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    // children={<SearchIcon color='gray.300' mb={1}/>}
                    />
                <Input 
                    placeholder='1チャンネル 検索' 
                    fontSize="10pt"
                    _placeholder={{ color: "gray.500" }}
                    _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "orange.400",
                    }}
                    _focus={{
                        outline: "none",
                        border: "1px solid",
                        borderColor: "orange.400",
                    }}
                    height="34px"
                    bg="gray.50"
                />
            </InputGroup>
        </Flex>
    )
}

export default SearchInput