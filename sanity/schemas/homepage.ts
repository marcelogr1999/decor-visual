import { defineField, defineType } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Página Inicial',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Título Principal (Hero)',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Subtítulo (Hero)',
      type: 'text',
    }),
    defineField({
      name: 'aboutText',
      title: 'Texto Sobre Nós',
      type: 'text',
    }),
  ],
})
