import { createClient } from '@sanity/client'
import { clients } from '../lib/mock-data'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-14',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function uploadLogo(slug: string) {
  try {
    const fileName = `${slug}.svg`
    const fullPath = path.join(__dirname, '..', 'public', 'brands', fileName)
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`Logo não encontrada: ${fullPath}`)
      return null
    }

    const asset = await client.assets.upload('image', fs.createReadStream(fullPath), {
      filename: fileName,
      contentType: 'image/svg+xml'
    })

    return {
      _type: 'image',
      asset: {
        _type: "reference",
        _ref: asset._id
      }
    }
  } catch (error) {
    console.error(`Erro ao fazer upload da logo ${slug}:`, error)
    return null
  }
}

async function migrateClients() {
  console.log('Iniciando migração de clientes...')

  for (let i = 0; i < clients.length; i++) {
    const mockClient = clients[i]
    console.log(`Migrando cliente: ${mockClient.name}...`)

    const logo = await uploadLogo(mockClient.slug)

    const clientDoc = {
      _type: 'client',
      name: mockClient.name,
      logo: logo,
      order: i
    }

    try {
      await client.create(clientDoc)
      console.log(`Cliente ${mockClient.name} migrado ✅`)
    } catch (error) {
      console.error(`Erro ao criar documento para ${mockClient.name}:`, error)
    }
  }

  console.log('Migração de clientes concluída! 🎉')
}

migrateClients()
