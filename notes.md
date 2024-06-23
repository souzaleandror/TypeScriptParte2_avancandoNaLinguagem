##### 22/06/2024

Curso de TypeScript parte 2: avançando na linguagem

@01-Elaborando uma solução de view 

@@01
Apresentação

[00:00] Olá, pessoal. Eu sou o Flávio Almeida e desejo as boas-vindas ao segundo curso de TypeScript na plataforma Alura. Neste curso, vamos avançar na linguagem TypeScript.
[00:08] Mas, como vamos avançar? Primeiro, vamos concluir a nossa aplicação de negociação de bolsa de valores, permitindo incluir dados na nossa tabela.

[00:21] Uma parte interessante é que vamos implementar essa solução de atualizar o DOM implementando um micro framework para atualizar a view. Algo que o React faz dentro do JSX.

[00:34] É claro que não vamos implementar igual ao que o React faz, nem com o escopo que o React tem. Vamos implementar algo bem primitivo – mas que funciona, para motivar, de uma maneira estimulante e elegante, o aprendizado de vários recursos da linguagem TypeScript.

[00:53] Por outro lado, eu também vou abordar o TypeScript sob o enfoque da orientação de objetos. Veremos recursos como herança, encapsulamento e mais cosias do mundo de orientação de objetos que o TypeScript, como linguagem, tem uma série de recursos que permite implementarmos isso de boa maneira.

[01:12] Nós também vamos configurar o compilador do TypeScript, vamos fazer ajustes na aplicação, tornando, cada vez mais, mais apurada à nossa aplicação.

[01:22] Aqui está um exemplo de código que vamos escrever durante o curso. Vamos criar, trabalhar com generics, com enumerations, entre outros. Uma coisa importante, para deixar claro, é que os mesmos requisitos de infraestrutura desse treinamento, são os mesmos requisitos do treinamento 1, do primeiro, de Fundamentos.

[01:43] Então, o que você precisa? Ter o Chrome, Note, no mínimo a versão 10.21, e também o Visual Studio Code, porque ele se integra muito bem com o TypeScript. Então, se você quiser, você voltar para o curso de Fundamentos, que é um pré-requisito desse treinamento para ver os requisitos de infraestrutura.

[02:02] Tudo bem? Já que vimos aqui, vamos começar os trabalhos.

@@02
Preparando o ambiente

Você pode ir acompanhando o passo a passo do desenvolvimento do nosso projeto e, caso deseje, você pode baixar o projeto do curso ou acessar os arquivos do GitHub.
Bons estudos!

https://github.com/alura-cursos/typescript-curso-1/archive/2696c7ca452f2eb6468caaccc2699da2332a39a1.zip

https://github.com/alura-cursos/typescript-curso-1/tree/main

@@03
Modelo para o usuário

[00:00] Precisamos continuar a nossa aplicação. Nossa aplicação, no primeiro módulo, nós só chegamos até a parte que captura os dados do usuário, da negociação que o usuário imputa. Clico em incluir. Eu consigo ver no console.log, vou adicionar mais uma negociação.
[00:20] É possível notar que há uma lista de negociações sendo exibidas no console. Se eu volto para o nosso código, no ato de adicionar uma negociação, o nosso Controller cria uma negociação baseada no input do usuário, nos elementos de UI, e temos esse modelo de negociações.

[00:41] Esse modelo de negociações foi aquele modelo que nós criamos para garantir que uma negociação só pode adicionada nessa lista, ela não pode ser removida e nem modificada.

[00:53] Então, atendemos essas regras de negócio no primeiro curso. Agora, precisamos resolver uma coisa: não faz sentido eu pedir para o usuário incluir uma negociação e pedir para ele ver no console o resultado. Eu quero exibir essa lista de negociações em uma tabela bonita aqui, onde eu tenho a coluna data, coluna valor, quantidade. Eu quero exibir isso aqui embaixo.

[01:19] Então, com base nesse nosso modelo de negociações lá do nosso código, eu tenho que fazer isso toda vez que eu adicionar uma negociação lá dentro. O meu DOM, a minha página, tem que refletir os dados mais atualizados do meu modelo de negociações.

[01:37] Como fazemos isso? Há duas manerias. A primeira, e que eu não vou utilizar, é a imperativa, em que, no nosso código, vamos ter que criar manualmente uma tabela, um elemento com document, create, element, table, criar cada tr na tabela, passar os dados para ela.

[02:02] Ao programar de maneira imperativa, vou gastar bastante tempo escrevendo um código responsável pela mutação do DOM, dos elementos da tela, e eu ainda vou ter de me preocupar em toda vez que eu adicionar uma negociação, ter que ir lá na tela atualizar a minha página para refletir o meu modelo.

[02:25] A abordagem que eu vou utilizar vai ser a abordagem declarativa. Isso significa que no lugar de eu ficar programando cada elemento do DOM, atribuir valor, o que eu vou fazer? Eu vou escrever um template HTML que vai buscar os dados do nosso modelo, e ele automaticamente vai renderizar esses dados no HTML toda vez que meu modelo mudar.

[02:52] Você pode questionar: Flávio, então é por isso que você está com essa aba do React aberta do lado esquerdo?. É por isso. Porque o React usa essa maneira declarativa na hora de trabalhar. Não quer dizer que vamos criar um React, mas, sim, um micro framework, usando o TypeScript, que é bem parecido com o conceito do JSX do React, que eu vou relembrar.

[03:17] Se você já viu, ou nunca viu, não precisa se preocupar. Só vou fazer um paralelo sobre algo bem legal. Eu tenho um projeto do React, onde estou exibindo uma lista de nomes com Flávio, Henrique e Almeida.

[03:32] Se eu olho para o código desse projeto do React, você não precisa saber nada de React. Olha comigo. Eu tenho esse item aqui, que é uma classe, chamada component, e dentro dele tem uma propriedade state, onde eu tenho uma lista de nomes.

[03:48] Essa lista de nomes é modelo para o React. E se eu olho no método hanger, vamos ter um HTML com uma UL, um HTML escrito, e dessa lista, com o meu modelo, eu vou interagir nessa lista de modelo e vou gerar o novo HTML com os dados desse modelo.

[04:12] Então, isso significa que se eu voltar para cá, está escrito Flávio. Se eu troco para Camila e salvo, volto no meu navegador, o “Camila” mudou. Por quê? Porque toda vez que eu mudar o meu modelo, eu quero que minha view seja atualizada. Então, a maneira de trabalhar com o JSX é interessante porque é uma forma declarativa.

[04:36] Eu tenho o meu modelo de um lado, tenho o meu template do outro, e peço para o React fazer o seguinte: “React, toma esses dados e gera esse HTML para mim”. Vamos fazer algo bem parecido no nosso projeto.

[04:50] Vamos criar uma solução de view, uma solução para eu pegar uma view, passar o modelo para ela e falar: “View, se vira. Renderize esse item para mim”.

[04:59] Então, isso vai tornar o nosso projeto mais interessante, vai nos instigar a entender um pouco como o React funciona. Mas, o mais importante, é que vai demandar da gente um conhecimento maior de TypeScript.

[05:14] Então é isso o que eu quero colocar para vocês. Eu posso fechar a aba desse projeto do React, porque eu não vou trabalhar mais, e vamos lá começar a nossa solução de view.

@@04
Criando nossa primeira view

[00:00] Vamos partir para a nossa implementação da view de negociações. A primeira coisa, lá dentro da nossa pasta do projeto, nós temos a pasta “models”, temos a pasta “controllers”, e agora temos a pasta “views”.
[00:22] Dentro de “views”, eu vou criar o arquivo negociações-view.ts. Vou criar esse arquivo lá dentro. Como estamos usando página de orientação objeto, eu vou fazer o export class negociaçõesView. É uma class negociaçõesView que faz parte do módulo negociações-view, que eu vou precisar importar em outros lugares da aplicação, por isso que tem aqui o export.

[00:58] Essa classe vai começar, agora, só para compreendermos o mecanismo, com um único método, que é template. Esse é o único método template que vai sempre retornar uma string. Método template retornando uma string.

[01:20] Está dando erro porque eu preciso retornar alguma coisa, e o TypeScript é inteligente o suficiente para detectar, e nós vimos isso no módulo anterior, que se eu estou dizendo que eu estou retornando uma string, eu preciso retornar.

[01:30] Qual é a razão de existir deste template? Ele vai me retornar uma string HTML, no futuro, com a HTML que eu quero mais os dados que eu quero, fundidos nesse HTML. Mas, por enquanto, eu só vou retornar o HTML da tabela com o seu cabeçalho.

[01:53] Como eu vou fazer? Eu vou dar um return de uma template(): string. Sobre JavaScript, estudamos nos outros cursos que existe uma string e a template string. Uma das vantagens do template string é que ele permite quebrar a linha sem precisar ficar concatenando, colocando mais.

[02:17] Isso significa que tudo o que eu escrevi aqui dentro vai ser parte da string. E isso é perfeito, porque podemos inventar o nosso código. Então, o que eu vou retornar?

[02:31] Para não ficar quebrando muito a questão de orientação, eu vou escrever logo embaixo. Eu vou escrever uma <table class=’’table. Se você passar o mouse em cima, em cada uma das TRs, eu quero que faça um hover. Então, eu vou usar o table-hover, e eu quero ter uma borda. table-bordered.

[03:00] Então, estou criando uma table. Você pode dizer: “Flávio, você está escrevendo uma HTML”. É isso. Lembra daquela ideia da forma declarativa? Estou declarando como deve ser a minha tabela. Vai ser uma table com a classe table, table-hover, table-bordered. Tudo isso vem do boostrap, que já é importado automaticamente pela aplicação.

[03:20] Vou ter um thead, que é o cabeçalho da tabela. Dentro do cabeçalho da tabela eu vou ter uma tr, que é a linha que representa os meus dados, o cabeçalho. E aqui eu vou colocar um th, porque como é cabeçalho, não se usa td, usa th.

[03:46] O th, que é o table header. Primeiro vai ser data, fecha aqui o th. Vou ter o quantidade th. Vou ter o valor th. Então, faz sentido? Se você escreve HTML, você sabe que esse HTML é uma tabela onde eu tenho o cabeçalho dela. A primeira linha no cabeçalho dela tem uma coluna data, uma coluna quantidade e uma coluna valor.

[04:33] Agora eu preciso definir o table body dela, que vai ser o tbody. Só que o tbody, ainda não vamos trabalhar com ele. Mas você já vai encaixando na sua cabeça que esse template, quando eu chamar, ele tem que gerar essa tabela aqui com os dados da minha negociações.model. Faz sentido?

[04:56] Então, vamos fazer um pequeno teste, só para saber se as coisas estão se encaixando.

@@05
Integrando nossa view à página

[00:00] Vamos fazer um teste. Vou em APP, e vou fazer o seguinte: importar a minha negociação. Primeiro eu vou tentar ver se ele vai fazer o “autoimport” corretamente.
[00:14] Vou fazer const negociaçoesView = new NegociaçõesView. Ele vai fazer o “autoimport”, fez para mim. Se ele não fez para você, esse é o import, que a gente vai pegar o NegociaçõesView lá da pasta views/negociações-view, verifica se ele colocou o JS, porque de vez em quando ele não coloca, o Visual Post Studio está meio arredio.

[00:44] Verifica se tem o JS. Estando tudo correto, vou fazer const template = negociaçõesView.template. Vou fazer o método template. Vou fazer um console.log só para atestarmos a saída no terminal. Salvei. Vou voltar para o meu navegador.

[01:08] Ao carregar a minha página, já tem que ter sido suficiente para exibir o template. E está lá a minha template string com esse item. Agora começamos a evoluir. Esse item tem, de alguma forma, como aparecer aqui como elemento dos DOM.

[01:27] Então, como vamos fazer isso? Vamos lá comigo. A ideia é o seguinte. Eu vou tirar esse negociações-views daqui. Vou salvar. Vou lá em negociações-view.

[01:43] É necessário que o negociações-view saiba qual é o elemento do DOM, o alvo no qual ele tem que pegar esse template e, de alguma maneira, renderizar. Tem de dizer é a área de index.HTML que vai receber o template.

[02:01] Podemos ir à página HTML que estamos trabalhando, index. Está dentro de DIST. Não posso apagar. Eu quero que seja logo abaixo do formulário.

[02:27] Eu vou criar uma DIV com uma ID=negociaçõesView. Uma DIV só. Flávio, por que você criou essa DIV?. É essa DIV que vai receber a renderização do nosso template quando a nossa view for renderizada. Então eu preciso ter um lugar no HTML que vai receber esse item.

[02:55] Mas esse elemento do DOM que está aqui, ele tem, de alguma forma, estar disponível para a minha negociações-view. Então, como eu vou fazer isso? Eu vou chegar no construtor da nossa negociações-view, vou fazer um constructor, e vou passar como parâmetro aqui um seletor CSS, seletor.

[03:37] O que é isso? Deixa assim. Olha o que eu quero fazer. Salvei. Não está pronto. Vou lá no meu Controller, vou criar uma propriedade nova no meu controlador chamado private negociaçõesView = new NegociaçõesView.

[04:05] Fez o “autoimport”? Fez. Muito cuidado com isso. Fez o “autoimport”? Fez. Se não fez, você digita que está descendo uma pasta, entrando em uma pasta de views e pegando negociações-view.

[04:22] Ele não está compilando, porque precisa pegar um seletor. E olha que interessante. Qual seletor eu vou passar para ele? Qual elemento do DOM que eu quero que minha view seja renderizada por cima? negociações-view.

[04:37] Passei um seletor CSS para ele, seja, o meu negociações-view que está aqui, ele vai ter que renderizar a minha negociações-view. Significa que assim que minha página for carregada, eu já quero ver a tabela, mesmo que seja vazia.

[04:56] Com o meu construtor, eu vou fazer negociaçõesView.template, algo nesse sentido. E o meu elemento do DOM tem de ser renderizado. Mas, antes de fazer isso, vamos voltar lá para o nosso negociaçõe-view.

[05:17] O que eu tenho de fazer aqui? Dado esse seletor, eu tenho que guardar o elemento do Dom que eu peguei. Então, eu vou criar uma propriedade da minha classe também, private elemento, e esse item vai ser HTMLElement. Ponto e vírgula, e ele vai ficar vazio.

[05:46] O que eu fazer agora? Na hora de eu passar o seletor, eu vou dizer que this.elemento = document.querySelector(seletor). Ele vai lá no DOM, vai pegar esse item e vai automaticamente jogar para o elemento da minha página. Então isso significa que a minha view vai ter um cash. Ela vai sempre guardar o elemento do DOM, no qual eu quero gravar esse template.

[06:18] Eu não preciso ficar buscando toda hora. Então, o que vamos fazer? Eu tenho o método template. Ele é só para gerar template. Mas se formos pedir para a view, se eu for falar em inglês, eu vou falar: “View, faz o seu update para mim?”.

[06:37] Então eu vou criar um método chamado update, que por enquanto não recebe valor nenhum, vai ser void. Ele não recebe valor nenhum, e o que o update vai fazer? Ele vai pegar o elemento do DOM. Todo elemento do DOM tem uma propriedade innerHTML.

[06:57] Significa que qualquer HTML que você jogar lá dentro, se estiver ok, ele vai transformar em elementos do DOM. Então, quem é eu quero jogar aqui para dentro? O resultado de template.

[07:10] Então, vamos lá. Para quê serve o método template? Declarar o template da minha view. Para quê ser o método update? Para renderizar esse template em um elemento que eu captei através do meu construtor, passando o seletor e pegando com o querySeletor.

