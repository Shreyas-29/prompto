"use client";

import { ExtendedPrompt } from "@/types/prompt";
import { FC, FormEvent, useRef, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Select, SelectItem, Selection } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ChevronLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditPromptProps {
    prompt: ExtendedPrompt | undefined;
    updatePrompt: (promptId: string, formData: FormData) => Promise<void>
}

const EditPrompt: FC<EditPromptProps> = ({
    prompt,
    updatePrompt
}) => {

    const { data: session } = useSession();

    const router = useRouter();

    const ref = useRef<HTMLFormElement>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: prompt?.title,
        category: prompt?.category,
        content: prompt?.content,
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEdit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!ref.current) return;

        const formData = new FormData(ref.current);
        let title = formData.get("title");
        let content = formData.get("content");
        const category = formData.get("category");

        if (!title || !content || !category) {
            setIsLoading(false);
            return;
        }

        try {
            await updatePrompt(prompt?.id!, formData);
        } catch (error) {
            console.log("Error updating prompt: ", error);
            toast.error("Unable to edit prompt");
        } finally {
            router.refresh();
            router.push(`/prompt/${prompt?.id}`);
            setIsLoading(false);
            toast.success("Prompt updated successfully");
        }
    };


    return (
        <section className="flex flex-col items-center justify-start w-full h-full p-4 lg:pl-80 md:p-8">
            <div className="flex items-start justify-start flex-1 w-full mb-2">
                <Button variant="flat" isIconOnly onClick={() => router.back()}>
                    <ChevronLeft className="w-5 h-5 text-current" />
                </Button>
            </div>
            <form
                ref={ref}
                onSubmit={handleEdit}
                className="flex flex-col items-start w-full max-w-md gap-4 mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl text-start">
                    Edit Prompt
                </h2>
                <div className="flex flex-col w-full gap-4">
                    <Input
                        type='text'
                        name="title"
                        variant='flat'
                        color='default'
                        label='Title'
                        size='sm'
                        isClearable
                        isRequired
                        className='w-full'
                        value={formData?.title}
                        onChange={handleInputChange}
                    />
                    <Input
                        type='text'
                        name="category"
                        variant='flat'
                        color='default'
                        label='Category'
                        size='sm'
                        isClearable
                        isRequired
                        className='w-full'
                        value={formData?.category}
                        onChange={handleInputChange}
                    />
                    <Textarea
                        variant='flat'
                        name="content"
                        color='default'
                        label='Prompt'
                        size='sm'
                        isRequired
                        multiple
                        className='w-full'
                        value={formData?.content}
                        onChange={handleInputChange}
                    />
                    <Button
                        type="submit"
                        color="primary"
                        disabled={isLoading}
                        className={cn(isLoading && "cursor-not-allowed opacity-50")}
                    >
                        {isLoading && (
                            <Loader2 className="w-5 h-5 text-white animate-spin" />
                        )}
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </section>
    );
}

export default EditPrompt;