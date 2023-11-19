function getUrlParam(nomeDoParametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nomeDoParametro);
}

const listaProdutosLink = document.getElementById('link-meus-produtos');
const adicionarItemLink = document.getElementById('link-adicionar-item');
const perfilDoadorLink = document.getElementById('link-meu-perfil');

const userId = getUrlParam('id')

listaProdutosLink.setAttribute('href', `./lista-produtos.html?id=${userId}`);
adicionarItemLink.setAttribute('href', `./cadastrar-produtos.html?id=${userId}`);
perfilDoadorLink.setAttribute('href', `./perfil-doador.html?id=${userId}`);

