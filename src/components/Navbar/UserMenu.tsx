import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Flex, Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { signOut, User } from 'firebase/auth'
import React from 'react'
import { GiSittingDog } from 'react-icons/gi'
import { VscAccount } from 'react-icons/vsc'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import { SiDatadog } from 'react-icons/si'
import { auth } from '../../FireBase/ClientApp'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import { authModalState } from '../../Atoms/authModalAtom'
import { communityState } from '../../Atoms/communityAtoms'

type UserMenuProps = {
    user?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {

    const setModalState = useSetRecoilState(authModalState)
    const resetCommunityState = useResetRecoilState(communityState)

    const logout = async () => {
        await signOut(auth);
        resetCommunityState();
        
    }

    return (
        /* chakra-ui menu */
        <Menu >
            <MenuButton 
                ml={2}
                mr={2}
                p='0px 6px'
                borderRadius={4} 
                _hover={{ outline: "1px solid", outlineColor: "gray.200" }}>
                <Flex align='center'>
                    <Flex align='center'>
                        {user ? (
                            <>
                            <Icon as={SiDatadog} fontSize={24} color='gray.400'/>
                            <Flex flexDirection='column' align='flex-start' ml={2} mr={2} fontSize='8pt' display={{ base: 'none' , md: 'flex' }}>
                                <Text fontWeight={700} fontSize='10pt'>{ user?.displayName || user.email?.split("@")[0]}</Text>
                                <Flex align='center'>
                                    <Icon as={GiSittingDog} color='red.400' mr={1}/>
                                    <Text color='gray.400' >1 carma</Text>
                                </Flex>
                            </Flex>
                            </>
                        ) : (
                            <>
                            <Icon as={VscAccount} fontSize={24} color='gray.400'/>
                            </>
                        )}
                    </Flex>
                    <ChevronDownIcon />
                </Flex>
            </MenuButton>
            <MenuList>
                {user ? (
                    <>
                    <MenuItem _hover={{ bg: 'orange.400' , color: 'white' }}>
                    <Flex align='center' fontWeight={700} fontSize='10pt'>
                        <Icon as={CgProfile} mr={2} fontSize='12pt'/>
                        プロフィール
                    </Flex>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem _hover={{ bg: 'orange.400' , color: 'white' }} onClick={logout}>
                    <Flex align='center' fontWeight={700} fontSize='10pt'>
                        <Icon as={FiLogOut} mr={2} fontSize='12pt'/>
                        ログアウト
                    </Flex>
                    </MenuItem>
                    </>
                ) : (
                    <>
                    <MenuItem _hover={{ bg: 'orange.400' , color: 'white' }} onClick={() => setModalState({ open: true, view: "ログイン"})}>
                    <Flex align='center' fontWeight={700} fontSize='10pt'>
                        <Icon as={CgProfile} mr={2} fontSize='12pt'/>
                        ログイン / 会員登録
                    </Flex>
                    </MenuItem>
                    </>
                )}
            </MenuList>
        </Menu>
    )
}

export default UserMenu