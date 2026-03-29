import type { Block } from 'payload'

export const NewsBlock: Block = {
  slug: 'news',
  interfaceName: 'NewsBlock',
  labels: {
    singular: 'Новости',
    plural: 'Новости',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/news.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      label: 'Заголовок блока',
    },
    {
      type: 'group',
      fields: [
        {
          name: 'mode',
          type: 'radio',
          label: false,
          defaultValue: 'all',
          options: [
            { label: 'Все новости', value: 'all' },
            { label: 'Выбранные новости', value: 'specific' },
          ],
        },
        {
          name: 'specificNews',
          type: 'relationship',
          relationTo: 'news',
          hasMany: true,
          label: 'Новости',
          required: true,
          admin: {
            condition: (_, { mode } = {}) => mode === 'specific',
          },
        },
      ],
    },
  ],
}
