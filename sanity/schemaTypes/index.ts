import { type SchemaTypeDefinition } from 'sanity'
import { hero } from './hero'
import { grocery } from './grocery'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero, grocery],
}
