import type { Block } from 'payload'

import { link } from '@/fields/link'

export const HeadingBlock: Block = {
  slug: 'heading',
  interfaceName: 'HeadingBlock',
  labels: {
    singular: 'Заголовок (H1)',
    plural: 'Заголовок (H1)',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/h1.jpg',
    },
  },
  fields: [
    {
      name: 'type',
      type: 'radio',
      required: true,
      options: [
        { label: 'H1', value: 'h1' },
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
        { label: 'Paragraph', value: 'p' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
    },
    {
      name: 'subline',
      type: 'checkbox',
      label: 'Подстрока заголовка',
    },
    {
      type: 'checkbox',
      name: 'hidden',
      label: 'Визуально скрыт',
    },
    {
      type: 'radio',
      name: 'horizontalAlignment',
      label: 'Горизонтальное выравнивание',
      defaultValue: 'flex-start',
      options: [
        { label: 'Слева', value: 'flex-start' },
        { label: 'По центру', value: 'center' },
        { label: 'Справа', value: 'flex-end' },
      ],
    },
    link({ offable: true, disableLabel: true }),
  ],
}
