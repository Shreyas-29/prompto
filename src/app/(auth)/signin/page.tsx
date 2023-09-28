import { SignIn } from '@/components';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
    title: "Prompto - Sign In",
    description: "Explore the world of AI-powered prompts."
}

export default function SignInPage() {
    return (
        <section className='flex items-center justify-center w-full h-screen'>
            <div className='flex flex-col items-center justify-center flex-1 h-full'>
                <Link href="/">
                    <Image
                        src="/prompto.svg"
                        alt="prompto logo"
                        height={40}
                        width={40}
                        className='w-24 h-auto'
                    />
                </Link>
                <SignIn />
            </div>
        </section>
    )
}