[07:30] Será que é suficiente? Vou salvar. Flávio, mas ainda não tem dado nenhum. Vou chegar lá. Vou voltar para o nosso Controller. Assim que a página é criada, vou fazer this.negociaçõesView.update. Vou salvar.

[07:50] Salvei. Vou voltar para o navegador. Quando você olha aqui, já vejo a minha tabela. Ele colocou a table dentro da div, negociações-view. Então, o que eu vou fazer?

[08:05] No próximo vídeo, eu vou fazer uma revisão para que possamos evoluir.

@@06
Criando elementos do DOM dinamicamente

Utilizando a API do DOM, podemos criar elementos dinamicamente através de document.createElement ou:

Através da propriedade innerHTML que aceita receber elementos do DOM.
 
Alternativa correta
Através da propriedade innerHTML que recebe uma string que é convertida para elementos do DOM.
 
Alternativa correta!
Alternativa correta
textContent, que aceita receber uma string que é convertida em elementos do DOM.

@@07
Revisando nossos passos

[00:00] Pessoal, vamos fazer uma revisão relâmpago, para ficarmos com esse conhecimento bem sólido, porque vamos levar até o final do treinamento. A questão toda é, voltando para o navegador: o nosso objetivo é pegar os dados do usuário, criar um objeto de negociação, inserir esse objeto de negociação no nosso objeto negociações, o nosso modelo de negociações, e exibir na tela.
[00:24] Para exibirmos na tela, vamos criar uma solução de view caseira, homemade, parecida com o JSX do React. Ou seja, eu vou ter um pedaço da minha view, no qual eu vou dizer para o navegador o seguinte: “Renderize este elemento no meu index.html”.

[00:47] Por enquanto só exibimos uma tabela vazia, só com cabeçalho, sem qualquer dado, sem misturar os dados, mesclar os dados com essa tabela. Mas o nosso objetivo final é: na hora em que eu renderizar essa tabela, se eu adicionei três negociações, no momento em que eu clicar adicionar, eu não quero me preocupar, mas essa tabela tem que ser renderizada e refletir o meu modelo no display do DOM, do elemento do DOM na tela.

[01:17] Então, como fizemos isso? Criamos, dentro da pasta “views”, um item chamado negociações-views. Vamos fazer uma dobradinha, que se eu tenho o modelo negociações, e eu quero exibir na view, nós vamos criar um negociações-views.

[01:38] O que é esse item? É uma classe, a instância de negociações view recebe, no seu construtor, o seletor do elemento no qual, no final, quando eu chamar o método update, o template definido por esse, este objeto, será renderizável.

[02:00] Então, quando você que eu passo o seletor, eu faço um document.querySeletor(seletor), obtendo o elemento do DOM no qual eu quero renderizar o meu template.

[02:11] E se eu volto para negociações-controller, no construtor, no atributo da classe negociação-controller, eu já crio uma instância de negociações-view, passando, como parâmetro, o ID do elemento que eu quero renderizar minha table dentro dela.

[02:30] Nós vimos que o nosso negociações-view tem dois métodos. Template, é aonde eu defino o template da minha view. Não poderia ter nome melhor. Flávio, não podia ser em uma propriedade?. Não, é método. Vamos entender melhor quando eu começar a misturar dados no template.

[02:51] E o método update. Está tudo se encaixando, está tudo maravilhoso, mas o que precisamos aprender no próximo vídeo é o seguinte: quando eu chamar o update, eu quero que ele seja feito com os dados atualizados da minha view.

[03:10] Ou seja, o update que vai ser chamado, que atribui o template para o innerHTML do elemento, e ele vai ter de pegar o meu modelo-negociação e renderizar dentro de tbody a lista de elementos.

[03:29] Então é isso o que vamos ver no próximo vídeo.

@@08
Unindo view e modelo

[00:00] Vamos continuar. Agora, a nossa view precisa receber os dados do modelo para renderizar, funcionar. Quando eu fizer isso daqui, adicionar uma nova negociação, por um passe de mágica, eu quero que aquela negociação apareça lá na tabela.
[00:15] Então, como vamos fazer isso? Vou voltar lá para o meu negociação-controller. Está vendo aqui? Esse negociação-controller tem o método update. O que eu vou fazer? Toda vez que eu chamar esse método update, eu vou fazer o seguinte: “View, faça o seu update levando em consideração”, olha quem eu vou passar: this.negociacoes.

[00:46] Quem é? Negociações. É o meu modelo negociações. Então, o meu update vai fazer o seguinte: para essa view, eu estou passando negociações, então é essa lista negociações que eu vou usar para gerar o HTML.

[00:58] Eu estou tendo um erro de compilação porque o meu update não recebe parâmetro nenhum. Então, vamos consertar. Seguro Control, clico em update. Agora estou dentro de update e eu vou receber o que eu vou chamar de model.

[01:20] Qual é o model que eu vou receber? Negociações. Vou dar enter. Agora vou lá em cima ver se ele fez o import. Fez, mas, veja, não colocou o JS no final. Coloca o JS, senão não vai funcionar.

[01:43] Fiz o import de models/negociação, estou recebendo o item. Esse modelo que foi passado para o update, precisa ser passado para o template, porque, no final é o template que vai pegar esses dados, vai gerar uma string gigante e vai adicionar o innerHTML do meu elemento, fazendo com que ele seja renderizado.

[02:07] Então, eu tenho que passar esse model para cá. Mas o template não recebe parâmetro nenhum. Então eu vou fazer ele também receber o model. Qual o tipo? Negociações, porque é o meu model que encapsulou a lista de negociações.

[02:29] Fiz isso. E agora? O que eu vou fazer? Eu tenho que renderizar, no meu tbody, uma ATR com TD para cada dado, que são data, quantidade e valor. Como eu faço isso? Como isso é uma template string, eu posso fazer tranquilamente o $, abro e fecha chaves.

[02:51] Tudo o que está aqui vai ser interpolados com o HTML. Então, olha o que eu vou fazer? Eu estou usando um recurso bobo do template string, mas que dá um grande poder. Eu vou dizer: “Olha, nessa parte que está aqui, processa um JavaScript para mim”. E o resultado final vai ser “cuspido” dentro desse tbody.

[03:12] Então, quem eu quero pegar? model.lista. Lembra que ele lista para mim todos os elementos? O que eu vou fazer? Como ele é um array, eu posso chamar o método map(). E desse método map(), eu vou escrever negociação.

[03:36] Isso significa que para cada item da minha lista, eu vou fazer um map. Por que eu tenho de fazer um map()? O resultado disso, gente, olha, tem que ser um HTML, uma String.

[03:52] Então, eu tenho que converter esse negociação em uma string para ser inserida nesse tbody. Então, cada negociação tem que virar uma TR com TD. Então, o que eu vou fazer aqui dentro? Dentro desse item, eu vou fazer o seguinte: esse item vai me retornar outra template string.

[04:14] Ou seja, para cada negociação que é um modelo, eu vou retornar uma string. Que string é essa? É uma TR, onde dentro dessa TR, eu vou ter uma TD, que vai ser a primeira TD, a data, uma TD da quantidade, e uma TD do valor.

[04:46] Então, se eu fizer isso do jeito que está aqui, do jeito que está, ele vai retornar uma lista, onde cada item dessa lista é essa string, que tem que considerar o dado da negociação.

[05:02] Olha que legal: essa negociação está no escopo desse bloco. Então, olha o que eu posso fazer. Posso fazer $, abro e fecho, e aqui eu digo que para essa negociação, ponto. Olha o TypeScript fazendo o autocomplete para mim. Maravilhoso.

[05:24] Eu vou dizer que a segunda coluna é a quantidade. “Exiba-me a quantidade”. E para outra coluna, negociação, imprime para um valor. Na data, eu vou colocar uma interrogação por enquanto, porque essa aqui nós vamos pensar mais um pouquinho.

[05:42] Mas, o mais importante, é: template vai me retornar uma string com a tabela onde o tbody, vai ser cuspido onde está o tbody, uma string que é a conversão de todos os meus modelos de negociação para uma lista de strings.

[06:06] Mas tem um problema. Se eu fizer isso, o retorno vai ser um array. E se eu dou um print nesse array, direto, ele pode colocar uma vírgula que eu nem pedi para colocar.

[06:18] O que eu vou fazer? Nós sabemos que todo array tem o join. Eu vou dizer o seguinte: pega a minha lista, converte cada modelo que é um objeto JavaScript em uma string. Depois que você me retornar esse array onde cada item da lista é um string, junta todo mundo numa única string, grande, e o separador entre eles vai ser o espaço, vai ser nenhum. Será que vai funcionar? Vamos ver.

