import { createPrompt, deletePrompt, getPrompt, getPrompts, getUserPrompts } from '@/actions';
import { Feed, Header, Loader, PromptInfo, Sidebar } from '@/components';
import { getAuthSession } from '@/lib/auth';
import { ExtendedPrompt } from '@/types/prompt';
import React from 'react';

export default async function PromptPage({
    params
}: {
    params: { id: string }
}) {

    const session = await getAuthSession();

    const prompts: ExtendedPrompt[] | null = await getPrompts();
    
    const userPrompts = await getUserPrompts(session?.user.id);
    
    const prompt: ExtendedPrompt | undefined = await getPrompt(params?.id);

    return (
        <div className='relative flex-1 w-full h-full min-h-screen'>
            <Header session={session} userPrompts={userPrompts} createPrompt={createPrompt} />
            <Sidebar session={session} createPrompt={createPrompt} prompts={prompts} />
            <PromptInfo session={session} prompt={prompt!} deletePrompt={deletePrompt} />
        </div>
    )
}