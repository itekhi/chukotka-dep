import type { Block } from 'payload'

import { contacts } from '@/fields/contacts'

export const TeamCardsBlock: Block = {
  slug: 'teamCards',
  interfaceName: 'TeamCardsBlock',
  labels: {
    singular: 'Карточки команды',
    plural: 'Карточки команды',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/team-cards.jpg',
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
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          label: 'Фото',
          required: true,
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
        {
          name: 'fullName',
          type: 'text',
          label: 'ФИО',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Описание',
          required: true,
        },
        contacts(),
      ],
    },
  ],
}
