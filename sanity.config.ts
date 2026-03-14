import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './sanity/schema'

export default defineConfig({
  // Only use basePath when running inside Next.js
  basePath: process.env.NEXT_PUBLIC_SANITY_STUDIO_IN_NEXTJS === 'true' ? '/studio' : undefined,
  projectId: 'e6o6k307',
  dataset: 'production',
  title: 'DECOR Visual CMS',
  schema,
  plugins: [
    structureTool(),
  ],
})
