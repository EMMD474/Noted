import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const password = await bcrypt.hash('password123', 10)

    const user = await prisma.user.upsert({
        where: { email: 'admin@noted.com' },
        update: {},
        create: {
            email: 'admin@noted.com',
            username: 'admin',
            password,
            notes: {
                create: [
                    {
                        title: 'Welcome to Noted',
                        content: 'This is a sample note to get you started.',
                        importance: 'low'
                    },
                    {
                        title: 'Project Ideas',
                        content: '1. Build a habit tracker\n2. Learn Rust\n3. Contribute to open source',
                        importance: 'high'
                    }
                ],
            },
            todos: {
                create: [
                    {
                        title: 'Buy groceries',
                        importance: 'medium',
                        checked: false
                    },
                    {
                        title: 'Read a book',
                        importance: 'low',
                        checked: true
                    }
                ]
            }
        },
    })

    console.log({ user })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
