# Silvestre Lanchonete - Sistema de Pedidos Online

## Visão Geral do Projeto

Silvestre Lanchonete é um sistema de pedidos online completo, projetado para fornecer uma experiência de usuário eficiente e agradável tanto para clientes quanto para administradores. A plataforma é composta por uma API RESTful robusta desenvolvida em Java com Spring Boot e um frontend moderno e interativo construído com React e TypeScript.

O sistema permite que os clientes naveguem pelo cardápio, montem seus pedidos e os enviem diretamente para o WhatsApp da lanchonete. Os administradores possuem um painel para gerenciar produtos (CRUD) e acompanhar o status dos pedidos. A autenticação é gerenciada via JWT (tokens manuais) e também oferece integração com Google OAuth2 para login e cadastro.

## Integrantes

* Caique Nunes Oliveira - 2223200242
* João Paulo Teles de Souza - 2223200206
* Pedro Henrique de Jesus - 2222201259
* Suellen Gaston Teixeira - 2222200079

## link do Azure devops
* https://dev.azure.com/SilvestreLanchonete

## link do vídeo 
* https://youtu.be/x266rl-5s9Y

## URL do site
* https://silvestre-lanchonete-snvj.vercel.app/

## Funcionalidades Principais

**Para Clientes:**
* **Navegação no Cardápio:** Visualização de produtos organizados por categorias.
* **Busca de Produtos:** Ferramenta de busca para encontrar itens específicos no cardápio.
* **Seleção e Adição à Sacola:** Facilidade para adicionar e remover itens da sacola de compras.
* **Criação de Contas e Login:** Cadastro e login com email/senha ou via Google OAuth2.
* **Recuperação de Senha:** Processo de redefinição de senha via e-mail.
* **Envio de Pedidos via WhatsApp:** Finalização do pedido com envio formatado para o WhatsApp da lanchonete.
* **Acompanhamento de Status de Pedido:** Notificações em tempo real sobre o status do pedido via WebSockets.

**Para Administradores:**
* **Gerenciamento de Produtos (CRUD):** Criação, listagem, atualização e exclusão de produtos, incluindo upload de imagens.
* **Gerenciamento de Pedidos:** Visualização e atualização do status dos pedidos dos clientes.

## Arquitetura da Aplicação

O sistema é dividido em duas partes principais:

1.  **API (Backend):** Construída com Java 21 e Spring Boot 3.4.3, responsável pela lógica de negócios, gerenciamento de dados e autenticação.
2.  **Web (Frontend):** Desenvolvida com React, TypeScript e Vite, oferecendo a interface do usuário para interação com o sistema.

---

## API (Backend)

API RESTful para gerenciar o sistema da Silvestre Lanchonete.

**URL Base da API (Produção):** `https://api-docker-141213034707.us-central1.run.app`

### Tecnologias Utilizadas (Backend)
* **Java 21**
* **Spring Boot 3.4.3**
* **Spring Security:** Para gerenciamento de autenticação e autorização.
* **JWT (Manual):** Para autenticação baseada em token.
* **OAuth2 com Google:** Para login e cadastro utilizando contas Google.
* **PostgreSQL:** Banco de dados relacional.
* **Spring Data JPA:** Para persistência de dados.
* **Flyway:** Para versionamento e migração de schema do banco de dados.
* **Google Cloud Run:** Plataforma de hospedagem da API.
* **Google Cloud Storage:** Para armazenamento de imagens de produtos.
* **Spring Boot Starter Mail:** Para envio de e-mails (ex: recuperação de senha).
* **Spring Boot Starter WebSocket:** Para comunicação em tempo real (ex: status de pedidos).
* **Lombok:** Para reduzir código boilerplate em classes Java.
* **BCrypt:** Para hashing de senhas.
* **Springdoc OpenAPI:** Para documentação da API (Swagger UI).

### Perfis de Acesso (API)
* **Cliente:**
    * Criar conta, fazer login (email/senha ou Google).
    * Recuperar senha.
    * Visualizar produtos.
    * Criar pedidos.
    * Listar seus próprios pedidos.
* **Administrador:**
    * Gerenciar produtos (CRUD completo).
    * Visualizar e atualizar o status de todos os pedidos.

### Rotas da API

#### ProductController (`/products`)
| Método | Rota           | Descrição                                   | Acesso        |
| :----- | :------------- | :------------------------------------------ | :------------ |
| GET    | `/`            | Listar todos os produtos                    | Público       |
| POST   | `/`            | Criar novo produto (requer `multipart/form-data`) | Administrador |
| PUT    | `/{id}`        | Atualizar produto (requer `multipart/form-data`)  | Administrador |
| DELETE | `/{id}`        | Deletar produto                             | Administrador |

