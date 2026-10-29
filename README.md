# Desenvolvimento Web | FACENS

Exercícios e exemplos de estudo de **Ana Clara**, estudante de Análise e Desenvolvimento de Sistemas na FACENS. O repositório reúne fundamentos de JavaScript, construção de páginas com HTML e CSS, manipulação do DOM e consumo de APIs.

## Organização

| Pasta | Conteúdo |
| --- | --- |
| [javascript/aulas](javascript/aulas) | Tipos de dados, funções, arrays, objetos e entrada de dados |
| [javascript/exercicios](javascript/exercicios) | Listas 1 e 2 de exercícios de lógica |
| [html](html) | Links, imagens, listas, tabelas e formulários; aulas 3 e 4 e listas 3 e 4 |
| [css](css) | Seletores, margens, posicionamento, float, Flexbox e listas 5 e 6 |
| [dom/aula-08](dom/aula-08) | Criação de elementos, eventos, propriedades e texto |
| [apis/aula-09](apis/aula-09) | Promises, async/await, consulta de CEP, clima e cadastro de funcionários |

## Exemplos para explorar

- [Cursos e inscrição](html/Lista4/cursos.html): navegação e formulário.
- [Layout com CSS](css/Lista6/Exercicio_2_Layout_Simples.html): estrutura visual de página.
- [Eventos no DOM](dom/aula-08/ManipularEventos.html): interação com elementos.
- [Consulta de CEP](apis/aula-09/consultacep.html): requisição à API ViaCEP.
- [Previsão do tempo](apis/aula-09/previsaodotempo.html): consulta ao serviço wttr.in.
- [Cadastro de funcionários](apis/aula-09/cadastrofuncionario.html): formulário com opções carregadas de arrays e envio por POST ao MockAPI.

Os links acima abrem o código no GitHub. Para visualizar as páginas funcionando, execute localmente.

## Como executar

### Páginas HTML

1. Baixe ou clone este repositório e abra a pasta no VS Code.
2. Abra um arquivo `.html` usando a extensão Live Server.
3. Utilize as ferramentas de desenvolvedor do navegador (F12) para acompanhar o console e as requisições.

Como alternativa, com Python instalado, execute na raiz:

```bash
python -m http.server 8000
```

Acesse `http://localhost:8000` e navegue até o exercício desejado. As páginas simples também podem ser abertas diretamente no navegador.

### Exercícios JavaScript

Com Node.js instalado, execute um arquivo por vez:

```bash
node javascript/exercicios/lista-01/exercicio1.js
node javascript/exercicios/lista-02/exercicio1.js
```

Os exemplos com `prompt`, `alert` ou acesso ao DOM precisam do navegador. Para entrada de dados, abra `javascript/aulas/aula-01/Entrada.html`.

### APIs

As consultas de CEP e clima precisam de internet e dependem da disponibilidade dos serviços externos.

No cadastro de funcionários, confira a constante `URL_API` em `apis/aula-09/cadastroAwait.js` e substitua pelo endpoint do seu recurso de funcionários no MockAPI, se necessário. O botão de cadastro envia uma requisição POST; use dados fictícios nos testes. Os cargos, setores e convênios são exemplos locais, não consultas a um backend.

## Sobre os exercícios

Este é um acervo acadêmico em evolução, com exemplos independentes. Não exige instalação de pacotes npm nem etapa de build. Os arquivos originais foram agrupados por assunto, preservando os nomes das aulas e listas para facilitar a identificação.

Na organização, foram corrigidos o caminho do script de entrada de dados, a declaração da URL do cadastro e a extensão `.html` da lista 5 de CSS. A sintaxe dos arquivos JavaScript e os caminhos locais de `src` e `href` foram verificados; isso não substitui testes funcionais das páginas ou das APIs.

## Autora

[Ana Clara — GitHub @anachxz](https://github.com/anachxz)
