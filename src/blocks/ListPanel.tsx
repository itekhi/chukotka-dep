import { ArrayField, Field } from 'payload'
import { Media } from '@/payload-types'

import { ImageMedia, isMedia } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const listPanelRowsField: ArrayField = {
  name: 'rows',
  type: 'array',
  label: false,
  labels: {
    singular: 'Строка',
    plural: 'Строки',
  },
  minRows: 1,
  fields: [
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Значок',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Текст',
      required: true,
      admin: {
        description: 'Перенос текста работает только для десктоп.',
      },
    },
  ],
}

export const listPanelFields: Field[] = [
  {
    type: 'textarea',
    name: 'title',
    label: 'Заголовок',
  },
  {
    type: 'text',
    name: 'subtitle',
    label: 'Подзаголовок',
  },
  {
    type: 'checkbox',
    name: 'withNumbering',
    label: 'Включить нумерацию',
  },
  listPanelRowsField,
]

type ListPanelType = {
  title?: string | null
  subtitle?: string | null
  withNumbering?: boolean | null
  rows?:
    | {
        icon?: (string | null) | Media
        title?: string | null
        /**
         * Перенос текста работает только для десктоп.
         */
        text: string
        id?: string | null
      }[]
    | null
}

type ListPanelRowType = NonNullable<ListPanelType['rows']>[0]

type ListPanelProps = { panel: ListPanelType; extraRow?: React.ReactNode; className?: string }

export const ListPanel = ({ panel, extraRow, className }: ListPanelProps) => {
  const { title, subtitle, rows, withNumbering } = panel || {}

  return (
    <div className={cn('flex flex-col p-5 bg-gray-light rounded-4xl', className)}>
      {(title || subtitle) && (
        <div className="mb-3.5">
          {title && <p className="h-xl sm:text-lb">{title}</p>}
          {subtitle && <p className="p-base mt-2">{subtitle}</p>}
        </div>
      )}

      <div className="grow flex flex-col gap-2">
        {rows?.map((row, index) => (
          <ListPanelRow key={row.id} index={index} row={row} numbering={withNumbering ?? false} />
        ))}

        {extraRow}
      </div>
    </div>
  )
}

type ListPanelRowProps = { index: number; row: ListPanelRowType; numbering: boolean }

export const ListPanelRow = ({ index, row, numbering }: ListPanelRowProps) => {
  return (
    <div key={row.id} className="grow flex items-center pl-3.5 sm:pl-4 p-3.5 bg-white rounded-2xl">
      {/* inner container for the whole row to be centered */}
      <div className="flex items-start gap-3">
        <PanelIcon index={index} withNumbering={numbering} icon={row.icon} />

        <div>
          {row.title && <p className="p-sm md:p-base font-medium mb-1">{row.title}</p>}
          <p className="p-sm md:p-base xl:text-lb mt-px">{row.text}</p>
        </div>
      </div>
    </div>
  )
}

type TileIconProps = { index: number; withNumbering: boolean; icon: ListPanelRowType['icon'] }

const PanelIcon = ({ index, withNumbering, icon }: TileIconProps) => {
  if (isMedia(icon)) {
    return <ImageMedia resource={icon} className="size-5 md:size-5.5" />
  }
  if (withNumbering) {
    return (
      <p className="text-xl md:text-[22px] font-medium leading-none text-primary">
        {String(index + 1).padStart(2, '0')}
      </p>
    )
  }
}
