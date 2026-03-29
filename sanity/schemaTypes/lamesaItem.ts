import { defineField, defineType } from 'sanity'

export const lamesaItem = defineType({
  name: 'lamesaItem',
  title: 'Lamesa Gallery Item',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', title: 'Category / Tag', type: 'string' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'size',
      title: 'Grid Size',
      type: 'string',
      options: {
        list: [
          { title: 'Large (2x2)', value: 'large' },
          { title: 'Small (1x1)', value: 'small' },
        ],
      },
      initialValue: 'small',
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
})
