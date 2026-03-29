import { getPayload } from 'payload'
import configPromise from '@payload-config'

import ClientAllDocuments from './Component.client'

// export const dynamic = 'force-dynamic' // или 'force-static' если кэшировать

export async function AllDocumentsBlock() {
  const payload = await getPayload({ config: configPromise })

  const docs = (
    await payload.find({
      collection: 'documents',
      limit: 1000,
      sort: '-publishedAt',
      where: {
        hideOnDocumentsPage: { not_equals: true },
        'category.hideOnDocumentsPage': { not_equals: true },
      },
      depth: 2,
    })
  ).docs

  return <ClientAllDocuments docs={docs || []} />
}
