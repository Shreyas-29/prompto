"use client";

import React, { FC } from 'react'
import { LogOut, Plus, Settings } from 'lucide-react'
// import { Button } from '.'
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import Image from 'next/image';
import { CreatePromptModal } from '.';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { ExtendedPrompt } from '@/types/prompt';
import { signOut } from 'next-auth/react';


interface SidebarProps {
    session: Session | null;
    createPrompt: (formData: FormData) => Promise<void>;
    prompts: ExtendedPrompt[] | null;
}

const Sidebar: FC<SidebarProps> = ({
    session,
    createPrompt,
    prompts
}) => {

    // const prompts = [];

    const router = useRouter();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleOpenModal = () => {
        if (session?.user) {
            onOpen();
        } else {
            router.push('/signin');
        }
    };

    return (
        <section className='fixed inset-y-0 left-0 z-40 hidden h-screen pt-20 border-r border-gray-100/60 bg-gray-50 w-72 lg:block'>
            <div className='flex flex-col items-start justify-start w-full h-full'>
                <div className='flex items-start justify-center w-full p-4'>
                    <Button
                        color='primary'
                        variant='solid'
                        className='w-full'
                        onClick={handleOpenModal}
                    >
                        <Plus className='w-4 h-4 text-current' />
                        <span className='flex-1 font-normal text-start'>New Prompt</span>
                    </Button>
                </div>
                <div className='flex-col items-center justify-start flex-1 w-full h-full px-4 py-2'>
                    {prompts?.length !== 0 && (
                        <h4 className='text-sm font-semibold text-gray-600 uppercase'>
                            My prompts
                        </h4>
                    )}
                    <div className='flex flex-col items-center w-full my-4 space-y-2'>
                        {prompts?.length === 0 && (
                            <span className='items-center flex-1 w-full py-4 text-sm text-center text-gray-500'>
                                You have no prompts yet.
                            </span>
                        )}
                        {prompts?.map((prompt) => (
                            <div className='flex items-center flex-1 w-full'>
                                <Button variant='flat' className='w-full flex items-center justify-start !text-start' onClick={() => router.push(`/prompt/${prompt?.id}`)} >
                                    <span className='truncate text-start line-clamp-1'>
                                        {prompt?.title.length > 28 ? prompt?.title.slice(0, 28) + '...' : prompt?.title}
                                    </span>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
                {session?.user ? (
                    <div className='sticky inset-x-0 bottom-0 flex items-center justify-center w-full px-4 py-6 border-t border-gray-100'>
                        <div className='flex flex-col items-center w-full gap-2'>
                            <Button color='primary' variant='flat' className='flex items-center justify-start w-full' onClick={() => signOut()}>
                                <LogOut className='w-4 h-4 text-current' />
                                <span>
                                    Log out
                                </span>
                            </Button>
                        </div>
                    </div>
                ) : null}
            </div>
            <CreatePromptModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                createPrompt={createPrompt}
            />
        </section>
    )
}

export default Sidebar
