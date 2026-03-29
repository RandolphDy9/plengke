import { defineField, defineType } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({ name: 'paragraph1', title: 'First Paragraph', type: 'text', rows: 4 }),
    defineField({ name: 'paragraph2', title: 'Second Paragraph', type: 'text', rows: 4 }),
    defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value (e.g. "10,000+")', type: 'string' }),
            defineField({ name: 'label', title: 'Label (e.g. "Happy Customers")', type: 'string' }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'paragraph1' },
    prepare({ title }) {
      return { title: 'About Section', subtitle: title }
    },
  },
})
