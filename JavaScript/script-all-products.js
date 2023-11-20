const baseApiUrl = "https://fome-zero-badkend.onrender.com/"
const listaProdutosContainer = document.getElementById('lista-produtos');

listaProdutosContainer.innerHTML = `

            <text>
                Não há nenhum produto disponível
            </text>
`
let produtos = []

async function postInteresse(product_id, ong_id, endpoint) {
    const bodyToSend = {
        "product_id": product_id,
        "ong_id": ong_id,
    }
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

function getUrlParam(nomeDoParametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nomeDoParametro);
}


async function getProducts(endpoint) {
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
        return [];
    }
}
window.onload = async () => {
    const userId = getUrlParam('id')
    const isOng = window.location.href.includes("Interessado")
    const fetchEndpoint = baseApiUrl + "products/available";
    produtos = await getProducts(fetchEndpoint)

    console.log(produtos)
    produtos.forEach(async produto => {

        const addInterestEndpoint = baseApiUrl + "ONG/interests"
        const produtoDiv = document.createElement('div');
        const usePostInterest = async () => {
            postInteresse(produto._id, userId, addInterestEndpoint)
            produtos.splice(produtos.indexOf(produto), 1)
        }
        produtoDiv.classList.add('row', 'my-4', 'shadow', 'rounded-lg');

        produtoDiv.innerHTML = `
        <div class="col-md-4">
            <img src="${produto.imagem_produto}" class="custom_img rounded-lg" alt="Imagem do Produto">
        </div>
        <div class="col-md-8">
            <!-- Informações do produto dinamicamente preenchidas -->
            <div class="d-flex justify-content-between align-items-center my-2">
                <div class="d-flex justify-content-start align-items-center text-center">
                    <h4 class="my-0 font-weight-bold "><span>${produto.nome_produto}</span></h4>
                    <h5 class="my-0 font-weight-bold mx-2">${produto.quantidade_de_caixas} caixas</h5>
                </div>
                ${isOng ? `<button class="mx-2 btn btn-principal onclick='${await usePostInterest()}' adquirirBtn">Adquirir</button>` : `<div></div>`}
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <h4 class="font-weight-bold small"><span>Validade:</span></h4>
                    <h5 class="small">${produto.validade}</h5>
                </div>
                <div class="col-md-6 mb-3">
                    <h4 class="font-weight-bold small"><span>Local de Retirada:</span></h4>
                    <h5 class="small">${produto.endereco}</h5>
                </div>
                <div class="col-md-6 mb-3">
                    <h4 class="font-weight-bold small"><span>Contato:</span></h4>
                    <h5 class="small">${produto.telefone_contato}</h5>
                </div>
            </div>
        </div>
    `;

        listaProdutosContainer.appendChild(produtoDiv);

    })
    
}