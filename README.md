# Projeto Brasil CNPJ

Este projeto é uma aplicação web desenvolvida em React com Vite, Tailwind CSS, Zod e React Router. O objetivo da aplicação é permitir a consulta de informações de empresas a partir do CNPJ utilizando a API da BrasilAPI. Além disso, o projeto inclui funcionalidades para exibição e edição dos dados da empresa de forma intuitiva e responsiva.

**Produção**

```bash
https://adomoraes.github.io/brasilcnpj/
```

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construir interfaces de usuário.
- **Vite**: Ferramenta de build rápida e otimizada para projetos web.
- **Tailwind CSS**: Framework CSS para estilização rápida e responsiva.
- **Zod**: Biblioteca para validação de esquemas e tipos.
- **React Router**: Biblioteca para gerenciamento de rotas em aplicações React.
- **axios**: Cliente HTTP baseado em promisses para o navegador e node.js.

## Funcionalidades

- **Consulta de CNPJ**: Permite ao usuário inserir um CNPJ e consultar informações detalhadas da empresa.
- **Exibição de Dados**: Mostra detalhes da empresa, como nome, endereço, sócios, entre outros.
- **Edição de Dados**: Possibilidade de editar os dados da empresa diretamente na aplicação.
- **Validação de Formulário**: Utiliza Zod para validar a entrada de dados do CNPJ.
- **Responsividade**: Interface adaptada para diferentes dispositivos (desktop, tablet, mobile).

## Estrutura do Projeto

```plaintext
|-- src/
|   |-- components/
|       |-- SearchBar.jsx
|       |-- CompanyDetails.jsx
|   |-- pages/
|       |-- HomePage.jsx
|   |-- services/
|       |-- api.js
|   |-- utils/
|       |-- validation.js
|   |-- App.jsx
|   |-- main.jsx
|-- README.md
```

## Instalação e Execução

1. **Instalar Node:**

   ```bash
   # installs nvm (Node Version Manager)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

   # download and install Node.js (you may need to restart the terminal)
   nvm install 20

   # verifies the right Node.js version is in the environment
   node -v # should print `v20.16.0`

   # verifies the right npm version is in the environment
   npm -v # should print `10.8.1`
   ```

2. **Instalar Vite: (https://www.npmjs.com/package/vite)**

   ```bash
   npm i vite
   ```

3. **Clone o repositório:**

   ```bash
   git clone https://github.com/adomoraes/brasilcnpj.git
   cd brasilcnpj
   ```

4. **Instale as dependências:**

   ```bash
   npm install
   ```

5. **Execute o projeto:**

   ```bash
   npm run dev
   ```

6. **Acesse a aplicação:**
   - Acesse `http://localhost:5173` no seu navegador. (verificar a port disponibilizada pelo Vite)

## Uso

1. **Consulta de CNPJ:**

   - Insira um CNPJ válido no campo de busca e clique em "Buscar".
   - Os detalhes da empresa serão exibidos abaixo do campo de busca.

2. **Edição de Dados:**
   - Altere as informações desejadas e clique em "Salvar".

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
