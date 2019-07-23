import { async } from 'rxjs/internal/scheduler/async'
import Users from './users.engine'
export default {
  Query: {
    viewer: async (_, __, ctx) => Users(ctx).viewer(),
  },
  User: {
    // HERE, resolve any user fields not returned by Users model.
  },
}
