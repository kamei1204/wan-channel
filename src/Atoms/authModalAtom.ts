import { atom } from "recoil";

export interface AuthModalState {
    open: boolean;
    view: "ログイン" | "会員登録" | "パスワードの再設定"
}

const defaultAuthModal: AuthModalState = {
    open: false,
    view: "ログイン"
}

export const authModalState = atom<AuthModalState>({
    key: "authModalState",
    default: defaultAuthModal,
})

