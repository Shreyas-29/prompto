import React from 'react'
import { PromptCard } from '.'
import { getPrompts } from '@/actions'

const Feed = async () => {

    const prompts = await getPrompts();

    return (
        <section className='grid lg:pl-80 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 w-full h-full p-4 md:p-8 gap-5'>
            {prompts?.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
            ))}
            {prompts?.length === 0 ? (
                <div className='flex items-center justify-center w-full mx-auto'>
                    <p className='text-center text-gray-600 w-full'>
                        No prompts found
                    </p>
                </div>
            ) : null}
        </section>
    )
}

export default Feed
