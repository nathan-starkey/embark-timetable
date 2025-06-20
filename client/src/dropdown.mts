export type Callbacks = {
  onItemClick(this: Dropdown, value: string): void;
};

export class Dropdown {
  protected constructor(
    private menu: HTMLElement,
    private callbacks: Callbacks
  ) {
    // Prevent the dropdown from losing focus when clicked
    this.menu.addEventListener("pointerdown", event => event.preventDefault());
  }

  /** Show the dropdown. */
  public show(): void {
    this.menu.classList.add("show");
  }

  /** Hide the dropdown. */
  public hide(): void {
    this.menu.classList.remove("show");
  }

  /** Set the dropdown items. */
  public setItems(items: string[]): void {
    this.menu.textContent = "";

    for (let value of items) {
      let item = this.createItem(value);

      this.menu.append(item);
    }

    // Display a message if the dropdown is empty
    if (!items.length) {
      let button = document.createElement("button");

      button.textContent = "No results";
      button.disabled = true;
      button.classList.add("dropdown-item");

      let item = document.createElement("li");

      item.append(button);
      this.menu.append(button);
    }
  }

  /** Create a dropdown item. */
  protected createItem(value: string): HTMLLIElement {
    // Create the button
    let button = document.createElement("button");

    button.textContent = value;
    button.classList.add("dropdown-item");

    // Create the outer list item
    let item = document.createElement("li");

    item.append(button);

    // Hide the dropdown when the button loses focus
    button.addEventListener("blur", event => {
      if (this.isParentOf(event.relatedTarget)) {
        return;
      }

      this.hide();
    });

    // Hide the dropdown when the button is clicked
    button.addEventListener("click", () => {
      this.hide();

      this.callbacks.onItemClick.call(this, value);
    });

    return item;
  }

  /** Determine if a target is an inclusive descendant of the dropdown.  */
  protected isParentOf(target: EventTarget | null): boolean {
    return this.menu.contains(target instanceof Node ? target : null);
  }
}