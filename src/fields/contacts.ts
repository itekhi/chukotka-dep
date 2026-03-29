import deepMerge from '@/utilities/deepMerge'
import { ArrayField } from 'payload'
import type { Contacts } from '@/payload-types'
import parsePhoneNumberFromString from 'libphonenumber-js'

/* socials */

// export const socialOptions = [
//   { label: { en: 'Telegram', ru: 'Телеграм' }, value: 'telegram' },
//   { label: { en: 'VK', ru: 'Вконтакте' }, value: 'vkontakte' },
// ]

// export type SocialContactType = (typeof socialOptions)[number]['value']

// export const socialTypes: SocialContactType[] = socialOptions.map(({ value }) => value)

/* contacts */

export const allOptions = [
  { label: { en: 'Phone', ru: 'Телефон' }, value: 'phone' },
  { label: { en: 'Email', ru: 'Эл. почта' }, value: 'email' },
  // ...socialOptions,
]

export type ContactValue = (typeof allOptions)[number]['value']

export const allTypes: ContactValue[] = allOptions.map(({ value }) => value)

type ContactsFieldType = (options?: {
  required?: boolean
  disableLabel?: boolean
  excludeTypes?: ContactValue[]
  overrides?: Partial<ArrayField>
}) => ArrayField

type ContactType = NonNullable<Contacts>[0]

/* helpers */

export const getContactHref = (contact: ContactType) => {
  const { type, value, url } = contact
  if (url) {
    return url
  } else if (type === 'email') {
    return `mailto:${value}`
  } else if (type === 'phone') {
    const phone = parsePhoneNumberFromString(value)
    return `tel:${phone?.format('E.164') || value}`
  }
}

export const getContactIcon = (contact: ContactType) => {
  switch (contact.type) {
    case 'email':
      return '/assets/email-icon.svg'
    case 'phone':
      return '/assets/phone-icon.svg'
  }
}

/* contacts field */

export const contacts: ContactsFieldType = ({
  required = false,
  disableLabel = false,
  excludeTypes = [],
  overrides = {},
} = {}) => {
  const typeOptions = allOptions.filter(({ value }) => !excludeTypes.includes(value))

  const contacts: ArrayField = {
    type: 'array',
    name: 'contacts',
    label: !disableLabel && { en: 'Contacts', ru: 'Контакты' },
    required: required,
    minRows: required ? 1 : undefined,
    labels: {
      plural: { en: 'Contacts', ru: 'Контакты' },
      singular: { en: 'Contact', ru: 'Контакт' },
    },
    interfaceName: 'Contacts',
    fields: [
      {
        type: 'row',
        admin: {
          className: '[&>div]:flex-nowrap',
        },
        fields: [
          {
            type: 'select',
            name: 'type',
            label: 'Тип',
            options: typeOptions,
            required: true,
            admin: {
              width: '50%',
            },
          },
          {
            type: 'text',
            name: 'url',
            label: { en: 'URL', ru: 'URL' },
            admin: {
              width: '50%',
              placeholder: '(определяется автоматически по типу) https:// или tel: или т.п.',
            },
          },
        ],
      },
      {
        type: 'textarea',
        name: 'value',
        label: 'Значение',
        required: true,
        admin: {
          rows: 1,
        },
      },
    ],
  }

  return deepMerge(contacts, overrides)
}
