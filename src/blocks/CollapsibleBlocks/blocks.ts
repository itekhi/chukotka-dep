import { Block, RichTextField } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
  lexicalEditor,
  BlocksFeature,
} from '@payloadcms/richtext-lexical'

import { DocumentsBlock } from '@/richtext/blocks/DocumentsBlock/config'
import { link } from '@/fields/link'

const contentField: RichTextField = {
  name: 'richText',
  type: 'richText',
  label: 'Контент',
  required: true,
  editor: lexicalEditor({
    features: ({ rootFeatures }) => {
      return [
        ...rootFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5'] }),
        BlocksFeature({ blocks: [DocumentsBlock] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ]
    },
  }),
}

export const BLOCKS: Block[] = [
  /*
    Regular content block
    =====================
  */
  {
    slug: 'content',
    labels: {
      singular: 'Контент',
      plural: 'Контент',
    },
    interfaceName: 'CollapsibleBlocksContentBlock',
    admin: {
      images: {
        thumbnail: '/block-examples/collapsible-blocks/content.jpg',
      },
    },
    fields: [
      contentField,
      link({
        offable: true,
      }),
    ],
  },
  /*
    Sub sections block
    ==================
  */
  {
    slug: 'subSections',
    labels: {
      singular: 'Подразделы',
      plural: 'Подразделы',
    },
    interfaceName: 'CollapsibleBlocksSubSectionsBlock',
    admin: {
      images: {
        thumbnail: '/block-examples/collapsible-blocks/subsections.jpg',
      },
    },
    fields: [
      {
        type: 'array',
        name: 'subSections',
        label: 'Подразделы',
        labels: {
          singular: 'Подраздел',
          plural: 'Подразделы',
        },
        required: true,
        fields: [
          {
            type: 'text',
            name: 'title',
            label: 'Заголовок',
            required: true,
          },
          contentField,
        ],
      },
    ],
  },
  /*
    News Cards block
    ================
  */
  {
    slug: 'newsCards',
    labels: {
      singular: 'Новостные карточки',
      plural: 'Новостные карточки',
    },
    interfaceName: 'CollapsibleBlocksNewsCardsBlock',
    admin: {
      images: {
        thumbnail: '/block-examples/collapsible-blocks/news-cards.jpg',
      },
    },
    fields: [
      {
        type: 'array',
        name: 'cards',
        label: 'Карточки',
        required: true,
        labels: {
          singular: 'Карточка',
          plural: 'Карточки',
        },
        fields: [
          {
            type: 'text',
            name: 'title',
            label: 'Заголовок',
            required: true,
          },
          {
            type: 'textarea',
            name: 'text',
            label: 'Текст',
            required: true,
          },
          {
            type: 'date',
            name: 'publishedAt',
            label: 'Дата публикации',
            required: true,
            hooks: {
              beforeValidate: [
                ({ data, value }) => {
                  if (!value) return new Date()
                  return value
                },
              ],
            },
          },
          link({ defaultNewTab: true }),
        ],
      },
    ],
  },
  /*
    Banner block
    ============
  */
  {
    slug: 'banner',
    labels: {
      singular: 'Баннер',
      plural: 'Баннер',
    },
    interfaceName: 'CollapsibleBlocksBannerBlock',
    admin: {
      images: {
        thumbnail: '/block-examples/collapsible-blocks/banner.jpg',
      },
    },
    fields: [
      {
        type: 'textarea',
        name: 'title',
        label: 'Заголовок',
        required: true,
        admin: {
          description: 'Перенос текста работает только для десктоп и планшет.',
        },
      },
      {
        type: 'upload',
        name: 'bgImage',
        relationTo: 'media',
        label: 'Фоновое изображение',
        required: true,
        filterOptions: {
          mimeType: { contains: 'image' },
        },
      },
      {
        type: 'upload',
        name: 'objectImage',
        relationTo: 'media',
        label: 'Изображение объекта',
        filterOptions: {
          mimeType: { contains: 'image' },
        },
      },
      link({
        offable: true,
      }),
      {
        type: 'checkbox',
        name: 'withCountdown',
        label: 'С обратным отсчетом',
      },
      {
        type: 'group',
        name: 'countdown',
        label: 'Обратный отсчет',
        admin: {
          condition: (_, { withCountdown }) => !!withCountdown,
        },
        fields: [
          {
            type: 'text',
            name: 'title',
            label: 'Заголовок',
          },
          {
            type: 'date',
            name: 'endDateTime',
            label: 'Дата и время окончания',
            admin: {
              date: {
                pickerAppearance: 'dayAndTime',
                minDate: new Date(),
              },
            },
            required: true,
          },
        ],
      },
    ],
  },
  /*
    Info Cards block
    ================
  */
  {
    slug: 'infoCards',
    labels: {
      singular: 'Инфо карточки',
      plural: 'Инфо карточки',
    },
    interfaceName: 'CollapsibleBlocksInfoCardsBlock',
    admin: {
      images: {
        thumbnail: '/block-examples/collapsible-blocks/info-cards.jpg',
      },
    },
    fields: [
      {
        type: 'array',
        name: 'cards',
        label: false,
        labels: {
          singular: 'Карточка',
          plural: 'Карточки',
        },
        required: true,
        fields: [
          {
            type: 'upload',
            name: 'image',
            relationTo: 'media',
            label: 'Изображение',
            required: true,
            filterOptions: {
              mimeType: { contains: 'image' },
            },
          },
          {
            name: 'richText',
            type: 'richText',
            label: 'Контент',
            required: true,
            editor: lexicalEditor({
              features: ({ rootFeatures }) => {
                return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
              },
            }),
          },
          link({ offable: true }),
        ],
      },
    ],
  },
  /*
    Banners grid block
    ==================
  */
  {
    slug: 'bannersGrid',
    labels: {
      singular: 'Сетка баннеров',
      plural: 'Сетка баннеров',
    },
    interfaceName: 'CollapsibleBlocksBannersGridBlock',
    admin: {
      images: {
        thumbnail: '/block-examples/collapsible-blocks/banners-grid.jpg',
      },
    },
    fields: [
      {
        type: 'radio',
        name: 'variant',
        label: 'Вид',
        required: true,
        options: [
          { label: '2 колонки', value: '2col' },
          { label: '3 колонки', value: '3col' },
        ],
      },
      {
        type: 'array',
        name: 'banners',
        label: false,
        labels: {
          singular: 'Баннер',
          plural: 'Баннеры',
        },
        required: true,
        fields: [
          {
            type: 'textarea',
            name: 'title',
            label: 'Заголовок',
            required: true,
          },
          {
            type: 'upload',
            name: 'image',
            relationTo: 'media',
            label: 'Изображение',
            admin: {
              description: 'Рекомендуется использовать изображение обрезанное по краям объекта.',
            },
          },
          {
            type: 'checkbox',
            name: 'withGradient',
            label: 'С градиентом',
          },
          link({
            offable: true,
          }),
        ],
      },
    ],
  },
]
