import { contacts } from '@/fields/contacts'
import { link } from '@/fields/link'
import type { Block } from 'payload'

export const OrganizationsBlock: Block = {
  slug: 'organizations',
  interfaceName: 'OrganizationsBlock',
  labels: {
    singular: 'Организации',
    plural: 'Организации',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/organizations.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      label: 'Заголовок блока',
    },
    {
      name: 'organizations',
      type: 'array',
      label: 'Организации',
      labels: {
        singular: 'Организация',
        plural: 'Организации',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Название',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Описание',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Лого',
          required: true,
          admin: {
            description: 'Изображение вмещается в ширину карточки и смещается вниз',
          },
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
        link({ disableLabel: true }),
        contacts(),
      ],
    },
  ],
}
