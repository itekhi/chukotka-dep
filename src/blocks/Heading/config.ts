import type { Block } from 'payload'

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
      name: 'title',
      type: 'text',
      label: 'Заголовок',
    },
    {
      type: 'checkbox',
      name: 'hidden',
      label: 'Визуально скрыт',
    },
  ],
}
