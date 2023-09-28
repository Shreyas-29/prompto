import { SignUp } from '@/components';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUpPage() {
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
                <SignUp />
            </div>
        </section>
    )
}
