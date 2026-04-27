import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateSettings } from './hooks/revalidateSettings'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Настройки',
  access: {
    read: () => true,
  },
  fields: [
    link({
      disableLabel: true,
      overrides: { name: 'privacyPolicyLink', label: 'Политика конфиденциальности' },
    }),
  ],
  hooks: {
    afterChange: [revalidateSettings],
  },
}
