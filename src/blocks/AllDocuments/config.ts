import type { Block } from 'payload'

export const AllDocumentsBlock: Block = {
  slug: 'allDocuments',
  interfaceName: 'AllDocumentsBlock',
  labels: {
    singular: 'Все документы',
    plural: 'Все документы',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/all-documents.jpg',
    },
  },
  fields: [
    {
      name: 'help',
      type: 'ui',
      admin: {
        components: {
          Field: '/blocks/AllDocuments/admin/Help.tsx',
          // Cell: '/path/to/MyCustomUICell',
        },
      },
    },
  ],
}
