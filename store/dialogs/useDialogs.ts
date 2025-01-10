import { create } from "zustand";

interface IUseDialogs {
    showFriendDialog: boolean;
    toggleFriendDialog: () => void;
}

const useDialogs = create<IUseDialogs>((set, get) => ({
    showFriendDialog: false,
    toggleFriendDialog: () => set((state) => ({ showFriendDialog: !state.showFriendDialog })),
}));

export default useDialogs;
