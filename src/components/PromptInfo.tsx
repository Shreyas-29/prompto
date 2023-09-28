"use client";

import { ExtendedPrompt } from "@/types/prompt";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Prompt } from "@prisma/client";
import { Check, Copy, MoreHorizontal, Trash, Share2, Pencil, Router, Bookmark, ChevronLeft } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";

interface PromptInfoProps {
    session: Session | null;
    prompt: ExtendedPrompt;
    deletePrompt: (promptId: string) => Promise<void>
}

const PromptInfo: FC<PromptInfoProps> = ({
    session,
    prompt,
    deletePrompt
}) => {

    const router = useRouter();

    const [copied, setCopied] = useState<boolean>(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt?.content);
        setCopied(true);
        toast.success("Prompt copied to clipboard.");
        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    const handleDelete = async () => {
        try {

            if (!session?.user) {
                console.log("User not signed in");
                toast.error("You must be signed in to delete a prompt.")
                return;
            }

            if (session?.user.id !== prompt?.creator.id) {
                console.log("User not authorized");
                toast.error("You are not authorized to delete this prompt.");
                return;
            }

            await deletePrompt(prompt?.id);

            toast.success("Prompt deleted successfully.");

        } catch (error) {
            console.log("Error deleting prompt: ", error);
            toast.error("Error deleting prompt.");
        } finally {
            router.push('/');
        }
    };

    const handleSave = () => {
        if (!session?.user) {
            console.log("User not signed in");
            toast.error("You must be signed in to save a prompt.")
            return;
        }
        toast.success("Prompt saved successfully.");
    };

    return (
        <section className='relative flex flex-col items-center justify-between flex-1 w-full h-full p-4 lg:pl-80 md:p-8'>
            <div className="flex flex-col items-start flex-1 w-full h-full">
                <Dropdown>
                    <div className="flex items-center justify-between w-full mb-4">
                        <Button variant="flat" isIconOnly onClick={() => router.back()}>
                            <ChevronLeft className="w-5 h-5 text-current" />
                        </Button>
                        <DropdownTrigger>
                            <Button
                                variant="solid"
                                isIconOnly
                            >
                                <MoreHorizontal className="w-5 h-5 text-current" />
                            </Button>
                        </DropdownTrigger>
                    </div>
                    {session?.user.id === prompt?.creator?.id ? (
                        <DropdownMenu variant="solid" aria-label="Dropdown menu with icons" disabledKeys={[]}>
                            <DropdownItem
                                key="edit"
                                variant="solid"
                                onClick={() => router.push(`/prompt/${prompt?.id}/edit`)}
                                startContent={<Pencil className="w-4 h-4 text-gray-800" />}
                            >
                                Edit
                            </DropdownItem>
                            <DropdownItem
                                key="copy"
                                variant="solid"
                                onClick={handleCopy}
                                startContent={copied ? (
                                    <Check className="w-4 h-4 text-gray-800" />
                                ) : (
                                    <Copy className="w-4 h-4 text-gray-800" />
                                )}
                            >
                                Copy
                            </DropdownItem>
                            <DropdownItem
                                key="save"
                                variant="solid"
                                onClick={handleSave}
                                startContent={<Bookmark className="w-4 h-4 text-gray-800" />}
                            >
                                Save
                            </DropdownItem>
                            <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                                variant="solid"
                                onClick={handleDelete}
                                startContent={<Trash className="w-4 h-4 text-current" />}
                            >
                                Delete prompt
                            </DropdownItem>
                        </DropdownMenu>
                    ) : (
                        <>
                            {/* <DropdownTrigger>
                            <Button
                                variant="solid"
                                isIconOnly
                            >
                                <MoreHorizontal className="w-5 h-5 text-current" />
                            </Button>
                        </DropdownTrigger> */}
                            <DropdownMenu variant="solid" aria-label="Dropdown menu with icons">
                                <DropdownItem
                                    key="copy"
                                    variant="solid"
                                    onClick={handleCopy}
                                    startContent={copied ? (
                                        <Check className="w-4 h-4 text-gray-800" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-gray-800" />
                                    )}
                                >
                                    Copy
                                </DropdownItem>
                                <DropdownItem
                                    key="save"
                                    variant="solid"
                                    onClick={handleSave}
                                    startContent={<Bookmark className="w-4 h-4 text-gray-800" />}
                                >
                                    Save
                                </DropdownItem>
                            </DropdownMenu>
                        </>
                    )}
                </Dropdown>
                <div className='flex flex-col flex-1 w-full h-full space-y-4'>
                    <h2 className="text-2xl font-bold text-gray-900 md:text-4xl text-start">
                        {prompt?.title.charAt(0).toUpperCase() + prompt?.title.slice(1)}
                    </h2>
                    <p className="text-base font-normal text-justify text-gray-600 md:text-lg">
                        {prompt?.content.charAt(0) + prompt?.content.slice(1)}
                    </p>
                </div>
            </div>
            <div className="sticky inset-x-0 bottom-0 flex items-center justify-start flex-1 w-full h-full py-4 mt-20 space-x-2 border-t border-gray-200">
                <div className="flex items-center justify-start">
                    <Image
                        src={prompt?.creator?.image!}
                        alt=""
                        width={1000}
                        height={1000}
                        className="object-cover w-10 h-10 rounded-full"
                    />
                </div>
                <span className="flex flex-1 text-gray-800 capitalize text-start">
                    {prompt?.creator?.name!}
                </span>
            </div>
        </section>
    );
}

export default PromptInfo;