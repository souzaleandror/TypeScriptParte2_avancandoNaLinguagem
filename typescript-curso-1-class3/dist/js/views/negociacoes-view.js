import { View } from "./view.js";
export class NegociacoesView extends View {
    // private elemento: HTMLElement;
    // constructor(seletor: string) {
    //   this.elemento = document.querySelector(seletor);
    // }
    template(model) {
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
                                <td>${this.formatar(negociacao.data)}</td>
                                <td>${negociacao.quantidade}</td>
                                <td>${negociacao.valor}</td>
                              </tr>`;
        }).join('')}
          </tbody>
        </thead>
      </table>
    `;
    }
    formatar(data) {
        return new Intl.DateTimeFormat().format(data);
    }
}
