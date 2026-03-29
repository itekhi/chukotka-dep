'use client'

import type { InformationBlock as InformationProps } from '@/payload-types'

import BlockContainer from '../BlockContainer'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { ImageMedia } from '@/components/Media'

type TextTileType = InformationProps['textTile']
type NumberTilesType = InformationProps['numberTiles']
type IconTilesType = InformationProps['iconTiles']
type BannerType = InformationProps['banner']

export const InformationBlock = (props: InformationProps) => {
  const { blockTitle, textTile, numberTiles, iconTiles, banner } = props

  return (
    <BlockContainer title={blockTitle} titleClassName="lg:text-lb">
      <div className="flex flex-col lg:flex-row items-stretch gap-6">
        <div className="lg:w-1/2 flex flex-col gap-6">
          <TextTile {...textTile} />
          <NumberTiles {...numberTiles} />
        </div>

        <div className="lg:w-1/2 xl:w-[calc(50%+4rem)] 2xl:w-1/2 flex flex-col gap-6">
          <IconTiles {...iconTiles} />
          <Banner {...banner} />
        </div>
      </div>
    </BlockContainer>
  )
}

const TextTile = ({ richText }: TextTileType) => {
  return (
    <div className="p-5 md:p-6.5 bg-white rounded-3xl">
      <RichText data={richText} className="" />
    </div>
  )
}

const NumberTiles = (props: NumberTilesType) => {
  const { title, tile1text, tile1number, tile2text, tile2number, tile3text, tile3number } = props

  return (
    <div className="grow flex flex-col">
      {title && <p className="h-1.5xl mb-3">{title}</p>}

      <div className="grow flex flex-col gap-3.5">
        <NumberTile
          number={tile1number}
          text={tile1text}
          className="grow min-h-32 w-full justify-center bg-tint"
          textClassName="p-md"
        />

        <div className="grow flex w-full gap-3.5">
          <NumberTile
            number={tile2number}
            text={tile2text}
            className="w-1/2 bg-white"
            textClassName="p-base"
          />
          <NumberTile
            number={tile3number}
            text={tile3text}
            className="w-1/2 bg-white"
            textClassName="p-base"
          />
        </div>
      </div>
    </div>
  )
}

const NumberTile = ({ number, text, textClassName, className }: any) => {
  return (
    <div className={cn('flex flex-col gap-1 p-5 md:p-6.5 rounded-2.5xl', className)}>
      {number && <p className="h-3xl tracking-wider">{number}</p>}
      <p className={textClassName}>{text}</p>
    </div>
  )
}

const IconTiles = ({ title, tiles }: IconTilesType) => {
  return (
    <div className="p-5 md:p-6.5 bg-gray-light rounded-4xl">
      {title && <p className="h-1.5xl md:text-lb mb-3">{title}</p>}

      <div
        className="grid grid-cols-2 sm:grid-cols-(--cols) lg:grid-cols-2 xl:grid-cols-(--cols) gap-3"
        // @ts-expect-error ...
        style={{ '--cols': `repeat(${tiles.length}, minmax(0, 1fr))` }}
      >
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className={cn(
              'flex flex-col lg:flex-row xl:flex-col justify-center items-center gap-3 xl:gap-2',
              'px-3 py-4.5 sm:px-0 md:px-3 xl:py-4 bg-white rounded-2xl',
            )}
          >
            <ImageMedia
              resource={tile.icon}
              className="shrink-0 w-16 sm:w-20 md:w-24 lg:w-15 xl:w-20 h-auto"
            />

            <div className="sm:grow xl:grow-0 flex items-center">
              <p className="p-base text-center lg:text-left xl:text-center">{tile.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Banner = ({ withGradient, richText, link, image }: BannerType) => {
  return (
    <div
      className={cn(
        'grow flex flex-col sm:flex-row p-5 md:p-6.5 gap-5 md:gap-0 xl:gap-5 rounded-3xl',
        withGradient ? 'bg-gradient-primary' : 'bg-tint',
      )}
    >
      <div className="flex flex-col items-start gap-4">
        <RichText data={richText} />

        <CMSLink {...link} appearance="primary" size="smallToDefault" />
      </div>

      <ImageMedia
        resource={image}
        className={cn(
          'shrink-0 self-end sm:self-center h-auto w-40 sm:w-32 mr-2 mb-2 sm:m-0',
          link && link.type !== 'off' ? '-mt-10' : '-mt-3',
        )}
      />
    </div>
  )
}
