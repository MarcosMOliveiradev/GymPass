GymPass style app.

O GymPass é um projeto desenvolvido durante o curso Ignite da Rocketseat, utilizando padrões de projeto como SOLID, técnicas de TDD e abordando temas essenciais para sistemas web. O software oferece uma plataforma para cadastrar academias e usuários, com validações robustas. Destaca-se pela implementação eficaz de autenticação e refresh tokens, proporcionando segurança aos usuários.

**Recursos Principais:**
- Gestão de Usuários: Funcionalidades específicas para que os usuários possam interagir com as academias cadastradas.
- Autenticação Segura: Implementação de um sistema de autenticação robusto, garantindo a segurança das informações.
- Refresh Tokens: Uso de refresh tokens para manter a autenticação ativa de maneira segura.

**Benefícios:**
- Segurança Avançada: Implementação cuidadosa de autenticação e uso de refresh tokens.
- Testes Unitários e End to End: Garantia da integridade e funcionalidade do sistema.

## RF (Requisitos funcionais)

- [x] Deve ser possivel se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obeter o numero de checj-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter ser histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academis pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrat com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-in no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado ate 20 min após criado;
- [x] O check-in só pode ser validado por adm;
- [x] A academia só poder ser cadastrada por adm;

## RNFs (requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisa estar persistidos em bancos PstegreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário dever ser identificado por um JWT (JSON WEN TOKEN)