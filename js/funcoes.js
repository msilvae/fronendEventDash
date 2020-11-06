
function logout(){
    localStorage.removeItem("userAlarme");
    window.location = "index.html";
}

function validar()
{
    var nome= formuser.nome.value;
    var email= formuser.email.value;
    var senha= formuser.senha.value;
    
    if(nome ==""){
        alert("O preenchimento deste campo é obrigatório");
        formuser.nome.focus();
        return false;
    }
    
    if(email=="" || email.indexOf('@')==-1){
        alert("Preencha o campo de email corretamente");
        formuser.email.focus();
        return false;
    }
    
    if(senha=="" || senha.length<=5){
        alert("Preencha o campo senha que é obrigatório com mínimo de 6 caracteres");
        formuser.senha.focus();
        return false;
    }

    return true;

}

