import { defineField, defineType } from 'sanity'

export const grocery = defineType({
  name: 'grocery',
  title: 'Grocery Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Canned Goods', value: 'Canned Goods' },
          { title: 'Bottled Products', value: 'Bottled Products' },
          { title: 'Coffee/Beverages', value: 'Coffee/Beverages' },
          { title: 'Condiments/Seasonings', value: 'Condiments/Seasonings' },
          { title: 'Rice/Flour', value: 'Rice/Flour' },
          { title: 'Frozen Items', value: 'Frozen Items' },
          { title: 'Household', value: 'Household' },
          { title: 'Health & Beauty', value: 'Health & Beauty' },
          { title: 'Sari-Sari', value: 'Sari-Sari' },
          { title: 'Snacks', value: 'Snacks' },
          { title: 'Chichirya', value: 'Chichirya' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price (for sale items)',
      type: 'number',
      description: 'Leave empty if not on sale',
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Item',
      type: 'boolean',
      description: 'Show featured badge on this item',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (optional)',
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
      stock: 'inStock',
    },
    prepare({ title, subtitle, media, stock }) {
      return {
        title,
        subtitle: `${subtitle} - ${stock ? 'In Stock' : 'Out of Stock'}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Price: Low to High',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }],
    },
  ],
})
