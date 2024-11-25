import { z } from "zod";

const gender_list = [
    "MEN",
    "WOMEN",
    "TRANSGENDER",
    "TRANSWOMEN",
    "TRANSMAN",
    "NONBINARY",
    "OTHER"
]

const CreateUserValidation = z.object({
    email: z.string().email({ message: "Invalid email address." }), // Validate email format
    userName: z.string().min(1, { message: "Username is required." }), // Ensure username is not empty
    dateOfBirth: z
        .string({
            required_error: "Select date and time is required.",
            invalid_type_error: "Date must be a valid ISO string.",
        })
        .refine((date) => !isNaN(Date.parse(date)), {
            message: "Date must be a valid ISO 8601 string.",
        }),
    gender: z
        .string()
        .transform((value) => value.toUpperCase()) // Convert to uppercase
        .refine((value) => gender_list.includes(value), {
            message: `Gender must be one of ${gender_list}`,
        }),
    interestIn: z
        .string()
        .refine((value) => gender_list.includes(value), {
            message: `Interest must be one of ${gender_list}`,
        }),
    name: z.string().optional(),
    imageUrl: z
        .string()
        // .url({ message: "Image URL must be a valid URL." })
        .optional(), // Validate URL format for optional field
    number: z
        .string()
        .regex(/^\+?[0-9]{7,15}$/, { message: "Invalid phone number format." }), // Validate phone number format
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." }) // Enforce minimum password length
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one number." })
        .regex(/[@$!%*?&]/, {
            message: "Password must contain at least one special character (@, $, !, %, *, ?, &).",
        }),
});




export const userValidation = { CreateUserValidation };
