import { Providers } from "@/components";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from 'next'
import { Inter, DM_Sans, Poppins } from 'next/font/google';

const fontBase = DM_Sans({ weight: ['400', '500', '600', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Prompto',
    description: 'Your AI Prompt Playground',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={cn(
                "min-h-[100dvh] max-w-[100vw] w-full overflow-x-hidden font-base relative bg-white antialiased",
                fontBase,
            )}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
