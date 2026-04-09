import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'Small text above the main title (e.g., "Pamilihang Bayan ng Montreal")',
    }),
    defineField({
      name: 'titlePrefix',
      title: 'Title Prefix',
      type: 'string',
      description: 'First part of the title (e.g., "Welcome to")',
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title Highlight',
      type: 'string',
      description: 'Highlighted part of the title (e.g., "P\'LENGKE!")',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Main description paragraph',
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
    }),
    defineField({
      name: 'primaryButtonLink',
      title: 'Primary Button Link',
      type: 'string',
      description: 'URL or anchor link (e.g., "#menu")',
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
    }),
    defineField({
      name: 'secondaryButtonLink',
      title: 'Secondary Button Link',
      type: 'url',
      description: 'External URL for secondary button',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      description: 'Street address with emoji (e.g., "📍 4693-4699 Ave Van Horne")',
    }),
    defineField({
      name: 'statusText',
      title: 'Status Text',
      type: 'string',
      description: 'Hours and location info (e.g., "Open Daily • Montreal, QC H3W 1H8")',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'floatingCard',
      title: 'Floating Card (Bottom Right)',
      type: 'object',
      fields: [
        { name: 'emoji', type: 'string', title: 'Emoji' },
        { name: 'label', type: 'string', title: 'Label (e.g., "Must Try")' },
        { name: 'title', type: 'string', title: 'Title (e.g., "Kakanin")' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'titleHighlight',
      subtitle: 'badge',
      media: 'heroImage',
    },
  },
})
