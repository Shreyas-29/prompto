"use client";

import Link from 'next/link'
import React, { FC, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage, CreatePromptModal, Menu, SearchResults, Sidebar, } from '.'
import { Search, Bell, MenuIcon, X, Plus, Loader2 } from 'lucide-react'
import { Button, Input, Skeleton, useDisclosure } from "@nextui-org/react";
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { ExtendedPrompt } from '@/types/prompt';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getSearch } from '@/actions';
import { Prompt } from '@prisma/client';

interface HeaderProps {
    session: Session | null;
    userPrompts: ExtendedPrompt[] | null;
    createPrompt: (formData: FormData) => Promise<void>;
}

const Header: FC<HeaderProps> = ({
    session,
    userPrompts,
    createPrompt
}) => {

    const router = useRouter();

    const [prompts, setPrompts] = useState<Prompt[] | undefined>([]);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { isOpen: open, onOpen, onOpenChange } = useDisclosure();

    const pathname = usePathname();

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const data = await getSearch(input);
            // console.log("data: ", data, input);
            setPrompts(data);
        } catch (error) {
            console.log("error", error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleOpenModal = () => {
        if (session?.user) {
            onOpen();
        } else {
            toast.error("You must login to create prompt.");
            return;
        }
    };

    return (
        <header className='sticky inset-x-0 top-0 z-50 w-full border-b border-gray-200'>
            <div className='items-center justify-center hidden w-full mx-auto md:flex bg-white/30 backdrop-blur'>
                <div className='flex items-center justify-between w-full px-4 py-3 mx-auto md:px-8 lg:px-8'>
                    <div className='flex items-center'>
                        <Link href="/">
                            <Image src="/prompto.svg" alt="" width={500} height={500} className='w-20 h-auto pt-2' />
                        </Link>
                    </div>
                    <div className='relative items-center hidden w-full max-w-md md:flex-col md:flex'>
                        <Input
                            type='text'
                            variant='flat'
                            color='primary'
                            placeholder='Search for prompts...'
                            className='focus-visible:ring-0 focus-visible:ring-transparent'
                            startContent={
                                isLoading ? <Loader2 className='w-5 h-5 text-blue-500 animate-spin' /> : <Search className='w-5 h-5 text-blue-500' />
                            }
                            value={input}
                            // onChange={(e) => setInput(e.target.value)}
                            onChange={(e) => {
                                setInput(e.target.value);
                                handleSearch();
                            }}
                        />
                        {input && prompts?.length! >= 1 ? (
                            <SearchResults prompts={prompts!} />
                        ) : null}
                        {input && prompts?.map((prompt) => (
                            <>
                                {prompt.title.includes(input) || prompt.content.includes(input) || prompt.category.includes(input) ? (
                                    <div className="flex items-center justify-center w-full py-4">
                                        <span className="text-sm text-gray-500">No results found.</span>
                                    </div>
                                ) : null}
                            </>
                        ))}
                    </div>
                    <div className='flex items-center justify-end gap-4'>
                        <Button variant='flat' isIconOnly color='default'>
                            <Image
                                src="/icons/inbox.svg"
                                alt=""
                                width={500}
                                height={500}
                                className='object-cover w-5 h-5'
                            />
                        </Button>
                        {session?.user ? (
                            <Avatar className='cursor-pointer w-9 h-9'>
                                <AvatarImage src={session?.user.image!} alt={session?.user.name!} className='w-full h-full rounded-full' />
                                <AvatarFallback>
                                    {session?.user.name![0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        ) : (
                            <div className='flex items-center justify-end gap-4'>
                                <Link href="/signin" className='hidden md:block'>
                                    <Button color="primary" className='font-semibold'>
                                        Sign In
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center w-full md:hidden bg-white/40 backdrop-blur-md'>
                <div className='flex items-center justify-between w-full px-4 py-3 mx-auto md:px-8 lg:px-8'>
                    <Button size='sm' variant='flat' isIconOnly color='default' className='flex z-[500] md:hidden' onClick={() => setIsOpen((prev) => !prev)}>
                        {isOpen ? (
                            <X className='w-5 h-5 text-current' />
                        ) : (
                            <MenuIcon className='w-5 h-5 text-current' />
                        )}
                    </Button>
                    <div className='flex items-center'>
                        <Link href="/">
                            <Image src="/prompto.svg" alt="" width={500} height={500} className='w-20 h-auto pt-2' />
                        </Link>
                    </div>
                    <div className='flex items-start justify-end space-x-4'>
                        <Button
                            size='sm'
                            // color='primary'
                            variant='flat'
                            isIconOnly
                            onClick={handleOpenModal}
                        >
                            <Plus className='w-4 h-4 text-current' />
                        </Button>
                        {!session?.user ? (
                            <Link href="/signin" className='block md:hidden'>
                                <Button size='sm' color="primary" className='font-semibold'>
                                    Sign In
                                </Button>
                            </Link>
                        ) : null}
                    </div>
                </div>
            </div>
            {isOpen ? (
                <Menu
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    session={session}
                    // prompts={prompts}
                    prompts={userPrompts}
                />
            ) : null}
            <CreatePromptModal
                isOpen={open}
                onOpenChange={onOpenChange}
                createPrompt={createPrompt}
            />
        </header>
    )
}

export default Header
