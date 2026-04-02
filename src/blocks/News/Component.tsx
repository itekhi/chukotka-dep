import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { News as NewsType, NewsBlock as NewsBlockProps } from '@/payload-types'

import ClientNewsBlock from './Component.client'
import BlockContainer from '../BlockContainer'

const getNews = async (
  mode: NewsBlockProps['mode'],
  specific: NewsBlockProps['specificNews'],
): Promise<NewsType[]> => {
  if (mode === 'all') {
    const payload = await getPayload({ config: configPromise })

    return (
      await payload.find({
        collection: 'news',
        sort: '-publishedAt',
        depth: 0,
        limit: 0,
      })
    ).docs
  }
  if (mode === 'specific') {
    return Array.isArray(specific) ? specific.filter((n) => typeof n === 'object') : []
  }
  return []
}

export const NewsBlock: React.FC<NewsBlockProps> = async ({ blockTitle, mode, specificNews }) => {
  const news = await getNews(mode, specificNews)

  return (
    <BlockContainer title={blockTitle}>
      <ClientNewsBlock news={news} />
    </BlockContainer>
  )
}