[06:50] Vou colocar aqui, fazer isso: const template = this.template(model), console.log(template, e aqui eu vou dizer que esse item é igual ao template. Salvei. Vou voltar no meu navegador. Quando eu recarrego a minha página, eu não tenho negociação nenhuma. Então, o que eu preciso fazer?

[07:21] Preciso voltar lá no meu Controller. Salvei. Toda vez que eu adicionar, sempre após adicionar um item, sempre, o que eu tenho que fazer? negociaçõesView.update(this.negociações).

[07:44] Faz sentido? Eu adicionei na lista, agora eu faço: View, atualiza aí, por favor, com esse carinha aqui, que é o meu modelo de negociações? O que ele vai fazer? Ele vai compilar o template, vai gerar o template nessa string que fizemos o print no console, e vai atribuir direto no innerHTML.

[08:06] Vou salvar. Vou voltar lá no navegador. Vou colocar vários 1. 1, de novo. 1, incluir. Olha lá, incluiu. Vou colocar a segunda. 2, zero, zero. Incluo, incluiu a segunda. Vou colocar a terceira. Vou colocar 4, vou colocar 500, tem que incluir.

[08:30] Então, a nossa solução de view está funcionando, porque ela está chegando agora. Toda vez que meu controle é carregado, ele já vai garantir e renderizar. Como a lista está em branco, eu não vou ter item nenhum.

[08:47] E após adicionar cada item na lista, eu peço para a minha view fazer o update, passando como parâmetro modelo que o método update está necessitando. O que falta agora é resolvermos a questão do nosso view da data, e é esse o tema do próximo vídeo.

@@09
A arte do template string

Guga escreveu o seguinte código:
let vogais: string[] = ['a', 'e', 'i', 'o', 'u'];
let template = `

    <ul>
        ${
            vogais.map(vogal => {
                return `
                    <li>${vogal.toUpperCase()}</li>
                `;
            }).join('')
        }
    </ul>
`;
console.log(template);
COPIAR CÓDIGO
A saída de console.log exibirá:

<ul>
    <li>A</li>   
    <li>E</li>     
    <li>I</li>      
    <li>O</li>      
    <li>U</li>    
</ul>
 
Alternativa correta! Será renderizada uma <li> dinamicamente, de acordo com os valores do array.
Alternativa correta
<ul>
    <li>a</li>     
    <li>e</li>      
    <li>i</li>    
    <li>o</li>     
    <li>u</li>  
</ul>
 
Alternativa correta
<li>A</li>
<li>E</li>
<li>I</li>
<li>O</li>
<li>U</li>
 
Alternativa errada! Onde está a tag <ul>?

@@10
Formatando a data

[00:00] Temos que resolver, agora, o problema de formatar a nossa data. Por enquanto, eu estou exibindo uma interrogação. Como vamos fazer isso?
[00:08] Eu vou usar um recurso no browser. Não é muito antigo, também não é muito recente. Vamos usar o próprio formatador do navegador nativo, que vai considerar a localidade do seu navegador para fazer o formato de data.

[00:27] Por exemplo, se você está nos Estados Unidos, verificará mês, dia e ano. Se você está no Brasil ou está na Inglaterra, dia, mês e ano. Então, ele vai se encarregar disso pegando a configuração padrão do navegador.

[00:39] Como nós fazemos isso? Eu vou colocar, de novo, uma template string aqui dentro, e eu vou criar uma instância de Intl, de Internationalization. Na verdade, vou chamar o método estático dele. Vou criar uma instância, mas essa instância vai ser uma instância de Intl.DateTimeFormat.

[01:05] Entenda isso como se fosse uma classe onde tem um monte de métodos estáticos. E eu estou dizendo para ele criar uma instância de DateTimeFormat. Como eu não passei parâmetro nenhum, ele vai adotar a localização padrão do navegador onde o usuário está.

[01:22] Vou colocar Intl.DateTimeFormat().format, e passo como parâmetro quem eu quero que ele formate. Quem eu quero que ele formate? Negociação.data. Há muito tempo, no antigo curso de TypeScript, eu concatenava a data, o dia, mês e ano, mas essa forma é mais à prova; independente do navegador que estiver, vai considerar a localização dele e vai exibir no formato esperado.

[02:05] Então, peço aqui, e vai funcionar, porque eu estou fazendo essa interpolação $, abre e fecha chaves. Vamos ver o resultado. Salvei. Se ficar muito grande, não tem problema nenhum vocês fazerem isso aqui, se vocês quiserem e pensarem que fica melhor, pode fazer isso aqui também. Não tem problema nenhum. Vai ser interpolado da mesma forma.

[02:38] Vou salvar. Salvei. Vou ao navegador. Vou colocar 12/01/2021. Quantidade, 100. Incluo. Olha lá, 12/01/2021. Agora eu vou colocar 15/12/2023. Quantidade, 10. Valor, 100. Está lá, 15/12/2023. E a quantidade, 10 e valor 100.

[03:06] Então, a gente conseguiu, está funcionando. Que é uma maravilha. Claro que isso aqui não é algo que você vá usar em produção, mas a nossa solução de view parece que funciona legal.

[03:18] Porque eu defini o template uma vez; toda vez que eu adiciono, eu peço para a minha view renderizar, de novo, a minha lista de negociações atualizadas.

[03:33] Só que agora já está tudo assentado, tudo para a gente continuar, e agora nós vamos ver que o negócio não está tão bom assim, não. E é isso o que vamos ver no próximo capítulo.

@@11
Faça como eu fiz

Chegou a hora de você seguir todos os passos realizados por mim durante esta aula. Caso já tenha feito, excelente. Se ainda não, é importante que você execute o que foi visto nos vídeos para poder continuar com a próxima aula.

Continue com os seus estudos, e se houver dúvidas, não hesite em recorrer ao nosso fórum!

@@12
O que aprendemos?

Nesta aula, aprendemos:
Inspiração no React para criação de templates declarativos e dinâmicos
Manipulação declarativa do DOM através de template
Template dinâmico
Formatação de datas usando Intl

#### 22/06/2024

@02-Herança e reaproveitamento de código

@@01
Projeto da aula anterior

Você pode ir acompanhando o passo a passo do desenvolvimento do nosso projeto e, caso deseje, você pode baixar o projeto do curso.
Bons estudos!

https://github.com/alura-cursos/typescript-curso-2/archive/29091de4aa6ede422cad620296eff8dd4cb03bab.zip

@@02
Criando view da mensagem

[00:00] Voltando para o nosso projeto, nós já conseguimos adicionar negociações, consegue exibir a data, quantidade e o valor. Eu poderia exibir o volume, mas eu não quero exibir o volume. Poderia, mas não me interessa ver o volume agora.
[00:14] Mas, o mais importante é o seguinte. Toda vez que eu adicionar uma negociação, o que você acha de exibir uma mensagem aqui em cima dizendo que a negociação foi adicionada com sucesso? Isso não é muito comum no dia a dia?

[00:30] Vamos lá, vamos tentar fazer isso e ver o que vai acontecer, porque tem muita coisa que vai acontecer. Vamos lá, vamos voltar para o nosso código. Que nós temos que programar em TypeScript, aprender coisas novas.

[00:41] O que eu vou fazer? Eu vou lá dentro de views, e vou criar um arquivo chamado mensagem-view.ts. Na natureza, nada se cria, tudo se copia. Não é isso? Vou chegar lá em negociações-view, copiei tudo, voltei para a mensagem-view.

[01:05] Na verdade, eu não vou copiar. Vamos relembrar, vamos fazer juntos para relembrar. É melhor. Então, o que eu faço quando eu quero criar uma view. A primeira coisa que nós vamos ter que fazer é exportar uma classe. export class mensagemView. Estou exportando esse item.

[01:28] O que eu vou ter aqui no construtor? Eu vou receber um seletor que é do tipo string, vou ter uma propriedade da minha classe, private element: HTMLElement. Vimos no curso anterior que esse tipo já vem com TypeScript padrão para todos os tipos de elementos do DOM do JavaScript.

[01:58] O que vou fazer? Vou dizer que this.element = document.querySeletor, passa o nome do seletor, peguei esse item. Muito bem. Nós precisamos do método template, que vai retornar uma string. Também precisamos do método update, que vai ser void, não vai retornar nada, mas que por debaixo dos panos, vai fazer const template = this.template.

[02:41] Tem que passar o modelo. Vou ter de passar aqui o model. O model vai ser uma string, porque a mensagem que eu vou passar é uma string, não é um objeto. Esse item aqui eu passo para cá. Passei. Vou dizer que this.element.innerHTML = template. Fiz isso.

[03:10] Agora eu vou definir. Vem comigo, porque eu estou trabalhando com vocês aqui em um negócio bem legal, sem forçar uma barra natural, vamos ver o que vai acontecer.

[03:24] Eu tenho esse template, estou recebendo essa string aqui, eu tenho que ver qual template eu vou gerar aqui, é um parágrafo. Eu vou fazer o seguinte. Qual é esse template? Eu vou dar return e vou colocar aqui a template *string*, porque eu vou retornar um parágrafo com a class='alert alert-info, vou interpolar com o meu modelo, que é a minha string. Fecho o meu parágrafo.

[03:56] Então, esse é o template que eu vou retornar. Então, vamos recapitular. Recebo no seletor o ID do elemento que eu vou inserir esse parágrafo. Quando eu chamar o update, ele vai chamar o update do modelo e vai, por debaixo dos panos, chamar o template para gerar um template e eu adicionar no innerHTML.

[04:20] Não é novidade nenhuma. Até aqui, o template dele é muito mais simples do que o template do componente que acabamos de ver. Vou voltar lá no meu controller. Vou criar uma propriedade desse item aqui, que vai ser private mensagemView = new MensagemView.

[04:53] Enter. Abri e fechei. Sei que vai dar erro de compilação. Vamos olhar o import. MensagemView. Importou direito? Importou. Está com o dot js? Está. Tem que passar um ID para esse item. E eu vou passar. O ID vai ser #mensagemView.

[05:15] Agora eu preciso criar um elemento lá no HTML que tenha esse ID para eu poder renderizar esse item. Vou voltar lá no HTML. Eu quero que esse item seja exibido antes do formulário. Já está lá. Nosso template já veio com esse cara, id=‘mensagemView. No projeto inicial, eu deixei esse item aí. Era para ter removido, mas esqueci.

[05:44] Tem esse elemento aqui, vamos voltar lá para o nosso controller. mensagemView está aqui, o que eu tenho que fazer? É a mesma receita de bolo. Eu não vou chamar nenhuma inicialização, eu só vou chamar quando você adicionar.

[05:58] Quando eu acabo de adicionar, eu faço update da lista e peço para this.mensagemView.*update*, e eu vou passar uma mensagem legal, que eu vou falar assim: "Negociação adicionada com sucesso". Ponto e vírgula.

[06:26] Será que vai funcionar? Vou salvar, vou lá no meu navegador. Abri. Meu browse já fez o refresh. Eu vou fazer 30/127. 20. Incluir. Incluí. Ele fez aqui para mim, exibiu a tabela, renderizou a tabela e renderizou a mensagem. Perfeito. Tudo funcionando.

[06:55] Mas tem um problema nesse código. Em tudo o que nós fizemos, tem um mau cheiro. Nós vamos falar de bad smell. Tem um mau cheiro nesse código que está me incomodando, eu não sei se está incomodando vocês, e é isso que nós vamos estudar no próximo vídeo.

@@03
Resolvendo repetição de código

[00:00] Bom, vamos refletir um pouco sobre o que nós fizemos. Voltando para o nosso código, se eu abro a mensagem view e um lado, e negociação view do outro, vamos olhar linha por linha, excluindo o import? Vou olhar com você.
[00:17] Temos o Private element:, elemento. Vou chamar de elemento. Coloquei em inglês, element. Olha, elemento, elemento. Construtor, idêntico. Template, muda. Aqui, beleza. Template, muda, o template é diferente.

[00:42] Agora, em método *update*, idêntico. Então, não precisa meditar muito para perceber que estamos repetindo código. Toda view que criarmos, nós precisaremos repetir o construtor, que é o mesmo, o método update, que é o mesmo.

[01:04] Qual é a única coisa diferente, em teoria, olhando rapidamente? É o template do componente, do modelo, da view, que muda.

[01:18] Será que conseguimos de herança para resolver esse problema, tentar criar uma classe chamada view, e tentar herdar esses métodos e evitar replicar código?

[01:32] É aí que eu quero ver se nós temos jogo de cintura para fazer isso utilizando TypeScript. Vamos tentar resolver no próximo vídeo.

@@04
Herança e pequena surpresa

[00:00] Vamos lá. Eu vou começar bem “de leve”, e eu vou fazer o seguinte. O que eles têm de idênticos, de iguais aqui, é o construtor e a propriedade elemento. Vou começar por aí. Podemos fazer mais, mas é esse que eu vou começar.
[00:17] Então, o que eu vou fazer? Dentro de views, vou criar um arquivo chamado view.ts. Eu vou fazer export class View. O que ele vai ter? Um atributo private elemento: HTMLElement.

[00:37] O que ele vai ter aqui no construtor? construtor(seletor: string), e vai dizer que this.elemento = document.querySelector(seletor). É exatamente igual. Se eu olhar isso aqui, é exatamente igual aqui, e exatamente igual aqui.

[01:01] Então, o que eu vou fazer? Vou chegar aqui e vou apagar. Flávio, não faz isso. Vou fazer. Vou apagar, e vai dar problema no meu código, não vai compilar. Vou vir aqui em mensagem-view, vou apagar esse item. Salvei. Se eu abro aqui o terminal do TypeScript, está tendo um erro de compilação, porque se volto em mensagem-view, esse item.

[01:34] Por que não está funcionando? Porque eu não herdei. Então, o que eu vou fazer? Vou ir em mensagem-view e negociação-view, que agora não tem o construtor, vou fazer um extends e vou herdar de view. Vamos ver se ele vai fazer o import automático.

[02:05] Ele não está encontrando o meu elemento para importar automaticamente. Mas não tem problema, eu vou importar ele aqui. O VS Code ainda não está 5% para você trabalhar com sistema de módulos do JavaScript dentro dele, padrão. Então, vou ter de importar aqui na minha APP porque ele se recusou.

[02:29] O arquivo está correto, está lá, tinha que ter achado. Então eu vou voltar lá e fazer import { View } from ‘./view.js’;. Vamos importar. Se eu clico aqui neste item, foi encontrado. Está aqui.

[02:59] Agora eu vou fazer a mesma coisa com negociação view. extends view. Agora ele está aparecendo, era uma questão de cache. Enter. Fiz o import? Fez. Está aqui o import, certo, está com js no final. Salvei.

[03:18] Então, o que significa? Significa que eu estou herdando de view o construtor e o atributo private elemento: HTMLElement;. Só que se eu olho o meu código, vocês vão ver aqui que eu começo a ter um erro. Olha o problema.

[03:36] A minha classe mensagem-view está precisando acessar a propriedade elemento lá de view. O item negociação também precisa acessar a propriedade elemento lá de view. Mas qual o problema? O problema é que elemento é privado, e só pode ser acessado pela classe que definiu.

[04:03] "Então, Flávio, isso significa que eu vou ter de colocar public"? Salvei. Meu código passou. Se eu volto no navegador e coloco qualquer coisa, não funciona. Vou fazer isso? Claro que não. Você não vai fazer isso.

[04:21] Você vai voltar para privado, vai dar o erro. Por quê? Porque na nossa definição de view, o desenvolvedor não precisa saber da existência desse item aqui. Esse item está encapsulado dentro da view justamente para remover a complexidade do desenvolvedor ter de lidar com ele e não precisar interagir com esse elemento do DOM.

[04:41] Então, como resolvemos isso? A primeira coisa é o seguinte: em herança, uma classe filha, que é a mensagem aqui, mensagem-view e negociação-view, são filhas de view. Certo? Em herança, as filhas não podem acessar tributos privados do pai. O filho não pode meter a mão na carteira do pai.

[05:05] Mas, se eu troco o modificador de acesso da view para protected, oha que legal. Salvei. O meu código volta a funcionar. Que modificador protected é esse? Quando você está trabalhando com herança e usa o modificador protected, ele diz o seguinte: "Só eu, view, tenho acesso a essa propriedade protected, mas as minhas filhas podem tocar. Todo mundo que herdar de mim vai ter acesso".

[05:39] Tanto isso é verdade que agora eu mexo aqui, olha, e todo mundo que é filho está tendo acesso lá à propriedade elemento da minha view.

[05:49] Você pode questionar: "Flávio, mas alguém que criar a instância tem acesso a essa propriedade?". Não. Se você vier em negociação, onde eu declarei. Vou escrever o código só para vocês verem. this.negociações.View., se eu estou vendo template e update, não estou vendo elemento, porque ele é protected.

[06:10] Então, eu não quero filha de view, então não tem acesso. Diferente se eu tivesse colocado public. Se tivesse colocado public, o meu código ia funcionar, mas olha o que ia acontecer aqui. O elemento está exposto. * This is against the purpose*, isso é contra o propósito.

[06:29] Eu não quero que ninguém acesse esse elemento e possa manipular ou fazer query selector. Eu quero remover essa responsabilidade do desenvolvedor. Então, o modificador protected caiu igual a uma luva. Então, ele resolveu esse problema.

[06:49] Entenderam a diferença entre private, public e protected, e onde entra o contexto? Então, o que precisamos fazer agora, já conseguimos reutilizar bastante coisa, essa construtora, essa propriedade, mas ainda podemos reaproveitar mais código, e é isso o que vamos mais ver no próximo vídeo.

@@05
Utilizando Herança

Mônica decidiu criar um jogo em JavaScript, mas optou por utilizar TypeScript devido aos recursos extras da linguagem. Ela criou três classes:
Humanoide
Humano
Alienigena
Em termos de design, tanto Humano quanto Alienigena são humanóides, por isso herdam dessa classe:

class Humanoide {

    private _energia: number = 100;
    private _nome: string = '';

    get energia() {
        return this._energia;
    }

    get nome() {
        return this._nome;
    }

    set nome(nome) {
        this._nome = nome;
    }

}

class Humano extends Humanoide {

    private _idade: number = 0;

    get idade() {
        return this._idade;
    }

    set idade(idade) {
        this._idade = idade;
    }
}

class Alienigena extends Humanoide {

    private _energiaExtra: number = 100;

    get energia() {
        return this._energia + this._energiaExtra;
    }
}COPIAR CÓDIGO
Marque a alternativa verdadeira:    

A classe Humanoide não compila.
 
Alternativa correta
A classe Alienigena não compila.
 
Alternativa correta! Ela tenta acessar no através do seu getter get energia() uma propriedade privada da classe pai.
Alternativa correta
A classe Humano não compila.

@@06
Modificador de acesso

Temos o seguinte código:
class Pai {
    private nome = '';
}

class Filha extends Pai {

}

const filha = new Filha();
console.log(filha.nome);COPIAR CÓDIGO
Marque as opções verdadeiras sobre o código.

Mudar o modificador de acesso da propriedade nome de private para protected é uma solução garantindo apenas que classes filhas tenham acesso à propriedade.
 
Alternativa correta!
Alternativa correta
Mudar o modificador de acesso da propriedade nome de private para public é uma solução, porém qualquer parte do sistema poderá acessar essa propriedade.
 
Alternativa correta!
Alternativa correta
Mudar o modificador de acesso da propriedade nome de private para protected é uma solução, porém qualquer parte do sistema poderá acessar essa propriedade.
 
Alternativa correta
Mudar o modificador de acesso da propriedade nome de private para public é uma solução, garantindo que apenas as classes filhas tenham acesso à propriedade.

@@07
Mais surpresas com Herança

[00:00] No vídeo anterior, nós conseguimos reaproveitar a propriedade elemento e o construtor em negociaçãoView e mensagemView. Mas eu quero dar um passo além. Se nós olharmos em mensagem e negociaçõesView, nós vemos que o método update é bem parecido. O miolo dele é bem parecido, ele é idêntico nos dois lugares.
[00:27] Então, que tal eu tentar reutilizar esse método update lá em view. O que eu vou fazer? Vou chegar aqui eu vou copiar de mensagemView, esse método aqui, vou tirar daqui esse item. Tirei. Salvei. Vai dar um erro de compilação, claro, porque eu tirei esse item, e vou jogar esse método aqui para dentro de view.

[00:56] Temos um segundo problema. O segundo problema é que o template precisa fazer parte de view. Então, vamos lá. O que eu vou fazer aqui? Vou em mensagemView, vou pegar esse template. Vou deixar ele aqui por enquanto. Vou jogar ele para cá. Meu template está aqui, compilando.

[01:21] Mas a pergunta que eu faço para vocês: Esse template que está aqui, faz sentido ele ser usado para negociaçõesView ou para qualquer outro lugar? Não. Quem deve definir o comportamento desse template é a classe filha. A classe filha tem que reescrever esse método.

[01:41] Mas esse método, na hora em que nós reescrevermos, é preciso retornar algo. Então, olha o que eu vou fazer? Quem herdar de template, eu vou fazer throw Error(‘classe filha precisa implementar template o método template’).

[02:09] O que está acontecendo? Quem herdar de view vai ganhar o update, vai ganhar o template, mas se não implementar o método template, o que eu vou herdar vai lançar no erro, vai dar um erro. Então é por isso que em negociaçãoView, eu mantenho o meu template.

[02:29] Por que eu estou fazendo? Eu herdei de view, mas se eu não sobrescrever esse item, eu vou ganhar um template que quando eu chamar, vai lançar um erro. Eu vou olhar no console e vou perceber que não está funcionando.

[02:44] Então, o que eu fiz? Eu estou lançando uma exceção, forçando a filha a sobrescrever em herança, reescrever o comportamento do método. Então está tudo aqui funcionando, deixa eu salvar. Um view está com update e está com template.

[03:07] negociaçõesView está herdando o update e está sobrescrevendo o template. Mas, se eu olho aqui no console, eu vejo vários erros acontecendo aqui. O que está acontecendo? Você em negociaçãoView, o que esse método template e update está esperando como parâmetro? Uma string.

[03:34] Só que isso funciona para mensagemView, porque o template que eu estou sobrescrevendo é model: *string*. E agora, para a negociaçãoView? Para a negociaçãoView, eu vou tirá-lo daqui, olha. Tirei. Estou aqui. Reescrevi o template. Tirei o update porque também herdei o update, mas se nós reparamos, o template está reclamando que esse tipo negociações não é compatível com o tipo string da classe que eu herdei.

[04:11] Não encaixa. Ele tem que ser o mesmo tipo. O mesmo tipo que está em view tem que ser o mesmo tipo que está em negociaçãoView; o mesmo tipo que está em view tem que ser o mesmo tipo do mensagemView. Mas o problema é que isso aqui está em hardcoded, está fixo. Estou dizendo que é sempre uma string.

[04:27] Como eu resolvo isso? Estou com um problema. Quero escrever um código genérico, e tem esse problema. Então, de novo, eu tenho que resolver esse problema de compilação. Eu tenho que arrumar uma maneira desse meu update e template saber que se eu estou herdando de view, aqui, em negociaçõesView, ele tem que ser do tipo negociação.

[04:54] Se eu estou herdando dele em mensagemView, ele tem que ser do tipo string. E é isso o que nós vamos aprender no próximo vídeo. E não é uma novidade. Estudamos no primeiro módulo, mas agora nós vamos levar isso a um próximo nível.

@@08
Avançando no uso de Generics

[00:00] Vamos lá. Como nós vamos resolver isso? Eu quero que o view e o parâmetro sejam genéricos. Que esses parâmetros funcionem tanto se eu estender minha view na classe negociaçõesView, ou se eu estender dentro de mensagemView. Nós vamos resolver usando o generics.
[00:21] Nós estudamos o generics no primeiro capítulo, no primeiro módulo do curso, e agora vamos utilizar. Na definição da minha classe view, eu vou colocar aquele diamante e vou colocar um T aqui. Esse T é de type. Qual é o tipo que está aqui? Não sei.

[00:42] Mas eu sei que é esse tipo que eu quero considerar no meu update, e esse tipo que eu quero considerar no template. Então, se esse tipo é string, vai funcionar com mensagemView. Se esse tipo é negociações, vai funcionar com negociaçõesView.

[01:05] Vou salvar, e se eu volto lá para a minha classe, mensagemView, você vai ver que vai ter um erro no extend. O que é esse erro? Está dizendo que view é genérico, e eu tenho que dizer qual é o tipo que vai entrar no lugar desse T.

[01:20] O tipo que vai entrar aqui é extend. Salvei. Vamos lá para a negociaçãoView. Qual é o tipo que vai entrar aqui? O tipo que vai entrar aqui é negociações. Salvei. Nenhum erro de compilação. Vou provar para vocês. Vou voltar lá no navegador. Vou colocar aqui 2, 1, 3. Incluir. Tudo funcionando.

[01:56] O que aconteceu? Aconteceu que a nossa view tem um método que eu quero reutilizar. Isso é verdade. Porém, alguns parâmetros desses métodos, eu quero que seja definido o tipo na classe filha. Então, o que eu fiz? Eu disse que essa view tinha um tipo genérico T, de type.

[02:18] Então, onde tem esse T, eu substituo pelo tipo que eu tinha colocado fixo. Então, onde é que é definido esse T? Na hora em que eu estendo a minha negociação view, eu passo aqui em negociações.

[02:31] É esse negociações aqui, que eu passei, que vai entrar aqui. Olha que legal. Se eu coloco string, olha o que acontece. O meu template não funciona. Por quê? Porque está dizendo que se você colocou esse tipo genéricos string, ele está esperando que esse parâmetro model seja string.

[02:50] Se eu coloco string, vai passar, mas não tem nada a ver com o nosso código. Eu não estou passando uma string; eu estou passando negociação. Então é por isso que eu coloco negociação aqui. A mesma coisa em mensagemView.

[03:03] Eu estou dizendo que essa view vai trabalhar o T dela, onde eu estendi a mensagemView, vai ser do tipo string. Então é por isso que agora consigo colocar model e string, perfeitamente funcionando. Ou seja, eu abri uma lacuna na minha classe view, no qual as filhas podem definir.

[03:25] Isso caiu igual a uma luva. Porque, olha, consegui reaproveitar o meu update, que está idêntico. A única coisa que muda é o parâmetro e o método template. E isso que eu fiz é uma medida de precaução, porque se você chegar agora em negociaçãoView, mensagemView, e não definir o template, eu vou herdar o template do pai.

[03:50] Então, olha o que acontece quando eu rodo o código. Não tive erro de compilação. Agora eu vou rodar. Ele está dizendo que como a minha classe filha herdou de view e não sobrescreveu o template, qual é o código que está no template do pai que eu estou rodando? O que lança o throw.

[04:17] E eu estou lembrando o desenvolvedor que ele tem que implementar o método template. Mas, beleza. Não está muito legal, porque eu estou descobrindo o meu erro em runtime, em tempo de execução. Eu não estou descobrindo o problema disso em tempo de compilação, no TypeScript eu quero descobrir esse problema e tempo de compilação.

[04:39] E nós vamos aprender a resolver isso. Mas, o mais importante, agora, é entender essa questão generics, porque até agora, até no modo anterior, utilizamos generics do tipo array.

[04:49] Aqui, não. Estamos criando um tipo genérico. Tudo funcionando? Então, vamos continuar.

@@09
Dois tipos genéricos

Fernando utiliza muito o IndexedDB, um banco de dados que vive no próprio navegador. Com forte influência de padrões de projeto, decidiu criar um GenericDAO:
class GenericDAO {

    adiciona(objeto: Negociacao): number {
        /* implementação do método omitida */
    }

    apaga(objeto: Negociacao): void {
        /* implementação do método omitida */
    }

    buscaPorId(id: number): Negociacao {
        /* implementação do método omitida */
    }

    atualiza(objeto: Negociacao): void {
        /* implementação do método omitida */
    }

    listaTodos(): Negociacao[] {
        /* implementação do método omitida */
    }
}

// exemplo de uso

let dao = new GenericDao();
let negociacao = new Negociacao(new Date(), 1, 200);

// recebe o ID da negociação gerada

let id = dao.adiciona(negociacao);
let negociacaoBuscada = dao.buscaPorId(id);COPIAR CÓDIGO
O código escrito por Fernando não é genérico, pois está amarrado ao tipo Negociacao. Além disso, o ID do elemento no IndexedDB pode ser um número ou uma string, e esse tipo está fixo na definição da classe.

Marque a opção que torna a classe realmente genérica, permitindo persistir outros tipos, inclusive a definir um outro tipo de ID.

class GenericDAO<T, K> {

    adiciona(objeto: T): K {
        /* implementação do método omitida */
    }

    apaga(objeto: T): void {
        /* implementação do método omitida */
    }

    buscaPorId(id: K): T {
        /* implementação do método omitida */
    }

    atualiza(objeto: T): void {
        /* implementação do método omitida */
    }

    listaTodos(): T[] {
        /* implementação do método omitida */
    }
}
 
Alternativa correta! Pode indicar mais de um tipo genérico. No caso T, será o tipo da classe e K, o tipo do ID.
Alternativa correta
class GenericDAO<T> {

    adiciona(objeto: T): number {
        /* implementação do método omitida */
    }

    apaga(objeto: T): void {
        /* implementação do método omitida */
    }

    buscaPorId(id: number): T {
        /* implementação do método omitida */
    }

    atualiza(objeto: number): void {
        /* implementação do método omitida */
    }

    listaTodos(): T[] {
        /* implementação do método omitida */
    }
}
 
Alternativa errada! Apenas o tipo da classe é genético, é necessário que o tipo do ID também seja.
Alternativa correta
class GenericDAO<K> {

    adiciona(objeto: Negociacao): K {
        /* implementação do método omitida */
    }

    apaga(objeto: Negociacao): void {
        /* implementação do método omitida */
    }

    buscaPorId(id: K): T {
        /* implementação do método omitida */
    }

    atualiza(objeto: Negociacao): void {
        /* implementação do método omitida */
    }

    listaTodos(): Negociacao[] {
        /* implementação do método omitida */
    }
} 
 
Alternativa errada! Apenas o tipo do ID é genético, é necessário que o tipo da classe também seja.

@@10
Implementando uma classe abstrata

[00:00] Vamos resolver esse problema aqui, porque o negócio está estranho. Olha só. View define o template, e se você herda na filha a view e não sobrescreve o template, em tempo de runtime, eu vou lançar essa exceção para lembrar o desenvolvedor que ele tem que implementar o método template.
[00:27] Só que vimos, no vídeo anterior, que esse vai acontecer em runtime. Eu queria, em tempo de desenvolvimento, que o desenvolvedor, quando chegasse aqui em view, se ele esquecer de implementar o método template, eu quero ele eu saiba agora, nesse exato momento, que eu sou obrigado a sobrescrever esse item.

[00:52] Outra coisa. Faz sentido eu fazer isso aqui? Não faça, só me acompanha, só entre nós dois. Eu vou fazer const view = new View. Vamos ver se ele importou automaticamente. Importou, colocou certo.

[01:10] A view, eu tenho de passar um seletor. Vou passar um seletor qualquer. A primeira coisa que eu pergunto para vocês: faz sentido eu criar uma instância de view? O que uma instância de view faz?

[01:32] Uma instância de view tem método update, tem um método template, e ele não vai fazer nada, porque ele não tem o template. A view é incompleta sem ter uma filha que implemente o método template.

[01:48] Então, se eu chegar aqui nesse código, eu vou chamar o método view.update, vou colocar Xuxa. O que vai acontecer? Não faz sentido nenhum. A view nem poderia ser instanciada, porque ela é incompleta.

[02:11] Ela tem que ser herdada por uma filha, e a lacuna do template tem que ser coberta. Não faz sentido eu fazer isso. E isso pode até complicar o desenvolvedor, que ele pode achar que ele pode trabalhar com a view diretamente. Mas não vai funcionar como esperado.

[02:25] Então, como fazer isso? Vou deixar aqui. Não precisa fazer, me acompanha. Isso aqui você precisa fazer. Vamos lá para a view. O que eu vou dizer? Vou dizer que view é uma abstract class, uma classe abstrata. O que é isso?

[02:48] Vou salvar. Salvei. Vou voltar em app. A primeira coisa boa que acontece é o seguinte: em uma classe abstrata, você não pode criar uma instância diretamente dela. Você só pode se o filho herda essa classe e você cria uma instância do filho.

[03:08] O negócio está ficando bom, porque eu não deixo o desenvolvedor criar a minha view porque ele vai saber que é uma classe abstrata. Ótimo, Flávio. Vamos fazer comigo. Salvei.

[03:22] Agora, olha que interessante. Toda classe abstrata, ela pode ter nenhum, ter zero ou mais métodos abstratos. O que é um método abstrato? É um método que a classe pai não sabe como vai ser implementado. Vai ser responsabilidade da classe filha. Olha que lindo.

[03:48] Não preciso dessa gambiarra do throw, não preciso definir o método. Eu só vou dizer que esse método é um abstract template, que recebe Model T. você vê que não tem nem o bloco do método, porque não faz sentido eu colocar esse item.

[04:09] Agora, olha que lindo. Eu fico até arrepiado. Salvei. Vou em app. Antes, vamos ver se está tudo compilando. Está tudo compilando. Vou lá em mensagem-view.

[04:22] Sou um estagiário na empresa, que chegou na empresa, criei uma view e não defini o template. Salvei. Olha o que o TypeScript vai acusar. "Caro estagiário, em mensagem-view, o método abstrato, template, tem que implementado. Você não pode esquecer de implementá-lo, senão o seu código não vai nem compilar".

[04:50] E faz sentido. Agora eu vou voltar ele para cá. Voltei. Acabou o erro de compilação. Agora, se eu tenho um código, escrevo um código, e esqueço de definir o template em runt, em tempo desenvolvimento, eu não preciso esperar em runtime para saber que o meu código está faltando.

[05:10] Então, o que o TypeScript está fazendo aqui é aplicar o paradigma da orientação objetos, aplicar o conceito de herança, classes abstratas, métodos abstratos, para que você consiga escrever um código menos sujeito a erros, forçando o desenvolvedor a seguir um único path, um único caminho na hora de escrever o seu código.

[05:28] Está ficando bom ou não está? Olha, fica até chique. Eu chego em view e falo que view é uma classe abstrata e genérica. Por que é abstrata? Porque não faz sentido criar uma instância de view, e eu quero forçar todo mundo que herdar dessa classe, forçar que eles implementem o método abstract template.

[05:51] Porque esse método, a classe pai não é capaz de definir. A filha que tem que definir. A classe pai é responsável por cuidar da chamada do método update, do construtor, do protected. Mas o template, meu amigo, sem ela eu não vivo.

[06:04] Então, filha, você vai herdar de mim, mas você tem que fazer o trabalho que eu não fiz na minha geração, que é implementar o método template.

[06:13] Então você vê que agora, olhando para cá, olha como aproveitamos o código. Se eu olho agora a mensagem-view, qual é a minha única responsabilidade de mensagem-view? Definir o template.

[06:25] Qual é a minha única responsabilidade de negociações-view? Definir o template. E não tem mais nenhuma responsabilidade. O restante está encapsulado na minha classe abstrata view, genérica.

[06:39] Ficou claro? O TypeScript é poderoso, porque você não consegue fazer isso em JavaScript, padrão. Então ele é muito poderoso, porque ele traz esses recursos da orientação objeto, do paradigma da DAO, e mais essas questões flexíveis como generics, para tornar o seu código flexível, é um código flexível, e, ao mesmo tempo, estaticamente, é tipado, onde o desenvolvedor não tem como fugir de seguir uma determinada regra.

[07:02] Ficou claro? Então, podemos continuar? Deixa eu diminuir aqui, para vocês verem a implementação total de view, caso vocês ainda estejam digitando. E é isso. Então vamos partir para o próximo capítulo.

@@11
Utilizando Herança

Eduardo tem que lidar com a geração de boleto bancário para diversos bancos. Contudo, apesar dos boletos serem muito parecidos, cada banco possui um cabeçalho diferente.
Ele decidiu então escrever o seguinte código:

class Boleto {

    geraLinhaDigitavel(): string {
        /* lógica comum dos bancos */
    }

    geraCabecalho(): string {
        throw new Error('Você precisa implementar a cabeçalho');
    }
}

class BoletoBancoA extends Boleto {

    geraCabecalho(): string {
        /* lógica de geração do cabeçalho do banco A */
    }

}

class BoletoBancoB extends Boleto {

    geraCabecalho(): string {
        /* lógica de geração do cabeçalho do banco B */
    }

}COPIAR CÓDIGO
Marque a afirmativa verdadeira a respeito do código de Eduardo.

Não faz sentido haver instâncias de Boleto, pois a classe não define a implementação de geraCabecalho(). Essa responsabilidade é das classes filhas, mas nada obriga o desenvolvedor a implementá-las em tempo de desenvolvimento e só será avisado caso tenha esquecido de implementá-lo em tempo de execução, no runtime da aplicação.
 
Alternativa correta!
Alternativa correta
As classes filhas são obrigadas em tempo de desenvolvimento a implementarem geraCabecalho(), caso contrário haverá um erro de compilação.
 
Alternativa errada! Só haveria erro de compilação se o método fosse abstrato e a classe Boleto também. Do jeito que esta, o programador só saberá que seu código deu um erro em tempo de execução, runtime.
Alternativa correta
A classe Boleto precisa implementar a lógica de geração do cabeçalho para que seja utilizada pelas classes filhas.

@@12
Analisando uma classe abstrata

Fernanda, assim como Eduardo do exercício anterior, tem que lidar com a geração de boleto bancário para diversos bancos. Porém ela adotou uma abordagem diferente:
abstract class Boleto {
    
    geraLinhaDigitavel(): string {
        /* lógica comum dos bancos */
    }

    abstract geraCabecalho(): string;
}

class BoletoBancoA extends Boleto {
    
    geraCabecalho(): string {
        /* lógica de geração do cabeçalho do banco A */
    }

}

class BoletoBancoB extends Boleto {
    
    geraCabecalho(): string {
        /* lógica de geração do cabeçalho do banco B */
    }

}
COPIAR CÓDIGO
Marque a afirmativa verdadeira a respeito do código de Fernanda.

Como Boleto agora é uma classe abstrata, não é possível criar instâncias desta classe. Isso faz sentido, porque a classe não sabe como o método geraCabecalho deve ser implementado. É responsabilidade das classes filhas a implementação do método.
 
Alternativa correta!
Alternativa correta
As classes filhas não são obrigadas em tempo de desenvolvimento a implementarem geraCabecalho().
 
Alternativa correta
As classes filhas também precisam declarar o método geraCabecalho como abstract.

@@13
Revisão

compartilham bastante código duplicado. E nós tentamos isolar em uma única classe chamada view, a maior quantidade de código que pudéssemos extrair.
[00:22] Primeiro, começamos colocando a propriedade elemento e o construtor, só que nós percebemos que em uma propriedade privada de uma classe pai, não pode ser acessada por classe filhas. Então foi por isso que nós utilizamos o modificador protected.

[00:38] O modificador protected diz que só a própria classe, ou as filhas que herdarem desta classe, podem ter acesso à propriedade protected. Só que isso não foi o suficiente. Quando nós movemos o método update e o template, nós caímos no problema que por mais que o método *update* seja idêntico, o miolo deles seja idêntico, o parâmetro recebido pelo update era diferente em mensagem- view e negociação-view. Um recebia uma string, e outro recebia um modelo de negociações.

[01:13] Quando nós resolvemos isso? Nós tornamos a nossa classe view genérica, passando esse item T aqui. Esse item T vem de type, mas poderia ser D. Contanto que eu coloque D em tudo quanto é lugar, isso aqui vai funcionar também.

[01:33] Aliás, um apelido para você poder acessar. Você pode colocar K também, mas tem que trocar para K. Mas deixa T, porque lembra, remete type, por isso que a galera gosta de usar muito o T e não outra letra.

[01:52] Fizemos isso. Então, agora, o nosso método *update* e template, o parâmetro, que é o model que eles recebem, é do tipo T. Que tipo é esse? Não faço ideia. Quem vai saber é minha filha. Então, se eu olho em mensagem-view, e estendo minha classe view, eu defino qual vai ser o valor de T.

[02:11] Nesse caso, vai ser string; em negociações-view, vai ser negociações. E se eu tentar, na hora em que eu defino esse tipo, se por acaso eu coloco qualquer outra coisa aqui, ele vai me dar um erro de compilação. Porque o template, esse tipo que está aqui, como ele é o tipo T daqui, ele tem que bater, ele tem que ser igual.

[02:33] Então nós conseguimos flexibilizar o nosso seu código. Flávio, por que tanto trabalho de fazer isso?. Porque nós vamos fazer type safety, queremos pegar erro em problema de tempo de compilação, mas, ao mesmo tempo, nós vamos ter que usar desses artifícios para termos um código dinâmico.

[02:48] Porque se fosse em JavaScript puro, é oba-oba; você faz qualquer coisa que você quiser que vai funcionar dinamicamente. E você só vai saber do erro durante o runtime.

[02:57] Em mensagem-view, aprendemos que não faz sentido ter instâncias de view, porque essa view era incompleta, ela tinha um buraco. Que buraco é esse? É o tipo do model.

[03:16] Se você tentar criar uma instância de view, esse item aqui tentar usar um método update, o template, o compilador do TypeScript vai dizer que é do tipo unknown, que ele não sabe o que é. Qual é o tipo? É unknown, que ele não sabe qual é. Qual é o tipo? É Unknown, desconhecido.

[03:31] Tornamos classe view abstrata. Com isso, ninguém pode dar new nessa classe; ela só pode ser usada para ser estendida, eu não posso criar uma instância direto dentro dela. E para forçar com que as filhas implementem um método que ela não sabe antecipadamente como implementar, também tornamos o método em método abstrato.

[04:01] Isso significa que se eu chegar lá em qualquer classe que está se estendendo de view, e eu não implementar o método template, eu vou ter um erro de compilação, me avisando, em tempo de compilação, que eu devo, i must, implementar o método template, e não verificar esse erro durante a runtime.

[04:22] Tudo bem? Então vamos lá para o próximo vídeo, que nós vamos dar uma lapidada no nosso projeto para ele ficar maravilhoso. Vamos lá.

@@14
Faça como eu fiz

Chegou a hora de você seguir todos os passos realizados por mim durante esta aula. Caso já tenha feito, excelente. Se ainda não, é importante que você execute o que foi visto nos vídeos para poder continuar com a próxima aula.

Continue com os seus estudos, e se houver dúvidas, não hesite em recorrer ao nosso fórum!

@@15
O que aprendemos?

Nesta aula, aprendemos:
Herança com TypeScript
Classes com tipo genérico
Classes abstratas
O modificador protected

#### 23/06/2024

@03-Lapidando nosso código

@@01
Projeto da aula anterior

Você pode ir acompanhando o passo a passo do desenvolvimento do nosso projeto e, caso deseje, você pode baixar o projeto do curso.
Bons estudos!

https://github.com/alura-cursos/typescript-curso-2/archive/67b1b1ee4847476c1be8c82880e206eb0f62a2f9.zip

@@02
Visibilidade do método template

[00:00] Vamos começar a lapidar um pouco o nosso projeto antes que possamos evoluir. Uma coisa que eu quero chamar a atenção para vocês é o seguinte: quem utiliza o mensagemView ou o negociaçõesView, qual é o único método que essa pessoa está utilizando instâncias dessas classes precisa chamar? update.
[00:27] É o update. Ninguém de fora. Chegando em negociação-controller, se eu olhar aqui, eu estou chamando de negociaçõesView.update, mensagemView.*update*. Todo mundo está chamando update, mas ninguém está chamando o template.

[00:41] Porém, o estagiário que entrou na sua empresa, ele vai dar um dot e vai ver o update e o template. Esse template não faz sentido nenhum chamarmos esse método, porque esse método é chamado internamente pelo update. Então ele deveria estar escondido.

[01:05] O que o desenvolvedor poderia só enxergar é o update, porque não faz sentido expor o método template para ele. Então, como fazemos isso? A primeira coisa que passa na nossa cabeça é colocar esse item como private abstract template.

[01:23] Porque se ele é private, ninguém vai ter acesso. Mas o problema de colocar o private, que o próprio TypeScript está reclamando, é que não faz sentido usar para um método abstrato, esse método ser private. Porque se ele for private, o que está acontecendo aqui é que nem a filha vai poder ter acesso. Então, private não pode.

[01:45] O padrão de métodos, se eu não falei isso com vocês, e eu falo agora, todo método por padrão, quando você não coloca o tipo, ele é public. Então, eu não precisei colocar, porque o TypeScript adota como padrão, se você não coloca modificador, bota como public.

[02:03] E aqui, colocar como public, é redundante. Então, o que eu faço? Eu vou dizer que ele é protected. Quando eu coloco protected, eu estou dizendo o seguinte, que só eu, pai, e minhas filhas podem ter acesso a esse método.

[02:28] Vou em negociaçõesView, que herdou. Agora, eu vou em negociação-controller, venho na linha debaixo, this.mensagemView, e o template ainda está aparecendo lá. Por quê? Porque na classe filha, quando herdamos e sobrescrevemos o template, ampliamos essa visibilidade.

[03:01] Estamos colocando ela como public. Então esse é o X da questão. O nosso pai está protected, mas a filha está mudando para public. Então, se eu quiser evitar isso, eu chego e coloco protected. Vou em negociações.View e coloco protected. Salvo. Vou no meu controller.

[03:40] E agora eu faço this.mensagemView., e só vejo o método update. Agora vem uma pergunta: se eu chegar lá na minha classe e colocar private, eu vou ter um erro de compilação, porque eu não posso botar esse item como private. Entendeu? Eu não tenho como ser algo privado dele. É incompatível sobrescrevê-lo.

[04:06] Agora, um elemento que é protected, eu posso tornar public aqui; ou um que é protected, eu posso continuar a ser protected colocando protected. Então, essa alteração que fizemos, é para não deixar que o desenvolvedor veja outro método, além do método update quando trabalhar com nossas views.

[04:28] Então vamos lapidando esse daqui. Vamos para o próximo.

@@03
Métodos privados

[00:00] Vamos para negociaçõesView. Lá dentro, nós temos esse template que interpola a template string, o arrayde lista; onde fizemos o map() e convertemos cada negociação em uma string. Cada string dessa é interpolada com os valores do modelo.
[00:32] E no final, eu pego essa lista, que agora não é mais de negociações onde não tem mais uma negociação, cada item não é mais uma negociação, mas sim uma string, eu vou concatenando tudo e cuspo aqui, jogo no tbody.

[00:47] Eu quero fazer o seguinte. Esse código é muito grande. Que tal se colocarmos ele no método para deixar isso aqui mais legível? Então, olha o que eu vou fazer? Eu tenho um método template, e aqui eu vou criar um método public formatar(data: date).

[01:23] O que esse item vai fazer? Eu vou copiar essa instrução que eu tenho aqui. Copiei para cá, em uma única linha, e esse item aqui, vou passar a data. O que eu estou fazendo? Vou retornar, return, esse item. O TypeScript vai inferir que esse item é uma string, mas vimos que uma boa prática define qual é o tipo do retorno.

[01:56] E agora, aqui dentro, em vez de eu colocar isso tudo aqui, eu posso fazer this.formatar(negociação.data). Na verdade, eu vou chamar de conversor de data. Vai ser formatar mesmo. Eu não vou ficar brigando com nome aqui, mas eu podia pegar um nome melhor, e estou com falta de criatividade agora.

[02:25] Então, eu chamei esse método. Será que vai continuar funcionando? Eu deixei o meu template mais enxuto, sem aquela verbosidade. Salvei. Vou lá no navegador. Vou adicionar aqui. Ou seja, tudo continua funcionando.

[02:47] Mas, de novo. No design do seu modelo, você tem que tomar cuidado com o que você vai expor para o mundo externo. Porque se eu chego em negociaçõesView, e faço this.negociaçõesView.formatar, o formatar não estar aqui, indisponível.

[03:14] O desenvolvedor não tem que saber que está rolando uma formatação por debaixo dos panos, só tem que chamar o update. E levantar a mão para o céu, porque é só isso que ele tem que fazer.

[03:22] Então, não é uma coisa que passa pela nossa cabeça. Eu posso chegar aqui, nesse negociação, e colocar ele private, posso colocar ele privado. O método privado só pode ser acessado pela própria classe, nem pelas filhas podem.

[03:40] Então, fiz isso, vou salvar. Salvei. Vou lá no navegador, continua, vejo se está tudo funcionando. Adicionei. Continua funcionando. Se eu volto lá no meu controller, e tento this.negociaçõesView, eu só vou ver o método update.

[04:02] Então, a ideia é. Isso aqui vale também se você está trabalhando com React, está trabalhando com outros frameworks, simulation aplication, a ideia é a seguinte.

[04:16] Olha uma coisa legal. No Visual Studio Code, se você marca um elemento, dá dois cliques com o botão direito, find all implementations. Ele lista para vocês todas as classes que implementam essa classe, que estendem essa classe.

[04:34] Então, o que eu quero dizer se eu voltar lá em negociações e colocar esse item privado, o meu código fica mais organizado. E isso aqui não é exposto para quem está de fora. Então há problema nenhum em fazer isso, e até saudável fazer isso, para se evitar ter um template muito complexo, muito complicado para poder trabalhar.

[04:54] Então, vamos partir para o próximo.

@@04
Centralizando updates em um único lugar

[00:00] Outra coisa que eu quero fazer com vocês é o seguinte. Sempre que precisamos atualizar a nossa view, temos que chamar o método update de mensagemView e negociaçõesView?
[00:17] Então, nas limitações da nossa solução, vamos pensar o seguinte: e se criarmos um método da nossa página chamado atualizaView, e esse método chama o método update de todas as views da nossa página. Mesmo que não tenha mudado, vamos chamar.

[00:40] Porque a todo o momento que eu fizer uma ação de escrita, eu chamo o *update*View e sempre renderizo tudo. Não é muito bom por questões de performance da nossa solução, mas isso vai evitar esquecermos que toda vez que tiver que gerar uma operação, eu tenho que lembrar de "Ok, eu gerei essa operação, agora eu tenho de ir fazer o update de novo". Então, eu centralizo isso tudo em um único lugar.

[01:05] Como ficaria? Vamos lá. Eu gosto de colocar método privado sempre como último. Eu vou colocar como privado, porque não faz sentido ninguém fora da classe chamá-lo. Eu vou chamar private atualizaView (): void.

[01:29] O que eu vou colocar dentro desse item? Eu vou mover essas duas instruções de atualização da view para dentro do atualizaView. E aqui, no adiciona, eu sei que quando eu acabar de fazer tudo, o que eu vou fazer? Sempre no final do método, eu vou fazer aqui o atualizaView.

[01:57] Se eu estiver em outro lugar, terei, no futuro, um lugar onde eu preciso atualizar a view novamente, eu vou chamar a atualizaView. E todo código de atualização de view vai ficar nesse lugar.

[02:10] Claro, se você tem uma mensagem que você precisa selecionar se essa mensagem vai ser adicionada com sucesso, adicionada com fracasso, você não vai poder colocar dentro do atualizaView. Você vai ter de fazer de fora. Mas a ideia é você colocar a maior quantidade de métodos que atualiza a view nesse método genérico para que eu possa chamar e fazer ele atualizar para mim.

[02:32] Então, está aqui o atualizaView. E outra coisa. O limpaFormulario, não faz sentido ele ser público, porque se eu olho a APP, a única coisa do Controller, que quem está de fora de APP quer chamar, é o adiciona.

[02:49] Então, eu posso chegar agora aqui no meu negociações-controller, colocar esse item aqui como private, e esse item, sabemos que o padrão é public quando não coloca nada. Mas, a minha sugestão para vocês é: deixa evidente, não pega carona, não. Quem está lendo isso aqui vê rápido que é public, já vê isso direto.

[03:16] Então eu vou fazer isso em todos os métodos que criamos até agora. Eu coloquei public nesse item aqui, coloquei private. Vou em negociações-view, esse item está com modificador, esse item está com modificador. Sobre a view, eu vou explicitar que esse item é public.

[03:41] O negociações é public, adiciona. public lista. Então, com isso, começamos a lapidar mais um pouco, já começamos controlando melhor a visibilidade da nossa aplicação, decidindo o que vamos expor para o mundo externo.

[04:09] E a sugestão que eu dou para vocês é: método privado, coloca sempre para o final. Porque quando eu vou ler esse código, eu não quero saber do método privado; eu quero saber o que faz parte da API pública. Eu vou ver o método adiciona.

[04:20] Eu vou ver o método adiciona e vou ver que tem uma linha que cria negociação, outra que adiciona, uma que limpa o formulário e outra que atualiza a view.

[04:30] Eu já tenho um entendimento mental, facilmente, do que esse método faz. Agora, se eu quiser saber detalhe, eu vou nos métodos privados, e vejo lá os detalhes de implementação. Então, vamos lá.

@@05
Aceitando apenas dias úteis

[00:00] Precisamos continuar com a nossa aplicação, e tem mais uma especificação que desejamos implementar. Qual é a ideia? Não faz sentido eu cadastrar uma negociação feita em uma data que cai no sábado ou no domingo. Eu só posso considerar negociações em dias úteis.
[00:20] Então, precisaremos implementar essa lógica. Mas você deve pensar: "Flávio, por que você está criando essa nova especificação? Qual a relação com o TypeScript?". Você vai ver.

[00:32] Mas vamos pensar na lógica de resolver esse problema. Vou voltar lá no meu código. Temos o método adiciona, e eu sei que o método adiciona cria uma negociação para mim, e, nesse momento, eu tenho uma negociação com a data.

[00:44] O que eu vou testar? Vou testar se if negociação.data.. Muito cuidado aqui, pois existe o getDate, e se eu passo o mouse por cima, o getDate pega o dia do mês, se é de 1, 2, 3, 4, 5, 6, até 30, 31, 28, e por aí vai. Mas o getDate retorna a data do dia da semana, se é segunda, terça, quarta, quinta, sexta, sábado, domingo.

[01:26] Uma coisa que vocês têm que ter em mente é que esse valor começa de zero e vai até 6. Zero, é domingo. E vem segunda, terça, quarta, quinta, sexta e sábado. Sábado é 6. Então tem que ter isso em mente para implementarmos essa lógica.

[01:42] Então, eu vou fazer o seguinte. if (negociação.data.getDay() > 0 && negociação.data.getDay() < 6), porque ele é um dia útil. Faz sentido? Então, se o getDay é maior que zero, ele vai ser um; se ele é menor que 6, vai ser 5. Então, se ele está nessa faixa, eu vou deixar esse item aqui.

[02:40] Se não for, eu vou exibir uma mensagem para o usuário. Eu vou dizer que this.mensagemView.update(‘apenas negociações em dias úteis são aceitas’). Vou executar essa mensagem.

[03:10] Então, a lógica está aí? Está. Vou salvar. Vou voltar para o meu navegador, nenhum erro de compilação. Eu sei que se eu colocar vários "uns', isso tudo vai cair em um dia que não é útil. Clico em incluir. Depois que eu validei todo o formulário, eu clico em incluir, e ele vai me dizer: "Apenas negociações em dias úteis são aceitas". Então eu vou colocar 12.

[03:38] Clico. Continua também. Então, 11 é sábado; 12, domingo; então 13 vai ser segunda. Agora adicionou. "Negociação adicionada com sucesso". Então vem 13, 14, 15, 16, 17. 18 eu não vou poder. 17 eu posso. Agora, 18, eu não vou poder. Primeiro eu tenho de preencher tudo, passar a validação, e ele vai dizer que "Apenas negociações em dias úteis são aceitas".

[04:11] Então, temos a validação, tem essa mensagem, tem tudo certo. Mas o que eu quero mostrar para vocês é o seguinte. Você, lendo esse código, ele não está muito legal. Você vê getDay > 0, getDay < 6. E agora que você aprendeu comigo em JavaScript, viu que zero é domingo; e seis, sábado.

[04:36] Mas o código não está muito legível, essa lógica não está muito legal. Então, será que o TypeScript traz algo que possamos tentar resolver o nosso problema? É isso o que estudaremos no próximo vídeo.

@@06
Obtendo o dia da semana

Temos a seguinte instância de Date:
const date = new Date();
COPIAR CÓDIGO
Marque a opção verdadeira que retorna corretamente o dia da semana.

date.getDay()
 
Alternativa correta! Lembre-se que os dias da semana são representados por número que vão de 0 (domingo) a 6 (sábado).
Alternativa correta
date.getDate()
 
Alternativa correta
date.getDow()

@@07
Organizando melhor nosso código

[00:00] Vamos lá. A primeira coisa que pode passar na sua cabeça é fazer isso aqui. Você chegar na propriedade da sua classe e colocar que o private sábado = 6. Colocar esse item, private domingo = 0.
[00:28] E esses itens, você só quer ler, você quer que seja somente leitura. Ninguém pode modificar esse item. Então você vai lá e coloca readonly. E o que eu posso fazer no meu código? Onde está 0, eu coloco this.domingo.

[00:52] Coloquei em letra maiúscula, como se fosse para simular o nome de uma constante. Tem essa convenção, sábado, constante, coloca em letra maiúscula. Será que vai funcionar? Vamos lá.

[01:07] Vou salvar. Voltar para o navegador. Eu sei que essa data vai cair em data inválida, vou lá, faço isso. Clico aqui. "Apenas negociações em dias uteis são aceitas". Conseguimos resolver, melhorar, mas podemos melhorar ainda mais.

[01:29] O que eu vou fazer? Eu vou criar um método privado. private ehDiaUtil, onde eu passo um date. Olha como vamos começar a organizar melhor o nosso código ainda sem usar alguns artifícios que eu vou mostrar para vocês.

[01:52] O que esse código vai fazer? Se ele recebe uma data, eu vou retornar, return data.getDay() > this.domingo && data.getDay < this.sabado. Esse item vai me retornar verdadeiro ou falso.

[02:35] Eu vou apagar isso daqui, vou apagar isso daqui, temporário. Olha, primeiro, como vai ficar o bloco de código. Eu vou fazer um early return, um retorno rápido. Primeira coisa que eu vou fazer é o seguinte. Criei a negociação, eu vou testar. if this.ehDiaUtil(negociacao.data).

[03:01] Eu vou testar se não é; eu vou colocar uma exclamação. Porque se esse item não é, eu coloco uma exclamação e ele vai virar true. Olha o que eu vou fazer. Vou mostrar aqui a mensagem, e vou dar um return do método, de imediato.

[03:19] Então, a validação desse método, eu vejo logo no início. Quando eu estou olhando o adiciona, eu sei que eu crio uma negociação e verifico se não é dia útil, eu vou exibir a minha mensagem e já vou fazer um retorno. Não preciso fazer o if e o eles nessa situação.

[03:39] Vou salvar. Está aqui o método. Para ficar mais organizado. Volto no navegador. Coloco aqui. Vai me dizer que ele é "Apenas negociações em dias uteis são aceitas". Está funcionando.

[04:05] Mas ainda assim, como eu falei no vídeo anterior, eu vou mostrar para vocês uma coisa do TypeScript que vai deixar o nosso código ainda mais elegante, mais elegante do que ele está agora. E agora, realmente, estudaremos isso no próximo vídeo.

@@08
Conhecendo enumerations

[00:00] Nós melhoramos o nosso código, mas pode ficar ainda melhor. Deixa eu fazer uma pergunta para vocês. Nós criamos esse sábado e domingo na propriedade dessa classe como readonly, porque não faz sentido alguém chegar e dizer que this.sabado = ronaldo. Não faz sentido mudar o número para outro. Essa propriedade é readonly.
[00:30] Se quisermos usar esses valores constantes, que nunca mudam, por exemplo, sábado, domingo, em outros lugares da aplicação, eu vou ter de chegar em outra classe se eu quiser usar lá dentro da negociação, por exemplo.

[00:46] Eu vou chegar aqui dentro de negociação e eu posso chegar a querer criar um método para me dizer se a negociação é em dia útil ou não, então eu teria de copiar de novo esse sábado e domingo readonly em todos os lugares que eu fosse utilizar.

[01:01] Então, vamos olhar os problemas que temos. Primeiro, eu quero que esse sábado e domingo, e todos os dias da semana, pode ser que eu queira saber se alguma coisa é segunda-feira, monday, sábado, domingo, segunda, terça. Então, será que tem algum jeito de eu conseguir reutilizar essas constantes em qualquer lugar da minha aplicação sem ter de repetir?

[01:31] E garantir que esses valores sejam somente leitura? De uma maneira clássica, porque se eu olho sábado e domingo, isso pertence a um domínio de dia da semana. Será que conseguimos fazer isso? Consegue. O TypeScript tem uma estrutura de dados que permite fazer isso, que é a enumeration.

[01:54] A primeira coisa que vamos fazer dentro de APP, eu tenho controllers, models e views. Eu vou criar uma pasta, que eu vou chamar de enums. Dentro de enums, eu vou deixar todas as enumerations da minha aplicação.

[02:20] No caso, a enumeration que eu vou criar, o nome que eu vou definir para ela, vai ser o seguinte: vai ser dia da semana. Eu vou criar o arquivo dias-da-semana.ts. Criei. Como eu crio uma enum? Em TypeScript você usa enum DiaDaSemana, e esse item aqui, eu prefiro definir os valores dele.

[02:57] Mas, logo de cara, deixa eu colocar o export, porque o dia da semana é uma enum, e dentro do módulo dias-da-semana.ts tem que ser exportada para que eu possa importar em outros lugares.

[03:10] Agora, o que eu vou fazer? Eu vou definir os dias da semana. Eu vou definir quais são as constantes, os valores que não mudam dentro dessa enum. Eu gosto de colocar com caixa alta. Eu vou colocar DOMINGO, SEGUNDA, TERÇA, QUARTA, QUINTA, SEXTA, SÁBADO.

[03:49] Você, olhando isso daqui, se eu passo o mouse por cima, você vai ver que o TypeScript, por padrão, ele coloca o valor da ENUM… O primeiro item começa de zero. É sempre um padrão TypeScript é zero. Segunda, 1; terça, 2; quarta, 3; quinta.

[04:14] Esse é o padrão TypeScript que eu declarei. Vamos continuar. Vou salvar. Será que vai funcionar? Vamos ver. Dias da semana, está aqui. Vou lá no meu negociação-controller.

[04:30] Onde eu testo o dia útil, em vez de testar no domingo, eu vou dizer DiasDaSemana. Dou enter. Vamos lá em cima. O meu código está compilando, só para ver se importou correto. DiasDaSemana.js.

[04:50] Verifica se tem o js. Se por acaso sua IDE não importou esse arquivo correto, você importa o DiasDaSemana desço de uma pasta, dentro da pasta enum, e o módulo DiasDaSemana.

[05:02] Volto lá para o meu código e digo para esse item se ele é maior que .domingo. E aqui, DiasDaSemana.sabado. Então, voltei para cá, volto para o meu código, .sabado. Fiz isso. Vendo o código, você verifica mais claro para você que data.getDay é maior que domingo, e é menor do que sábado?

[05:52] E o mais legal é que essa enum, se eu tentar fazer domingo = 100 não vai aceitar, porque a enum é somente leitura por padrão. E você pode utilizar essa enum em qualquer lugar da sua aplicação, que você já vai ter definido qual é o domingo dessa enum no seu código.

[06:20] Vou salvar. Nenhum erro de compilação. Volto no meu navegador. Vamos colocar esse dia. Gravei negociação só em dia útil, 17. Fiz. Adicionei. Agora, organizamos melhor o nosso código. Temos uma enum que podemos utilizar em qualquer lugar do nosso sistema, mas eu cometi uma gafe aqui, que provavelmente você pode cometer, que pode causar um problema enorme no uso de enum.

[06:56] E é isso o que eu quero mostrar para vocês no próximo vídeo, para já começarmos com metade do processo feito e vocês não cometerem esse erro quando trabalhar com o enum com o TypeScript. Vamos para o próximo vídeo?

@@09
Cuidados na declaração de enums

[00:00] Eu comentei que a enum permite criar, em um único lugar, constantes que podemos reutilizar no nosso sistema.
[00:13] Com nome, com domínio. Todo lugar que eu for acessar a minha enum eu vou ter dias da semana, ponto. Aí eu listo todos os valores possíveis da enum. E uma coisa que eu falei para vocês é que quando vocês declaram uma enum, o TypeScript começa do primeiro valor aqui, zero, e vai até à última.

[00:32] Começa de zero, 1, 2, 3, 4. É o valor padrão que ele adota. Agora, olha só. Peguei esse quarta e joguei para cá. O que vai acontecer. Quarta é quinta. Zero. Mudei a ordem da enum.

[00:54] Salvei. Nenhum erro de compilação, volto lá para o meu projeto, digito. Foi. "Apenas negociações em dias úteis são aceitas". Mas o que ele fez? Ele pegou a quarta, que partiu de zero.

[01:15] Então, a ordem da minha validação vai ficar quebrada, porque eu estou esperando que se o valor do elemento do day, que é domingo, domingo agora passou a ser 1.

[01:32] Então, a dica é: você não sabe que você vai ter no enum. Pode ser que o enum, no nosso caso, a ordem que colocamos, foi uma ordem dos dias da semana. Mas você pode ter uma enum onde você pode ter valores que você queira colocar ordenado em ordem alfabética.

[01:48] Então, se você muda a posição dos valores da enum, você vai mudar esse valor padrão que o TypeScript está colocando para você, que é zero, 1, 2, 3, 4 e 5.

[01:57] Então, para você se blindar disso, esquece esse valor padrão do TypeScript. Você vai estipular, vai dizer na mão que esse item é zero, que esse item é 1, que esse item é 3, esse item é 4, esse item é 5 e esse item é 6.

[02:18] Por quê? Porque se eu coloco agora, mudo a ordem, sábado vai continuar sendo 6, não vai dar problema nenhum. Quinta continuará sendo. Sábado, domingo. Eu mudo a ordem, salvo. Vou na minha aplicação. Vou executar. Nao pode aceitar. Agora, o dia 12 também não. Dia 13 tem que aceitar.

[02:50] Então, aqui no caso eu vou colocar na ordem, porque nesse caso, eu, programador, a ordem, para mim, quando eu vir esse item aqui, importa. Mas você tem que se blindar é o seguinte: estipula qual é o valor do enum. Não cai nessa questão do TypeScript onde o zero é 1. Zero, 1, 2, 3, 4, 5.

[03:14] Ficou claro? Então, fica essa dica. Ainda temos mais coisas para ver sobre enum, mas o mais importante era ver isso aqui. Vamos evoluindo e vendo mais coisas do enum.

[03:26] Porque eu posso ter enum onde o valor não é só número. Eu posso colocar até string se eu quiser aqui. Dizer que esse item é Flávio. Então, pode ser qualquer valor que você estipular para enum, mas, por enquanto, eu ainda não tenho um uso de enum que trabalhe com string. Foi só para deixar claro que pode ser qualquer valor.

[03:46] Fica essa dica, porque essa dica pode resultar em muitos erros na sua aplicação. Se você tem uma constante onde o desenvolvedor adiciona no final, adiciona no meio, ou adiciona no início, você vai mudar a ordem, principalmente se você está adotando esse valor padrão da enum, que é zero, 1, 2, 3, 4, 5, isso pode gerar problemas no seu código.

[04:08] Ficou claro? Vamos blindar o nosso código, vamos fazer isso direito? Então, vamos continuar.

@@10
Identificando valores no enum

Temos a seguinte enum:
enum MinhaEnum {
    A,
    B = 3,
    C,
    D,
    F
}
COPIAR CÓDIGO
Qual o valor de MinhaEnum.D?

6
 
Alternativa correta
5
 
Alternativa correta! As enum começam de 0, porém, se modificarmos o valor de alguma das enum, os próximos valores passarão a contar a partir do novo valor.
Alternativa correta
4

@@11
Revisão

[00:00] Vamos fazer uma revisão do que vimos no capítulo. A primeira coisa que estudamos foi sobre a questão de visibilidade de métodos. Por padrão, quando você declara um método em TypeScript, ele é public. É como se eu tivesse escrito public na frente, mas ele adota que é public.
[00:19] Então, o que faremos? Se eu passo o nome por cima do método, ele me dá detalhes do método. Mas percebi métodos da minha classe que eu não quero tornar acessíveis para alguém do lado de fora.

[00:32] Então é por isso que tornamos os métodos private. Porque, se olharmos no negociação-controller, o único método que queremos expor para quem for utilizar essa classe, é o método adiciona. O restante são métodos utilitários e que não faz sentido serem expostos para quem está utilizando o modelo.

[00:52] Outra coisa que estudamos foi o processo de validação de negociação, porque não podemos aceitar que o usuário impute uma negociação que seja fora de um dia útil, que não seja em um dia útil.

[01:02] Então criamos, primeiro, um método de dia útil que checa se é dia útil ou não a data da negociação que criamos. Nossa primeira abordagem foi que para trabalharmos com os dias da semana, sábado, domingo, segunda, terça, o método de date, que é getDay, que ele retorna qual é o dia da semana, retorna como número; zero é domingo. Então vai até 6, que é sábado.

[01:29] E ficar lendo zero e 6 no código não é algo interessante. Nossa primeira tentativa foi isolar aqui, que eu até não apaguei, que eu vou apagar agora, foi isolar o sábado e o domingo em propriedades read ons do método da minha classe Controller, e utilizar para tornar o nosso código mais legível.

[01:51] Salvei. Mas aprendemos que isso não é legal, porque se eu precisar utilizar essas mesmas constantes em outros lugares da minha aplicação, eu vou ficar repetindo código. Então, o interessante é que o TypeScript, diferente da linguagem JavaScript, ele traz o conceito de enuns.

[02:07] Uma enum é uma namespace que você define. No caso, o namespace que eu defini é DiasDaSemana, em que você pode definir valores de constante. Valores que nunca vão mudar durante a sua aplicação, mas que eu posso, a qualquer momento, realizar DiasDaSemana.DOMINGO, e eu posso até jogar em uma variável esse valor.

[02:29] Inclusive, se eu passo o mouse em cima dessa variável, eu vou ver que esse é item é de uma enum, que o valor dela é domingo. Então isso é legal, porque você, trabalhando com o enum, você dando o ponto, você sabe todos os valores constantes que dizem respeito a esse namespace.

[02:48] Tanto isso é verdade que se eu volto para o negociação-controller, percebemos que o nosso método é dia útil, ele está pegando getDay, e está testando contra o valor da minha enum.

[03:01] O importante é entender que o getDay retorna number, e o meu domingo é um valor numérico. Outra coisa que eu falei é para a tomar cuidado quando declaramos constantes, porque o que o TypeScript faz, por padrão, é que se eu defino uma constante e não digo qual é o valor dessa constante da enum, ele vai adotar como padrão o valor zero, 1, 2, 3, 4, na ordem.

[03:29] Aprendemos que isso não é uma boa prática. Boa prática é eu estipular qual é o valor que eu quero para essa constante. Porque se eu mudar ela de posição, o valor não vai mudar porque não é o TypeScript que está atribuindo esses valores na ordem que eles aparecem aqui na definição da minha enum.

[03:47] Ficou claro? Então está aí. Vimos os cuidados, e vamos partir para o próximo capítulo para vermos mais coisas.

@@12
Faça como eu fiz

Chegou a hora de você seguir todos os passos realizados por mim durante esta aula. Caso já tenha feito, excelente. Se ainda não, é importante que você execute o que foi visto nos vídeos para poder continuar com a próxima aula.
 DISCUTIR NO FÓRUM
VER OPINIÃO DO INSTRUTOR

Continue com os seus estudos, e se houver dúvidas, não hesite em recorrer ao nosso fórum!

@@13
O que aprendemos?

Nesta aula, aprendemos:
Visibilidade de métodos
Validando negociações em dias úteis
Vantagens do uso de enums
Cuidados com enums

#### 23/06/2024

@04-Visibilidade de métodos e Enumeration

@@01
Projeto da aula anterior

Você pode ir acompanhando o passo a passo do desenvolvimento do nosso projeto e, caso deseje, você pode baixar o projeto do curso.
Bons estudos!

https://github.com/alura-cursos/typescript-curso-2/archive/0ca238809f1b51272e148991530dd7a232290b98.zip

@@02
Isolando a lógica de conversão de entrada

[00:00] Vamos aprender outra coisa para a nossa aplicação. É um problema real, vamos motivar algo no TypeScript e olhar esse método private() de negociação.
[00:15] Esse item está criando uma negociação a partir do input do usuário, onde sabemos que os valores que são lidos vêm em formato string. Mas vamos supor que eu esteja criando negociações a partir de um arquivo txt que eu estou importando, um arquivo que alguém exportou.

[00:33] Provavelmente, quando eu for ler esse item, ele vai ler esses dados no formato string e eu vou ter de converter para a data, quantidade de valor e realizar toda essa conversão aqui. Então, que tal, no lugar do controller, a negociação-controller ser o responsável em criar uma negociação baseado nos valores de entrada, valores string, eu colocar essa lógica na própria instância de negociação?

[01:00] O que vocês acham? Vamos tentar fazer isso aqui comigo? Vamos ver se vai dar certo? Eu vou criar em negociação. Mesmo se você achar estranho, vem comigo. Eu vou criar em método, public criaDe(data: string, quantidade: string, valor: string.

[01:38] O que esse método vai fazer? Eu vou em negociação-controller, vou pegar esse item que está aqui, esse bloco de código, vou jogar para cá. Em vez de eu pegar do input value, eu vou pegar esse item de date. Só que não pode ser.

[02:02] Eu vou colocar datestring: string, quantidadestring: string, valorstring: string. Só para ficar mais clara essa separação. Então aqui, olha, data*string*. O que eu vou fazer? Daqui eu pego a datastring; e esse item aqui, eu pego quantidadestring. Desse item, eu pego valorstring.

[02:29] Então, esse criaDe é um método da minha negociação, instância de negociação, e se eu passar uma data de string, uma quantidade de string e um valor de string, ele vai realizar a conversão para mim, e, no final, vai me retornar uma negociação com esses valores convertidos. A classe vai se tornar uma instância dela mesma.

[02:53] Então, também é uma prática eu não deixar que insira um tipo de retorno. Eu vou dizer que o tipo é negociação. Ficou claro? Eu vou salvar. Deixar eu voltar no meu código. Nenhum erro de compilação. Vou em negociação-controller, vou remover o “cria” de negociação.

[03:25] Vai dar erro de compilação, porque o TypeScript vai detectar que eu estou chamando um método, e esse item não cria. Então, o que eu preciso fazer? Eu preciso criar uma negociação chamando aquele método criaDe.

[03:42] Olha só. Eu tenho, para fazer isso, eu vou ter que fazer isso aqui: const negociaçãoTemp = new Negociação(null, 0, 0). E olha o que eu vou fazer? criaDe. O que esse item vai fazer para mim? Eu vou passar para ele o this.insputData.value, this.inputData.quantidade.value, this.inputValor.value.

[04:50] Fiz isso. Será que vai funcionar? Vamos testar. Vou salvar. Nenhum erro de compilação. Volto para o meu código. Coloco aqui o 17. Vou colocar o valor. Incluir. Incluiu, fez a conversão, tudo certo. [05:11] Mas olha que bizarro. Para eu criar uma conversão, eu quis colocar a lógica de conversão na classe de negociação porque eu acho que essa lógica deveria ficar lá, perto do view de negociação. Isso é questionável; pode ser que alguma pessoa pense que isso não deva ficar lá, mas eu quis colocar.

[05:29] O que acontece? Para eu converter uma negociação, eu preciso criar uma negociação com um valor tabajara, null, 0, 0, para poder chamar o método de instância para converter e criar a negociação. Olha, está bem nisso aí, não está legal, mas eu ainda quero que essa lógica, esse método criaDe faça parte da classe negociação.

[05:55] E como resolvemos isso? Aprenderemos no próximo vídeo.

@@03
Métodos estáticos

[00:00] Vamos olhar esse Frankenstein que eu criei. Qual era o meu objetivo? Eu queria criar essa lógica, quero mover essa lógica de criação de uma negociação a partir de valores na string na própria classe negociação. Porque se eu precisar saber. “Onde é que está a lógica que realiza essa convenção?”, eu vou à classe negociação e descubro que ela está lá.
[00:22] De novo. Pode ser que outros desenvolvedores achem melhor colocar o arquivo em separado, mas eu quis colocar lá, porque, para mim, nesse projeto, faz sentido.

[00:32] Mas o problema é que se eu coloco esse método criaDe na classe negociação, eu preciso ter uma instância da classe negociação para poder criar uma negociação. Então, esse é um método de instância; ele só pode ser chamado depois que eu instancio uma negociação.

[00:58] Ainda posso tentar isso aqui. Fazer aqui, evitar criar essa variável temp, eu posso fazer isso aqui, só para poder chamar o método que queria uma negociação.

[01:11] Isso não está legal. Qual é a ideia? A ideia é a seguinte: esse método criaDe não deve ser um método de uma instância. Ele tem que ser um método que é padrão, ele pode ser acessado independente se eu tenho uma instância, mas, ainda assim, eu quero que seja na classe negociação.

[01:30] Presta atenção, vem comigo. Eu quero esse método acessível não através de uma instância, mas esse método faz sentido estar na classe negociação. E se eu conseguir fazer esse método ser um método da classe? Um método que é independente da instância, mas um método que eu posso chamar na própria classe. Vamos ver?

[01:53] Olha o que eu quero fazer. Eu quero poder fazer isso aqui. Negociação.criaDe. Pegaram a ideia? Esse método, se ele for um método em que eu acesso diretamente na classe, sem precisar passar por uma instância, eu resolvo esse problema, porque não preciso de uma instância de negociação, e esse método continua lá na classe negociação.

[02:16] Como eu faço isso? Para fazer isso, é só voltar lá na nossa negociação, chamar esse método de public static criaDe. Todo método estático é um método que eu posso chamar da classe, diretamente na classe. Olha que bacana. O meu código, eu ainda não salvei. Se eu venho em negociação-controller, esse item está aqui.

[02:43] Deixa eu salvar. Salvei. Vou salvar aqui o criaDe. Passou. Vou tirar o static. Vou salvar. Volto no meu controller. Não posso chamar. Mas, de novo, se eu torno esse método estático, public static. Salvo.

[03:04] Agora, eu posso chamar esse método, e quando eu clico aqui, ele só me mostra esse método da classe, porque é um método estático. Será que funciona? Deixa eu salvar. Salvei. Vou voltar lá no navegador. Deixa eu ver se deu erro de compilação. Zero.

[03:24] Vou voltar no navegador. Vou ditar isso aqui, ele não vai conseguir. Gravou. Converteu minha negociação. Está tudo certo. Ela está lá. Então, a sacada é a seguinte: às vezes você pode querer ter um método, que ela faz sentido, pertencer a um domínio de negociação, mas não em uma instância específica.

[03:49] Mas você quer que fique disponível em qualquer lugar da sua aplicação onde você tem acesso à classe negociação. Para conseguir isso, você transforma esse método não no método de distância, mas no método da própria classe. Ficou claro? Então, funcionou. Eu consegui isolar esse código lá.

[04:10] Outra coisa importante é: se eu escrevo negociação, e dou dot, você não vai ver o método criaDe, porque é um método estático. Para eu ter acesso a esse método, eu tenho de ir à classe negociação. Olha lá, criaDe.

[04:39] Então, é mais um recurso da linguagem TypeScript que vem por padrão para utilizarmos, que resolve esse problema que eu apresentei para vocês. Então, vamos lá, vamos continuar.

[04:52] Antes de continuar, uma pergunta: faz sentido esse método ser private? Vou colocar private, venho aqui. Não faz. Porque se eu quero chamar esse método diretamente da minha classe negociação, ele tem que ser public.

[05:10] Então, métodos estáticos, sempre public, para utilizarmos. Ficou claro? Então, agora, vamos continuar. Vamos lá. Vou salvar. Vamos continuar.

@@04
Tornando um método estático

Emma decidiu criar uma classe responsável por conter todas as operações auxiliares que operam sobre data:
class DateUtils {

    public ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO
            && data.getDay() < DiasDaSemana.SABADO;
    }
}
COPIAR CÓDIGO
Vejamos a seu código em ação:

const dateUtils = new DateUtils();
const ehDiaUtil = dateUtils.ehDiaUtil(new Date());
COPIAR CÓDIGO
Marque a opção que transforma corretamente o método ehDiaUtil em um método estático.

class DateUtils {

    public static ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO
            && data.getDay() < DiasDaSemana.SABADO;
    }
}
 
