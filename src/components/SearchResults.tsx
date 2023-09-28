"use client";

import { ExtendedPrompt } from "@/types/prompt";
import { Button } from "@nextui-org/react";
import { Prompt } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

interface SearchResultsProps {
    prompts: Prompt[] | undefined;
}

const SearchResults: FC<SearchResultsProps> = ({
    prompts
}) => {

    console.log('prompts from search', prompts);

    return (
        <div className="absolute flex flex-col items-center justify-start w-full max-w-md p-4 space-y-1 bg-white border border-gray-200 rounded-2xl top-10">
            {prompts?.length === 0 ? (
                <div className="flex items-center justify-center w-full py-4">
                    <span className="text-sm text-gray-500">No results found.</span>
                </div>
            ) : (
                <>
                    {prompts?.map((prompt) => (
                        <div key={prompt?.id} className="flex items-start justify-start w-full">
                            <Link href={`/prompt/${prompt?.id}`} className="w-full">
                                <Button variant="flat" className="justify-start w-full text-start">
                                    {prompt?.title}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </>
            )}

        </div >
    );
}

export default SearchResults;