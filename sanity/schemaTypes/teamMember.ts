import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'role', title: 'Role / Position', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'alt', title: 'Image Alt Text', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', description: 'Short tagline shown in the modal (e.g. "The Soul behind the flavor ✨")' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
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
    select: { title: 'name', subtitle: 'role', media: 'image' },
  },
})
