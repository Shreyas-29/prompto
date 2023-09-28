import type { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import type { Prompt, User } from '@prisma/client'

type UseId = string;

declare module 'next-auth/jwt' {
    interface JWT {
        id: UserId
        username?: string | null;
        prompts?: Prompt[]
    }
}

declare module 'next-auth' {
    interface Session {
        user: User & {
            id: UserId;
            username?: string | null;
        }
    }
}