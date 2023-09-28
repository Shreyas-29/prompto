"use server"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";


const deletePrompt = async (promptId: string) => {

    const session = await getAuthSession();

    try {

        await db.prompt.delete({
            where: {
                id: promptId,
                creatorId: session?.user.id
            }
        });

    } catch (error) {
        console.log("Error deleting prompt: ", error);
    }

    revalidatePath("/");
};

export default deletePrompt;