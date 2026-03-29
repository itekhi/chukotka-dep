import Link from 'next/link'
import type { Document } from '@/payload-types'

import { formatRussianDate } from '@/utilities/formatDateTime'

type Props = { doc: Document }

const Document: React.FC<Props> = ({ doc }) => {
  return (
    <Link
      key={doc.id}
      href={doc.url || ''}
      target="_blank"
      rel="noopener noreferrer"
      download={false}
      className="group flex items-start gap-3 md:gap-4.5 p-3 md:py-5 md:px-4 border-2 border-tint rounded-2.5xl hover:border-primary transition-[border]"
    >
      <div className="shrink-0 h-full pt-1 md:pt-0.5 pl-1 md:pl-2">
        {/* doc-icon.svg */}
        {/* prettier-ignore */}
        <svg className="size-7 md:size-10.5 md:group-hover:scale-105 transition-transform" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10.5V0.69C22.3876 1.214 23.6479 2.02697 24.6975 3.075L29.9235 8.304C30.9727 9.35232 31.7863 10.6123 32.31 12H22.5C22.1022 12 21.7206 11.842 21.4393 11.5607C21.158 11.2794 21 10.8978 21 10.5ZM33 15.7275V28.5C32.9976 30.4884 32.2067 32.3947 30.8007 33.8007C29.3947 35.2067 27.4884 35.9976 25.5 36H10.5C8.51161 35.9976 6.60534 35.2067 5.19933 33.8007C3.79332 32.3947 3.00238 30.4884 3 28.5V7.5C3.00238 5.51161 3.79332 3.60534 5.19933 2.19933C6.60534 0.793323 8.51161 0.00238179 10.5 0L17.2725 0C17.517 0 17.7585 0.0195 18 0.036V10.5C18 11.6935 18.4741 12.8381 19.318 13.682C20.1619 14.5259 21.3065 15 22.5 15H32.964C32.9805 15.2415 33 15.483 33 15.7275ZM21 28.5C21 28.1022 20.842 27.7206 20.5607 27.4393C20.2794 27.158 19.8978 27 19.5 27H12C11.6022 27 11.2206 27.158 10.9393 27.4393C10.658 27.7206 10.5 28.1022 10.5 28.5C10.5 28.8978 10.658 29.2794 10.9393 29.5607C11.2206 29.842 11.6022 30 12 30H19.5C19.8978 30 20.2794 29.842 20.5607 29.5607C20.842 29.2794 21 28.8978 21 28.5ZM25.5 22.5C25.5 22.1022 25.342 21.7206 25.0607 21.4393C24.7794 21.158 24.3978 21 24 21H12C11.6022 21 11.2206 21.158 10.9393 21.4393C10.658 21.7206 10.5 22.1022 10.5 22.5C10.5 22.8978 10.658 23.2794 10.9393 23.5607C11.2206 23.842 11.6022 24 12 24H24C24.3978 24 24.7794 23.842 25.0607 23.5607C25.342 23.2794 25.5 22.8978 25.5 22.5Z" fill="#1C5A96"/>
        </svg>
      </div>

      <div className="flex-1">
        <p className="p-base md:p-md leading-[1.2] text-primary line-clamp-3 md:line-clamp-2">
          {doc.title}
        </p>

        {doc.publishedAt && (
          <p className="text-xs md:text-sm text-black/50 mt-2">
            Размещено {formatRussianDate(doc.publishedAt)}
          </p>
        )}
      </div>
    </Link>
  )
}

export default Document
