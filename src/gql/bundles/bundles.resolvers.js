import Bundles from './bundles.engine'
import { async } from 'rxjs/internal/scheduler/async'
export default {
  Query: {
    bundleById: async (_, { id }, ctx) => Bundles(ctx).fromId(id),
    bundleBySlug: async (_, { slug }, ctx) => Bundles(ctx).fromSlug(slug),
  },
}
