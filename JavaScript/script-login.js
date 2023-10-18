// login doador

document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var email = document.getElementById('email-doador').value;
        var password = document.getElementById('password-doador').value;

        if (email.trim() === '' || password.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Se a validação passar, redirecionará para a página do perfil do doador
        window.location.href = '.. /Usuário/Doador/perfil-doador.html';
    });
});

// login ong

document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.getElementById('loginForm');
    var errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        if (email.trim() === '' || password.trim() === '') {
            errorMessage.innerText = 'Por favor, preencha todos os campos.';
            return;
        }
        window.location.href = '.. /Usuário/Interessado/perfil-interessado.html';
    });
});

// logica de redirecionamento para a pagina de login, se algum produto for escolhido na pagina principal
document.addEventListener('DOMContentLoaded', function () {
    // Obtém todos os botões na página
    var buttons = document.querySelectorAll('button');

    // Adiciona um ouvinte de evento para cada botão
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Redireciona para a página de login
            window.location.href = '../Login/login-interessado.html';
        });
    });
});