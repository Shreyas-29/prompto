"use client";

import { FC } from "react";

import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button } from "@nextui-org/react";
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { Prompt } from "@prisma/client";
import { ExtendedPrompt } from "@/types/prompt";

interface PromptCardProps {
    prompt: ExtendedPrompt;
}

const PromptCard: FC<PromptCardProps> = ({
    prompt
}) => {

    const { data: session } = useSession();

    return (
        <Card className="transition-colors duration-500 ease-out border border-gray-100 shadow-2xl select-none rounded-2xl hover:bg-primary-50/8 hover:border-gray-400 shadow-slate-300/20">
            <Link href={`/prompt/${prompt?.id}`} className="flex flex-col items-start justify-between h-full">
                <div className="flex flex-col items-start flex-1 p-4 space-y-2">
                    <h2 className='text-base font-semibold text-gray-900 text-start'>
                        {prompt?.title.charAt(0).toUpperCase() + prompt?.title.slice(1)}
                    </h2>
                    <p className="flex-wrap flex-grow h-full text-sm text-gray-600 text-start line-clamp-3">
                        {prompt?.content}
                    </p>
                </div>
                <div className="flex items-center justify-between w-full px-4 pb-4">
                    <div className="flex items-center space-x-2">
                        <Image
                            src={prompt?.creator?.image!}
                            alt="heart"
                            height={500}
                            unoptimized
                            width={500}
                            className='w-8 h-8 rounded-full'
                        />
                        <span className="text-sm font-medium text-gray-700">
                            {prompt?.creator?.name?.charAt(0).toUpperCase()! + prompt?.creator?.name?.slice(1)}
                        </span>
                    </div>
                    <div className="flex items-center justify-end">
                        <span className="text-xs text-gray-500 text-end">
                            #{prompt?.category}
                        </span>
                    </div>
                </div>
            </Link>
        </Card>
    );
}

export default PromptCard;