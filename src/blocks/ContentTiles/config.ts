import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ContentTilesBlock: Block = {
  slug: 'contentTiles',
  interfaceName: 'ContentTilesBlock',
  labels: {
    singular: 'Контент-плитки',
    plural: 'Контент-плитки',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/content-tiles.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      label: 'Заголовок блока',
    },
    {
      name: 'tiles',
      type: 'array',
      label: false,
      labels: {
        singular: 'Карточка',
        plural: 'Карточки',
      },
      required: true,
      fields: [
        {
          name: 'richText',
          type: 'richText',
          label: 'Текст',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Изображение',
          filterOptions: {
            mimeType: { contains: 'image' },
          },
          admin: {
            description:
              'Изображение имеет ограничение по высоте, размещается по центру справа от текста, с отступом (рекомендуется использовать изображение обрезанное по краям объекта).',
          },
        },
        {
          type: 'checkbox',
          name: 'withGradient',
          label: 'С градиентом',
        },
      ],
    },
  ],
}
