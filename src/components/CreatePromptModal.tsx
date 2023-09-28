"use client";

import { categories } from "@/constants";
import { cn } from "@/lib/utils";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Select, SelectItem, Selection } from "@nextui-org/react";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

interface CreatePromptModalProps {
    isOpen: any;
    onOpenChange: any;
    createPrompt: (formData: FormData) => Promise<void>;
}

const CreatePromptModal: FC<CreatePromptModalProps> = ({
    isOpen,
    onOpenChange,
    createPrompt,
}) => {
    const { data: session } = useSession();

    const router = useRouter();

    const ref = useRef<HTMLFormElement>(null);

    // const [catValue, setCatValue] = useState<Selection>(new Set([]));
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent) => {
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
            await createPrompt(formData);
        } catch (error) {
            console.log("Error creating prompt: ", error);
            toast.error("Unable to create prompt!");
        } finally {
            router.refresh();
            setIsLoading(false);
            onOpenChange();
            toast.success("Prompt created successfully!");
            title = "";
            content = "";
        }

    };


    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" >
            <ModalContent>
                {(onClose) => (
                    <form
                        ref={ref}
                        onSubmit={handleSubmit}
                    >
                        <ModalHeader className="flex flex-col gap-1">
                            Create a new prompt
                        </ModalHeader>
                        <ModalBody>
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
                                    disabled={isLoading}
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
                                    disabled={isLoading}
                                    maxLength={15}
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
                                    disabled={isLoading}
                                />
                                {/* <Select
                                    size='sm'
                                    color="primary"
                                    variant="bordered"
                                    label='Select a category'
                                    isRequired
                                    selectedKeys={catValue}
                                    onSelectionChange={setCatValue}
                                    className="w-full"
                                >
                                    {categories?.map((category) => (
                                        <SelectItem key={category.value} value={category.value} color="primary">
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </Select> */}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button
                                type="submit"
                                color="primary"
                                disabled={isLoading}
                                className={cn("", isLoading ? "opacity-50" : "")}
                            >
                                {isLoading && (
                                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                                )}
                                {isLoading ? "Creating..." : "Create"}
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal >
    );
}

export default CreatePromptModal;