#### OrderController (`/orders`)
| Método | Rota           | Descrição                  | Acesso             |
| :----- | :------------- | :------------------------- | :----------------- |
| GET    | `/`            | Listar pedidos do usuário  | Cliente, Administrador|
| POST   | `/`            | Criar pedido               | Cliente, Administrador|
| PUT    | `/status/{id}` | Atualizar status do pedido | Administrador      |

#### AuthController (`/auth`)
| Método | Rota                              | Descrição                                             | Acesso  |
| :----- | :-------------------------------- | :---------------------------------------------------- | :------ |
| POST   | `/register`                       | Cadastro de cliente                                   | Público |
| POST   | `/login`                          | Login com email e senha                               | Público |
| POST   | `/forgot-password`                | Enviar email de recuperação de senha                  | Público |
| POST   | `/reset-password`                 | Redefinir senha utilizando o token de recuperação     | Público |
| POST   | `/validate-code`                  | Validar código de recuperação de senha                | Público |
| POST   | `/update-token`                   | Atualizar token JWT utilizando o refresh token        | Público |
| GET    | `/register/google`                | Iniciar processo de cadastro com Google (redireciona) | Público |
| GET    | `/register/google/authorized`     | Callback do Google após cadastro (processa o código)  | Público |
| GET    | `/login/google`                   | Iniciar processo de login com Google (redireciona)    | Público |
| GET    | `/login/google/authorized`        | Callback do Google após login (processa o código)     | Público |

### Integração com WhatsApp
Assim que o cliente finaliza um pedido pelo frontend, os dados são formatados e enviados para o WhatsApp da lanchonete através de um link `api.whatsapp.com`, contendo todos os detalhes do pedido.

