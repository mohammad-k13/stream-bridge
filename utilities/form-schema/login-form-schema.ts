import { z } from "zod";

const loginFormSchema = z.object({
  username: z.string().trim().min(3, {message: "username must be at least 3 char."}),
  password: z.string().trim().min(7, {message: "password must be at least 7 char"})
});

export default loginFormSchema