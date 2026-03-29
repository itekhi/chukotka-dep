import type { Block } from 'payload'

import {
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const TabbedBannerBlock: Block = {
  slug: 'tabbedBanner',
  interfaceName: 'TabberBannerBlock',
  labels: {
    singular: 'Вкладки баннера',
    plural: 'Вкладки баннера',
  },
  admin: {
    images: {
      thumbnail: '/block-examples/tabbed-banner.jpg',
    },
  },
  fields: [
    {
      name: 'blockTitle',
      type: 'text',
      label: 'Заголовок блока',
    },
    {
      type: 'array',
      name: 'tabs',
      label: 'Вкладки',
      labels: {
        singular: 'Вкладка',
        plural: 'Вкладки',
      },
      required: true,
      minRows: 2,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Название вкладки',
          required: true,
        },
        {
          name: 'withGradient',
          type: 'checkbox',
          label: 'С градиентом на фоне',
        },
        {
          name: 'richText',
          type: 'richText',
          required: true,
          label: 'Текст',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
              ]
            },
          }),
          admin: {
            description:
              'Перенос текста работает только для десктоп. Чтобы перенести на новую строку зажмите Shift и нажмите Enter.',
          },
        },
        {
          type: 'radio',
          name: 'textColor',
          label: 'Цвет текста',
          required: true,
          defaultValue: 'black',
          options: [
            { label: 'Черный', value: 'black' },
            { label: 'Темно-синий', value: 'darkblue' },
          ],
        },
        {
          type: 'radio',
          name: 'richTextSize',
          label: 'Размер текста',
          required: true,
          defaultValue: 'base',
          options: [
            { label: 'Обычный', value: 'base' },
            { label: 'Средний', value: 'medium' },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Фоновое изображение',
        },
        {
          name: 'objectImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Изображение объекта',
          admin: {
            description: 'Изображение расположено в зависимости от режима, без отступа.',
          },
        },
        {
          name: 'objectImagePlacement',
          type: 'radio',
          label: 'Размещение изображения объекта',
          required: true,
          defaultValue: 'squezeRight',
          options: [
            { label: 'Вмещается справа', value: 'squezeRight' },
            { label: 'По центру под текстом', value: 'bottomCenter' },
          ],
          admin: {
            // description: 'При "Вмещается справа" изображение',
          },
        },
        {
          type: 'checkbox',
          name: 'hideObjectImageOnMobile',
          label: 'Скрыть изображение объекта на мобильной версии',
        },
      ],
    },
  ],
}
