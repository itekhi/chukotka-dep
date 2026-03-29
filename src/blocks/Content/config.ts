import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const ContentBlock: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  labels: {
    singular: 'Контент',
    plural: 'Контент',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/content.jpg',
    },
  },
  fields: [
    {
      name: 'richText',
      type: 'richText',
      label: false,
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    link({
      offable: true,
    }),
  ],
}
