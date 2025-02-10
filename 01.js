// Definindo a estrutura para armazenar os livros
let livros = [];

// Função para cadastrar um livro
function cadastrarLivro(titulo, autor, disponibilidade) {
    const livro = {
        titulo: titulo,
        autor: autor,
        disponibilidade: disponibilidade
    };
    livros.push(livro);
    console.log(`Livro "${titulo}" cadastrado com sucesso!`);
}

// Função para listar os livros cadastrados
function listarLivros() {
    if (livros.length === 0) {
        console.log("Nenhum livro cadastrado.");
    } else {
        console.log("Livros Cadastrados:");
        livros.forEach((livro, index) => {
            console.log(`${index + 1}. Título: ${livro.titulo}, Autor: ${livro.autor}, Disponibilidade: ${livro.disponibilidade}`);
        });
    }
}

// Exemplo de como usar as funções

// Cadastrar livros
cadastrarLivro("Dom Casmurro", "Machado de Assis", "Disponível");
cadastrarLivro("O Primo Basílio", "José de Alencar", "Indisponível");

// Listar livros cadastrados
listarLivros();
