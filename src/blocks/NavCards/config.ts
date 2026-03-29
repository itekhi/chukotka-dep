import type { Block } from 'payload'

import { link } from '@/fields/link'

export const NavCardsBlock: Block = {
  slug: 'navCards',
  interfaceName: 'NavCardsBlock',
  labels: {
    singular: 'Навигационные карточки',
    plural: 'Навигационные карточки',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/nav-cards.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      label: 'Заголовок блока',
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
        link({ disableLabel: true }),
        {
          name: 'title',
          type: 'text',
          label: 'Заголовок',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Подзаголовок',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Описание',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Изображение',
          admin: {
            description: 'Изображение вмещается в ширину карточки и смещается вниз',
          },
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
      ],
    },
  ],
}
