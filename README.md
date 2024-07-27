# Projeto Brasil CNPJ

Este projeto é uma aplicação web desenvolvida em React com Vite, Tailwind CSS, Zod e React Router. O objetivo da aplicação é permitir a consulta de informações de empresas a partir do CNPJ utilizando a API da BrasilAPI. Além disso, o projeto inclui funcionalidades para exibição e edição dos dados da empresa de forma intuitiva e responsiva.

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
|       |-- CompanyCard.jsx
|   |-- pages/
|       |-- HomePage.jsx
|       |-- DetailsPage.jsx
|   |-- services/
|       |-- api.js
|   |-- styles/
|       |-- global.css
|   |-- utils/
|       |-- validation.js
|   |-- App.jsx
|   |-- main.jsx
|-- README.md
```

## Instalação e Execução

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/adomoraes/brasilcnpj.git
   cd brasilcnpj
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Execute o projeto:**

   ```bash
   npm run dev
   ```

4. **Acesse a aplicação:**
   - Acesse `http://localhost:5173` no seu navegador.

## Uso

1. **Consulta de CNPJ:**

   - Insira um CNPJ válido no campo de busca e clique em "Consultar".
   - Os detalhes da empresa serão exibidos abaixo do campo de busca.

2. **Edição de Dados:**
   - Clique no botão "Editar" ao lado dos dados da empresa.
   - Altere as informações desejadas e clique em "Salvar".

## Contribuição

Sinta-se à vontade para contribuir com melhorias e novas funcionalidades. Para isso, siga os passos abaixo:

1. Faça um fork deste repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Faça um push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
