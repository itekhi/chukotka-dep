import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Page } from '../../../payload-types'
import { revalidatePage } from '@/collections/Pages/hooks/revalidatePage'

export const revalidateHomePageOnChange: CollectionAfterChangeHook<Page> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating Home page`)
    revalidatePath('/')
  }

  return doc
}

export const revalidateHomePageOnDelete: CollectionAfterDeleteHook<Page> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath('/')
  }

  return doc
}
