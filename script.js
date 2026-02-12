// Campos que vamos salvar
const campos = ["cep","logradouro","bairro","cidade","estado"];

// Referência do input CEP
const inputCep = document.getElementById("cep");

// 👉 Salvar automaticamente quando digitar
inputCep.addEventListener("input", () => {
    localStorage.setItem("cep", inputCep.value);
});

// 👉 Restaurar valores ao carregar a página
window.addEventListener("load", () => {
    campos.forEach(campo => {
        const valor = localStorage.getItem(campo);
        if(valor){
            document.getElementById(campo).value = valor;
        }
    });
});


// 👉 Buscar CEP quando sair do campo
inputCep.addEventListener("blur", () => {

    const cepInformado = inputCep.value.replace(/\D/g,'');

    fetch(`https://viacep.com.br/ws/${cepInformado}/json`)
        .then(response => response.json())
        .then(data => {

            if(!data.erro){

                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;

                // 👉 Salvar no localStorage
                localStorage.setItem("logradouro", data.logradouro);
                localStorage.setItem("bairro", data.bairro);
                localStorage.setItem("cidade", data.localidade);
                localStorage.setItem("estado", data.uf);

            } else {
                alert("CEP não encontrado.");
            }
        })
        .catch(error => console.error("Erro ao buscar o CEP:", error));
});
