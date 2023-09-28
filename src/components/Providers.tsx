"use client"

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <NextUIProvider>
            <SessionProvider>
                <Toaster position="bottom-center" gutter={8} />
                <NextTopLoader color="#2563eb" height={2} crawl={true} showSpinner={false} easing="ease" speed={200} shadow="0 0 10px #66AAF9,0 0 5px #66AAF9" />
                {children}
            </SessionProvider>
        </NextUIProvider>
    )
};

export default Providers;