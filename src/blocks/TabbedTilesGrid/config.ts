import type { Block } from 'payload'

export const TabbedTilesGridBlock: Block = {
  slug: 'tabbedTilesGrid',
  interfaceName: 'TabbedTilesGridBlock',
  labels: {
    singular: 'Вкладки сетки плиток',
    plural: 'Вкладки сетки плиток',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/tabbed-tiles-grid.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      label: 'Заголовок блока',
    },
    {
      name: 'tabs',
      type: 'array',
      label: 'Вкладки',
      labels: {
        singular: 'Вкладка',
        plural: 'Вкладки',
      },
      required: true,
      fields: [
        {
          type: 'text',
          name: 'tabName',
          label: 'Название вкладки',
          required: true,
        },
        {
          type: 'checkbox',
          name: 'withNumbering',
          label: 'Включить нумерацию',
        },
        {
          type: 'array',
          name: 'tiles',
          label: 'Плитки',
          labels: {
            singular: 'Плитка',
            plural: 'Плитки',
          },
          required: true,
          minRows: 3,
          maxRows: 5,
          fields: [
            {
              type: 'textarea',
              name: 'text',
              label: 'Текст',
              required: true,
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
                // description: 'Рекомендуется использовать изображение обрезанное по краям объекта',
              },
            },
          ],
        },
      ],
    },
  ],
}
