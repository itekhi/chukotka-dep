import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { listPanelFields } from '../ListPanel'
import { link } from '@/fields/link'

export const ListPanelWithBannerBlock: Block = {
  slug: 'listPanelWithBanner',
  interfaceName: 'ListPanelWithBannerBlock',
  labels: {
    singular: 'Списковая панель с баннером',
    plural: 'Списковая панель с баннером',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/list-panel-with-banner.jpg',
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
      name: 'banner',
      type: 'group',
      label: 'Баннер',
      fields: [
        {
          type: 'checkbox',
          name: 'withGradient',
          label: 'C градиентом',
        },
        {
          name: 'text',
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
          admin: {
            description:
              'Рекомендуется использовать изображение обрезанное по краям объекта, с соотношением сторон (Ш:В): 1:1 или 1.2:1',
          },
        },
        {
          type: 'radio',
          name: 'imagePlacement',
          label: 'Размещение изображения',
          required: true,
          defaultValue: 'onRight',
          options: [
            { label: 'Справа снизу', value: 'onRight' },
            { label: 'По центру под текстом', value: 'centeredBelowText' },
          ],
        },
        link({ offable: true }),
      ],
    },
  ],
}
