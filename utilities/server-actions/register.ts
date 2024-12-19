"use server";

import { IServerActionState } from "@/types";
import { z } from "zod";
import registerFormSchema from "../form-schema/register-form-schema";

export default async function RegisterAction(values: z.infer<typeof registerFormSchema>): Promise<IServerActionState> {
    console.log(values);
    const { success, data, error } = registerFormSchema.safeParse(values);
    if (!success) {
        return { isError: true, message: "Form Validation Faild" };
    }

    try {
        const response = await fetch(`${process.env.API}/users`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const { message, sessionToken, expires } = await response.json();

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
