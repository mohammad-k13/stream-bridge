"use client";

import registerFormSchema from "@/utilities/form-schema/register-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { IServerActionState } from "@/types";
import RegisterAction from "@/utilities/server-actions/register";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

const Register = () => {
    const [pending, startSubmiting] = useTransition();

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
        startSubmiting(async () => {
            const { isError, message, payload } = await RegisterAction(values);
            isError ? toast.error(message, {}) : toast.success(message);

            // Cookies.set("sessionToken", payload.sessionToken, {
            //     domain: process.env.DOMAIN_COOKIE,
            //     expires: payload.expires,
            //     secure: process.env.NODE_ENV === "production",
            // });
        });
    };

    return (
        <article className="w-[300px] p-5 rounded-md bg-white shadow-lg">
            <h2 className="font-bold font-Commissioner text-2xl tracking-tight text-center">Create Account</h2>
            <p className="text-sm text-gray text-center my-2">Create Accound and enjoy to chat with friends</p>
            <div className="h-[1px] w-3/4 bg-gray opacity-25 rounded-md my-3 mx-auto"></div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black/40 text-[16px] font-Commissioner font-medium tracking-tight">
                                    username
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black/40">email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black/40">password</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="mt-5 w-full flex items-center justify-center">
                        {pending ? <Loader2 className="animate-spin"/> : "Create Account"}
                    </Button>
                </form>
            </Form>
        </article>
    );
};

export default Register;
