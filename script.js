//Ouvir o evento de quando o usuario sair do campo de CEP
document.getElementById("cep").addEventListener("blur", (evento)=> {
    const elemento = evento.target;
    const cepInformado = elemento.value;

//validar o CEP
    if(!(cepInformado.length ===8))
        return;

//Fazer busca no viaCEP
//Promessa de que o Fetch vai buscar esse recurso
fetch(`https://viacep.com.br/ws/${cepInformado}/json`)
    .then(response => response.json())
    .then(data => {
        //processamento da página
    if(!data.error){
        document.getElementById('logradouro').value =data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.localidade;
        document.getElementById('estado').value = data.uf;

    }else{
        alert("CEP não encontrado.")
    }
    })
    .catch(error => console.error("Erro ao buscar o CEP> " , error));

 })