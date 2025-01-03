"use server";

import { IServerActionState } from "@/types";
import { z } from "zod";
import loginFormSchema from "../form-schema/login-form-schema";

export default async function LoginAction(values: z.infer<typeof loginFormSchema>): Promise<IServerActionState> {
    const { success, data, error } = loginFormSchema.safeParse(values);
    if (!success) {
        return { isError: true, message: "Form Validation Faild" };
    }

    try {
        const response = await fetch(`${process.env.API}/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const { message, sessionToken, expires } = await response.json();

        console.log(response)
        if (!response.ok) {
            return { isError: true, message };
        }

        return {
            isError: false,
            message,
            payload: {
                sessionToken,
                expires,
            },
        };
    } catch (err) {
        console.log(err);
        return { isError: true, message: "Faild to Fetch" };
    }
}
