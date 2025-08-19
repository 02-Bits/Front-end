<<<<<<< HEAD


# 🚀 Pet Vita - Frontend

Este repositório contém o código-fonte do **Frontend** da plataforma **Pet Vita**. Ele inclui a aplicação mobile (React Native) para tutores e o sistema web (React) para as clínicas veterinárias.

-----

## ✨ Sobre o Projeto

O **Pet Vita** é uma plataforma completa projetada para otimizar a conexão entre tutores de animais e clínicas veterinárias. O sistema oferece uma solução digital para simplificar o agendamento de consultas e o gerenciamento de informações, proporcionando uma experiência mais ágil e organizada para todos os envolvidos.

  - **Para Tutores:** Encontre clínicas e veterinários, agende consultas e acompanhe o histórico de saúde do seu pet de forma prática e centralizada através de um aplicativo mobile.
  - **Para Clínicas e Veterinários:** Gerencie agendamentos, acesse o prontuário dos pacientes e otimize a rotina de trabalho com uma ferramenta web eficiente.

-----

## 🎨 Protótipo (UI/UX)

Toda a interface e a experiência do usuário foram desenhadas no Figma. Você pode visualizar o protótipo interativo no link abaixo:

<p>
  <a href="https://www.figma.com/design/GCRkFTTW0hr3UdMFRrHoNd/Projeto?node-id=843-915&t=jUizeat6xWeSvUSb-0">
    <img src="https://img.shields.io/badge/Figma-Acessar%20Protótipo-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Link para o Figma">
  </a>
</p>

## 🎯 Funcionalidades

### Para Tutores (App Mobile em React Native)

  - **👤 Perfil de Usuário e Pets:** Gerencie suas informações e crie perfis detalhados para cada um dos seus animais.
  - **📅 Agendamento Intuitivo:** Busque por especialidades, escolha o profissional e agende consultas em poucos cliques.
  - **🔔 Lembretes e Notificações:** Receba alertas automáticos sobre agendamentos confirmados e próximos.
  - **🩺 Histórico de Saúde:** Acesse o prontuário completo do seu pet, incluindo vacinas, consultas e exames anteriores.

### Para Clínicas (Sistema Web em React)

  - **🗓️ Agenda Integrada:** Visualize e gerencie os horários de todos os veterinários da clínica em um único lugar.
  - **📂 Gestão de Pacientes:** Acesse e atualize o histórico médico dos animais atendidos.
  - **⚙️ Cadastro de Serviços:** Configure as especialidades, serviços e profissionais disponíveis para agendamento.

-----

## 🏗️ Arquitetura e Padrões

A interface do projeto foi desenvolvida com foco em manutenibilidade, performance e experiência do usuário.

  * **Arquitetura Baseada em Componentes:** A interface é construída com componentes reutilizáveis, garantindo consistência visual e agilidade no desenvolvimento.
  * **Gerenciamento de Estado:** Utilização de hooks nativos do React (como `Context API` e `useReducer`) ou bibliotecas como Redux/Zustand para gerenciar o estado global da aplicação de forma centralizada e previsível.
  * **Consumo de API:** Comunicação com o backend através de uma camada de serviço abstraída, utilizando `Axios` ou `Fetch API` para realizar as requisições HTTP de forma assíncrona.
  * **Roteamento:**
      * **Web:** `React Router` para gerenciar a navegação entre páginas na aplicação web.
      * **Mobile:** `React Navigation` para criar uma experiência de navegação fluida e nativa no aplicativo.
  * **Design Responsivo (Web):** A aplicação web foi projetada para se adaptar a diferentes tamanhos de tela, utilizando técnicas de CSS moderno como Flexbox e Grid Layout.

-----

## 🛠️ Tecnologias Utilizadas

  * **Linguagem:** JavaScript (ES6+) / TypeScript
  * **Frameworks:** React (para a plataforma web) e React Native (para o aplicativo mobile)
  * **Gerenciador de Pacotes:** NPM / Yarn
  * **Estilização:** Styled Components, CSS Modules ou SASS
  * **Cliente HTTP:** Axios / Fetch API
  * **Controle de Versão:** Git e GitHub

-----

## 💻 Pré-requisitos

Antes de começar, certifique-se de que você possui os seguintes softwares instalados:

  * [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
  * [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
  * Um editor de código, como o [VSCode](https://code.visualstudio.com/)
  * Para desenvolvimento mobile (React Native):
      * Ambiente configurado para Android (Android Studio) ou iOS (Xcode).
      * Siga o guia oficial do React Native para configurar o ambiente: [React Native Environment Setup](https://reactnative.dev/docs/environment-setup).

-----

## 🚀 Como Executar Localmente

Para instalar e executar o **Frontend**, siga estas etapas:

1.  Clone o repositório:

    ```bash
    git clone https://github.com/02-Bits/Frontend.git
    cd Frontend
    ```

2.  Instale as dependências do projeto:

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  Execute a aplicação (web ou mobile):

      * **Para o projeto Web (React):**

        ```bash
        npm start
        # ou
        yarn start
        ```

        Acesse `http://localhost:3000` em seu navegador.

      * **Para o projeto Mobile (React Native):**

        ```bash
        # Para Android
        npm run android
        # ou
        yarn android

        # Para iOS (apenas em macOS)
        npm run ios
        # ou
        yarn ios
        ```

-----

## 🤝 Equipe e Contribuidores

Este projeto é o resultado da colaboração de uma equipe dedicada e multidisciplinar.

| Área | Membro | GitHub |
|---|---|---|
| **Frontend** | Iasmin | [@iasmimi](https://www.google.com/search?q=https://github.com/iasmimi) |
| **Frontend**| Pedro | [@irunael](https://www.google.com/search?q=https://github.com/irunael) |
| **Frontend** | Ruan | [@ruanzinDoCorte](https://www.google.com/search?q=https://github.com/ruanzinDoCorte) |
| **Backend** | João Nascimento | [@JoaoNascimento1802](https://github.com/JoaoNascimento1802) |
| **Backend** | Felipe Araújo | [@fearaujo293](https://github.com/fearaujo293) |
| **Banco de Dados** | Bernardo Oliveira | [@DevBernardo-Oliveira](https://www.google.com/search?q=https://github.com/DevBernardo-Oliveira) |

-----

## 📫 Contribuindo para o Front-end

Para contribuir com o **Front-end**, siga estas etapas:

1.  Bifurque este repositório (`fork`).
2.  Crie um branch: `git checkout -b <nome_do_seu_branch>`.
3.  Faça suas alterações e confirme-as: `git commit -m '<mensagem_do_commit>'`
4.  Envie para o branch original: `git push origin <nome_do_seu_branch>`
5.  Crie a solicitação de pull (`pull request`).

-----

## 📄 Licença

Este projeto é para fins educacionais e de portfólio. Para mais detalhes, veja o arquivo [LICENSE.md](LICENSE.md).
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> 06acd27 (Feat: Remodelamento de telas e adição de novos recursos)
