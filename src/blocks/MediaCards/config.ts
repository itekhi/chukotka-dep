import type { Block } from 'payload'

import { link } from '@/fields/link'

export const MediaCardsBlock: Block = {
  slug: 'mediaCards',
  interfaceName: 'MediaCardsBlock',
  labels: {
    singular: 'Медиа карточки',
    plural: 'Медиа карточки',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/media-cards.jpg',
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
      label: false,
      labels: {
        singular: 'Карточка',
        plural: 'Карточки',
      },
      required: true,
      fields: [
        {
          name: 'title',
          type: 'textarea',
          label: 'Заголовок',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Изображение',
          relationTo: 'media',
          required: true,
          admin: {
            description:
              'Изображение имеет статичную высоту и расположено посередине под текстом, с отступом от сторон и текста. Рекомендуется использовать изображение обрезанное по краям объекта.',
          },
        },
        link({
          offable: true,
          disableLabel: true,
        }),
      ],
    },
  ],
}
