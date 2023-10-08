[![TypeScript CI with Node](https://github.com/GustavoFLuz/lista-de-tarefas/actions/workflows/action.yml/badge.svg)](https://github.com/GustavoFLuz/lista-de-tarefas/actions/workflows/action.yml)

# Lista de Tarefas - C214 L

[Vídeo de apresentação](https://drive.google.com/file/d/1Q1cnSR8R9VxxAcD5Ue3VlI3FZJx3Gslm/view?usp=sharing)

## Integrantes:
- Gustavo Figueiredo Luz
- Edras Ribeiro Simões
- Rafael Felipe Rodrigues Moreira

## Execução do projeto:

1. Baixar node e npm
2. Executar `npm i` para instalar as dependencias
- Executar o código: `npm run dev`, a aplicação estará rodando na [porta 5173](http://localhost:5173)
- Executar testes: `npm run test`

# Sobre o uso dos Artefatos

O framework utilizado para realização de testes no projeto foi o Vitest. Essa ferramenta permite a geração de um arquivo HTML que exibe o relatório dos testes executados por ela (https://vitest.dev/guide/ui.html), porém, diferente de outras ferramentas de relatório de testes, o Vitest não gera uma página estática, isto é, ele também faz uso de um arquivo JavaScript para gerá-la. 

Tendo isso em vista, ao acessar o artefato relativo aos testes disponibilizado pelo pipeline e extrai-lo para uma pasta, o arquivo HTML não funcionará corretamente, é um erro é exibido no Console (através de Inspecionar).

Aqui está uma breve explicação do ocorrido:

"O navegador bloqueou a solicitação para o arquivo a partir da origem null, pois o protocolo file:// não é considerado seguro para solicitações entre origens diferentes. O CORS é uma medida de segurança implementada pelos navegadores para evitar que scripts em um domínio acessem recursos em outro domínio."

O mesmo ocorre ao tentar executar o arquivo HTML do artefato lista-de-tarefas, isto é, gerado pela build.

Por se tratar de uma aplicação web, é necessário, portanto, providenciar um servidor local para que os artefatos exibam suas informçãoes corretamente. Aqui vai uma sequência de passos que permitem o funcionamento adequado dos artefatos:


## Instalação

1. Tenha o Node.js intalado em sua máquina, pode baixá-lo em https://nodejs.org/.

2. Instale o pacote http-server.
```bash
  npm install -g http-server
```
3. Use o terminal para navegar até a pasta onde o seu arquivo index.html está localizado. Você pode usar o comando cd (Change Directory) para fazer isso. Por exemplo:
```bash
  cd C:\Users\user_name\Downloads\lista-de-tarefas
```
4. Execute o seguinte comando para iniciar um servidor local:
```bash
  http-server
```
5. O http-server irá iniciar um servidor web local e disponibilizará seus arquivos no endereço http://localhost:8080 por padrão. Você verá uma mensagem no terminal indicando o endereço exato onde seu servidor está rodando. Abra o seu navegador web e digite http://localhost:8080 na barra de endereços. Você deverá ver o seu arquivo index.html sendo servido a partir do servidor local. Ao fechar o prompt de comando, o servidor será desligado. 

**Repita o processo, caso deseje vizualizar os demais artefatos disponiveis.** 
