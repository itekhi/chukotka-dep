import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { revalidateDelete, revalidateDocumentsPage } from './hooks/revalidateDocumentsPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: {
    singular: 'Документ',
    plural: 'Документы',
  },
  admin: {
    defaultColumns: ['title', 'category', 'hideFromDocumentsPage', 'publishedAt'],
    useAsTitle: 'title',
    // group: 'Контент', // если много коллекций
  },
  defaultSort: '-createdAt',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    category: true,
    publishedAt: true,
    url: true,
    filename: true,
  },
  upload: {
    staticDir: path.resolve(dirname, '../../../public/media/documents'),
    // mimeTypes: [
    //   'application/pdf',
    //   'application/msword',
    //   'application/rtf',
    //   'text/rtf',
    //   'application/x-cfb',
    //   'application/vnd.ms-excel',
    //   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //   // + другие нужные
    // ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'documentCategories',
      label: 'Категория',
      required: true,
      admin: {
        // description: 'Используется для группировки документов в блоке «Все документы», или для показа всех документов в категории в блоке «Документы», или просто для обозначения.',
        allowCreate: true,
        appearance: 'drawer',
        sortOptions: 'title',
      },
    },
    {
      name: 'hideOnDocumentsPage',
      type: 'checkbox',
      defaultValue: false,
      label: 'Не показывать в блоке «Все документы»',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Дата размещения',
      admin: {
        placeholder: 'ММ/ДД/ГГГГ',
        description: 'По-умолчанию ставится сегодняшняя дата',
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [({ value }) => (!value ? new Date() : value)],
      },
    },
  ],
  hooks: {
    afterChange: [revalidateDocumentsPage],
    afterDelete: [revalidateDelete],
    // beforeChange: [автогенерация номера, копирование названия из файла и т.д.]
  },
}
