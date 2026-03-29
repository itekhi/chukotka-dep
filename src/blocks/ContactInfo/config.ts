import { validateURL } from '@/fields/url'
import type { Block } from 'payload'

export const ContactInfoBlock: Block = {
  slug: 'contactInfo',
  interfaceName: 'ContactInfoBlock',
  labels: {
    singular: 'Контактная информация',
    plural: 'Контактная информация',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/contact-info.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      label: 'Заголовок блока',
      defaultValue: 'Контактная информация',
    },
    {
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'textarea',
          label: 'Заголовок',
          required: true,
        },
        {
          name: 'contacts',
          type: 'array',
          label: false,
          labels: {
            singular: 'Контакт',
            plural: 'Контакты',
          },
          required: true,
          fields: [
            {
              name: 'type',
              type: 'select',
              required: true,
              options: [
                { label: 'Телефон', value: 'phone' },
                { label: 'Эл. почта', value: 'email' },
                { label: 'Адрес', value: 'address' },
                { label: 'ВК', value: 'vk' },
                { label: 'Телеграм', value: 'telegram' },
                { label: 'QR-код', value: 'qr' },
              ],
            },
            {
              name: 'qr',
              type: 'upload',
              relationTo: 'media',
              label: 'QR-код',
              required: true,
              admin: {
                condition: (_, { type } = {}) => type === 'qr',
              },
            },
            {
              name: 'value',
              type: 'text',
              label: 'Значение',
              required: true,
              admin: {
                placeholder: '+79771234567 / example@yandex.ru / username',
                description: 'Для ВК и Телеграм введите только имя пользователя без @',
                condition: (_, { type } = {}) => type !== 'qr',
              },
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL',
              validate: validateURL,
              admin: {
                placeholder: '(определяется автоматически по типу) tel: или mailto: или https://',
              },
            },
          ],
        },
      ],
    },
  ],
}
