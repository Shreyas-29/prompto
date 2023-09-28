"use client";

import { ExtendedPrompt } from "@/types/prompt";
import { Button, useDisclosure } from "@nextui-org/react";
import { Plus, X } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface MenuProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    session: Session | null;
    prompts: ExtendedPrompt[] | null;
}

const Menu: FC<MenuProps> = ({
    isOpen,
    setIsOpen,
    session,
    prompts
}) => {

    console.log("promots", prompts);

    const router = useRouter();

    const { isOpen: open, onOpen, onOpenChange } = useDisclosure();

    const handleOpenModal = () => {
        if (session?.user) {
            onOpen();
        } else {
            router.push('/signin');
        }
    };

    return (
        <div className='fixed inset-0 flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-white/40 backdrop-blur-md'>
            <div className="flex items-start flex-1 w-full h-full p-4">
                <Button size='sm' variant='flat' isIconOnly color='default' className='flex z-[500] md:hidden' onClick={() => setIsOpen((prev) => !prev)}>
                    <X className='w-5 h-5 text-current' />
                </Button>
            </div>
            <div className="flex flex-col items-start justify-start w-full h-full">
                <div className='flex-col items-center justify-start flex-1 w-full h-full px-4 py-2'>
                    {session?.user && prompts?.length !== 0 && (
                        <h4 className='text-sm font-semibold text-gray-600 uppercase'>
                            My Prompts
                        </h4>
                    )}
                    <div className='flex flex-col items-start justify-between w-full h-full pb-20 my-4 space-y-2'>
                        {prompts?.length === 0 && (
                            <span className='items-center flex-1 w-full py-4 text-sm text-center text-gray-500'>
                                You have no prompts yet.
                            </span>
                        )}
                        {!session?.user && (
                            <div className="flex flex-col items-start justify-start flex-1 w-full h-5/6">
                                <span className='flex items-start justify-center flex-1 w-full py-4 text-sm text-center text-gray-500'>
                                    You have no prompts yet.
                                </span>
                                <div className="absolute inset-x-0 flex items-center justify-center px-4 bottom-20">
                                    <Button variant="shadow" color="primary" className="w-full" onClick={() => router.push("/signin")}>
                                        Sign In
                                    </Button>
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col items-start w-full space-y-2">
                            {session?.user && prompts?.map((prompt) => (
                                <div className='flex items-center justify-start w-full'>
                                    <Button variant='flat' className='w-full flex items-center justify-start !text-start' onClick={() => router.push(`/prompt/${prompt?.id}`)} >
                                        <span className='truncate text-start line-clamp-1'>
                                            {prompt?.title.length > 28 ? prompt?.title.slice(0, 28) + '...' : prompt?.title}
                                        </span>
                                    </Button>
                                </div>
                            ))}
                        </div>
                        {session?.user ? (
                            <Button variant="shadow" color="primary" className="w-full mt-auto mb-8" onClick={() => signOut()}>
                                Log Out
                            </Button>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Menu;