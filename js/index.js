function efetuarLogin(){
    var txtLogin = document.getElementById("txtLogin").value;
    var txtSenha = document.getElementById("txtSenha").value;


    if(txtLogin == ""){
        document.getElementById("msgLogin").innerHTML = `
            <div class="alert alert-danger" role="alert">
            Informe o login para seguir com a autenticação
            </div>
        `;
        document.getElementById("txtLogin").focus();
        return false;
    }

    if(txtSenha == ""){
        document.getElementById("msgLogin").innerHTML = `
            <div class="alert alert-danger" role="alert">
            Informe a senha para seguir com a autenticação
            </div>
        `;
        document.getElementById("txtSenha").focus();
        return false;
    }

    console.log("Login = " + txtLogin + " | Senha = " + txtSenha);

    //Estrturar a Requisição no formato JSON
    var msgBody = {
        racf : txtLogin,
        email : txtLogin,
        senha : txtSenha
    };

    var cabecalho = {
        method : "POST",
        body : JSON.stringify(msgBody),
        headers : {
            "Content-type": "application/json"
        }
    }

    fetch("http://localhost:8088/login", cabecalho).then(res => trataResposta(res));

}


function trataResposta(res){
    if(res.status == 200){
        //Pega no Response Body da resposta e, tendo um ojbeto, chama a funcao para logar o usuario no sistema
        res.json().then(objUsuario => logarUsuario(objUsuario));
        //document.getElementById("msg").innerHTML = "Usuário Conectado com Sucesso";
    }else if(res.status == 401){
        document.getElementById("msgLogin").innerHTML = `
            <div class="alert alert-primary" role="alert">
            Senha inválida!
            </div>
        `;

    }else if(res.status == 404){
        document.getElementById("msgLogin").innerHTML = `
        <div class="alert alert-primary" role="alert">
        Login não encontrado!
        </div>`;
    }else{
        document.getElementById("msgLogin").innerHTML = `
        <div class="alert alert-primary" role="alert">
        Erro desconhecido!
        </div>`;
    }
}

function logarUsuario(objUsuario){

    localStorage.setItem("userAlarme", JSON.stringify(objUsuario));
    window.location = "selecao.html";
}

function limpaMsgLogin(){
    document.getElementById("msgLogin").innerHTML ="";
}
