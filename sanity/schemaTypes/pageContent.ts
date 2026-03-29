import { defineField, defineType } from 'sanity'

export const pageContent = defineType({
  name: 'pageContent',
  title: 'Page & Section Content',
  type: 'document',
  fields: [
    defineField({
      name: 'pageId',
      title: 'Page / Section',
      type: 'string',
      options: {
        list: [
          { title: 'Menu Page', value: 'menu' },
          { title: 'Lamesa Page', value: 'lamesa' },
          { title: 'Grocery Page', value: 'grocery' },
          { title: 'Section: Weekly Specials', value: 'section-specials' },
          { title: 'Section: Sweet Delights (Desserts)', value: 'section-desserts' },
          { title: 'Section: Meet Our Team', value: 'section-team' },
          { title: 'Section: Loved by the Community (Testimonials)', value: 'section-testimonials' },
          { title: 'Section: Visit Us (Contact)', value: 'section-contact' },
          { title: 'Section: Our Menu (Home)', value: 'section-menu' },
          { title: 'Section: Delicious Soup', value: 'section-soups' },
          { title: 'Section: Gallery', value: 'section-gallery' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'pageId' },
  },
})
