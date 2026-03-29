import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const InformationBlock: Block = {
  slug: 'information',
  interfaceName: 'InformationBlock',
  labels: {
    singular: 'Подробности',
    plural: 'Подробности',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/information.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'textarea',
      label: 'Заголовок блока',
    },
    {
      type: 'group',
      name: 'textTile',
      label: 'Текстовая плитка',
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
      ],
    },
    {
      type: 'group',
      name: 'numberTiles',
      label: 'Плитки с цифрами',
      fields: [
        {
          type: 'textarea',
          name: 'title',
          label: 'Заголовок',
        },
        {
          type: 'row',
          fields: [
            {
              type: 'number',
              name: 'tile1number',
              label: 'Большой номер 1 плитки',
            },
            {
              type: 'text',
              name: 'tile1text',
              label: 'Текст 1 плитки',
              required: true,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              type: 'number',
              name: 'tile2number',
              label: 'Большой номер 2 плитки',
            },
            {
              type: 'text',
              name: 'tile2text',
              label: 'Текст 2 плитки',
              required: true,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              type: 'number',
              name: 'tile3number',
              label: 'Большой номер 3 плитки',
            },
            {
              type: 'text',
              name: 'tile3text',
              label: 'Текст 3 плитки',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'iconTiles',
      label: 'Плитки со значками',
      fields: [
        {
          type: 'textarea',
          name: 'title',
          label: 'Заголовок',
        },
        {
          type: 'array',
          name: 'tiles',
          label: false,
          labels: {
            singular: 'Плитка',
            plural: 'Плитки',
          },
          minRows: 2,
          maxRows: 4,
          required: true,
          fields: [
            {
              type: 'textarea',
              name: 'text',
              label: 'Текст',
              required: true,
            },
            {
              type: 'upload',
              name: 'icon',
              relationTo: 'media',
              label: 'Значок',
              required: true,
              filterOptions: {
                mimeType: { contains: 'image' },
              },
              admin: {
                description:
                  'Рекомендуется использовать изображения одинаковой ширины и высоты, с пространством до краев.',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'banner',
      label: 'Баннер',
      fields: [
        {
          type: 'checkbox',
          name: 'withGradient',
          label: 'С градиентом',
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
        },
        {
          type: 'upload',
          name: 'image',
          relationTo: 'media',
          label: 'Изображение',
          filterOptions: {
            mimeType: { contains: 'image' },
          },
          admin: {
            description:
              'Изображение расположено справа и смещено к правому углу, с отступом (рекомендуется использовать изображение обрезанное по краям объекта).',
          },
        },
        link({ offable: true }),
      ],
    },
  ],
}
