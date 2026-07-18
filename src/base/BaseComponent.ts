export class BaseComponent<T extends keyof HTMLElementTagNameMap> {
  public node: HTMLElementTagNameMap[T];

  constructor(tag: T, classNames: string[] = [], text?: string) {
    this.node = document.createElement(tag);

    if (classNames.length) {
      this.node.classList.add(...classNames);
    }

    if (text) {
      this.node.textContent = text;
    }
  }

  append(...children: (BaseComponent<any> | HTMLElement)[]): void {
    children.forEach((child) => {
      this.node.append(child instanceof BaseComponent ? child.node : child);
    });
  }

  clear(): void {
    this.node.replaceChildren();
  }

  destroy(): void {
    this.node.remove();
  }
}
