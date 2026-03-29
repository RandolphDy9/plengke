import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Customer Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'role', title: 'Description (e.g. "Regular Customer")', type: 'string' }),
    defineField({ name: 'avatarUrl', title: 'Avatar Image URL', type: 'url' }),
    defineField({ name: 'quote', title: 'Review / Quote', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'quote' },
  },
})
