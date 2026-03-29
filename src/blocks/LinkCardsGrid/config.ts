import type { Block } from 'payload'

import { link } from '@/fields/link'

export const LinkCardsGridBlock: Block = {
  slug: 'linkCardsGrid',
  interfaceName: 'LinkCardsGridBlock',
  labels: {
    singular: 'Сетка карточек-ссылок',
    plural: 'Сетка карточек-ссылок',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/link-cards-grid.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      label: 'Заголовок блока',
    },
    {
      name: 'introCard',
      type: 'group',
      label: 'Карточка введения',
      fields: [
        {
          type: 'checkbox',
          name: 'enabled',
          defaultValue: true,
          label: 'Включена',
        },
        {
          type: 'text',
          name: 'title',
          label: 'Заголовок',
          admin: {
            condition: (_, { enabled } = {}) => !!enabled,
          },
        },
        {
          type: 'textarea',
          name: 'text',
          label: 'Текст',
          required: true,
          admin: {
            condition: (_, { enabled } = {}) => !!enabled,
          },
        },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Карточки',
      labels: {
        singular: 'Карточка',
        plural: 'Карточки',
      },
      required: true,
      fields: [
        {
          type: 'textarea',
          name: 'title',
          label: 'Заголовок',
          required: true,
        },
        {
          type: 'textarea',
          name: 'text',
          label: 'Текст',
        },
        {
          type: 'text',
          name: 'subtext',
          label: 'Подтекст',
        },
        link({ defaultLabel: 'Скачать' }),
      ],
    },
  ],
}
