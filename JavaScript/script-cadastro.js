document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio do formulário por padrão

        // Validação dos campos
        var companyName = document.getElementById('companyName').value;
        var email = document.getElementById('email').value;
        var address = document.getElementById('address').value;
        var phone = document.getElementById('phone').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;

        if (companyName === '' || email === '' || address === '' || phone === '' || password === '' || confirmPassword === '') {
            alert('Por favor, preencha todos os campos.');
        } else if (password !== confirmPassword) {
            alert('As senhas não coincidem. Tente novamente.');
        } else {
            // Se a validação passar, redireciona para a página index
            window.location.href = "../Index.html?message=success";
            alert('Cadastro realizado com sucesso, faca login para continuar')
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio do formulário por padrão

        // Validação dos campos
        var nameOng = document.getElementById('name-ong').value;
        var emailOng = document.getElementById('email-ong').value;
        var phoneOng = document.getElementById('phone-ong').value;
        var typeOng = document.getElementById('type-ong').value;
        var passwordOng = document.getElementById('password-ong').value;
        var confirmPasswordOng = document.getElementById('confirmPassword-ong').value;

        if (nameOng === '' || emailOng === '' || phoneOng === '' || typeOng === '' || passwordOng === '' || confirmPasswordOng === '') {
            alert('Por favor, preencha todos os campos.');
        } else if (passwordOng !== confirmPasswordOng) {
            alert('As senhas não coincidem. Tente novamente.');
        } else {
            // Se a validação passar, redireciona para a página index
            window.location.href = "../Index.html?message=success";
        }
    });
});