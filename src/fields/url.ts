import type { Field, TextField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

type URLType = (options?: { disableLabel?: boolean; overrides?: Partial<TextField> }) => Field

export const validateURL = (value: string | null | undefined) => {
  if (!value) return true

  try {
    new URL(value)
    return true
  } catch {
    return 'Введите корректную ссылку (например: https://example.com)'
  }
}

export const url: URLType = ({ disableLabel = false, overrides = {} } = {}) => {
  const linkResult: TextField = {
    name: 'url',
    type: 'text',
    label: !disableLabel && 'URL',
    admin: {
      placeholder: 'Например: https://ya.ru',
    },
    validate: validateURL,
  }

  return deepMerge(linkResult, overrides)
}
