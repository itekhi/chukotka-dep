import type { CollectionBeforeChangeHook } from 'payload'

export const populateUpdatedBy: CollectionBeforeChangeHook = ({ data, operation, req }) => {
  if (operation === 'create' || operation === 'update') {
    if (req.user) {
      return {
        ...data,
        updatedBy: req.user.id,
      }
    }
    return data
  }

  return data
}