Alternativa correta! Métodos estáticos podem ser acessados diretamente pela classe sem precisarmos de uma instância desta mesma classe.
Alternativa correta
class DateUtils {

    static public ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO
            && data.getDay() < DiasDaSemana.SABADO;
    }
}
 
Alternativa correta
class DateUtils {

    public abstract ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO
            && data.getDay() < DiasDaSemana.SABADO;
    }
}

@@05
Protegendo nosso template

[00:00] Vamos estudar outra coisa na nossa aplicação. É o seguinte. Eu optei, e vocês estão seguindo aqui no curso, aquela solução de template, não é isso? Eu tenho lá dentro de views, eu tenho a mensagem-view, tenho negociacoes-view, onde eu defino esse template, onde eu faço tudo acontecer.
[00:24] Mas toda vez que você trabalhar com o innerHTML, com esse recurso, vamos lá em view, esse HTML, o ideal é fazer um scape nesse template, dessa string que vamos jogar no HTML.

[00:39] Por questões de segurança, por exemplo, alguns navegadores já protegem por padrão; outros, não protegem, é colocar, por exemplo, uma tag script aqui dentro, e vou colocar no meu template uma tag script, onde eu posso ter algum código malicioso, ou nesse sentido.

[00:58] O Chrome é esperto, ele não vai exibir esse item aqui, não. Salvei. Vou lá para o navegador. Quando eu olho lá, se eu olho em index HTML, nos elementos do DOM, você nem vê a tag script aqui dentro, já é removida.

