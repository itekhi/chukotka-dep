import {
  DefaultNodeTypes,
  SerializedLinkNode,
  SerializedParagraphNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

// import type {
//   BannerBlock as BannerBlockProps,
//   CallToActionBlock as CTABlockProps,
//   MediaBlock as MediaBlockProps,
// } from '@/payload-types'

import { cn } from '@/utilities/ui'

import BrDisabler, { type BreakpointKey } from './BrDisabler'
import { DocumentsBlock } from '@/richtext/blocks/DocumentsBlock/Component'

type SerializedPostscriptumNode = SerializedParagraphNode & { type: 'postscriptum' }
type NodeTypes = DefaultNodeTypes | SerializedPostscriptumNode
// | SerializedBlockNode<DocumentsBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  return `/${value.slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  // override for default HeadingFeature: <h*> -> <p>
  heading: ({ node, nodesToJSX }) => {
    return <p className={node.tag}>{nodesToJSX({ nodes: node.children })}</p>
  },
  postscriptum: ({ node, nodesToJSX }) => {
    return <p className="ps">{nodesToJSX({ nodes: node.children })}</p>
  },
  blocks: {
    documents: ({ node }: any) => <DocumentsBlock {...node.fields} />,
    // mediaBlock: ({ node }) => (
    //   <MediaBlock
    //     className="col-start-1 col-span-3"
    //     imgClassName="m-0"
    //     {...node.fields}
    //     captionClassName="mx-auto max-w-[48rem]"
    //     enableGutter={false}
    //     disableInnerContainer={true}
    //   />
    // )
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  withBrDisabler?: boolean
  brDisablerBreakpoint?: BreakpointKey
  sizing?: 'small' | 'base' | 'sm-to-base' | 'base-to-md' | 'medium'
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const {
    className,
    sizing = 'base',
    withBrDisabler = true,
    brDisablerBreakpoint = 'lg',
    ...rest
  } = props

  return (
    <>
      <ConvertRichText
        converters={jsxConverters}
        className={cn('payload-richtext', `size-${sizing}`, className)}
        {...rest}
      />
      {withBrDisabler && <BrDisabler breakpoint={brDisablerBreakpoint} />}
    </>
  )
}
