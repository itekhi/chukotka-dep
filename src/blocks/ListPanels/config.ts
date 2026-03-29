import type { Block } from 'payload'

import { listPanelFields } from '../ListPanel'

export const ListPanelsBlock: Block = {
  slug: 'listPanels',
  interfaceName: 'ListPanelsBlock',
  labels: {
    singular: '2 списковые панели',
    plural: '2 списковые панели',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/list-panels.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      label: 'Заголовок блока',
    },
    {
      name: 'firstPanel',
      type: 'group',
      label: 'Первая панель',
      fields: listPanelFields,
    },
    {
      name: 'secondPanel',
      type: 'group',
      label: 'Вторая панель',
      fields: listPanelFields,
    },
  ],
}
