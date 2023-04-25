import { IconType } from "react-icons"
import { TiHome } from 'react-icons/ti'
import { atom } from "recoil";

export type directionItemMenu = {
    displayText: string,
    link: string,
    imageUrl?: string,
    icon: IconType;
    iconColor: string,
};

interface directionState {
    isOpen: boolean,
    selectedItem : directionItemMenu, 
};

export const defaultMenuItem = {
    displayText: "HOME",
    link: "/",
    icon: TiHome,
    iconColor: "black"
}

export const defaultMenuState = {
    isOpen: false,
    selectedItem: defaultMenuItem,
};

export const directoryMenuState = atom<directionState>({
    default: defaultMenuState,
    key: "directoryMenuState"
});
