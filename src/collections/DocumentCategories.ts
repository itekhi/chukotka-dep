import type { CollectionConfig } from 'payload'

export const DocumentCategories: CollectionConfig = {
  slug: 'documentCategories',
  labels: { singular: 'Категория документов', plural: 'Категории документов' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title'],
    // group: 'Настройки', // или 'Документы'
  },
  defaultPopulate: {
    title: true,
    createdAt: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название',
      required: true,
    },
    {
      name: 'hideOnDocumentsPage',
      type: 'checkbox',
      defaultValue: false,
      label: 'Скрывать категорию и документы на странице «Документы»',
    },
    // {
    //   name: 'slug',
    //   type: 'text',
    //   admin: { position: 'sidebar' },
    //   hooks: {
    //     beforeChange: [({ value, siblingData }) =>
    //       value || siblingData.title?.toLowerCase().replace(/\s+/g, '-')
    //     ],
    //   },
    // },
  ],
}
