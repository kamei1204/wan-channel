import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Flex, Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { signOut, User } from 'firebase/auth'
import React from 'react'
import { BsMenuDown } from 'react-icons/bs'
import { VscAccount } from 'react-icons/vsc'
import { CgProfile } from 'react-icons/cg'
import { MdLogout } from 'react-icons/md'
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
        // resetCommunityState();
        
    }

    return (
        /* chakra-ui menu */
        <Menu>
            <MenuButton _hover={{ outline:"1px solid", color:"gray.500" }} borderRadius="10px" p="0px 3px">
                <Flex align="center">
                    <Flex align="center">
                        {user? (
                            <>
                            <Icon as={BsMenuDown} mr={2} fontSize={24} color="gray.700" display={{ base: "none", md: "flex" }}/>
                            <Box flexDirection="column" alignItems="flex-start" fontSize="8pt" display={{ base: "none", lg: "flex" }} mr={2}>
                                <Text fontWeight={700}>
                                    {user?.displayName || user?.email?.split("@")[0]}
                                </Text>
                                <Flex>
                                    <Icon as={SiDatadog}  color="orange.400" fontSize={15}/>
                                    <Text color="gray.400">1 dog</Text>
                                </Flex>
                            </Box>
                            </>
                        ) : (<Icon as={VscAccount} fontSize={2}/>)}
                        {/* 下矢印ダウンアイコン */}
                        <ChevronDownIcon />
                    </Flex>
                </Flex>
            </MenuButton>
                
            <MenuList>
            {user? (
                <>
                        <MenuItem fontSize="10pt" fontWeight={700} _hover={{ bg: "orange.300", color:"white" }}>
                    <Flex align="center" >
                        <Icon as={CgProfile} fontSize={20} mr={3} />
                        プロフィール
                    </Flex>
                </MenuItem>

                {/* 下線 */}
                <MenuDivider />

                <MenuItem fontSize="10pt" fontWeight={700} _hover={{ bg: "orange.300", color:"white" }} onClick={logout}>
                    <Flex align="center" >
                        <Icon as={MdLogout} fontSize={20} mr={3} />
                        ログアウト
                    </Flex>
                </MenuItem>
                </> 
                ) : (
                <>
                <MenuItem fontSize="10pt" fontWeight={700} _hover={{ bg: "orange.300", color:"white" }} onClick={() => setModalState({ open: true, view: "ログイン"})}>
                    <Flex align="center" >
                        <Icon as={MdLogout} fontSize={20} mr={3} />
                        ログイン / 会員登録
                    </Flex>
                </MenuItem>
                </>)}
                
            </MenuList>
        </Menu>
    )
}

export default UserMenu