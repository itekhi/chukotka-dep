import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { listPanelFields } from '../ListPanel'
import { link } from '@/fields/link'

const tileFields: Field[] = [
  {
    type: 'text',
    name: 'title',
    label: 'Заголовок',
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
  link({ offable: true }),
  {
    type: 'upload',
    name: 'image',
    relationTo: 'media',
    label: 'Изображение',
    admin: {
      description: 'Рекомендуется использовать изображение обрезанное по краям объекта.',
    },
  },
]

export const ListPanelWith2TilesBlock: Block = {
  slug: 'listPanelWith2Tiles',
  interfaceName: 'ListPanelWith2TilesBlock',
  labels: {
    singular: 'Списковая панель с 2 плитками',
    plural: 'Списковая панель с 2 плитками',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/list-panel-with-2-tiles.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      label: 'Заголовок блока',
    },
    {
      type: 'checkbox',
      name: 'swapped',
      label: 'Инвертировать расположение панелей',
    },
    {
      name: 'listPanel',
      type: 'group',
      label: 'Списковая панель',
      fields: listPanelFields,
    },
    {
      name: 'tile1',
      type: 'group',
      label: 'Плитка №1',
      fields: tileFields,
    },
    {
      name: 'tile2',
      type: 'group',
      label: 'Плитка №2',
      fields: tileFields,
    },
  ],
}
