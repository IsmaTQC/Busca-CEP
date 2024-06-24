const addressform       = document.querySelector("#address-form");
const cepinput          = document.querySelector("#cep");
const addressinput      = document.querySelector("#address");
const cityinput         = document.querySelector("#city");
const neighborhoodinput = document.querySelector("#neighborhood");
const regioninput       = document.querySelector("#region");
const forminputs        = document.querySelectorAll("[data-input]");//selecionando os input geral para tratamento
const closebutton       = document.querySelector("#close-message");


// validação de cep 
cepinput.addEventListener('keypress',(e)=>{//botao pressionado 
    const onlynumber = /[0-9]/; //aceitar apenas numeros
    const key        = String.fromCharCode(e.keyCode); //capturar a tecla digitada
   
    //permissao dos numeros
   if(!onlynumber.test(key)){
       e.preventDefault("");
       return;
   }

//    console.log(key)
});

// ativar evento quando ja estiver os 8 digitos
cepinput.addEventListener('keyup',(e)=>{
    const inputvalue = e.target.value; //pegar o valor digitado
    

    //vericar a quantidade nessessaria de digitos
    if(inputvalue.length === 8){//tamanho
        getAdress(inputvalue);
    }
})


//customizando na api, quando captar 8 digitos
const getAdress = async (cep) =>{
    console.log(cep);
    //executando funcao de carregamento
    toggleloader()

    //tirar curso do cep
    cepinput.blur();


    //consumindo e carregando os dados da api
    const url      = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url);
    const data     = await response.json();
    console.log(data)

    //tratamento de erros
    if(data.erro === "true"){
        addressform.reset();
        toggleloader();
        togglemessage("CEP Invalido");// mensagem
        return;
    }

    if(addressinput === ""){
        togglediseble();
    }

   addressinput.value      = data.logradouro
   neighborhoodinput.value = data.bairro
   cityinput.value         = data.localidade
   regioninput.value       = data.uf
   toggleloader();
   
};

//desabilitar atributos chubados as quais não deixam editar
const togglediseble = () => {
    if(regioninput.hasAttribute("disabled")){
        forminputs.forEach((input)=>{
            input.removeAttribute("disabled");
        })
    }else{
        forminputs.forEach((input)=>{
            input.setAttribute("disabled","disabled");
        });
    }
}

//exibir ou ocultar o loader
const toggleloader      = () =>{
    const fadeelement   = document.querySelector("#fade");
    const loaderelement = document.querySelector("#loader");

    fadeelement.classList.toggle("hide");
    loaderelement.classList.toggle("hide");
}

// mensagem de erro
const togglemessage = (msg) => {
    const messageelement     = document.querySelector("#message");
    const messageelementtext = document.querySelector("#message p");

    messageelementtext.innerText = msg;

    fadeelement.classList.toggle("hide");
    messageelement.classList.toggle("hide");
}

//fechar mensagem

closebutton.addEventListener('click', () => togglemessage());




