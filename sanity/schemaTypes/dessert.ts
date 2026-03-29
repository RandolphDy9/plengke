import { defineField, defineType } from 'sanity'

export const dessert = defineType({
  name: 'dessert',
  title: 'Dessert',
  type: 'document',
  fields: [
    defineField({ name: 'alt', title: 'Description / Alt Text', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'alt', media: 'image' },
  },
})
