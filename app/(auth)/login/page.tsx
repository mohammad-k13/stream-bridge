"use client";

import registerFormSchema from "@/utilities/form-schema/register-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import loginFormSchema from "@/utilities/form-schema/login-form-schema";
import LoginAction from "@/utilities/server-actions/login";
import { useRouter } from "next/navigation";
import useToken from "@/store/auth/useToken";

const Register = () => {
    const [pending, startSubmiting] = useTransition();
    const { push } = useRouter();
    const { setToken } = useToken();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
        startSubmiting(async () => {
            const { isError, message, payload } = await LoginAction(values);
            if (isError) {
                toast.error(message, {});
                return;
            }
            toast.success(message);

            Cookies.set("sessionToken", payload.sessionToken, {
                domain: process.env.DOMAIN_COOKIE,
                expires: new Date(payload.expires),
                secure: process.env.NODE_ENV === "production",
            });
            Cookies.set("username", form.getValues().username, {
                domain: process.env.DOMAIN_COOKIE,
                expires: new Date(payload.expires),
                secure: process.env.NODE_ENV === "production",
            });

            push(`/${form.getValues().username}`);
            form.reset();
        });
    };

    return (
        <article className="max-md:w-[95%] w-[450px] p-5 rounded-md bg-white shadow-lg border-[1px] border-gray-secondary">
            <h2 className="font-bold text-heading-1 text-center">Welcome back!</h2>
            <p className="text-body text-gray text-center mb-5">We are excited to see you again</p>
            <div className="h-[1px] w-3/4 bg-gray opacity-25 rounded-md my-3 mx-auto"></div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="text-body">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black/40">username</FormLabel>
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
                        {pending ? <Loader2 className="animate-spin" /> : "Create Account"}
                    </Button>
                </form>
            </Form>
        </article>
    );
};

export default Register;
