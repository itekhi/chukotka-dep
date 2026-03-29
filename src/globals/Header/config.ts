import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { phone } from '@/fields/phone'
import { url } from '@/fields/url'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Шапка',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'group',
      fields: [
        phone(),
        {
          name: 'socialLinks',
          labels: {
            singular: 'Соц. сеть',
            plural: 'Соц. сети',
          },
          label: 'Иконки соц. сетей',
          type: 'array',
          fields: [
            {
              name: 'type',
              type: 'select',
              label: 'Соц. сеть',
              required: true,
              options: [
                { label: 'Телеграм', value: 'telegram' },
                { label: 'ВК', value: 'vk' },
                // { label: '', value: '' }
              ],
            },
            url({
              overrides: {
                required: true,
              },
            }),
          ],
        },
      ],
    },
    {
      name: 'navItems',
      label: 'Навигация',
      labels: {
        singular: 'Нав. элемент',
        plural: 'Нав. элементы',
      },
      type: 'array',
      fields: [link({ overrides: { label: false } })],
      maxRows: 10,
      admin: {
        // initCollapsed: true,
        components: {
          RowLabel: '@/globals/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
