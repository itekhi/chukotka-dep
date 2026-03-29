import type { Block } from 'payload'

export const TilesGridBlock: Block = {
  slug: 'tilesGrid',
  interfaceName: 'TilesGridBlock',
  labels: {
    singular: 'Сетка плиток',
    plural: 'Сетка плиток',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/tiles-grid.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      label: 'Заголовок блока',
    },
    {
      name: 'withNumbering',
      type: 'checkbox',
      label: 'Включить нумерацию',
    },
    {
      name: 'tiles',
      type: 'array',
      label: 'Плитки',
      labels: {
        singular: 'Плитка',
        plural: 'Плитки',
      },
      required: true,
      fields: [
        {
          name: 'size',
          type: 'select',
          label: 'Ширина',
          required: true,
          options: [
            { label: '1/1 — полный', value: 'full' },
            { label: '1/2 — половина', value: 'half' },
            { label: '1/3 — треть', value: 'third' },
            // { label: '1/4 — четверть', value: 'quarter' },
          ],
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Текст',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Изображение объекта',
          filterOptions: {
            mimeType: { contains: 'image' },
          },
          admin: {
            description:
              'Изображение расположено справа от текста, с отступом (рекомендуется обрезать изображение по краям объекта). Изображение имеет ограничение по ширине.',
          },
        },
        {
          name: 'imageAlignY',
          type: 'select',
          label: 'Вертикальное выравнивание изображения',
          required: true,
          defaultValue: 'center',
          options: [
            { label: 'По верху', value: 'top' },
            { label: 'По центру', value: 'center' },
            { label: 'По низу', value: 'bottom' },
          ],
        },
      ],
    },
  ],
}
