const form = document.getElementById('form');
const nome = document.getElementById('nome');
const telefone = document.getElementById('telefone');

let telefones = [];

let nomeEValido = false;
let telefoneEValido = false;
let formEValido = false;
let linhas = '';


form.addEventListener('submit', function(e){
    e.preventDefault();

    validaInputs(); 

    if (formEValido){
        adicionaLinha();
        atualizaTabela();
        resetaInputs();
    }
   
})


function validaInputs(){
    const nomeValue = nome.value.trim();
    const telefoneValue = telefone.value.trim();

    if(nomeValue === ''){
        setErrorFor(nome, 'Nome não pode estar em branco');
        nomeEValido = false;
    }else {
        setSuccessFor(nome);
        nomeEValido = true;
    }

    if(telefoneValue === ''){
        setErrorFor(telefone, 'Telefone não pode estar em branco');
        telefoneEValido = false;
    }else if (!validaTelefone(telefoneValue)){
        setErrorFor(telefone, 'Formato incorreto - Use: "(xx)9xxxx-xxxx"');
        telefoneEValido = false;
    }else if(telefones.includes(telefoneValue)){
        setErrorFor(telefone, 'Telefone já cadastrado!');
        telefoneEValido = false;
    }else {
        setSuccessFor(telefone);
        telefoneEValido = true;
    }

    if (nomeEValido && telefoneEValido){
        formEValido = true;
    } else {
        formEValido = false;
    }
}


function setErrorFor(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    // adicionar mensagem a tag small
    small.innerText = message;

    // adicionar a class erro
    formControl.className = 'form-control error';
}

function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';

}


function validaTelefone(numeroTelefone) {
    pattern = /\([0-9]{2}\)[9]{1}[0-9]{4}-[0-9]{4}$/;
    return pattern.test(numeroTelefone);
}


function resetaInputs(){
    // retira a classe success dos inputs
    const formControl = document.querySelectorAll('.form-control');
    for (let i = 0; i < formControl.length; i++){
        formControl[i].classList.remove('success');
    }

    nome.value = '';
    telefone.value = '';
}


function adicionaLinha(){

    telefones.push(telefone.value);

    let linha = '<tr>';
    linha += `<td>${nome.value}</td>`;
    linha += `<td>${telefone.value}</td>`;
    linha += '</tr>';

    linhas += linha;
  
}


function atualizaTabela(){
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}
