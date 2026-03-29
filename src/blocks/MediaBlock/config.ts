import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'media',
  interfaceName: 'MediaBlock',
  labels: {
    singular: 'Медиа',
    plural: 'Медиа',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/media.jpg',
    },
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Медиа',
      required: true,
    },
  ],
}
