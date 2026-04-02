import type { Metadata } from 'next'

import type { Media, Page, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/og.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: { doc: Partial<Page> | null }): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title || doc?.title
  const suffix = 'Департамент экономики и инвестиций Чукотского АО'
  const titleWithSuffix = title ? `${title} | ${suffix}` : suffix

  return {
    title: titleWithSuffix,
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      title: titleWithSuffix,
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
  }
}
