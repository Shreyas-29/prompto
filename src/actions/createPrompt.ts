"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";


export const createPrompt = async (formData: FormData) => {
    
    const session = await getAuthSession();

    const title = formData.get("title");
    const content = formData.get("content");
    const category = formData.get("category");

    try {
        await db.prompt.create({
            data: {
                title: title as string,
                content: content as string,
                category: category as string,
                creatorId: session?.user?.id as string,
            }
        });
    } catch (error) {
        console.log("Erro creating prompt: ", error);
    }
 
    revalidatePath("/");
}