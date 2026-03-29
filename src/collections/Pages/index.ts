import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { slugify } from '@/fields/slug'

// import { CallToAction } from '@/blocks/CallToAction/config'
// import { Content } from '@/blocks/Content/config'
// import { hero } from '@/heros/config'
import { HeroBannerBlock } from '@/blocks/HeroBanner/config'
import { BannerBlock } from '@/blocks/Banner/config'
import { NavCardsBlock } from '@/blocks/NavCards/config'
import { TeamCardsBlock } from '@/blocks/TeamCards/config'
import { OrganizationsBlock } from '@/blocks/Organizations/config'
import { UsefulResourcesBlock } from '@/blocks/UsefulResources/config'
import { DocumentsBlock } from '@/blocks/Documents/config'
import { NewsBlock } from '@/blocks/News/config'
import { BigTilesBlock } from '@/blocks/BigTiles/config'
import { TwoPanelsWithTilesBlock } from '@/blocks/TwoBlocksWithTiles/config'
import { ListPanelsBlock } from '@/blocks/ListPanels/config'
import { ListPanelWithBannerBlock } from '@/blocks/ListPanelWithBanner/config'
import { ListPanelWith2TilesBlock } from '@/blocks/ListPanelWith2Tiles/config'
import { PanelsRowsAndListBlock } from '@/blocks/PanelsRowsAndList/config'
import { TabbedBannerBlock } from '@/blocks/TabbedBanner/config'
import { TilesGridBlock } from '@/blocks/TilesGrid/config'
import { CollapsibleBlocksBlock } from '@/blocks/CollapsibleBlocks/config'
import { BannersGridBlock } from '@/blocks/BannersGrid/config'
import { ContactInfoBlock } from '@/blocks/ContactInfo/config'
import { InfoTilesBlock } from '@/blocks/InfoTiles/config'
import { MediaCardsBlock } from '@/blocks/MediaCards/config'
import { ContentTilesBlock } from '@/blocks/ContentTiles/config'
import { InfoTileWithSliderBlock } from '@/blocks/InfoTileWithSlider/config'
import { TabbedTilesGridBlock } from '@/blocks/TabbedTilesGrid/config'
import { InfoCardsBlock } from '@/blocks/InfoCards/config'
import { InformationBlock } from '@/blocks/Information/config'
import { LinkCardsGridBlock } from '@/blocks/LinkCardsGrid/config'
import { AllDocumentsBlock } from '@/blocks/AllDocuments/config'
import { HeadingBlock } from '@/blocks/Heading/config'
import { ContentBlock } from '@/blocks/Content/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'

import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

const BLOCKS = [
  HeroBannerBlock,
  BannerBlock,
  NavCardsBlock,
  TeamCardsBlock,
  OrganizationsBlock,
  UsefulResourcesBlock,
  DocumentsBlock,
  NewsBlock,
  BigTilesBlock,
  TwoPanelsWithTilesBlock,
  ListPanelsBlock,
  ListPanelWithBannerBlock,
  ListPanelWith2TilesBlock,
  PanelsRowsAndListBlock,
  TabbedBannerBlock,
  TilesGridBlock,
  CollapsibleBlocksBlock,
  BannersGridBlock,
  ContactInfoBlock,
  InfoTilesBlock,
  MediaCardsBlock,
  ContentTilesBlock,
  InfoTileWithSliderBlock,
  TabbedTilesGridBlock,
  InfoCardsBlock,
  InformationBlock,
  LinkCardsGridBlock,
  AllDocumentsBlock,
  HeadingBlock,
  ContentBlock,
  MediaBlock,
]

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: {
    singular: 'Страница',
    plural: 'Страницы',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
    pagination: {
      defaultLimit: 25,
      limits: [10, 25, 50, 100],
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        // {
        //   fields: [hero],
        //   label: 'Hero',
        // },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: false,
              blocks: BLOCKS,
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Контент',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
              overrides: {
                label: 'Заголовок',
              },
            }),
            MetaImageField({
              relationTo: 'media',
              overrides: {
                label: 'Изображение (opengraph)',
                admin: {
                  description:
                    'Загрузите изображение для предпросмотра ссылки в соцсетях (Open Graph).\nРекомендуемый размер: 1200 × 630 пикселей.\nСоотношение сторон: 1.91:1. Формат: JPG/PNG/WebP. Вес до 2 МБ.',
                },
                filterOptions: {
                  mimeType: { in: ['image/jpg', 'image/png', 'image/webp'] },
                },
              },
            }),

            MetaDescriptionField({
              overrides: {
                label: 'Описание',
              },
            }),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Дата публикации',
      admin: {
        position: 'sidebar',
      },
    },
    slugField({
      slugify: ({ data }) => slugify(data.title),
    }),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  folders: true,
}
