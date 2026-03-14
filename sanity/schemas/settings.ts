import { defineField, defineType } from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Configurações Globais',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Nome da Empresa',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Slogan (Tagline)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descrição de SEO',
      type: 'text',
    }),
    defineField({
      name: 'phone',
      title: 'Telefone/WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-mail de Contato',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Endereço',
      type: 'string',
    }),
    defineField({
      name: 'mapsEmbedUrl',
      title: 'URL do Google Maps (Embed)',
      type: 'url',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes Sociais',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Plataforma' },
            { name: 'url', type: 'url', title: 'Link' },
          ],
        },
      ],
    }),
  ],
})
