import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const blockFields: Field[] = [
  {
    name: 'richText',
    type: 'richText',
    required: true,
    label: 'Текст',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          // HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
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
    required: true,
  },
]

export const TwoPanelsWithTilesBlock: Block = {
  slug: 'twoPanelsWithTiles',
  interfaceName: 'TwoPanelsWithTilesBlock',
  labels: {
    singular: '2 панели с плитками',
    plural: '2 панели с плитками',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/2-panels-with-tiles.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      label: 'Заголовок блока',
    },
    {
      name: 'collapsible',
      type: 'checkbox',
      label: 'Складной',
    },
    {
      type: 'group',
      name: 'panel1',
      label: 'Панель 1',
      fields: blockFields,
    },
    {
      type: 'group',
      name: 'panel2',
      label: 'Панель 2',
      fields: blockFields,
    },
    {
      type: 'group',
      label: 'Плитки',
      fields: [
        {
          name: 'tilesTitle',
          type: 'text',
          label: 'Заголовок плиток',
        },
        {
          name: 'tiles',
          type: 'array',
          label: 'Плитки',
          labels: {
            singular: 'Плитка',
            plural: 'Плитки',
          },
          fields: [
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              label: 'Значок',
              required: true,
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
            {
              type: 'text',
              name: 'text',
              label: 'Текст',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
