import { type SchemaTypeDefinition } from 'sanity'
import { service } from './schemas/service'
import { homepage } from './schemas/homepage'
import { clientSchema } from './schemas/client'
import { settings } from './schemas/settings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, service, clientSchema, settings],
}
