const baseApiUrl = "https://fome-zero-badkend.onrender.com/"
const listaProdutosContainer = document.getElementById('lista-produtos');

listaProdutosContainer.innerHTML = ''
let produtos = []

function getUrlParam(nomeDoParametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nomeDoParametro);
}

function editProduct(productId, donatorId) {
    window.location.href = `./editar_produtos.html?id=${productId}&donatorId=${donatorId}`;
}

async function deleteProduct(productId) {
    const deleteUrl = baseApiUrl + `ONG/${productId._id}`
    try {
        const response = await fetch(
            deleteUrl,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao Deleter o produto da API");
        }
    } catch (error) {
        console.error(error);
        return null;
    }

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
    const fetchEndpoint = baseApiUrl + `donator/products/${userId}`;

    produtos = await getProducts(fetchEndpoint)


    produtos.forEach(async produto => {
        const useDeleteProduct = async () => {
            const confirmed = window.confirm('Tem certeza que deseja excluir o item?');
            if (confirmed) {
                const divToRemove = this.closest('.col-md-8').parentNode;
                await deleteProduct(this.dataset.productId); // Chama a função de exclusão
                divToRemove.remove();
            }
        }
        console.log(userId)
        const produtoDiv = document.createElement('div');
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
                <div>
                <button class="mx-2 btn btn-principal btn-sm m-1 editItem"
                    onclick="editProduct('${produto._id}','${userId}')">
                    <i class="fa-solid fa-pen"></i>
                </button>
                </div>
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
    });

    const deleteButtons = document.querySelectorAll('.deleteItem');
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', async function () {
        });
    });
}