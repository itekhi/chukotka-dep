import { link } from '@/fields/link'
import type { Block, Field } from 'payload'

const tileFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Заголовок',
    // required: true,
  },
  {
    name: 'text',
    type: 'textarea',
    label: 'Текст',
    required: true,
    admin: {
      description: 'Перенос текста работает только для декстоп.',
    },
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    label: 'Изображение',
    filterOptions: {
      mimeType: { contains: 'image' },
    },
    admin: {
      description:
        'Для плитки №1 имеет статичную высоту и расположено по центру под текстом, для плиток №2 и №3 имеет статичную высоту и расположено по центру у правого края. Рекомендуется использовать изображение обрезанное по краям объекта.',
    },
  },
  link({ offable: true }),
]

export const InfoTilesBlock: Block = {
  slug: 'infoTiles',
  interfaceName: 'InfoTilesBlock',
  labels: {
    singular: 'Инфо плитки',
    plural: 'Инфо плитки',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/info-tiles.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      label: 'Заголовок блока',
    },
    {
      name: 'tile1',
      type: 'group',
      label: 'Плитка №1',
      fields: tileFields,
    },
    {
      name: 'tile2',
      type: 'group',
      label: 'Плитка №2',
      fields: tileFields,
    },
    {
      name: 'tile3',
      type: 'group',
      label: 'Плитка №3',
      fields: tileFields,
    },
  ],
}
