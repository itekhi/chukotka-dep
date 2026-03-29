import type { Block } from 'payload'

export const HeroBannerBlock: Block = {
  slug: 'heroBanner',
  interfaceName: 'HeroBannerBlock',
  labels: {
    singular: 'Главный баннер',
    plural: 'Главный баннер',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/hero-banner.jpg',
    },
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Изображение',
      required: true,
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Заголовок',
      admin: {
        rows: 2,
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
    },
    {
      name: 'titleAsH1',
      type: 'checkbox',
      label: 'Заголовок - H1?',
    },
  ],
}
