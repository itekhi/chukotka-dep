import type { Block } from 'payload'

// import {
//   FixedToolbarFeature,
//   HeadingFeature,
//   InlineToolbarFeature,
//   lexicalEditor,
// } from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const InfoTileWithSliderBlock: Block = {
  slug: 'infoTileWithSlider',
  interfaceName: 'InfoTileWithSliderBlock',
  labels: {
    singular: 'Инфо-плитка и слайдер',
    plural: 'Инфо-плитка и слайдером',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/info-tile-with-slider.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      label: 'Заголовок блока',
    },
    {
      name: 'infoTile',
      type: 'group',
      label: 'Инфо плитка',
      fields: [
        // {
        //   name: 'richText',
        //   type: 'richText',
        //   label: 'Текст',
        //   required: true,
        //   editor: lexicalEditor({
        //     features: ({ rootFeatures }) => {
        //       return [
        //         ...rootFeatures,
        //         HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
        //         FixedToolbarFeature(),
        //         InlineToolbarFeature(),
        //       ]
        //     },
        //   }),
        // },
        {
          type: 'textarea',
          name: 'title',
          label: 'Заголовок',
          required: true,
        },
        {
          type: 'textarea',
          name: 'text',
          label: 'Текст',
        },
        link({ offable: true }),
      ],
    },
    {
      name: 'slides',
      type: 'array',
      label: 'Слайдер',
      labels: {
        singular: 'Слайд',
        plural: 'Слайды',
      },
      required: true,
      fields: [
        {
          type: 'text',
          name: 'title',
          label: 'Заголовок',
        },
        {
          type: 'textarea',
          name: 'text',
          label: 'Текст',
          required: true,
        },
        link({ offable: true }),
      ],
    },
  ],
}
