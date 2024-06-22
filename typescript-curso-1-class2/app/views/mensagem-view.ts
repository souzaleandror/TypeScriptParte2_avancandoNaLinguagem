import { View } from "./view.js";

export class MensagemView extends View<string> {

  // private element: HTMLElement;

  // constructor(seletor: string) {
  //   this.element = document.querySelector(seletor);
  // }

  template(model: string): string {
    return `
      <p class="alert alert-info">${model}</p>
    `;
  }


}