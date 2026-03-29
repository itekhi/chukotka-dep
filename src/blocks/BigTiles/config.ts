import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const BigTilesBlock: Block = {
  slug: 'bigTiles',
  interfaceName: 'BigTilesBlock',
  labels: {
    singular: 'Большие плитки',
    plural: 'Большие плитки',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/big-tiles.jpg',
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
      label: 'Плитки',
      labels: {
        singular: 'Плитка',
        plural: 'Плитки',
      },
      fields: [
        {
          type: 'radio',
          name: 'background',
          label: 'Фон',
          required: true,
          defaultValue: 'gray',
          options: [
            { label: 'Светло-серый', value: 'gray' },
            { label: 'Светло-фиолетовый', value: 'tint' },
            { label: 'Градиент', value: 'gradient' },
          ],
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
                // HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          admin: {
            description:
              'Перенос строк работает только для десктоп. Чтобы перенести текст на новую строку, зажмите Shift и нажмите Enter.',
          },
        },
        {
          type: 'radio',
          name: 'textColor',
          label: 'Цвет текста',
          required: true,
          defaultValue: 'black',
          options: [
            { label: 'Черный', value: 'black' },
            { label: 'Темно-синий', value: 'darkblue' },
          ],
        },
        {
          type: 'upload',
          name: 'image',
          relationTo: 'media',
          label: 'Изображение',
        },
      ],
    },
  ],
}
