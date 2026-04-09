import { defineField, defineType } from 'sanity'

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: "Daily", value: "daily" },
          { title: "Specials", value: "specials" },
          { title: "Kakanin/Desserts", value: "kakanin-desserts" },
          { title: "Cafe Corner", value: "cafe-corner" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'price', title: 'Price', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }, { field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'image' },
  },
})
