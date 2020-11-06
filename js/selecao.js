function carregaInfo(){
    var objUser = localStorage.getItem("userAlarme");

    if(!objUser){ //Se o objeto não foi recuperado do cache local
        window.location = "index.html";
    }

    var usuario = JSON.parse(objUser); //converter Texto para Ojb

    document.getElementById("fotoUser").innerHTML = `<img src="${usuario.linkFoto}" width='50%'></img>`;
    document.getElementById("infoUser").innerHTML = `<strong> Nome:</strong> ${usuario.nome} <br>
                                                     <strong> E-mail:</strong> ${usuario.email} <br>
                                                     <strong> RACF:</strong> ${usuario.racf} <br>
                                                     <button type="button" class="btn btn-primary" onclick="logout()">Logout</button>`;

                                                     
}
