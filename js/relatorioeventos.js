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
    fetch("http://localhost:8088/eventos/intervalo", cabecalho)
    .then(res => res.json()) //se receber resposta extrai JSON do Body
    .then(lista => preencheTabela(lista)); //com a extração, receber a lista de eventos
    //.then(lista => preencheRelatorio(lista)); //com a extração, receber a lista de eventos

}

function preencheRelatorio(lista){
    var txtRelatorio ="" ;

    for(i=0; i < lista.length; i++){
        var evento = lista[i];
        txtRelatorio += `${evento.dtEvento} - ${evento.equipamento.hostname} | ${evento.equipamento.ip} : ${evento.alarme.nome} <br>`;
    }

    document.getElementById("relatorio").innerHTML = txtRelatorio;

}

function preencheTabela(lista){

    var txtTabela = `<table class="table" id="tabelaEventos">
                        <thead class="thead-dark">
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Data Evento</th>
                            <th scope="col">Hostname</th>
                            <th scope="col">IP</th>
                            <th scope="col">Alarme</th>
                            </tr>
                        </thead>
                        <tbody>`;

    for(i=0; i < lista.length; i++){
        var evento = lista[i];

        txtTabela += `<tr>`;
        txtTabela += `<th scope="row">${evento.numSeq}</th>`;
        txtTabela += `<td>${evento.dtEvento}</td>`;
        txtTabela += `<td>${evento.equipamento.hostname}</td>`;
        txtTabela += `<td>${evento.equipamento.ip}</td>`;
        txtTabela += `<td>${evento.alarme.nome}</td>`;
        txtTabela += `</tr>`;
    }
                    
    txtTabela += `  </tbody>
                    </table>`;

    txtTabela += `<BR>`;
    txtTabela += `<script>
                    $(document).ready(function(){
                        $('#tabelaEventos').DataTable({
                            "language": {
                                "lengthMenu": "Mostrando _MENU_ registros por página",
                                "zeroRecords": "Nada encontrado",
                                "info": "Mostrando página _PAGE_ de _PAGES_",
                                "infoEmpty": "Nenhum registro disponível",
                                "infoFiltered": "(filtrado de _MAX_ registros no total)"
                            }
                        });
                    });
                    </script>`;


    document.getElementById("relatorio").innerHTML = txtTabela;
}


function preencheDataTable(lista){

    $(document).ready(function() {
        $('#tbEventos').DataTable( {
            data: lista,
            columns: [
                { title: "numSeq" },
                { title: "dtEvento" },
                { title: "hostname" },
                { title: "ip" },
                { title: "nome" },
            ]
        } );
    } );
}