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