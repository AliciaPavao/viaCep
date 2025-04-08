// Obter o valor dos campos
const cepInput = document.querySelector('#cep')

//Atribuir as funções no botões
const btnPesquisarCEP = document.querySelector('#btnPesquisar')
const btnLimpar = document.querySelector('#btnLimpar')

// Evento 'Keypress' (quando uma tecla é pressionada)
cepInput.addEventListener('keypress', (event) => {

    // Obtém o código ASCII da tecla pressionada
    const keyCode = event.keyCode;

    //Verifica se a tecla pressionada não é um número
    if (keyCode < 48 || keyCode > 57) {
        // Se não for um número, cancela a entrada e exibe
        event.preventDefault();
        alert("Digite apenas números.");
    }
});

const obterDadosApi = async (cep) => {

    // Armazenar a o endereço de requisição da API
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
    console.log(apiUrl);

    // Armazenar a resposta da API e aguardar a construção
    const response = await fetch(apiUrl);
    console.log(response);

    // Converter os dados para JSON
    const data = await response.json();
    console.log(data);

    // Verificar se o CEP é válido
    if (data.erro) {
        alert("O CEP digitado está inválido.");
        return;
    }
    atribuirCampos(data);
};

btnPesquisarCEP.addEventListener('click', (e) => {
    e.preventDefault();

    // Verifica se o CEP tem 8 dígitos
    if (cepInput.ariaValueMax.length < 8 || cepInput.ariaValueMax.length >) {
        // Menos de 8 dígitos, exibe uma mensagem para o usuário
        alert('Por favor, digite um CEP válido com 8 dígitos.')
        document.querySelector('#cep').value = '';
        return;
    }
    obterDadosApi(cepInput.value);
});

// Atribuir dados de retorno da API para os campos do formulário
const atribuirCampos = (data) => {
    const rua = document.querySelector('#rua');
    const complemento = document.querySelector('#complemento');
    const bairro = document.querySelector('#bairro');
    const cidade = document.querySelector('#cidade');
    const estado = document.querySelector('#estado');

    rua.value = data.logradouro;
    complemento.value = data.complemento;
    bairro.value = data.bairro;
    cidade.value = data.localidade;
    estado.value = data.uf;
}

btnLimpar.addEventListener('click', () => {

    document.querySelector('#cep').value;
    document.querySelector('#rua').value;
    document.querySelector('#complemento').value;
    document.querySelector('#bairro').value;
    document.querySelector('#cidade').value;
    document.querySelector('#estado').value;
})