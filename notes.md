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