[01:25] Então, nós não vamos pegar carona na proteção padrão do navegador; vamos tentar fazer esse script, criar um artifício que permita o seguinte: se alguém passar um script no nosso template, nós vamos remover.

[01:46] Como eu vou fazer isso? Eu vou chegar lá no meu código, vou lá em view. Pode ser que eu queira fazer isso, pode ser que eu não queira. Então eu vou tornar opcional. Eu vou chegar no construtor, seletor, vou colocar no parâmetro, que eu vou chamar de escapar. Um segundo parâmetro, escapar.

[02:09] Ele vai ser boolean. Esse valor que eu peguei, eu vou guardar em uma variável private, que vai ser do tipo boolean e que vai começar de falso. Eu não preciso colocar o tipo boolean aqui porque o TypeScript já infere, como eu estou atribuindo valor, que esse item vai ser boolean.

[02:32] Qual é a ideia agora? Estou com o meu template aqui. Vou colocar esse item como let. E eu reatribuo a variável. if (this.escapar), se ele é true, o que eu vou fazer? Eu vou fazer um escape. Vou dizer que template = template.replace ().

[03:03] Qual é a expressão regular? Vai ser /<script>[\s\S]*?<script>/.

[03:46] Expressão regular é uma ciência. Vamos focar aqui no código, expressão regular. Vou substituir esse item por em branco. Deixa eu verificar se não cometi nenhuma gafe. Tenho uma expressão regular que começa aqui e termina aqui.

