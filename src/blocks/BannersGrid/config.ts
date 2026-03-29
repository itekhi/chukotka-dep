import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

export const BannersGridBlock: Block = {
  slug: 'bannersGrid',
  interfaceName: 'BannersGridBlock',
  labels: {
    singular: 'Сетка баннеров',
    plural: 'Сетка баннеров',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/banners-grid.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      label: 'Заголовок блока',
    },
    {
      name: 'banners',
      type: 'array',
      label: 'Баннеры',
      labels: {
        singular: 'Баннер',
        plural: 'Баннеры',
      },
      required: true,
      fields: [
        {
          type: 'text',
          name: 'title',
          label: 'Заголовок',
        },
        {
          name: 'richText',
          type: 'richText',
          required: true,
          label: 'Текст',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                // HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          admin: {
            description:
              'Текст имеет ограничение по ширине когда есть "Изображение объекта", поэтому не рекомендуется переносить текст на новые строки. Перенос текста работает только для декстоп.',
          },
        },
        link({
          offable: true,
          defaultLabel: 'Подробнее',
        }),
        {
          name: 'bgImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Фоновое изображение',
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
        {
          name: 'objectImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Изображение объекта',
          filterOptions: {
            mimeType: { contains: 'image' },
          },
          admin: {
            description:
              'Изображение расположено в правом нижнем углу, без отступа (рекомендуется обрезать изображение по краям объекта). Изображение имеет ограничение по ширине.',
          },
        },
      ],
    },
  ],
}
