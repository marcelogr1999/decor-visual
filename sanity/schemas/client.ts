import { defineField, defineType } from 'sanity'

export const clientSchema = defineType({
  name: 'client',
  title: 'Cliente',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Cliente',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
    }),
  ],
})
