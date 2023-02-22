// 1 ⬜ ===> cadastro manual (com hash) e rota de login/logout

const bcrypt = require("bcrypt");

// para cadastrar usuários para testar
async function testRegisterUser(username, plainTextPassword) {
    const passwordHash = await bcrypt.hash(plainTextPassword, 10);
}

// para a rota de login
async function testPasswordIsCorrect(username, plainTextPassword) {
    const dbPasswordHash = await getUserFromDB(username).passwordHash;

    const result = await bcrypt.compare(plainTextPassword, dbPasswordHash);

    if (result === true) {
        // usuário acertou a senha. faz login
        //produzir um JWT
        ///// const jwt = genJWT(...); // instalar o modulo de gerar jwt, não é genJWT de verdade, é outro nome
        res.cookie("session", jwt);
        ///// res.status(200).json(...);
    } else {
        // usuário errou a senha
    }
}

// 2 ⬜ ==> + pôr o middleware de autenticação na frente das rotas de edição

// 3 ⬜ ==> mudar o frontend para redirecionar para pagina de admin somente se o login deu certo (fazer o fetch e ver a resposta)

// ref para implementar prévia de imagem na página de edição
// https://htmldom.dev/preview-an-image-before-uploading-it/

/**
 
- prox passos:

    - menos importante:

        - especificar categoria do deus ao criar (em vez de uma categoria pré-definida)
        - fazer uma prévia da imagem escolhida pelo usuário
        - upload de imagem nas páginas de edição (de deus e categoria). Cuidar para não deletar a imagem antiga se o usuário não escolheu uma nova
        - cursor:pointer no hover do deus + efeito visual

    - mais importante (fazer nessa ordem):

        - rotas de login/logout no backend (funcionando com usuários pré-registrados manualmente, guardando hash da senha no banco de dados)
        - middleware de autenticação nas rotas privilegiadas (POST, PATCH, DELETE)
        - implementar login corretamente no frontend (ou seja, fazer fetch e redirecionar para pagina de admin somente se login foi bem sucedido)

 */

/*- Ir na páginas de adicionar novo deus e colocar um select que armazena
        as opcoes de categorias disponíveis baseado no vetor global de categorias (FELIPE)
        - fazer uma prévia da imagem escolhida pelo usuário (GABI)
        - upload de imagem nas páginas de edição (de deus e categoria). Cuidar para não deletar a imagem antiga se o usuário não escolheu uma nova
        - cursor:pointer no hover do deus + efeito visual (DANIEL VAI FAZER)*/