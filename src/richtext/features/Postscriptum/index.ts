import { createServerFeature } from '@payloadcms/richtext-lexical'

export const PostscriptumFeature = createServerFeature({
  key: 'postscriptum',
  feature: {
    ClientFeature: '@/richtext/features/Postscriptum/client#PostscriptumFeatureClient',
    clientFeatureProps: null,
  },
})
