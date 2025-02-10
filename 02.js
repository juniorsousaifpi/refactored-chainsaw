// Array para armazenar os dados dos usuários
let usuarios = [];

// Função para cadastrar um novo usuário
function cadastrarUsuario(nome, email, telefone) {
    // Criar um objeto usuário
    let usuario = {
        nome: nome,
        email: email,
        telefone: telefone
    };

    // Adicionar o usuário ao array de usuários
    usuarios.push(usuario);

    // Exibir os usuários cadastrados
    exibirUsuarios();
}

// Função para exibir os usuários cadastrados no console
function exibirUsuarios() {
    console.clear(); // Limpar o console antes de exibir a lista
    console.log("Usuários Cadastrados:");
    usuarios.forEach((usuario, index) => {
        console.log(`${index + 1}. Nome: ${usuario.nome}, E-mail: ${usuario.email}, Telefone: ${usuario.telefone}`);
    });
}

// Função para capturar os dados e cadastrar
function promptCadastro() {
    let nome = prompt("Digite o nome do usuário:");
    let email = prompt("Digite o e-mail do usuário:");
    let telefone = prompt("Digite o telefone do usuário:");

    cadastrarUsuario(nome, email, telefone);
}

// Chamada inicial para cadastrar um usuário
promptCadastro();


