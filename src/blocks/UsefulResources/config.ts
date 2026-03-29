import type { Block } from 'payload'

import { link } from '@/fields/link'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const UsefulResourcesBlock: Block = {
  slug: 'usefulResources',
  interfaceName: 'UsefulResourcesBlock',
  labels: {
    singular: 'Полезные ресурсы',
    plural: 'Полезные ресурсы',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/useful-resources.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      label: 'Заголовок блока',
    },
    {
      name: 'banner',
      type: 'group',
      label: 'Баннер',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Фоновое изображение',
          required: true,
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
        {
          name: 'title',
          type: 'textarea',
          label: 'Заголовок',
          required: true,
          admin: {
            rows: 2,
          },
        },
        {
          name: 'richText',
          type: 'richText',
          label: 'Текст',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
          admin: {
            description:
              'Перенос строки работает только для десктоп. Чтобы перенести текст на новую строку зажмите Shift и нажмите Enter.',
          },
        },
        link(),
      ],
    },
    {
      name: 'resources',
      type: 'array',
      label: 'Ресурсы',
      labels: {
        singular: 'Ресурс',
        plural: 'Ресурсы',
      },
      required: true,
      fields: [
        {
          name: 'text',
          type: 'textarea',
          label: 'Текст',
          required: true,
        },
        link({
          disableLabel: true,
          overrides: { label: false },
        }),
      ],
    },
  ],
}
