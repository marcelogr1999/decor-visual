import { createClient } from '@sanity/client'
import { services, siteSettings } from '../lib/mock-data'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-14',
  token: process.env.SANITY_API_TOKEN, // Será necessário gerar um token no Sanity
  useCdn: false,
})

async function uploadImage(imagePath: string) {
  try {
    const fullPath = path.join(__dirname, '..', 'public', imagePath)
    if (!fs.existsSync(fullPath)) {
      console.warn(`Imagem não encontrada localmente: ${fullPath}`)
      return null
    }

    const imageAsset = await client.assets.upload('image', fs.createReadStream(fullPath), {
      filename: path.basename(imagePath),
    })

    return {
      _type: 'image',
      asset: {
        _type: "reference",
        _ref: imageAsset._id
      }
    }
  } catch (error) {
    console.error(`Erro ao fazer upload da imagem ${imagePath}:`, error)
    return null
  }
}

async function migrate() {
  console.log('Iniciando migração de dados...')

  try {
    // 1. Migrar Homepage
    console.log('Migrando Homepage...')
    const homepageDoc = {
      _type: 'homepage',
      _id: 'homepage', // Garante que será um singleton
      heroTitle: siteSettings.tagline,
      heroSubtitle: siteSettings.description,
      aboutText: "A " + siteSettings.companyName + " atua há anos no mercado oferecendo as melhores soluções em comunicação visual..."
    }
    
    await client.createOrReplace(homepageDoc)
    console.log('Homepage migrada ✅')

    // 2. Migrar Serviços
    for (const service of services) {
      console.log(`Migrando serviço: ${service.name}...`)

      // Faz upload das imagens (principal + galeria)
      const uploadedMainImage = service.images.length > 0 ? await uploadImage(service.images[0]) : null
      
      const galleryImages = []
      for (const imgPath of service.images.slice(1)) {
        const uploadedImg = await uploadImage(imgPath)
        if (uploadedImg) galleryImages.push(uploadedImg)
      }

      const serviceDoc = {
        _type: 'service',
        title: service.name,
        slug: { _type: 'slug', current: service.slug },
        shortDescription: service.shortDescription,
        icon: service.icon,
        mainImage: uploadedMainImage,
        fullDescription: [
          {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: service.description, marks: [] }]
          }
        ],
        gallery: galleryImages
      }

      await client.create(serviceDoc)
      console.log(`Serviço ${service.name} migrado ✅`)
    }

    console.log('Migração concluída com sucesso! 🎉')
  } catch (error) {
    console.error('Erro na migração:', error)
  }
}

migrate()
