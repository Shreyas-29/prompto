import { db } from "@/lib/db";
import { ExtendedPrompt } from "@/types/prompt";

const getUserPrompts = async (userId: string) => {
    try {

        if (!userId) {
            console.log("User Id not found");
            return null;
        }

        const prompts = await db.prompt.findMany({
            where: {
                creatorId: userId
            },
            include: {
                creator: {
                    include: {
                        prompts: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return prompts as ExtendedPrompt[];

    } catch (error) {
        console.log("Error in getting prompt: ", error);
        return null;
    }
};

export default getUserPrompts;