import z from "zod";

export const Schema = z.object({
    name: z.string()
        .min(3, "name must be at least 3 characters")
        .max(32, "name must be at most 32 characters"),
    mail: z.email()
        .min(4, "e-mail must be at least 4 characters")
        .max(128, "e-mail must be at most 128 characters"),
});

type UserType = z.infer<typeof Schema>;
export default UserType;