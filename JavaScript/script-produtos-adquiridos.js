const baseApiUrl = "https://fome-zero-badkend.onrender.com/";
const listaProdutosAdquiridosContainer = document.getElementById('produtos-interessados');

listaProdutosAdquiridosContainer.innerHTML = '';
let produtosAdquiridos = [];

async function getAdquiridos(endpoint) {
    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

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


async function deleteInteresse(endpoint) {
    console.log("ativei a funcao")
    console.log(endpoint)
    try {
        const response = await fetch(endpoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar os valores da API");
        }

        const data = await response.json();
        console.log(data)
        alert("Produto retirado com sucesso")
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }

}

window.onload = async () => {
    const userId = getUrlParam('id');
    const fetchAdquiridosEndpoint = baseApiUrl + `ONG/interests/${userId}`;
    produtosAdquiridos = await getAdquiridos(fetchAdquiridosEndpoint);
    console.log(produtosAdquiridos)
    produtosAdquiridos.forEach(async produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('row', 'my-4', 'p-2', 'shadow', 'rounded-lg');
        const desistirEndpoint = baseApiUrl + `ONG/${userId}/${produto._id}`;
        produtoDiv.innerHTML = `
            <div class="col-md-4">
                <img src="${produto.imagem_produto}" class="custom_img rounded-lg" alt="Imagem do Produto">
            </div>
            <div class="col-md-8">
                <div class="d-flex justify-content-between align-items-center my-2 ">
                    <div class="d-flex justify-content-start align-items-center text-center">
                        <h4 class="my-0 font-weight-bold "><span>${produto.nome_produto}</span></h4>
                        <h5 class="my-0 font-weight-bold mx-2">${produto.quantidade_de_caixas} caixas</h5>
                    </div>
                <button class="mx-2 btn btn-principal">Desistir</button>
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
                    <div class="col-md-6">
                        <h4 class="font-weight-bold small"><span>Descrição:</span></h4>
                        <h5 class="small">${produto.descricao}</h5>
                    </div>
                </div>
            </div>
        `;

        const button = produtoDiv.querySelector('button');

        button.addEventListener('click', async () => {
            await deleteInteresse(desistirEndpoint);
            listaProdutosAdquiridosContainer.removeChild(produtoDiv)
            alert("Produto retirado dos seus interesses")
        });

        listaProdutosAdquiridosContainer.appendChild(produtoDiv);
    });
}
