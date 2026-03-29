import type { Block } from 'payload'

import { link } from '@/fields/link'
import { BLOCKS } from './blocks'

export const CollapsibleBlocksBlock: Block = {
  slug: 'collapsibleBlocks',
  interfaceName: 'CollapsibleBlocksBlock',
  labels: {
    singular: 'Складные блоки',
    plural: 'Складные блоки',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/collapsible-blocks.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      label: 'Заголовок блока',
    },
    link({
      offable: true,
      overrides: { name: 'blockLink', label: 'Ссылка блока' },
    }),
    {
      name: 'sections',
      type: 'array',
      label: false,
      labels: {
        singular: 'Складной блок',
        plural: 'Склыдные блоки',
      },
      required: true,
      fields: [
        {
          type: 'textarea',
          name: 'title',
          label: 'Заголовок',
          required: true,
        },
        {
          type: 'text',
          name: 'subtitle',
          label: 'Подзаголовок',
        },
        {
          type: 'radio',
          name: 'titleSize',
          label: 'Размер заголовка',
          required: true,
          defaultValue: 'normal',
          options: [
            { label: 'Нормальный', value: 'normal' },
            { label: 'Большой', value: 'large' },
          ],
        },
        {
          type: 'blocks',
          name: 'block',
          label: 'Блок',
          labels: {
            singular: 'Блок',
            plural: 'Блоки',
          },
          required: true,
          maxRows: 1,
          admin: {
            initCollapsed: false,
          },
          blocks: BLOCKS,
        },
      ],
    },
  ],
}
