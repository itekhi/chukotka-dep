import { ElementNode, EditorConfig, LexicalNode } from 'lexical'

export class PostscriptumNode extends ElementNode {
  static getType(): string {
    return 'postscriptum'
  }

  static clone(node: PostscriptumNode): PostscriptumNode {
    return new PostscriptumNode(node.__key)
  }

  // How it renders in the Payload Admin UI Lexical editor
  createDOM(config: EditorConfig): HTMLElement {
    const dom = document.createElement('p')
    dom.style.fontSize = '0.85em' // Make it smaller text
    dom.style.color = '#cccccc' // Optional: Make it slightly faded/gray
    dom.className = 'postscriptum-text'
    return dom
  }

  updateDOM(prevNode: PostscriptumNode, dom: HTMLElement, config: EditorConfig): boolean {
    return false
  }
}

export function $createPostscriptumNode(): PostscriptumNode {
  return new PostscriptumNode()
}

export function $isPostscriptumNode(
  node: LexicalNode | null | undefined,
): node is PostscriptumNode {
  return node instanceof PostscriptumNode
}
