const baseApiUrl = "https://fome-zero-badkend.onrender.com/"
async function loginApi(loginObject, endpoint) {
    const apiResponse = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginObject),
    })
        .then((response) => {
            if (response.ok) {
                return response
            } else {
                console.error("Erro ao realizar o login.");
                return response
            }
        })
        .catch((error) => {
            console.error("Erro:", error);
        });
    const bodyData = await apiResponse.json()
    console.log(bodyData)
    console.log("eu sou o body data")
    return bodyData
}


async function validateForm() {
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
        const donatorLoginEndpoint = baseApiUrl + "donator/login"
        const loginObject = {
            "email": email,
            "senha": password,
        }
        const response = await loginApi(loginObject, donatorLoginEndpoint)
        console.log(response)
        if (response == 404 || response == 500) {
            alert("O login não foi realizado")
        } else {
            window.location.href = `../Usuário/Doador/lista-produtos.html?id=${response._id}`;
        }
    } else {
        const ongLoginEndpoint = baseApiUrl + "ONG/login"

        const loginObject = {
            "email": email,
            "senha": password,
        }
        const response = await loginApi(loginObject, ongLoginEndpoint)
        if (response == 404 || response == 500) {
            alert("O login não foi realizado")
        } else {
            window.location.href = `../Usuário/Interessado/lista-produtos.html?id=${response._id}`;
        }
    }
    return false; // Evitar o envio padrão do formulário
}