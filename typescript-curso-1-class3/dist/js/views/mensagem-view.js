import { View } from "./view.js";
export class MensagemView extends View {
    // private element: HTMLElement;
    // constructor(seletor: string) {
    //   this.element = document.querySelector(seletor);
    // }
    template(model) {
        return `
      <p class="alert alert-info">${model}</p>
    `;
    }
}
