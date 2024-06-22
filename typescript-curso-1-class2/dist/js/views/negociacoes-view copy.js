export class NegociacoesView {
    constructor(seletor) {
        this.elemento = document.querySelector(seletor);
    }
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
    update(model) {
        const template = this.template(model);
        console.log(template);
        console.log(model);
        this.elemento.innerHTML = this.template(model);
    }
}
