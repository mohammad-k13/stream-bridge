import { create } from "zustand";

interface IUseDialogs {
    showFriendDialog: boolean;
    toggleFriendDialog: () => void;

    showRequests: boolean;
    toggleShowRequest: () => void;

    showNotifications: boolean;
    toggleShowNotification: () => void;

    showLoading: boolean,
    toggleShowLoading: () => void;
}

const useDialogs = create<IUseDialogs>((set, get) => ({
    showFriendDialog: false,
    toggleFriendDialog: () => set((state) => ({ showFriendDialog: !state.showFriendDialog })),

    showNotifications: false,
    toggleShowNotification: () => set(({ showNotifications }) => ({ showNotifications: !showNotifications })),

    showRequests: false,
    toggleShowRequest: () => set(({ showRequests }) => ({ showRequests: !showRequests })),

    showLoading: false,
    toggleShowLoading: () => set(({ showLoading }) => ({ showLoading: !showLoading })),
}));

export default useDialogs;
