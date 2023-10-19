function validateForm() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var isDoador = document.getElementById('option').checked;
    var isInteressado = document.getElementById('interessado').checked;

    if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    if (!isDoador && !isInteressado) {
        alert('Por favor, selecione Doador ou ONG/Organização.');
        return false;
    }

    // Adicione a lógica de redirecionamento
    if (isDoador) {
        window.location.href = '../Usuário/Doador/cadastrar-produtos.html';
    } else {
        window.location.href = '../Usuário/Interessado/lista-produtos.html';
    }
    return false; // Evitar o envio padrão do formulário
}