### Configuração e Execução Local (API)

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Caique017/Silvestre_Lanchonete.git](https://github.com/Caique017/Silvestre_Lanchonete.git) # (Ou o URL correto do seu repositório)
    cd Silvestre_Lanchonete/api
    ```
2.  **Configure as Variáveis de Ambiente:**
    Crie ou edite o arquivo `application.properties` (ou `application.yml`) em `src/main/resources/` com as seguintes configurações (substitua os valores de exemplo pelos seus):
    ```properties
    # Configurações do banco de dados PostgreSQL
    SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/silvestre_lanchonete_db
    SPRING_DATASOURCE_USERNAME=seu_usuario_db
    SPRING_DATASOURCE_PASSWORD=sua_senha_db

    # Segredo para geração de Token JWT (use um valor forte e seguro)
    TOKEN_SECRET=seu_segredo_super_secreto_para_jwt

    # Configurações Google Cloud Storage (para upload de imagens de produtos)
    GCP_BUCKET_NAME=seu-bucket-name
    PATH_CREDENTIALS=/caminho/para/seu/arquivo-de-credenciais-gcp.json

    # Configurações de envio de e-mails (Gmail SMTP)
    SPRING_MAIL_USERNAME=seu_email_gmail@gmail.com
    SPRING_MAIL_PASSWORD=sua_senha_de_app_do_gmail

    # Configurações login Google OAuth2
    GOOGLE_CLIENT_ID=seu_google_client_id
    GOOGLE_CLIENT_SECRET=seu_google_client_secret
    ```
    *Observação:* Para `PATH_CREDENTIALS`, certifique-se de que o caminho para o arquivo JSON de credenciais do Google Cloud esteja correto e acessível pela aplicação.
    *Observação:* Para `SPRING_MAIL_PASSWORD`, se estiver usando Gmail com autenticação de dois fatores, você precisará gerar uma "Senha de App".

3.  **Banco de Dados:**
    * Certifique-se de ter o PostgreSQL instalado e rodando.
    * Crie um banco de dados (ex: `silvestre_lanchonete_db`).
    * As migrações do Flyway (localizadas em `src/main/resources/db/migration/`) serão aplicadas automaticamente ao iniciar a aplicação, criando as tabelas e estruturas necessárias.

4.  **Rode o Projeto:**
    Utilize o Maven Wrapper para executar a aplicação:
    ```bash
    ./mvnw spring-boot:run
    ```
    A API estará acessível em `http://localhost:8080` (ou a porta configurada em `PORT` ou `server.port`).

---

## Web (Frontend)

Interface de usuário interativa para clientes e administradores.

### Tecnologias Utilizadas (Frontend)
* **React 18.2.0**
* **TypeScript 5.3.3**
* **Vite:** Build tool e servidor de desenvolvimento.
* **Tailwind CSS:** Framework CSS utility-first.
* **Axios:** Cliente HTTP para realizar chamadas à API.
* **React Router DOM 6.23.1:** Para gerenciamento de rotas.
* **Shadcn/ui:** Componentes de UI (Dialog, DropdownMenu, Separator, Button, Sheet).
* **Lucide React:** Biblioteca de ícones.
* **Sonner:** Para notificações (toasts).
* **Auth0 React (opcional/alternativo):** SDK para integração com Auth0 (o projeto parece focar em um sistema de autenticação customizado com a API, mas o provider está presente).
* **Context API (React):** Para gerenciamento de estado de autenticação (`AuthContext`) e pedidos (`OrderContext`).
* **Embla Carousel React:** Para carrosséis.

### Principais Páginas e Componentes (Frontend)

* **Páginas:**
    * `Home.tsx`: Página inicial da lanchonete.
    * `Login.tsx`: Página de login para usuários.
    * `Cadastro.tsx`: Página de registro de novos usuários.
    * `Admin.tsx`: Painel administrativo.
    * `AdminProduto.tsx`: Gerenciamento de produtos para administradores.
    * `RedefinirSenha.tsx`: Página para solicitar redefinição de senha.
    * `Autenticacao.tsx`: Página para verificar código de recuperação de senha.
    * `CriarSenha.tsx`: Página para definir uma nova senha após validação.
    * `Header (menu.tsx)`: Componente que exibe o cardápio principal.
    * `StatusPedido.tsx`, `StatusAdmin.tsx`: Páginas para acompanhamento e gerenciamento de status de pedidos (a implementação atual parece usar dados mockados ou uma lógica simples de simulação de status).

* **Componentes Chave:**
    * `Header.tsx`, `header_cardapio.tsx`: Cabeçalhos e navegação.
    * `Inicio.tsx`, `DestaqueSemana.tsx`, `Contato_Local.tsx`: Seções da página inicial.
    * `LoginForm.tsx`, `RegisterForm.tsx`, `ResetPasswordForm.tsx`, `VerificationForm.tsx`, `CreatePasswordForm.tsx`: Formulários de autenticação.
    * `Main.tsx`, `menu.tsx`: Lógica e apresentação do cardápio.
    * `DialogMenu.tsx`: Componente da sacola de compras.
    * `SocialLoginButton.tsx`: Botão para login com Google.

### Configuração e Execução Local (Frontend)

1.  **Navegue até o diretório web:**
    ```bash
    cd Silvestre_Lanchonete/web
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    # ou, se preferir Yarn:
    # yarn install
    ```
3.  **Configure as Variáveis de Ambiente (se aplicável para Auth0):**
    Crie um arquivo `.env` na raiz do diretório `web/` com as seguintes variáveis, caso planeje usar a integração com Auth0 (o sistema de login customizado com a API não requer estas para o frontend, mas o provider Auth0 está no código):
    ```
    VITE_AUTH0_DOMAIN=seu_auth0_domain
    VITE_AUTH0_CLIENT_ID=seu_auth0_client_id
    VITE_AUTH0_CALLBACK_URL=http://localhost:3000 # Ou a porta que você configurar
    ```
    *Nota:* A URL base da API já está configurada no `apiClient` para `https://api-docker-141213034707.us-central1.run.app`. O arquivo `vite.config.ts` também define um proxy para `/api` apontando para esta URL de produção, útil se você quiser rodar o frontend localmente e conectá-lo diretamente à API em produção sem configurar CORS na API para localhost.

4.  **Rode o Projeto:**
    ```bash
    npm run dev
    # ou, com Yarn:
    # yarn dev
    ```
    A aplicação frontend estará acessível em `http://localhost:3000` (ou a porta definida em `vite.config.ts`).

---

## Licença

Este software é fornecido sob uma **Licença Proprietária**.

© 2025 Silvestre Lanchonete – Todos os direitos reservados.

É expressamente proibida a reprodução, distribuição, modificação, revenda ou qualquer outro uso sem autorização prévia e por escrito do autor. O uso deste sistema está limitado aos termos acordados na negociação e contrato entre as partes. Qualquer violação dos termos será considerada infração de direitos autorais e estará sujeita às medidas legais cabíveis.
