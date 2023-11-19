const baseApiUrl = "https://fome-zero-badkend.onrender.com/"
const entityId = getUrlParam('id')
const isDonator = window.location.href.includes("Doador")
let nome = document.getElementById('nome').value;
let email = document.getElementById('email').value;
let senha = document.getElementById('senha').value;
let imagem = document.getElementById('profileImage').value
document.addEventListener('DOMContentLoaded', async function () {

    const getDonatorEndpoint = baseApiUrl + `donator/${entityId}`
    const getOngEndpoint = baseApiUrl + `ONG/${entityId}`
    const editOngEndpoint = baseApiUrl + `ONG/`
    const editDonatorEndpoint = baseApiUrl + `donator/`
    const loggedEntity = await getLoggedEntity(isDonator ? getDonatorEndpoint : getOngEndpoint)
    document.getElementById('submitEdit').onclick = async () => await editEntity(isDonator ? editDonatorEndpoint : editOngEndpoint)
    document.getElementById('email').value = loggedEntity.email || '';
    document.getElementById('senha').value = loggedEntity.senha || '';
    document.getElementById('profileImage').value = loggedEntity.imagem || '';
    if (isDonator) {
        document.getElementById('nome').value = loggedEntity.nome_empresa || '';
    } else {
        document.getElementById('nome').value = loggedEntity.nome_organizacao || '';
    }

    var form = document.querySelector('form');
    var displayArea = document.createElement('div');
    displayArea.classList.add('data-display');
    document.body.appendChild(displayArea);

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        nome = document.getElementById('nome').value;
        email = document.getElementById('email').value;
        senha = document.getElementById('senha').value;
        imagem = document.getElementById('profileImage').value

        if (!nome && !email && !senha) {
            alert('Preencha pelo menos um campo para fazer a alteração.');
            return;
        }
        alert('Dados atualizados com sucesso!');
    });
});

function getUrlParam(nomeDoParametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nomeDoParametro);
}

async function editEntity(endpoint) {
    const donatorBody = {
        "donatorId": entityId,
        "nome_empresa": nome,
        "senha": senha,
        "email": email,
        "imagem": imagem
    }

    const ongBody = {
        "ongId": entityId,
        "nome_empresa": nome,
        "senha": senha,
        "email": email,
        "imagem": imagem
    }

    fetch(endpoint, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(isDonator ? donatorBody : ongBody),
    })
        .then((response) => {
            if (response.ok) {
                alert('Dados editados com sucesso')
                return response.body
            } else {
                console.error("Erro ao realizar o post.");
            }
        })
        .catch((error) => {
            console.error("Erro:", error);
        });

}

async function getLoggedEntity(endpoint) {
    try {
        const response = await fetch(
            endpoint,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao buscar os valores da API");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return {};
    }
}

window.onload = async () => {

}
