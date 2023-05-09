import { useEffect } from 'react'
import { useRouter} from 'next/router'
import { useRecoilState, useRecoilValue } from 'recoil'
import { directionItemMenu, directoryMenuState } from '../Atoms/directoryMenuItem'
import { communityState } from '../Atoms/communityAtoms'
import { TiHome } from 'react-icons/ti'

const useDirectory = () => {

    const router = useRouter()

    const [directoryState, setDirectoryState] = useRecoilState(directoryMenuState);

    const communityStateValue = useRecoilValue(communityState)
    
    const onSelectMenuItem = (menuItem: directionItemMenu) => {
        setDirectoryState((prev) => ({
            ...prev,
            selectedItem: menuItem
        }));
        router.push(menuItem.link)
        if (directoryState.isOpen) {
            toggleMenuOpen();
        }
    }

    const toggleMenuOpen = () => {
        setDirectoryState((prev) => ({
            ...prev,
            isOpen: !directoryState.isOpen,
        }));
    }

    useEffect(() => {

        const { currentCommunity } = communityStateValue

        if (currentCommunity) {
            setDirectoryState((prev) => ({
                ...prev,
                selectedItem: {
                    displayText: `1/${currentCommunity.id}`,
                    link: `/1/${currentCommunity.id}`,
                    imageUrl: currentCommunity.imageURL,
                    icon: TiHome,
                    iconColor: 'orange.500',
                },
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[communityStateValue.currentCommunity])
    

    return { directoryState, toggleMenuOpen, onSelectMenuItem };
}

export default useDirectory