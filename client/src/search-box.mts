import { Dropdown } from "./dropdown.mts";

export type Callbacks = {
  onInput(this: SearchBox, value: string): void,

  onChange(this: SearchBox, value: string): void
};

export class SearchBox extends Dropdown {
  private constructor(
    public input: HTMLInputElement,
    dropdownMenu: HTMLElement,
    callbacks: Callbacks
  ) {
    super(dropdownMenu, {
      // Set the input value and notify the callback when an item is clicked
      onItemClick: (value: string) => {
        input.value = value;

        callbacks.onInput.call(this, value);
        callbacks.onChange.call(this, value);
      }
    });

    // Show the dropdown when the input is focused
    input.addEventListener("focus", () => {
      if (input.value) {
        this.show();
      }
    });

    // Hide the dropdown and notify the callback when an unrelated element is focused
    input.addEventListener("blur", event => {
      if (!this.isParentOf(event.relatedTarget)) {
        this.hide();

        callbacks.onChange.call(this, input.value);
      }
    });

    // Show the dropdown and notify the callback when text is inputted
    input.addEventListener("input", () => {
      this.show();

      callbacks.onInput.call(this, input.value);
    });
  }

  // Modified to include checking the input
  protected override isParentOf(target: EventTarget | null): boolean {
    return this.input == target || super.isParentOf(target);
  }

  /** Instantiate a search box. */
  public static from(input: HTMLInputElement, dropdownMenu: HTMLElement, callbacks: Callbacks) {
    return new SearchBox(input, dropdownMenu, callbacks);
  }
}