[04:04] O que eu falo? Remove todo mundo, a tag script. Pega isso aqui, eu fiz um grupo com /S*?. Você olha lá no capítulo e vê se eu já não coloquei essa expressão regular lá para você não correr o risco de digitar errado.

[04:24] Fiz o scape, está aqui. Deixa eu testar para ver como ela vai funcionar fora do meu código. Salvei. Vou lá no meu navegador. Abro o console.log e digo que exp = /<script>[\s\S]*?<script>/.

[04:43] Vou criar uma string que vai ser <script>alert(‘oi’)<\script>. Isso aqui é uma string. Eu vou dizer que essa string replace(exp), uma expressão regular. Vamos ver. Isso aqui ficou em branco. Olha lá, removeu. Se tivesse alguma outra coisa aqui, um parágrafo antes. <p>xxxx</p>. Só ficou o P. Removeu a tag script do início até o fim.

[05:50] Então, essa é uma expressão regular que faz isso. Deixa eu voltar para o nosso código. Fiz isso. Ou seja, na hora em que eu estiver fazendo o meu template, meu replace, eu compilo o meu template de alguma variável template. Aí eu testo.

[06:06] "É para escapar?". É. Eu faço esse replace no meu template e atribuo na própria variável, e daí eu jogo para cá. Faz sentido? Faz. Eu quero poder ligar e desligar isso a qualquer momento? Quero. Vou salvar.

