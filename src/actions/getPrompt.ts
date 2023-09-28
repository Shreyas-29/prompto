import { db } from "@/lib/db"
import { ExtendedPrompt } from "@/types/prompt";

const getPrompt = async (id: string) => {
    try {

        const prompt = await db.prompt.findUnique({
            where: {
                id: id
            },
            include: {
                creator: {
                    include: {
                        prompts: true
                    }
                }
            }
        });

        return prompt as ExtendedPrompt;

    } catch (error) {
        console.log("Error in getting prompt: ", error);
    }
};

export default getPrompt;