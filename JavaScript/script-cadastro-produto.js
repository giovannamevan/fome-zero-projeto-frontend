const baseApiUrl = "https://fome-zero-badkend.onrender.com/"
let nomeProduto = document.getElementById('name')
let imagemProduto = document.getElementById('imagem')
let validade = document.getElementById('validade')
let telefone = document.getElementById('telefone')
let endereco = document.getElementById('endereco')
let qtdCaixas = document.getElementById('caixa')
let qtdUnidades = document.getElementById('unidades')
let donator = {}
const donatorId = getUrlParam('id')
const getDonatorEndpoint = baseApiUrl + `donator/${donatorId}`
const postProductEndpoint = baseApiUrl + 'donator/postProduct'

const botao = document.getElementById('btn-principal').onclick = async (event) => {
    event.preventDefault()
    const success = await postProduto(postProductEndpoint)
    console.log(success)
    alert('Produto cadastrado, atualize a pagina e acesse a aba "Meus produtos" ')

    return
}

function handleImageUpload() {
    var input = document.getElementById('imagemInput');

    // Verifique se um arquivo foi selecionado
    if (input.files.length > 0) {
        // Obtenha o primeiro arquivo (assumindo que é apenas um)
        var file = input.files[0];

        var reader = new FileReader();

        reader.onload = function (e) {
            var imageUrl = e.target.result;

            // Exiba a imagem usando a tag img
            var imgElement = document.getElementById('imagemPreview');
            imgElement.src = imageUrl;
        };

        reader.readAsDataURL(file);
    }
}


function getUrlParam(nomeDoParametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nomeDoParametro);
}

async function getLoggedDonator(endpoint) {
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

async function postProduto(endpoint) {
    const bodyToSend = {
        "donatorId": donatorId,
        "imagem": imagemProduto.value,
        "nome_produto": nomeProduto.value,
        "quantidade_por_caixa": Number(qtdUnidades.value),
        "quantidade_de_caixas": Number(qtdCaixas.value),
        "validade": validade.value,
    }
    console.log(bodyToSend)

    fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyToSend),
    })
        .then((response) => {
            if (response.ok) {
                return response.body
            } else {
                console.error("Erro ao realizar o post.");
            }
        })
        .catch((error) => {

            console.error("Erro:", error);
        });
}

window.onload = async () => {
    console.log("olaal  ")
    donator = await getLoggedDonator(getDonatorEndpoint)
    console.log(donator)
    endereco.value = donator.endereco
    telefone.value = donator.telefone
}
