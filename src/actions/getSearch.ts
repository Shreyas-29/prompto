"use server";

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";


const getSearch = async (input: string) => {
    try {
        const results = await db.prompt.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: input,
                            mode: "insensitive"
                        }
                    },
                    {
                        content: {
                            contains: input,
                            mode: "insensitive"
                        }
                    },
                    {
                        category: {
                            contains: input,
                            mode: "insensitive"
                        }
                    }
                ]
            }
        });

        console.log("results: ", results)
        return results;
    } catch (error) {
        console.log("Error in getSearch.ts: ", error);
    };

    // revalidatePath("/");
};

export default getSearch;