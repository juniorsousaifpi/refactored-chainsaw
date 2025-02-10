// Lista de livros disponíveis
let livros = [
    { id: 1, titulo: "O Hobbit", autor: "J.R.R. Tolkien", disponivel: true },
    { id: 2, titulo: "1984", autor: "George Orwell", disponivel: true },
    { id: 3, titulo: "Dom Casmurro", autor: "Machado de Assis", disponivel: true }
];

// Lista de usuários e seus empréstimos
let usuarios = [
    { id: 1, nome: "João", emprestimos: [] },
    { id: 2, nome: "Maria", emprestimos: [] }
];

// Função para emprestar um livro para um usuário
function emprestarLivro(usuarioId, livroId) {
    let usuario = usuarios.find(u => u.id === usuarioId);
    let livro = livros.find(l => l.id === livroId);

    // Verificar se o livro está disponível
    if (!livro.disponivel) {
        console.log(`O livro "${livro.titulo}" não está disponível para empréstimo.`);
        return;
    }

    // Marcar o livro como não disponível
    livro.disponivel = false;

    // Registrar o empréstimo com a data atual e a data de devolução (7 dias)
    let dataEmprestimo = new Date();
    let dataDevolucao = new Date(dataEmprestimo);
    dataDevolucao.setDate(dataEmprestimo.getDate() + 7);

    // Adicionar o empréstimo ao usuário
    usuario.emprestimos.push({
        livroId: livroId,
        titulo: livro.titulo,
        dataEmprestimo: dataEmprestimo,
        dataDevolucao: dataDevolucao
    });

    console.log(`${usuario.nome} pegou emprestado o livro "${livro.titulo}" até ${dataDevolucao.toLocaleDateString()}.`);
}

// Função para registrar a devolução de um livro
function registrarDevolucao(usuarioId, livroId) {
    let usuario = usuarios.find(u => u.id === usuarioId);
    let livro = livros.find(l => l.id === livroId);

    // Encontrar o empréstimo do usuário
    let emprestimo = usuario.emprestimos.find(e => e.livroId === livroId);

    if (!emprestimo) {
        console.log(`O usuário ${usuario.nome} não tem esse livro emprestado.`);
        return;
    }

    // Verificar se o livro foi devolvido no prazo
    let hoje = new Date();
    let diasAtraso = (hoje - emprestimo.dataDevolucao) / (1000 * 60 * 60 * 24); // Calcula a diferença em dias

    if (diasAtraso > 0) {
        // Se houver atraso, calcula a multa
        let multa = diasAtraso * 1; // R$ 1,00 por dia de atraso
        console.log(`Atenção: O livro "${livro.titulo}" foi devolvido ${diasAtraso} dias após o prazo. Multa: R$ ${multa.toFixed(2)}.`);
    } else {
        // Se não houver atraso
        console.log(`O livro "${livro.titulo}" foi devolvido no prazo.`);
    }

    // Marcar o livro como disponível novamente
    livro.disponivel = true;

    // Remover o empréstimo do usuário
    usuario.emprestimos = usuario.emprestimos.filter(e => e.livroId !== livroId);

    console.log(`${usuario.nome} devolveu o livro "${livro.titulo}".`);
}

// Função para exibir livros disponíveis
function exibirLivrosDisponiveis() {
    console.log("Livros disponíveis para empréstimo:");
    livros.forEach(livro => {
        if (livro.disponivel) {
            console.log(`${livro.titulo} - Autor: ${livro.autor}`);
        }
    });
}

// Função para exibir empréstimos de um usuário
function exibirEmprestimosUsuario(usuarioId) {
    let usuario = usuarios.find(u => u.id === usuarioId);
    console.log(`Empréstimos de ${usuario.nome}:`);
    usuario.emprestimos.forEach(emprestimo => {
        console.log(`${emprestimo.titulo} - Devolução: ${emprestimo.dataDevolucao.toLocaleDateString()}`);
    });
}

// Exemplo de uso:

// Mostrar livros disponíveis
exibirLivrosDisponiveis();

// Emprestar livros
emprestarLivro(1, 1); // João pegou "O Hobbit"
emprestarLivro(2, 2); // Maria pegou "1984"

// Mostrar empréstimos de um usuário
exibirEmprestimosUsuario(1); // Exibir empréstimos de João

// Registrar devolução de livros
registrarDevolucao(1, 1); // João devolve "O Hobbit" (caso depois do prazo)
registrarDevolucao(2, 2); // Maria devolve "1984" (caso depois do prazo)

// Mostrar livros disponíveis após devolução
exibirLivrosDisponiveis();
