import { createClient } from '@sanity/client'
import { siteSettings } from '../lib/mock-data'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-14',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function migrateSettings() {
  console.log('Iniciando migração de configurações...')

  const settingsDoc = {
    _type: 'settings',
    _id: 'settings', // Singleton
    companyName: siteSettings.companyName,
    tagline: siteSettings.tagline,
    description: siteSettings.description,
    phone: siteSettings.phone,
    email: siteSettings.email,
    address: siteSettings.address,
    mapsEmbedUrl: siteSettings.mapsEmbedUrl,
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/decorvisual' },
      { platform: 'WhatsApp', url: `https://wa.me/55${siteSettings.phone.replace(/\D/g, '')}` }
    ]
  }

  try {
    await client.createOrReplace(settingsDoc)
    console.log('Configurações migradas com sucesso! ✅')
  } catch (error) {
    console.error('Erro ao migrar configurações:', error)
  }
}

migrateSettings()
