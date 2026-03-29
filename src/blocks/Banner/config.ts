import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const BannerBlock: Block = {
  slug: 'banner',
  interfaceName: 'BannerBlock',
  labels: {
    singular: 'Баннер',
    plural: 'Баннеры',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/banner.jpg',
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
    },
    {
      name: 'titleAsH2',
      type: 'checkbox',
      label: 'Заголовок - H2?',
    },
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
      admin: {
        description: 'Текст имеет ограничение по ширине.',
      },
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
        description: 'Изображение вмещается в высоту баннера, и смещается к правому углу.',
      },
    },
  ],
}
