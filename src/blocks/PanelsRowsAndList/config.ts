import type { Block } from 'payload'

import { listPanelRowsField } from '../ListPanel'

export const PanelsRowsAndListBlock: Block = {
  slug: 'panelsRowsAndList',
  interfaceName: 'PanelsRowsAndListBlock',
  labels: {
    singular: 'Панели, строки и список',
    plural: 'Списковая панель с баннером',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/panels-rows-and-list.jpg',
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
      label: 'Панели',
      fields: [
        {
          name: 'panelsTitle',
          type: 'text',
          label: 'Заголовок панелей',
        },
        {
          name: 'panels',
          type: 'array',
          label: false,
          required: true,
          labels: {
            singular: 'Панель',
            plural: 'Панели',
          },
          minRows: 2,
          maxRows: 5,
          fields: [
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
              label: 'Изображение',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      label: 'Строки',
      fields: [
        {
          name: 'rowsTitle',
          type: 'text',
          label: 'Заголовок строк',
        },
        {
          name: 'rows',
          type: 'array',
          label: false,
          required: true,
          labels: {
            singular: 'Строка',
            plural: 'Строки',
          },
          minRows: 2,
          fields: [
            {
              name: 'bigNumber',
              type: 'number',
              label: 'Большое число',
            },
            {
              name: 'text',
              type: 'textarea',
              label: 'Текст',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      label: 'Список',
      fields: [
        {
          name: 'listTitle',
          type: 'text',
          label: 'Заголовок списка',
        },
        {
          ...listPanelRowsField,
          name: 'list',
          label: false,
          required: true,
          minRows: 2,
          labels: {
            singular: 'Элемент',
            plural: 'Элементы',
          },
        },
        {
          type: 'checkbox',
          name: 'enableSpecialRow',
          label: 'Включить специальную строку',
        },
        {
          type: 'group',
          name: 'specialRow',
          label: 'Специальная строка',
          admin: {
            hideGutter: true,
            condition: (_, { enableSpecialRow } = {}) => !!enableSpecialRow,
          },
          fields: [
            {
              type: 'upload',
              name: 'icon',
              relationTo: 'media',
              label: 'Изображение',
            },
            {
              type: 'textarea',
              name: 'text',
              label: 'Текст',
              required: true,
            },
            {
              type: 'checkbox',
              name: 'withGradient',
              label: 'С градиентом',
            },
          ],
        },
      ],
    },
  ],
}
