import { groq } from 'next-sanity'

export const SETTINGS_QUERY = groq`
  *[_type == "settings"][0] {
    companyName,
    tagline,
    description,
    phone,
    email,
    address,
    mapsEmbedUrl,
    ogImage,
    socialLinks
  }
`

export const ALL_CLIENTS_QUERY = groq`
  *[_type == "client"] | order(order asc) {
    name,
    logo
  }
`

export const HOMEPAGE_QUERY = groq`
  *[_type == "homepage"][0] {
    heroTitle,
    heroSubtitle,
    aboutText
  }
`

export const ALL_SERVICES_QUERY = groq`
  *[_type == "service"] | order(_createdAt asc) {
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    mainImage
  }
`

export const SERVICE_BY_SLUG_QUERY = groq`
  *[_type == "service" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    mainImage,
    fullDescription,
    gallery
  }
`
