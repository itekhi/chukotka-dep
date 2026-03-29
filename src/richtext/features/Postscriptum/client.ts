'use client'

import { $setBlocksType } from '@lexical/selection'
import { $getSelection, $isRangeSelection } from 'lexical'

import type { ToolbarGroup } from '@payloadcms/richtext-lexical'

import {
  createClientFeature,
  slashMenuBasicGroupWithItems,
  toolbarTextDropdownGroupWithItems,
} from '@payloadcms/richtext-lexical/client'

import { $isPostscriptumNode, $createPostscriptumNode, PostscriptumNode } from './PostscriptumNode'
import { TextIcon } from './TextIcon'

const toolbarGroups: ToolbarGroup[] = [
  toolbarTextDropdownGroupWithItems([
    {
      ChildComponent: TextIcon,
      isActive: ({ selection }) => {
        if (!$isRangeSelection(selection)) {
          return false
        }
        for (const node of selection.getNodes()) {
          if (!$isPostscriptumNode(node) && !$isPostscriptumNode(node.getParent())) {
            return false
          }
        }
        return true
      },
      key: 'postscriptum',
      label: () => {
        return 'Постскриптум'
      },
      onSelect: ({ editor }) => {
        editor.update(() => {
          const selection = $getSelection()
          $setBlocksType(selection, () => $createPostscriptumNode())
        })
      },
      order: 12,
    },
  ]),
]

export const PostscriptumFeatureClient = createClientFeature({
  nodes: [PostscriptumNode],

  slashMenu: {
    groups: [
      slashMenuBasicGroupWithItems([
        {
          Icon: TextIcon,
          key: 'postscriptum',
          keywords: ['postscriptum', 'text'],
          label: () => {
            return 'Постскриптум'
          },
          onSelect: ({ editor }) => {
            editor.update(() => {
              const selection = $getSelection()
              $setBlocksType(selection, () => $createPostscriptumNode())
            })
          },
        },
      ]),
    ],
  },
  toolbarFixed: {
    groups: toolbarGroups,
  },
  toolbarInline: {
    groups: toolbarGroups,
  },
})
