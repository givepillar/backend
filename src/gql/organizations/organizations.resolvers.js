import Organizations from './organizations.engine'
import { async } from 'rxjs/internal/scheduler/async'
export default {
  Query: {
    organizationById: async (_, { id }, ctx) => Organizations(ctx).fromId(id),
    organizationBySlug: async (_, { slug }, ctx) => Organizations(ctx).fromSlug(slug),
  },
}
