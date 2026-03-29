import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type {
  Document as DocumentType,
  DocumentsBlock as DocumentsBlockProps,
} from '@/payload-types'

import BlockContainer from '@/blocks/BlockContainer'
import Document from '@/components/Document'
import { CMSLink } from '@/components/Link'

const getDocuments = async (
  mode: DocumentsBlockProps['mode'],
  specific: DocumentsBlockProps['specificDocuments'],
  category: DocumentsBlockProps['category'],
): Promise<DocumentType[]> => {
  if (mode === 'category') {
    const payload = await getPayload({ config: configPromise })
    return (
      await payload.find({
        collection: 'documents',
        sort: '-publishedAt',
        where: { category: { equals: category } },
      })
    ).docs
  }
  if (mode === 'specific') {
    return Array.isArray(specific) ? specific.filter((n) => typeof n === 'object') : []
  }
  return []
}

export const DocumentsBlock: React.FC<DocumentsBlockProps> = async ({
  blockTitle,
  mode,
  specificDocuments,
  category,
  blockLink,
}) => {
  const documents = await getDocuments(mode, specificDocuments, category)

  return (
    <BlockContainer title={blockTitle}>
      <div className="documents-grid">
        {documents.map((doc) => (
          <Document key={doc.id} doc={doc} />
        ))}
      </div>

      {blockLink && blockLink.type !== 'off' && (
        <center className="mt-7">
          <CMSLink {...blockLink} appearance="primary" />
        </center>
      )}
    </BlockContainer>
  )
}
