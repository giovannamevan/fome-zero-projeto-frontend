const baseApiUrl = "https://fome-zero-badkend.onrender.com/"

async function postCadastro(cadastroPronto, endpoint) {
    fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cadastroPronto),
    })
        .then((response) => {
            if (response.ok) {
                return response.body
            } else {
                console.error("Erro ao realizar o post.");
                console.log("deu BO ANOOOOOOO")
            }
        })
        .catch((error) => {
            console.error("Erro:", error);
        });

}

document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector('form');

    form.addEventListener('submit', async function (event) {
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
            const formattedDonator = {
                "nome_empresa": companyName,
                "endereco": address,
                "email": email,
                "senha": password,
                "telefone": phone
            }

            const donatorEndpoint = baseApiUrl + "donator/"
            const result = await postCadastro(formattedDonator, donatorEndpoint)
            alert('Cadastro feito com sucesso, use na área de login');
        }
    });
});