import { Prompt, User } from "@prisma/client";

export type ExtendedPrompt = Prompt & {
    creator: User & {
        prompts: Prompt[];
    };
}