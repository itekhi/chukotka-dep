import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { adminOnly } from '../../access/adminOnly'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Пользователь',
    plural: 'Пользователи',
  },
  access: {
    admin: authenticated,
    create: adminOnly,
    delete: adminOnly,
    read: adminOnly,
    update: adminOnly,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Имя',
    },
    {
      name: 'role',
      type: 'select',
      label: 'Роль',
      required: true,
      defaultValue: 'manager',
      options: [
        { label: 'Админ', value: 'admin' },
        { label: 'Менеджер', value: 'manager' },
      ],
      admin: {
        condition: (data, siblingData, { user }) => {
          return user?.role === 'admin'
        },
      },
    },
  ],
  timestamps: true,
}

// db.users.updateOne({ email: "user@example.com" }, { $set: { role: "admin" } })
