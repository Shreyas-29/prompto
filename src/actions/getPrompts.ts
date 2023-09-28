import { db } from "@/lib/db";
import { ExtendedPrompt } from "@/types/prompt";

const getPrompts = async () => {
    try {

        const prompts = await db.prompt.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                creator: {
                    include: {
                        prompts: true
                    }
                }
            }
        });

        return prompts as ExtendedPrompt[];

    } catch (error) {
        console.log("Error getting prompts: ", error);
        return [];
    }
};

export default getPrompts;