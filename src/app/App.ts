export class App {
  private root: HTMLElement;

  constructor() {
    const root = document.getElementById("app");

    if (!root) {
      throw new Error("Root element not found");
    }

    this.root = root;

    this.init();
  }

  private init(): void {
    this.root.textContent = "Not Fight Club";
  }
}
