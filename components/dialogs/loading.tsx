"use client";

import React from "react";
import { Dialog } from "../ui/dialog";
import useDialogs from "@/store/dialogs/useDialogs";
import { Loader2 } from "lucide-react";
import { DialogContent } from "@radix-ui/react-dialog";

const LoadingDialog = () => {
    const { showLoading } = useDialogs();
    return (
        <Dialog open={showLoading} onOpenChange={() => {}}>
            <DialogContent className="sm:max-w-[425px] h-[400px] overflow-x-hidden overflow-y-auto bg-white border-gray-secondary flex items-center justify-start flex-col">
                <Loader2 className="animate-spin" />
            </DialogContent>
        </Dialog>
    );
};

export default LoadingDialog;
