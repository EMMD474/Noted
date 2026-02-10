import { defineConfig } from '@prisma/config'
import { config } from 'dotenv'

// Load environment variables from .env file
config()

export default defineConfig({
    datasource: {
        // Use DIRECT_URL for migrations (bypasses pooler), fallback to DATABASE_URL for runtime
        url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
})
