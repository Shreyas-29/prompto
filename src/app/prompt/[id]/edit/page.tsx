import { createPrompt, deletePrompt, getPrompt, getPrompts, getUserPrompts, updatePrompt } from '@/actions';
import { EditPrompt, Feed, Header, Loader, PromptInfo, Sidebar } from '@/components';
import { getAuthSession } from '@/lib/auth';
import { ExtendedPrompt } from '@/types/prompt';
import { Metadata } from 'next';
import React from 'react';

type Props = {
    params: { id: string }
}

export async function generateMetadata({ params }: Props) {
    const id = params?.id;
    const prompt = await getPrompt(id);
    return {
        title: `Edit - ${prompt?.title} - Prompto`,
        description: prompt?.content
    }
};

export default async function EditPromptPage({
    params
}: {
    params: { id: string }
}) {

    const session = await getAuthSession();

    const prompts: ExtendedPrompt[] | null = await getPrompts();

    const userPrompts = await getUserPrompts(session?.user.id);

    const prompt = await getPrompt(params.id);


    return (
        <div className='relative flex-1 w-full h-full min-h-screen'>
            <Header session={session} userPrompts={userPrompts} createPrompt={createPrompt} />
            <Sidebar session={session} createPrompt={createPrompt} prompts={prompts} />
            <EditPrompt prompt={prompt} updatePrompt={updatePrompt} />
        </div>
    )
}