import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'footerDescription', title: 'Footer Description', type: 'text', rows: 3 }),
    defineField({ name: 'address1', title: 'Address Line 1', type: 'string' }),
    defineField({ name: 'address2', title: 'Address Line 2', type: 'string' }),
    defineField({ name: 'phone1', title: 'Phone Number 1', type: 'string' }),
    defineField({ name: 'phone2', title: 'Phone Number 2', type: 'string' }),
    defineField({ name: 'email', title: 'Email Address', type: 'string' }),
    defineField({ name: 'hoursDay', title: 'Hours (Days)', type: 'string' }),
    defineField({ name: 'hoursTime', title: 'Hours (Time)', type: 'string' }),
    defineField({ name: 'mapsUrl', title: 'Google Maps URL', type: 'url' }),
    defineField({ name: 'mapImage', title: 'Map Screenshot', type: 'image', options: { hotspot: true } }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
