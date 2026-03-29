import { link } from '@/fields/link'
import type { Block } from 'payload'

export const DocumentsBlock: Block = {
  slug: 'documents',
  interfaceName: 'DocumentsBlock',
  labels: {
    singular: 'Документы',
    plural: 'Документы',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/documents.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      label: 'Заголовок блока',
    },
    {
      type: 'group',
      fields: [
        {
          name: 'mode',
          type: 'radio',
          required: true,
          label: false,
          defaultValue: 'specific',
          options: [
            { label: 'Выбранные документы', value: 'specific' },
            { label: 'Категория документов', value: 'category' },
          ],
        },
        {
          name: 'specificDocuments',
          type: 'relationship',
          relationTo: 'documents',
          label: 'Документы',
          hasMany: true,
          required: true,
          admin: {
            condition: (_, { mode } = {}) => mode === 'specific',
          },
        },
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'documentCategories',
          label: 'Категория',
          required: true,
          admin: {
            condition: (_, { mode } = {}) => mode === 'category',
          },
        },
      ],
    },
    link({
      offable: true,
      overrides: { name: 'blockLink', label: 'Кнопка блока' },
    }),
  ],
}
