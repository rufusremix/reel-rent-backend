import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name should be minimum 2 characters" })
      .max(50, { message: "Name should be maximum 50 characters" }),
    email: z.string().email(),
    password: z
      .string()
      .min(5, { message: "Password should be minimum 5 characters" })
      .max(20, { message: "Password should be maximum 20 characters" }),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, { message: "Password should be minimum 5 characters" })
    .max(20, { message: "Password should be maximum 20 characters" }),
});
