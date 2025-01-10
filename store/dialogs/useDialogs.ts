import { create } from "zustand";

interface IUseDialogs {
    showFriendDialog: boolean;
    toggleFriendDialog: () => void;

    showRequests: boolean;
    toggleShowRequest: () => void;

    showNotifications: boolean;
    toggleShowNotification: () => void;
}

const useDialogs = create<IUseDialogs>((set, get) => ({
    showFriendDialog: false,
    toggleFriendDialog: () => set((state) => ({ showFriendDialog: !state.showFriendDialog })),

    showNotifications: false,
    toggleShowNotification: () => set(({ showNotifications }) => ({ showNotifications: !showNotifications })),

    showRequests: false,
    toggleShowRequest: () => set(({ showRequests }) => ({ showRequests: !showRequests })),
}));

export default useDialogs;