[06:21] Confira o console aqui comigo. Está salvo. Quando eu olho no console, eu começo a ter um monte de erro no meu código. Se olharmos esse erro de TypeScript, quando eu volto para lá, aqui, ele está dizendo o seguinte.

[06:36] Olha só. negociacoes-view, ele está esperando dois parâmetros. O id e se é para escapar ou não. Esse aqui eu quero true; esse aqui eu quero false. Será que vai passar? Passou. Beleza. Problema resolvido.

[06:57] Porém, o que eu quero fazer é o seguinte: o meu padrão é que se o meu código já estivesse escrito, já escrevi esse código, eu tenho mais de 100 views no meu sistema. Como eu acabei adicionando um parâmetro para a minha view, eu vou quebrar o meu código em todos os lugares, porque o TypeScript entende que você tem de passar um dos parâmetros.

[07:22] Mas eu quero que esse escapar seja opcional. Por padrão, eu não quero que ele faça nada. Mas se você quiser fazer o escape, você passa true.

[07:32] Pegaram a ideia? Então, como eu consigo fazer isso? Será que o TypeScript me ajuda? Porque eu vou quebrar o sistema inteiro. Eu poderia ir lá em todos e alterar? Poderia. Mas dependendo do escopo do teu sistema, você não quer fazer isso, você quer tornar opcional, e não quer ter erro de compilação nenhum.

