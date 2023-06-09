var xValues = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Junho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
var yDespesas = ['None', 49, 44, 24, 15, 35, 55, 49, 44, 24, 15, 40];
var yReceitas = [40, 15, 24, 44, 49, 55, 35, 15, 24, 44, 49, 90];
var barColors = ["red", "green", "blue", "orange", "brown", "gray","red", "green", "blue", "orange", "brown", "gray"];
backgroundColor = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 205, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(201, 203, 207, 0.2)",
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 205, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    
  ];

  borderColor  = [
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)",
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    
  ];


$(document).ready(function () {
    handleGerarGrafico();
});


var printChart = function (dados){
    var _idTipoCategoria =  $('#idTipoCategoria').val();
    new Chart("myChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                data: dados,
                backgroundColor: backgroundColor,
                borderColor:borderColor,
                borderWidth: 1 
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: _idTipoCategoria === '1' ? "Lançamento de Despesas  por Ano" : "Lançamento de Receitas por Ano"
            }
        }
    });

}

var handleGerarGrafico = function () {
    var _idTipoCategoria =  $('#idTipoCategoria').val()
    var _Ano = $('#Ano').val()

    $.ajax({
        url: "dashboard",
        type: 'POST',
        data: {
            idTipoCategoria: _idTipoCategoria,
            Ano: _Ano
        },
        beforeSend: function () {
            $('.modal').show();
        }
    }).done(function (response) {
        if (response.status === '200') {
            printChart(Object.values(response.dados))
        }
        setTimeout(function () {
            $('.modal').hide();
        }, 1000);

    }).fail(function (jqXHR, textStatus, msg) {
        alert(msg);
        setTimeout(function () {
            $('.modal').hide();
        }, 1000);

    });
}
