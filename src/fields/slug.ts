import type { FieldHook } from 'payload'
// @ts-expect-error lib does not use ts
import translitRusEng from 'translit-rus-eng'

import type { CheckboxField, TextField } from 'payload'

type Overrides = {
  slugOverrides?: Partial<TextField>
  checkboxOverrides?: Partial<CheckboxField>
}

type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, CheckboxField]

/* utilities */

export const slugify = (val: string) =>
  translitRusEng(val, { slugify: true })
    ?.replace(/[_ ]/g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string') {
      return slugify(value)
    }

    if (operation === 'create' || data?.slug === undefined) {
      const fallbackData = data?.[fallback]

      if (typeof fallbackData === 'string') {
        return slugify(fallbackData)
      }
    }

    return value
  }

/* slug field */

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
  const { slugOverrides, checkboxOverrides } = overrides

  const checkBoxField: CheckboxField = {
    name: 'slugLock',
    type: 'checkbox',
    defaultValue: true,
    admin: {
      hidden: true,
      position: 'sidebar',
    },
    ...checkboxOverrides,
  }

  // @ts-expect-error - ts mismatch Partial<TextField> with TextField
  const slugField: TextField = {
    name: 'slug',
    type: 'text',
    index: true,
    required: true,
    label: { ru: 'Слаг', en: 'Slug' },
    ...(slugOverrides || {}),
    hooks: {
      // Kept this in for hook or API based updates
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
    admin: {
      position: 'sidebar',
      // description: {
      //   en: 'Slug is generated automatically upon saving',
      //   ru: 'Слаг генерируется автоматически при сохранении',
      // },
      ...(slugOverrides?.admin || {}),
      components: {
        Field: {
          path: '@/fields/slug/SlugComponent#SlugComponent',
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name,
          },
        },
      },
    },
  }

  return [slugField, checkBoxField]
}
