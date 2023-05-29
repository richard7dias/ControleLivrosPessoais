const botaoCadastro = document.getElementById('botao-cadastro')
botaoCadastro.addEventListener("click", function (event) {
    event.preventDefault();
    cadastrarForm();
});

var dadosForm = [];

function cadastrarForm() {
    const inputTitulo = document.getElementById('input-titulo');
    const inputAutor = document.getElementById('input-autor');
    const inputLido = document.getElementById('input-lido');
    const inputFavorito = document.getElementById('input-favorito');

    if (inputTitulo.value && inputAutor.value && inputLido.value != 'selecione' && inputFavorito.value != 'selecione') {
        dadosForm.push({
            titulo: inputTitulo.value,
            autor: inputAutor.value,
            lido: inputLido.value,
            favorito: inputFavorito.value
        });

        window.alert(`Livro ${inputTitulo.value} cadastrado com sucesso!`)

        inputTitulo.value = '';
        inputAutor.value = '';
        inputLido.value = '';
        inputFavorito.value = '';

        inputTitulo.focus();
    } else {
        window.alert('Preencha todos os campos.');
    }
}

const botaoPesquisa = document.getElementById('botao-pesquisa')
botaoPesquisa.addEventListener("click", function (event) {
    event.preventDefault();
    pesquisar();
});

var pesquisados = [];
var dadosFiltados = [];
const inputPesquisa = document.getElementById('input-pesquisa');
const inputLidoPesquisa = document.getElementById('input-lido-pesquisa');
const inputFavoritoPesquisa = document.getElementById('input-favorito-pesquisa');
const resultadoPesquisa = document.getElementById('resultado-pesquisa');

function pesquisar() {
    if (inputPesquisa.value && inputLidoPesquisa.value == 'selecione' & inputFavoritoPesquisa.value == 'selecione') {
        pesquisaTexto(inputPesquisa.value);

    } else if (!inputPesquisa.value && inputLidoPesquisa.value != 'selecione' & inputFavoritoPesquisa.value == 'selecione') {
        pesquisaLido(inputLidoPesquisa.value);

    } else if (!inputPesquisa.value && inputLidoPesquisa.value == 'selecione' & inputFavoritoPesquisa.value != 'selecione') {
        pesquisaFavoritos(inputFavoritoPesquisa.value);

    } else if (inputPesquisa.value && inputLidoPesquisa.value != 'selecione' & inputFavoritoPesquisa.value == 'selecione') {
        pesquisaTextoELidos(inputPesquisa.value, inputLidoPesquisa.value);

    } else if (inputPesquisa.value && inputLidoPesquisa.value == 'selecione' & inputFavoritoPesquisa.value != 'selecione') {
        pesquisaTextoEFavorito(inputPesquisa.value, inputFavoritoPesquisa.value);

    } else if (!inputPesquisa.value && inputLidoPesquisa.value != 'selecione' & inputFavoritoPesquisa.value != 'selecione') {
        pesquisaLidoEFavorito(inputLidoPesquisa.value, inputFavoritoPesquisa.value);

    } else if (inputPesquisa.value && inputLidoPesquisa.value != 'selecione' & inputFavoritoPesquisa.value != 'selecione') {
        pesquisaTodosCampos(inputPesquisa.value, inputLidoPesquisa.value, inputFavoritoPesquisa.value);

    } else {
        dadosFiltados = dadosForm;
    }

    limparTabelaPesquisa();

    if (dadosFiltados.length == 0) {
        let msgPesquisa = document.createElement('tr');
        msgPesquisa.innerHTML = '<td>Não há livros encontrados.</td>';
        resultadoPesquisa.appendChild(msgPesquisa);
    } else {
        let theadPesquisa = document.createElement('thead');
        theadPesquisa.innerHTML = `
            <th> </th>
            <th>Título</th>
            <th>Autor</th>
            <th>Lido</th>
            <th>Favorito</th>
        `;
        resultadoPesquisa.appendChild(theadPesquisa);

        dadosFiltados.forEach((livro, id) => {
            let tabelaPesquisa = document.createElement('tr');
            tabelaPesquisa.innerHTML = `
                <button onclick="apagar(${id})" ><i class="fa-solid fa-trash" style="color: #ffffff;"></i></button>
                <td>${livro.titulo}</td>
                <td>${livro.autor}</td>
                <td>${livro.lido}</td>
                <td>${livro.favorito}</td>
            `;
            resultadoPesquisa.appendChild(tabelaPesquisa);
        });
        limparInputsPesquisa();
    }

}

function apagar(id) {
    let confirmar = window.confirm('Deseja realmente apagar o livro?')
    if (confirmar) {
        dadosForm.splice(id, 1);
        limparInputsPesquisa();
        pesquisar();
    }
}

const botaoLimpar = document.getElementById('botao-limpar')
botaoLimpar.addEventListener("click", function (event) {
    event.preventDefault();
    limparInputsPesquisa();
    limparTabelaPesquisa();
});

function limparTabelaPesquisa() {
    resultadoPesquisa.innerHTML = '';
}

function limparInputsPesquisa() {
    inputPesquisa.value = '';
    inputLidoPesquisa.value = '';
    inputFavoritoPesquisa.value = '';
    resultadoPesquisa.value = '';
}

function pesquisaTexto(pesquisa) {
    dadosFiltados = dadosForm.filter(dado => dado.titulo.includes(pesquisa) || dado.autor.includes(pesquisa));
}

function pesquisaLido(pesquisa) {
    dadosFiltados = dadosForm.filter(dado => dado.lido.includes(pesquisa));
}

function pesquisaFavoritos(pesquisa) {
    dadosFiltados = dadosForm.filter(dado => dado.favorito.includes(pesquisa));
}

function pesquisaTextoELidos(texto, lido) {
    let filtadoTexto = dadosForm.filter(dado => dado.titulo.includes(texto) || dado.autor.includes(texto));
    dadosFiltados = filtadoTexto.filter(dado => dado.lido.includes(lido));
}

function pesquisaTextoEFavorito(texto, favorito) {
    let filtadoTexto = dadosForm.filter(dado => dado.titulo.includes(texto) || dado.autor.includes(texto));
    dadosFiltados = filtadoTexto.filter(dado => dado.favorito.includes(favorito));
}

function pesquisaLidoEFavorito(lido, favorito) {
    dadosFiltados = dadosForm.filter(dado => dado.lido.includes(lido) && dado.favorito.includes(favorito));
}

function pesquisaTodosCampos(texto, lido, favorito) {
    let filtadoTexto = dadosForm.filter(dado => dado.titulo.includes(texto) || dado.autor.includes(texto));
    dadosFiltados = filtadoTexto.filter(dado => dado.lido.includes(lido) && dado.favorito.includes(favorito));
}