[07:47] É isso o que vamos ver no próximo vídeo.

@@06
Utilizando parâmetros opcionais

[00:00] Então, o TypeScript tem um recurso na linguagem que ele permite fazer isso daqui. Está vendo aqui a minha variável, do meu parâmetro construtor? Primeiro, antes de mostrar, eu vou remover isso daqui. Removi. Eu tenho um erro de compilação. Faz todo o sentido.
[00:18] Mas eu quero tornar esse parâmetro opcional. O que eu faço aqui? Vou colocar uma interrogação aqui. Olha, nenhum erro de compilação. Olha. Meu código está o quê? Compilando. Quando eu fiz isso, eu estou dizendo para o TypeScript que esse parâmetro é opcional. O usuário pode ou não passar.

[00:41] Se ele não passou, qual vai ser o valor que vai ser adotado? False, que é o escapar = false, não vai fazer nada. Mas se eu passar true, o que eu tenho de fazer? Atribuir e mudar esse valor aqui.

[00:55] Então, o que eu faço? Eu testo. Você precisa fazer essa lógica dentro do seu código if (escapar). Se ele é verdadeiro, this.escapar = escapar, e ele vai pegar o valor que você passou.

[01:14] Não pense que é só você colocar opcional e estará tudo resolvido; você vai ter que mexer, vai ter que alterar o seu código para que esteja preparado para quando esse parâmetro opcional não for passado, o que você tem que adotar. Então, se eu não passo nada, esse item vai undefined.

[01:29] Eu vou testar. undefined é falso? É. Então não vai entrar aqui dentro desse valor. Ele vai continuar falso. Se eu passar true, esse item vai chegar aqui e vai ser true; se for true, eu vou e mudo o valor da variável escapar, interno, propriedade da classe, para true.

[01:48] E se eu passar false, também. Não vai entrar, mas se o private = escapar vai continuar sendo falso. Mas você tem que tomar cuidado quando você usa esse artifício, porque às vezes vale a pena você alterar a sua API em todos os lugares, mas às vezes isso pode ser custoso, por isso você usa opcional, e o opcional não funciona com primeiros parâmetros.

[02:13] Se eu tentar utilizar o opcional, os últimos parâmetros do seu método, do seu construtor, são eles que têm de ser opcionais. Eu não posso ter uma lacuna. Eu posso ter dois valores obrigatórios e quatro opcionais no final. Agora, se eu tiver dois obrigatórios, um opcional e mais obrigatório, não vai rolar.

[02:32] E o TypeScript está dizendo que não pode ser opcional. A required parameter cannot follow an optional parameter. Ou seja, o parâmetro que eu tenho que passar não pode seguir um parâmetro opcional. Ele tem que ser o último. É uma peculiaridade da linguagem JavaScript.

[02:54] Então, se eu chego agora em negociaçõesView, no meu controller, eu estou passando em negociaçõesView, eu quero fazer para fazer o escape. Não quero fazer para mensagem, mas para o meu negociaçõesView, eu quero.

[03:08] Então eu vou salvar. Salvei. Meu código continuar rodando. Volto para o navegador. Clico aqui. Tudo funcionando. Nenhum erro. Meu código está sendo executado.

[03:31] Ficou claro essa ideia do parâmetro opcional? Se eu chegar, agora, no meu código, na minha view, e passar o parâmetro calopsita: boolean, se eu faço isso e salvo, meu Controller não vai passar.

[03:51] Mas como ele é um dos últimos, ele pode ser opcional, e o meu código vai passar. Não pode ter nenhum required antes dele. Eu poderia até assim, olha, mas aí não vai compilar o código. Então, só para mostrar isso aí, mais um recurso da linguagem TypeScript que podemos utilizar dentro do nosso projeto.

@@07
Sobre parâmetros opcionais

Sobre parâmetros opcionais, marque as opções que contêm códigos que compilam corretamente:
Selecione 2 alternativas

function(a: number, b?:number, c:number): void { }
 
Alternativa correta
function(a?: number, b?:number, c:number): void { }
 
Alternativa correta
function(a: number, b:number, c?:number): void { }
 
Alternativa correta! O código compila, pois o parâmetro opcional é o último parâmetro.
Alternativa correta
function(a: number, b?:number, c?:number): void { }
 
Alternativa correta! O código compila, pois os parâmetros opcionais são os últimos parâmetros.

[00:00] Vamos para uma revisão. Rapidinho. O que vimos nesse capítulo? Vimos que a criação, a transformação do input do usuário, dos dados da UI em uma negociação, a lógica de conversão estava dentro do meu controller.
[00:17] Mas aprendemos que poderia ser interessante mover essa lógica que recebe uma data em string, uma quantidade em string e um valor em string para a própria classe negociação.

[00:27] Mas a nossa primeira tentativa não deu certo, porque, ao adicionar no nosso modelo de negociação, o método criaDe, cria de string, string e string, eu precisava criar uma instância de negociação para poder utilizar esse método.

[00:43] Se eu quero criar uma negociação, como eu vou primeiro criar uma negociação para depois chamar o método para criar uma negociação? Então foi uma forçação de barra, e de vez em quando isso acontece. Não é raro acontecer.

[00:56] Mas vimos que o que seria interessante é que esse método, em vez de ser um método de instância, o que significa? Em vez de ser um método que eu chamo a partir de um objeto criado através de uma classe, esse item pode ser um método de classe.

[01:10] Então foi por isso que, voltando em negociação, nós criamos o método criaDe como public static criaDe. Esse método, quando é estático, esse modificador static, me permite chamar diretamente, na classe, o método. Isso é muito importante.

[01:28] Uma coisa que isolamos dentro deste método foi a criação dos dados da negociação diretamente para uma negociação, e nós fizemos isso, um método estático, retornando uma negociação passando os valores convertidos.

[01:46] Então, o método estático, dependendo do seu cenário, pode ser vantajoso ou não. Outra coisa que vimos foi a questão dos parâmetros operacionais. Uma coisa que acontece é o seguinte. Fomos na nossa view.

[02:04] É interessante que na nossa view, nós temos a opção de fazer o escalpe, escapar determinadas strings do template para que possa garantir a segurança da nossa aplicação. Tudo bem que aqui é uma aplicação reduzida e você nem vai usar isso em produção. Você vai usar um framework como angular, React, e por aí vai, mas não vamos deixar de implementar isso.

[02:25] Então, o que fizemos? Adicionamos um parâmetro especial no construtor de view para dizer se eu quero fazer o escape ou não. O problema é que, ao adicionar esse segundo parâmetro no construtor de view, todo o meu outro código que chamava o construtor de view, que herdava de view e passava os parâmetros, quebrou. Porque agora eu sou obrigado a passar esse segundo parâmetro.

[02:49] Como é uma aplicação pequena, não tem problema nenhum alteramos em todos os lugares e passar o valor desejado. Vai ser uma aplicação onde você tem mais de 100, 200 classes, pode ser que essa alteração da API da sua classe, do construtor da sua classe, quebre a sua aplicação e seja muito custoso você resolver isso, e você nem tem tempo para resolver.

[03:10] Então, uma opção é tornar o parâmetro opcional, utilizando o recurso do TypeScript. Que recurso é esse? Eu pego o parâmetro, passo a interrogação, e isso indica para o compilador que esse parâmetro é opcional.

[03:24] Se você não passar, eu vou passar só um parâmetro para o construtor. Estávamos esperando que o construtor fosse reclamar porque eu só passei um, mas nada vai acontecer porque o segundo parâmetro é opcional.

[03:34] Então, o TypeScript entende que você quer “fazer vista grossa” para esse parâmetro. Mas nem por isso você precisa tratar essa situação, porque se ele é opcional, o que acontece no seu código? Então você precisa, de alguma maneira, sempre que você trabalha com parâmetros opcionais, é ter algum código, alguma lógica no construtor da sua classe para lidar com esse parâmetro.

[03:54] É isso. Fizemos isso, e vamos para o próximo capítulo. Porque no próximo capítulo, nós vamos ativar alguns recursos do compilador TypeScript que vai deixar a nossa vida um pouquinho mais complicada, porém vai garantir uma maior saúde, uma maior qualidade do nosso código. Então vamos para o próximo capítulo.

@@08
Revisão

[00:00] Vamos para uma revisão. Rapidinho. O que vimos nesse capítulo? Vimos que a criação, a transformação do input do usuário, dos dados da UI em uma negociação, a lógica de conversão estava dentro do meu controller.
[00:17] Mas aprendemos que poderia ser interessante mover essa lógica que recebe uma data em string, uma quantidade em string e um valor em string para a própria classe negociação.

[00:27] Mas a nossa primeira tentativa não deu certo, porque, ao adicionar no nosso modelo de negociação, o método criaDe, cria de string, string e string, eu precisava criar uma instância de negociação para poder utilizar esse método.

[00:43] Se eu quero criar uma negociação, como eu vou primeiro criar uma negociação para depois chamar o método para criar uma negociação? Então foi uma forçação de barra, e de vez em quando isso acontece. Não é raro acontecer.

[00:56] Mas vimos que o que seria interessante é que esse método, em vez de ser um método de instância, o que significa? Em vez de ser um método que eu chamo a partir de um objeto criado através de uma classe, esse item pode ser um método de classe.

[01:10] Então foi por isso que, voltando em negociação, nós criamos o método criaDe como public static criaDe. Esse método, quando é estático, esse modificador static, me permite chamar diretamente, na classe, o método. Isso é muito importante.

[01:28] Uma coisa que isolamos dentro deste método foi a criação dos dados da negociação diretamente para uma negociação, e nós fizemos isso, um método estático, retornando uma negociação passando os valores convertidos.

[01:46] Então, o método estático, dependendo do seu cenário, pode ser vantajoso ou não. Outra coisa que vimos foi a questão dos parâmetros operacionais. Uma coisa que acontece é o seguinte. Fomos na nossa view.

[02:04] É interessante que na nossa view, nós temos a opção de fazer o escalpe, escapar determinadas strings do template para que possa garantir a segurança da nossa aplicação. Tudo bem que aqui é uma aplicação reduzida e você nem vai usar isso em produção. Você vai usar um framework como angular, React, e por aí vai, mas não vamos deixar de implementar isso.

[02:25] Então, o que fizemos? Adicionamos um parâmetro especial no construtor de view para dizer se eu quero fazer o escape ou não. O problema é que, ao adicionar esse segundo parâmetro no construtor de view, todo o meu outro código que chamava o construtor de view, que herdava de view e passava os parâmetros, quebrou. Porque agora eu sou obrigado a passar esse segundo parâmetro.

[02:49] Como é uma aplicação pequena, não tem problema nenhum alteramos em todos os lugares e passar o valor desejado. Vai ser uma aplicação onde você tem mais de 100, 200 classes, pode ser que essa alteração da API da sua classe, do construtor da sua classe, quebre a sua aplicação e seja muito custoso você resolver isso, e você nem tem tempo para resolver.

[03:10] Então, uma opção é tornar o parâmetro opcional, utilizando o recurso do TypeScript. Que recurso é esse? Eu pego o parâmetro, passo a interrogação, e isso indica para o compilador que esse parâmetro é opcional.

[03:24] Se você não passar, eu vou passar só um parâmetro para o construtor. Estávamos esperando que o construtor fosse reclamar porque eu só passei um, mas nada vai acontecer porque o segundo parâmetro é opcional.

[03:34] Então, o TypeScript entende que você quer “fazer vista grossa” para esse parâmetro. Mas nem por isso você precisa tratar essa situação, porque se ele é opcional, o que acontece no seu código? Então você precisa, de alguma maneira, sempre que você trabalha com parâmetros opcionais, é ter algum código, alguma lógica no construtor da sua classe para lidar com esse parâmetro.

[03:54] É isso. Fizemos isso, e vamos para o próximo capítulo. Porque no próximo capítulo, nós vamos ativar alguns recursos do compilador TypeScript que vai deixar a nossa vida um pouquinho mais complicada, porém vai garantir uma maior saúde, uma maior qualidade do nosso código. Então vamos para o próximo capítulo.

@@09
Faça como eu fiz

Chegou a hora de você seguir todos os passos realizados por mim durante esta aula. Caso já tenha feito, excelente. Se ainda não, é importante que você execute o que foi visto nos vídeos para poder continuar com a próxima aula.

Continue com os seus estudos, e se houver dúvidas, não hesite em recorrer ao nosso fórum!

@@10
O que aprendemos?

Nesta aula, aprendemos:
Revisão da lógica de conversão negociações
Método estáticos
Parâmetros opcionais