document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');
    var displayArea = document.createElement('div');
    displayArea.classList.add('data-display');
    document.body.appendChild(displayArea);

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Obter os valores dos campos
        var nome = document.getElementById('nome').value;
        var email = document.getElementById('email').value;
        var senha = document.getElementById('senha').value;

        // Verificar se pelo menos um campo da alteracao está preenchido
        if (!nome && !email && !senha) {
            alert('Preencha pelo menos um campo para fazer a alteração.');
            return;
        }
        alert('Dados atualizados com sucesso!');
    });
});