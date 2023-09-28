"use client";

import React, { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button } from "@nextui-org/react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { cn } from '@/lib/utils';

const SignUp = () => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleAuth = async () => {
        setIsLoading(true);

        try {
            await signIn('google');
        } catch (error) {
            console.log("Error", error);
        } finally {
            setIsLoading(false);
            router.refresh();
            router.push('/');
        }
    };

    return (
        <Card className="max-w-xs py-4 shadow-none" shadow='none'>
            <CardHeader className="flex flex-col items-center justify-center w-full">
                <h2 className='text-xl font-semibold text-center text-gray-900 md:text-3xl'>
                    Sign Up
                </h2>
                {/* <p className='mt-4 text-sm text-center text-gray-500'>
                    Create your free account. 😎
                </p> */}
            </CardHeader>
            <CardBody className='space-y-4'>
                <p className='text-xs text-center text-gray-700 md:text-sm'>
                    By creating an account, you agree to Prompto&apos;s Terms and Conditions.
                </p>
                <Button
                    color='primary'
                    className={cn("w-full", isLoading && "cursor-not-allowed opacity-50")}
                    disabled={isLoading}
                    onClick={handleAuth}
                >
                    <Image
                        src="/icons/google.svg"
                        alt="google"
                        height={500}
                        width={500}
                        className='w-5 h-5 mr-1'
                    />
                    <span>Sign In with Google</span>
                </Button>
            </CardBody>
            <CardFooter className='flex items-center justify-center w-full -mt-2 text-center'>
                <p className='w-full text-sm text-center text-gray-700'>
                    Already have an account? <Link href="/signin" className='font-medium text-blue-500'>Sign In</Link>
                </p>
            </CardFooter>
        </Card>
    )
}

export default SignUp
