Por se tratarem de uma artefatos web, é necessário providenciar um servidor local para que eles funcionem corretamente.

Para isso, tenha o Node.js intalado em sua máquina, você pode baixá-lo em https://nodejs.org/. 

Dentro da pasta de cada artefato, execute os seguintes comandos:
```bash
npm install http-server
http-server
```
Explicação: O http-server irá iniciar um servidor web local, você verá uma mensagem no terminal indicando o endereço exato onde seu servidor está rodando, abra o seu navegador web e digite-o na barra de pesquisa. Ao fechar o prompt de comando, o servidor será desligado.