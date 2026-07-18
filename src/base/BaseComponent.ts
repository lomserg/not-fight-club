export class BaseComponent<T extends keyof HTMLElementTagNameMap> {
  public readonly node: HTMLElementTagNameMap[T];

  constructor(tag: T, classNames: string[] = [], text?: string) {
    this.node = document.createElement(tag);

    if (classNames.length > 0) {
      this.node.classList.add(...classNames);
    }

    if (text) {
      this.node.textContent = text;
    }
  }

  public append(...children: (BaseComponent<any> | HTMLElement)[]): void {
    children.forEach((child) => {
      this.node.append(child instanceof BaseComponent ? child.node : child);
    });
  }

  public clear(): void {
    this.node.replaceChildren();
  }

  public destroy(): void {
    this.node.remove();
  }

  public setText(text: string): void {
    this.node.textContent = text;
  }

  public addClass(...classNames: string[]): void {
    this.node.classList.add(...classNames);
  }

  public removeClass(...classNames: string[]): void {
    this.node.classList.remove(...classNames);
  }

  public toggleClass(className: string, force?: boolean): void {
    this.node.classList.toggle(className, force);
  }

  public setAttribute(name: string, value: string): void {
    this.node.setAttribute(name, value);
  }

  public addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (event: HTMLElementEventMap[K]) => void,
  ): void {
    this.node.addEventListener(type, listener as EventListener);
  }
}
