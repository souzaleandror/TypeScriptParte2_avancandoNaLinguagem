import { Negociacoes } from "../models/negociacoes.js";

export class NegociacoesView {

  private elemento: HTMLElement;

  constructor(seletor: string) {
    this.elemento = document.querySelector(seletor);
  }

  template(model: Negociacoes): string {
    return `
      <table class="table table-hover table-bordered">
        <thead>
          <tr> 
            <th>Data</th>
            <th>Quantidade</th>
            <th>Valor</th>
          </tr>
          <tbody>
            ${model.lista().map((negociacao) => {
      return `
                              <tr>
                                <td>${new Intl.DateTimeFormat().format(negociacao.data)}</td>
                                <td>${negociacao.quantidade}</td>
                                <td>${negociacao.valor}</td>
                              </tr>`;
    }).join('')}
          </tbody>
        </thead>
      </table>
    `;
  }

  update(model: Negociacoes): void {
    const template = this.template(model);
    console.log(template);
    console.log(model);
    this.elemento.innerHTML = this.template(model);
  }
}