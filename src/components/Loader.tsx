import { Loader2, Loader2Icon } from 'lucide-react'
import React from 'react'

const Loader = () => {
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 inset-0 z-[100] flex items-center justify-center w-full h-screen bg-white/40 backdrop-blur-3xl'>
            <div className='flex items-center justify-center w-screen h-screen'>
                <Loader2Icon className='w-5 h-5 text-gray-800 animate-spin' />
            </div>
        </div>
    )
}

export default Loader
