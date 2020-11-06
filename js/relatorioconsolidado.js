function gerarRelatorio(){
    /*
    1 - Pegar as datas do formulario
    2 - montar a msg de datas para serem enviadas ao BackEnd
    3 - montar o cabaecalho POST
    4 - invocar o backend através do Fetch
    5 - criar a funcao para montar o relaorio
    */

    //1-Capturar Datas
    var txtDataInicio = document.getElementById("txtDataInicio").value;
    var txtDataFim = document.getElementById("txtDataFim").value;

    //2-Estrturar a Requisição no formato JSON
    var msgBody = {
        dataInicio : txtDataInicio,
        dataFim : txtDataFim
    };

    //3-Montar cabecalho
    var cabecalho = {
        method : "POST",
        body : JSON.stringify(msgBody),
        headers : {
            "Content-type": "application/json"
        }
    }

    //4-Fazer Request
    
    fetch("http://localhost:8088/eventos/consolidado/intervalo", cabecalho)
    .then(res => res.json()) //se receber resposta extrai JSON do Body
    .then(lista => preencheTabela(lista)); //com a extração, receber a lista de eventos

}

function preencheTabela(lista){

    var txtTabela = `<table class="table" id="tabelaAlarmes">
                        <thead class="thead-dark">
                            <tr>
                            <th scope="col">Alarme</th>
                            <th scope="col">Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>`;

    for(i=0; i < lista.length; i++){
        var alarme = lista[i];

        txtTabela += `<tr>`;
        txtTabela += `<th scope="row">${alarme.nomeAlarme}</th>`;
        txtTabela += `<td>${alarme.quantidade}</td>`;
        txtTabela += `</tr>`;
    }
                    
    txtTabela += `  </tbody>
                    </table>`;


    document.getElementById("relatorio").innerHTML = txtTabela;
}

