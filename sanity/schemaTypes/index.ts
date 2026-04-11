import { type SchemaTypeDefinition } from 'sanity'
import { hero } from './hero'
import { grocery } from './grocery'
import { menuItem } from './menuItem'
import { menuSpecial } from './menuSpecial'
import { dessert } from './dessert'
import { teamMember } from './teamMember'
import { testimonial } from './testimonial'
import { about } from './about'
import { siteSettings } from './siteSettings'
import { lamesaItem } from './lamesaItem'
import { pageContent } from './pageContent'
import { announcement } from './announcement'
import { filipinianaItem } from './filipinianaItem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    grocery,
    menuItem,
    menuSpecial,
    dessert,
    teamMember,
    testimonial,
    about,
    siteSettings,
    lamesaItem,
    pageContent,
    announcement,
    filipinianaItem,
  ],
}
