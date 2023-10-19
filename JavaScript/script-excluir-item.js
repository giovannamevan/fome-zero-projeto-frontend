    // Seleciona todos os items que possui o botão com a classe "deleteItem"
    var deleteButtons = document.querySelectorAll('.deleteItem');

    // Adicione um evento de clique a cada botão
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Exibir um diálogo de confirmação
            var confirmed = window.confirm('Tem certeza que deseja excluir o item?');

            // Se o usuário confirmar, então remova a div pai
            if (confirmed) {
                var divToRemove = this.closest('.col-md-8').parentNode;
                divToRemove.remove();
            }
        });
    });


