import { Document as DocumentType } from '@/payload-types'
import { formatRussianDate } from '@/utilities/formatDateTime'
import { cn } from '@/utilities/ui'

export const DocumentsBlock = ({ documents }: { documents: DocumentType[] }) => {
  return (
    <div className="flex flex-col items-stretch gap-2.5 w-full">
      {documents.map((doc) => (
        <Document key={doc.id} {...doc} />
      ))}
    </div>
  )
}

const Document = ({ title, url, publishedAt }: DocumentType) => {
  return (
    <a
      href={url || ''}
      target="_blank"
      rel="noreferrer noopener"
      download={false}
      className={cn(
        'flex flex-col md:flex-row md:items-center py-3.75 px-5 rounded-2xl',
        'p-base md:p-md text-primary-muted',
        'hover:bg-tint/50 border border-solid hover:border-primary transition-[background-color,border]',
      )}
      title={title}
    >
      <span className="line-clamp-2 lg:line-clamp-1 md:pr-10 md:mr-auto">{title}</span>

      <div className="shrink-0 flex flex-row-reverse justify-between items-center md:justify-end md:flex-row mt-4 md:mt-0">
        <span className="md:w-42 p-sm md:text-center whitespace-nowrap opacity-40 md:mr-4">
          {formatRussianDate(publishedAt)}
        </span>

        <span className="flex items-center gap-2.5 p-base underline">
          {/* eslint-disable @next/next/no-img-element */}
          <img src="/assets/doc-icon.svg" alt="" className="size-5 md:size-5.5" />
          Подробнее
        </span>
      </div>
    </a>
  )
}
