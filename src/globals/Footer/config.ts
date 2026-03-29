import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Футер',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'group',
      label: 'Контакты',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'addressPostalCode',
              type: 'text',
              label: 'Почтовый индекс',
              required: true,
              admin: { placeholder: '000000' },
            },
            {
              name: 'addressLocality',
              type: 'text',
              label: 'Населённый пункт',
              required: true,
              admin: { placeholder: 'г. Москва' },
            },
            {
              name: 'address',
              type: 'text',
              label: 'Адрес',
              required: true,
              admin: { placeholder: 'ул. Савёловская, д. 5' },
            },
          ],
        },
        {
          name: 'phones',
          type: 'text',
          label: 'Телефон',
          hasMany: true,
          required: true,
          admin: {
            placeholder: 'Напишите и нажмите Enter',
          },
        },
        {
          name: 'emails',
          type: 'text',
          label: 'Почта',
          hasMany: true,
          required: true,
          admin: {
            placeholder: 'Напишите и нажмите Enter',
          },
        },
        {
          name: 'openingHours',
          type: 'text',
          label: 'График работы',
          hasMany: true,
          required: true,
          admin: {
            placeholder: 'Напишите и нажмите Enter',
          },
        },
      ],
    },
    link({
      disableLabel: true,
      overrides: { name: 'privacyPolicyLink', label: 'Ссылка на политику конфиденциальности' },
    }),
    {
      type: 'text',
      label: 'Ссылка на Телеграм канал',
      name: 'telegramUrl',
      admin: {
        placeholder: 'https://t.me/channel',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
