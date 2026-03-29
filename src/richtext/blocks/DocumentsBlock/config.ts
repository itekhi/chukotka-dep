import { Block } from 'payload'

export const DocumentsBlock: Block = {
  slug: 'documents',
  labels: {
    singular: 'Документы',
    plural: 'Документы',
  },
  fields: [
    {
      name: 'documents',
      type: 'relationship',
      relationTo: 'documents',
      label: false,
      hasMany: true,
      admin: {
        appearance: 'drawer',
      },
    },
    // {
    //   type: 'text',
    //   name: 'customTitle',
    //   label: 'Переопределенный заголовок',
    //   admin: {
    //     placeholder: 'Если пусто — берется заголовок документа',
    //   },
    // },
  ],
}
