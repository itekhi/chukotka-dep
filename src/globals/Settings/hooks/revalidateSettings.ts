import type { GlobalAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

export const revalidateSettings: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating "settings"')

    revalidateTag('global_settings')
  }

  // - Revalidate by Path (Full Site Purge)
  // Revalidating the root path '/' tells Next.js to purge the entire route cache.
  // This is the closest and most efficient way to trigger a full site refresh
  // for all pages that rely on global data.
  // revalidatePath('/', 'layout'); // Using 'layout' revalidates all nested paths.

  return doc
}
