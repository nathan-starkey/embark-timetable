import { SearchBox, Callbacks } from "./search-box.mts";

const exampleItems = [
  "1 Alpha St",
  "2 Beta Rd",
  "3 Gamma Ave"
];

const exampleSearch: Callbacks = {
  onInput(this: SearchBox, value: string): void {
    let items = exampleItems.filter(item => item.includes(value));

    this.setItems(items);

    this.input.classList.remove("is-valid", "is-invalid");
  },

  onChange(this: SearchBox, value: string): void {
    let isValid = exampleItems.includes(value);

    this.input.classList.add(isValid ? "is-valid" : "is-invalid");
  }
};

window.addEventListener("load", () => {
  let input = document.getElementById("stop") as HTMLInputElement;
  let dropdown = document.getElementById("stop-dropdown") as HTMLElement;
  let dropdownMenu = dropdown.querySelector(".dropdown-menu") as HTMLElement;

  SearchBox.from(input, dropdownMenu, exampleSearch);
});