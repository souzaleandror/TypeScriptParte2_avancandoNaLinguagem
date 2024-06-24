export class View {
    constructor(seletor, escapar) {
        this.escapar = false;
        const elemento = document.querySelector(seletor);
        if (this.elemento) {
            this.elemento = elemento;
            if (escapar) {
                this.escapar = escapar;
            }
        }
        else {
            throw Error(`Seletor ${seletor} nao existe no DOM`);
        }
    }
    update(model) {
        let template = this.template(model);
        if (this.escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this.elemento.innerHTML = template;
    }
}
