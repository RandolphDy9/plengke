import { defineField, defineType } from 'sanity'

export const dessert = defineType({
  name: 'dessert',
  title: 'Dessert',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Full Description', type: 'text', rows: 4 }),
    defineField({ name: 'alt', title: 'Alt Text (for Accessibility)', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', media: 'image' },
  },
})
