function getUrlParam(nomeDoParametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nomeDoParametro);
}

const listaProdutosLink = document.getElementById('link-produtos-disponiveis');
const meusInteressesLink = document.getElementById('link-produtos-adquiridos');
const perfilInteressadoLink = document.getElementById('link-meu-perfil');

const userId = getUrlParam('id')

listaProdutosLink.setAttribute('href', `./lista-produtos.html?id=${userId}`);
meusInteressesLink.setAttribute('href', `./meus-interesses.html?id=${userId}`);
perfilInteressadoLink.setAttribute('href', `./perfil-interessado.html?id=${userId}`);

