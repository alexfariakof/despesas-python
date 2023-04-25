$(document).ready(function () {
/*
    $('#navbarDisplay').on('mouseover' , function(){
        $("#navBrand").removeClass('collapse');
        setTimeout(function() {
            $("#navBrand").addClass('collapse')
        }, 20000);

    });
*/

    $('#tableLancamentos').DataTable({
        "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, 'Todos'], ],
        "pageLength": -1,
        "scrollCollapse": true,
        "paging": true,
        "language": {
            "search": "Pesquisar :",
            "lengthMenu": "Mostrando _MENU_ registros por página",
            "zeroRecords": "Nada encontrado",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "Nenhum registro disponível",
            "infoFiltered": "(filtrado de _MAX_ registros no total)"
        }
    });
});


var handleEdit = function (idDespesa, idReceita) {

    if (idDespesa === 0) {
        var doc = document.querySelector('form');
        document.querySelector('#idReceita').value = idReceita;
        doc.action = "/receitas";
        doc.method = "POST";
        doc.submit();
    }
    else {
        var doc = document.querySelector('form');
        document.querySelector('#idDespesa').value = idDespesa;
        doc.action = "/despesas";
        doc.method = "POST";
        doc.submit();
    }


}

var handleDelete = function (element, idDespesa, idReceita) {

    if (!confirm('Tem certeza que deseja excluir essa ' + ( idDespesa === 0 ? "receita" : "despesa") + '?'))
        return false;

    if (idDespesa === 0) {
        $.ajax({
            url: "receitaDelete",
            type: 'post',
            data: {
                idReceita: idReceita,
            },
            beforeSend: function () {
                $('.modal').show();
            },
        })
            .done(function (response) {
                dismissAllALerts();
                if (response.status === '200') {
                    $(element).parent().parent().remove();
                    $("#tdSaldo").text(response.saldo);
                    setClassSaldo(response.floatSsaldo);

                    setTimeout(function () {
                        alertSuccess('Receita deletada com sucesso!');
                        $('.modal').hide();
                        $(window).scrollTop(top);
                    }, 1000);
                }
                else if (response.status === '400') {
                    alert('Todo error 400');
                    $('.modal').hide();
                }
                else if (response.status === '403') {
                    setTimeout(function () {
                        $(window).scrollTop(top);
                        alertError(response.Error);
                        $('.modal').hide();
                    }, 1000);
                }
            })
            .fail(function (jqXHR, textStatus, msg) {
                alertError(jqXHR);
            });
    }
    else {
        $.ajax({
            url: "despesaDelete",
            type: 'post',
            data: {
                idDespesa: idDespesa,
            },
            beforeSend: function () {
                $('.modal').show();

            },
        })
            .done(function (response) {
                if (response.status === '200') {
                    dismissAllALerts();
                    $(element).parent().parent().remove();
                    $("#tdSaldo").text(response.saldo);
                    setClassSaldo(response.floatSsaldo);

                    setTimeout(function () {
                        alertSuccess('Despesa deletada com sucesso!');
                        $('.modal').hide();
                        $(window).scrollTop(top);
                    }, 1000);
                }
                else if (response.status === '400') {
                        alert('Todo error 400');
                        $('.modal').hide();
                }
                else if (response.status === '403') {
                    alert('Todo error 403');
                    $('.modal').hide();
                }

                if (response.status === '403') {
                    setTimeout(function () {
                        $(window).scrollTop(top);
                        alertError(response.Error);
                        $('.modal').hide();
                    }, 1000);
                }

            })
            .fail(function (jqXHR, textStatus, msg) {
                alertError(jqXHR);
            });
    }
}

var setClassSaldo  = function(saldo) {
    if (saldo < 0) {
        $("#thSaldo").removeClass("saldoGreen").addClass("saldoRed");
        $("#tdSaldo").removeClass("saldoGreen").addClass("saldoRed");
    }
    else {
        $("#thSaldo").removeClass("saldoRed").addClass("saldoGreen");
        $("#tdSaldo").removeClass("saldoRed").addClass("saldoGreen");
    }


}

var alertSuccess = function(message) {
    var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    var wrapper = document.createElement('div')

    wrapper.innerHTML = '<div  class="alert alert-success d-flex align-items-center ; " role="alert"  >' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:" > ' +
        '<path path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>    </svg> ' +
        '<symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16"></symbol>  ' +
        '<div>' + message + ' </div>' +
        '<button type="button" class="btn-close float-end" data-bs-dismiss="alert" aria-label="Close"  style="right:0;"  ></button>' +
        '</svg>' +
        '</div>';
    alertPlaceholder.append(wrapper)
}

var alertError = function(message) {
    var alertPlaceholder = document.getElementById('liveAlertPlaceholder')

    var wrapper = document.createElement('div')

    wrapper.innerHTML = '<div id="alertError" class="alert alert-danger  d-flex align-items-center" role="alert" >' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">' +
        '<path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>' +
        '</sgv>' +
        '<symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16"></symbol>' +
        '<div id="msghError">' + message + '</div>  ' +
        '<button type="button" class="btn-close " data-bs-dismiss="alert" aria-label="Close" style="position:relative;right:0; ></button>' +
        '</div>';
    alertPlaceholder.append(wrapper);
}

var dismissAllALerts = function () {
    var alertList = $('.alert')
    alertList.each(function () {
        $(this).remove();
    });
}