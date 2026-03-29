import type { Field, GroupField, RowField } from 'payload'

import deepMerge from '@/utilities/deepMerge'
import { url } from './url'

export type LinkAppearances = 'default' | 'outline'

// export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
//   default: {
//     label: 'Default',
//     value: 'default',
//   },
//   outline: {
//     label: 'Outline',
//     value: 'outline',
//   },
// }

type LinkType = (options?: {
  // appearances?: LinkAppearances[] | false
  offable?: boolean
  disableLabel?: boolean
  defaultLabel?: string
  defaultNewTab?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({
  offable = false,
  disableLabel = false,
  defaultLabel,
  defaultNewTab = false,
  overrides = {},
} = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    label: 'Ссылка',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            label: false,
            admin: {
              layout: 'horizontal',
              width: '75%',
            },
            defaultValue: offable ? 'off' : 'reference',
            required: true,
            options: [
              offable && {
                label: 'Выкл',
                value: 'off',
              },
              {
                label: 'Внутренняя ссылка',
                value: 'reference',
              },
              {
                label: 'Документ',
                value: 'document',
              },
              {
                label: 'Внешний URL',
                value: 'custom',
              },
            ].filter((opt) => !!opt),
          },
          {
            name: 'newTab',
            type: 'checkbox',
            label: 'В новой вкладке',
            defaultValue: defaultNewTab,
            admin: {
              condition: (_, { type } = {}) => type !== 'off',
              // style: { alignSelf: 'flex-end' },
              width: '25%',
            },
          },
        ],
      },
    ],
  }

  const linkTypesRow: RowField = {
    type: 'row',
    fields: [
      {
        name: 'reference',
        type: 'relationship',
        label: 'Страница',
        relationTo: ['pages'],
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'reference',
          width: '35%',
        },
        required: true,
      },
      {
        name: 'document',
        type: 'relationship',
        label: 'Документ',
        relationTo: 'documents',
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'document',
          appearance: 'drawer',
          width: '50%',
          style: { maxWidth: '48%' },
        },
        required: true,
      },
      url({
        overrides: {
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'custom',
            width: '35%',
          },
          required: true,
        },
      }),
      {
        name: 'anchor',
        type: 'text',
        label: 'Якорь',
        admin: {
          condition: (_, siblingData) => !['off', 'document'].includes(siblingData?.type),
          placeholder: 'ID HTML-объекта',
          width: '15%',
        },
      },
      {
        name: 'label',
        type: 'text',
        label: 'Текст',
        defaultValue: defaultLabel,
        admin: {
          condition: (_, siblingData) => siblingData?.type !== 'off',
          width: '50%',
        },
        required: true,
      },
    ],
  }

  if (disableLabel) {
    // remove the label field
    linkTypesRow.fields.pop()
    // change the widths of fields to be proper...
    linkTypesRow.fields.map((f) =>
      // @ts-expect-error doesn't see `name` in fields
      f.name === 'anchor' ? (f.admin.width = '30%') : delete f.admin?.width,
    )
  }

  linkResult.fields.push(linkTypesRow)

  // if (appearances !== false) {
  //   let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]

  //   if (appearances) {
  //     appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
  //   }

  //   linkResult.fields.push({
  //     name: 'appearance',
  //     type: 'select',
  //     admin: {
  //       description: 'Choose how the link should be rendered.',
  //     },
  //     defaultValue: 'default',
  //     options: appearanceOptionsToUse,
  //   })
  // }

  return deepMerge(linkResult, overrides)
}
