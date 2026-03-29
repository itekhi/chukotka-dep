'use client'

import { useState } from 'react'
import { Document as DocumentType, DocumentCategory as DocumentCategoryType } from '@/payload-types'
import BlockContainer from '@/blocks/BlockContainer'
import Document from '@/components/Document'

export default function AllDocuments({ docs }: { docs: DocumentType[] }) {
  const [search, setSearch] = useState('')

  const filteredDocs = docs.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase().trim()),
  )

  // Группируем + сразу готовим данные для сортировки
  const grouped = filteredDocs.reduce(
    (acc, doc) => {
      const category = doc.category as DocumentCategoryType | null

      const catTitle = category?.title || 'Без категории'

      if (!acc[catTitle]) {
        acc[catTitle] = {
          docs: [],
          createdAt: category?.createdAt || '9999-12-31', // заглушка для "Без категории" — в конец
        }
      }

      acc[catTitle].docs.push(doc)
      return acc
    },
    {} as Record<string, { docs: DocumentType[]; createdAt: string }>,
  )

  const sortedGroups = Object.entries(grouped).sort(
    ([, a], [, b]) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  return (
    <BlockContainer idFrom="documents">
      <div className="flex flex-col md:flex-row gap-10 md:gap-0 items-start md:items-center justify-between">
        <p className="h-xl md:h-3xl subline">Документы</p>

        <div className="md:min-w-88 w-full md:w-auto relative">
          <input
            type="text"
            placeholder="Поиск по названию"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tint placeholder:text-gray-500"
          />
          {/* prettier-ignore */}
          <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
            <path d="M17 17L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Секции */}
      {sortedGroups.map(([categoryTitle, { docs: categoryDocs }]) => (
        <section key={categoryTitle} className="mt-10 md:mt-13">
          <h2 className="h-lg md:h-1.5xl font-medium leading-tight mb-6 border-b pb-2.5">
            {categoryTitle}
          </h2>

          <div className="documents-grid">
            {categoryDocs.map((doc) => (
              <Document key={doc.id} doc={doc} />
            ))}
          </div>
        </section>
      ))}

      {filteredDocs.length === 0 && (
        <p className="text-center text-gray-500 py-12">Документы не найдены</p>
      )}
    </BlockContainer>
  )
}
