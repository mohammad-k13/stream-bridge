"use client";

import registerFormSchema from "@/utilities/form-schema/register-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import loginFormSchema from "@/utilities/form-schema/login-form-schema";
import LoginAction from "@/utilities/server-actions/login";
import { useRouter } from "next/navigation";
import useAuth from "@/store/auth/useAuth";
import { setCookie } from "@/lib/cookies";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const Register = () => {
    const [pending, startSubmiting] = useTransition();
    const { push } = useRouter();
    const { setToken } = useAuth();

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

            const cookiePayload = {
                domain: process.env.DOMAIN_COOKIE,
                expires: new Date(payload.expires),
                secure: process.env.NODE_ENV === "production",
            };

            setCookie("sessionToken", payload.sessionToken, cookiePayload);
            setCookie("username", form.getValues("username"), cookiePayload); // this will use for back button in header of chat page

            push(`/chat/${form.getValues().username}`);
            form.reset();
        });
    };

    return (
        <article className="w-full p-5 rounded-md bg-white shadow-lg border-[1px] border-gray-secondary">
            <h2 className="font-bold text-heading-1 text-center">Welcome back!</h2>
            <p className="text-body text-gray text-center mb-5">
                We are excited to see you again
            </p>
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
                    <Button
                        type="submit"
                        className="mt-5 w-full flex items-center justify-center"
                    >
                        {pending ? <Loader2 className="animate-spin" /> : "Login"}
                    </Button>
                    <Separator className="my-7 mt-10 bg-gray-secondary flex items-center justify-center">
                        <Badge
                            variant={"outline"}
                            className="border-[1px] border-gray text-gray bg-background"
                        >
                            Links
                        </Badge>
                    </Separator>
                    <div className="w-full flex max-md:flex-col justify-center items-center gap-2">
                        <Link
                            href={"/auth/register"}
                            className="text-primary hover:bg-primary-overlay w-1/2 py-1 rounded-md text-center"
                        >
                            Register
                        </Link>
                        <Link
                            href={"/"}
                            className="text-primary hover:bg-primary-overlay w-1/2 py-1 rounded-md text-center"
                        >
                            Home
                        </Link>
                    </div>
                </form>
            </Form>
        </article>
    );
};

export default Register;
