import { link } from '@/fields/link'
import type { Block } from 'payload'

export const InfoCardsBlock: Block = {
  slug: 'infoCards',
  interfaceName: 'InfoCardsBlock',
  labels: {
    singular: 'Инфо карточки',
    plural: 'Инфо карточки',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/info-cards.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'textarea',
      label: 'Заголовок блока',
    },
    {
      type: 'array',
      name: 'cards',
      label: false,
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
        link({
          defaultLabel: 'Подробнее',
        }),
      ],
    },
  ],
}
