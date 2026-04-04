import { defineField, defineType } from 'sanity'

export const announcement = defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'badge',
      title: 'Badge / Tag',
      type: 'string',
      description: 'e.g. "Event", "Seasonal Special", "Product Alert"',
      options: {
        list: [
          { title: 'Event', value: 'Event' },
          { title: 'Seasonal Special', value: 'Seasonal Special' },
          { title: 'Product Alert', value: 'Product Alert' },
          { title: 'New Arrival', value: 'New Arrival' },
          { title: 'Promo', value: 'Promo' },
        ],
      },
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'alt', title: 'Image Alt Text', type: 'string' }),
    defineField({ name: 'buttonText', title: 'Button Text', type: 'string', description: 'Optional call-to-action label' }),
    defineField({ name: 'buttonLink', title: 'Button Link', type: 'url' }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Only active announcements are shown on the site',
      initialValue: true,
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'badge', media: 'image' },
  },
})
