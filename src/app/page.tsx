import { createPrompt, deletePrompt, getPrompts, getSearch, getUserPrompts } from '@/actions';
import { Feed, Header, Loader, Sidebar } from '@/components';
import { getAuthSession } from '@/lib/auth';
import { ExtendedPrompt } from '@/types/prompt';
import Image from 'next/image';
import React from 'react';

export default async function HomePage() {

    const session = await getAuthSession();

    const prompts: ExtendedPrompt[] | null = await getPrompts();

    const userPrompts = await getUserPrompts(session?.user.id);

    // const results = await getSearch("");

    return (
        <div className='relative flex-1 w-full h-full min-h-screen'>
            <Image src="/background.svg" alt="" width={500} height={500} className='absolute hidden lg:block top-32 opacity-80 blur-3xl left-72' />
            <Header session={session} userPrompts={userPrompts} createPrompt={createPrompt} />
            <Sidebar session={session} createPrompt={createPrompt} prompts={userPrompts} />
            <Feed />
        </div>
    )
}
