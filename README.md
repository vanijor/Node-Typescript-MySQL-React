## Requisitos

* Conferir a versão do Node.js 22 ou superior: node -v
* Conferir se está instalado o npx: npx -v
* Conferir se está instalado o GIT: git -v

## Como rodar o projeto baixado
1. Clone o projeto baixado do GIT: git clone <link do projeto>
2. Acesse a pasta do projeto: cd <nome do projeto>
3. Instale as dependências do projeto: npm install
4. Rode o projeto: npm run dev
5. Acesse o projeto no navegador: http://localhost:3000

## Sequencia para criar o projeto

Criar o projetocom React e Next.js.
```
npx create-next-app@latest
```

Rodar o projeto React.
```
npm run dev
```

Acessar o navegador a URL
```
http://localhost:3000
```

## Pacote para conectar a aplicação à API
```
npm install axios
```

//A diretiva 'use client' é usada para indicar que este componente é executado no cliente (browser)
//Essa diretiva é específica par Next.js 13+ quando se utiliza a renderização no lado do cliente
```
'use client'
```

