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
    console.log("\nLivros disponíveis para empréstimo:");
    livros.forEach(livro => {
        if (livro.disponivel) {
            console.log(`${livro.titulo} - Autor: ${livro.autor}`);
        }
    });
}

// Função para exibir livros emprestados
function exibirLivrosEmprestados() {
    console.log("\nLivros emprestados:");
    livros.forEach(livro => {
        if (!livro.disponivel) {
            console.log(`${livro.titulo} - Autor: ${livro.autor}`);
        }
    });
}

// Função para exibir usuários cadastrados
function exibirUsuariosCadastrados() {
    console.log("\nUsuários cadastrados:");
    usuarios.forEach(usuario => {
        console.log(`${usuario.nome}`);
    });
}

// Função para exibir usuários com livros emprestados
function exibirUsuariosComLivrosEmprestados() {
    console.log("\nUsuários com livros emprestados:");
    usuarios.forEach(usuario => {
        if (usuario.emprestimos.length > 0) {
            console.log(`${usuario.nome} - Livros Emprestados:`);
            usuario.emprestimos.forEach(emprestimo => {
                console.log(`  - ${emprestimo.titulo}`);
            });
        }
    });
}

// Função para exibir empréstimos ativos
function exibirEmprestimosAtivos() {
    console.log("\nEmpréstimos Ativos:");
    usuarios.forEach(usuario => {
        usuario.emprestimos.forEach(emprestimo => {
            let hoje = new Date();
            if (hoje <= emprestimo.dataDevolucao) {
                console.log(`${usuario.nome} tem o livro "${emprestimo.titulo}" emprestado até ${emprestimo.dataDevolucao.toLocaleDateString()}.`);
            }
        });
    });
}

// Função para exibir empréstimos concluídos
function exibirEmprestimosConcluidos() {
    console.log("\nEmpréstimos Concluídos:");
    usuarios.forEach(usuario => {
        usuario.emprestimos.forEach(emprestimo => {
            let hoje = new Date();
            if (hoje > emprestimo.dataDevolucao) {
                console.log(`${usuario.nome} devolveu o livro "${emprestimo.titulo}" após o prazo.`);
            }
        });
    });
}

// Função para exibir empréstimos com multa
function exibirEmprestimosComMulta() {
    console.log("\nEmpréstimos com Multa:");
    usuarios.forEach(usuario => {
        usuario.emprestimos.forEach(emprestimo => {
            let hoje = new Date();
            let diasAtraso = (hoje - emprestimo.dataDevolucao) / (1000 * 60 * 60 * 24); // Diferença em dias
            if (diasAtraso > 0) {
                let multa = diasAtraso * 1; // R$ 1,00 por dia de atraso
                console.log(`${usuario.nome} tem o livro "${emprestimo.titulo}" com ${diasAtraso} dias de atraso. Multa: R$ ${multa.toFixed(2)}.`);
            }
        });
    });
}

// Exemplo de uso:

// Emprestar livros
emprestarLivro(1, 1); // João pegou "O Hobbit"
emprestarLivro(2, 2); // Maria pegou "1984"

// Exibir relatórios

// Livros disponíveis
exibirLivrosDisponiveis();

// Livros emprestados
exibirLivrosEmprestados();

// Usuários cadastrados
exibirUsuariosCadastrados();

// Usuários com livros emprestados
exibirUsuariosComLivrosEmprestados();

// Exibir empréstimos ativos
exibirEmprestimosAtivos();

// Registrar devolução (para teste)
registrarDevolucao(1, 1); // João devolve "O Hobbit"

// Exibir empréstimos concluídos
exibirEmprestimosConcluidos();

// Exibir empréstimos com multa
exibirEmprestimosComMulta();
