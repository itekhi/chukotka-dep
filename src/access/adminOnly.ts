import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type adminOnlyType = (args: AccessArgs<User>) => boolean

export const adminOnly: adminOnlyType = ({ req: { user } }) => {
  return user ? user.role === 'admin' : false
}
