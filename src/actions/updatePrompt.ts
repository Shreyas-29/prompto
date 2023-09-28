"use server";

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const updatePrompt = async (promptId: string, formData: FormData) => {
    const session = await getAuthSession();

    if (!session?.user) {
        console.log("No user session found");
        return;
    };

    const title = formData.get("title");
    const content = formData.get("content");
    const category = formData.get("category");

    try {

        const prompt = await db.prompt.findUnique({
            where: {
                id: promptId
            },
        });

        if (!prompt) {
            throw new Error("Prompt not found");
        }

        if (prompt.creatorId !== session.user.id) {
            throw new Error("Unauthorized");
        }

        await db.prompt.update({
            where: {
                id: promptId
            },
            data: {
                content: content as string,
                title: title as string,
                category: category as string,
            }
        });

    } catch (error) {
        console.log("Error updating prompt: ", error);
    };

    revalidatePath("/");
};

export default updatePrompt;