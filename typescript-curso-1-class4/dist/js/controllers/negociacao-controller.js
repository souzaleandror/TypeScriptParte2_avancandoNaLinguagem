import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesView } from '../views/negociacoes-view.js';
import { MensagemView } from '../views/mensagem-view.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView('#negociacoesView', true);
        this.mensagemView = new MensagemView('#mensagemView', false);
        this.SABADO = 6;
        this.DOMINGO = 0;
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        //this.negociacoesView.template();
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        //const negociacaoTemp = new Negociacao(null, 0, 0);
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        //negociacao.data.setDate(12);
        if (!this.eDiaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociacoes em dias uteis sao aceitas');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        console.log(this.negociacoes.lista());
        this.limparFormulario();
        this.atualizaView();
    }
    // public criaNegociacao(): Negociacao {
    //     // const exp = /-/g;
    //     // const date = new Date(this.inputData.value.replace(exp, ','));
    //     // const quantidade = parseInt(this.inputQuantidade.value);
    //     // const valor = parseFloat(this.inputValor.value);
    //     // return new Negociacao(date, quantidade, valor);
    // }
    limparFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    atualizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Adicionado com sucesso');
    }
    eDiaUtil(data) {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }
}
