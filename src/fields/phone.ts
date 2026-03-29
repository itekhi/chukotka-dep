import type { Field, TextField } from 'payload'

import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js'
import type { PhoneNumber, NumberFormat } from 'libphonenumber-js'

import deepMerge from '@/utilities/deepMerge'

type PhoneType = (options?: { disableLabel?: boolean; overrides?: Partial<TextField> }) => Field

export const phone: PhoneType = ({ disableLabel = false, overrides = {} } = {}) => {
  const linkResult: TextField = {
    name: 'phone',
    type: 'text',
    label: !disableLabel && 'Телефон',
    admin: {
      placeholder: '+79771234567',
      // description: 'Вводите в международном формате, например +79771234567',
    },
    validate: (value) => {
      if (!value) return true

      if (isValidPhoneNumber(value, 'RU')) {
        return true
      } else {
        return 'Неверный формат номера телефона'
      }
    },
  }

  return deepMerge(linkResult, overrides)
}

export const formatPhone = (phone: string | null | undefined, format: NumberFormat) => {
  if (!phone) return undefined
  const phoneNumber: PhoneNumber | undefined = parsePhoneNumberFromString(phone)
  return phoneNumber ? phoneNumber.format(format) : null
}

export const formatAll = (
  phone: string | null | undefined,
): { international: string; e164: string } | null | undefined => {
  if (!phone) return undefined
  const phoneNumber: PhoneNumber | undefined = parsePhoneNumberFromString(phone)
  if (!phoneNumber) return null
  return {
    international: phoneNumber.formatInternational(),
    e164: phoneNumber.format('E.164'),
  }
}
