
var configTable = {
	"pagingType": "simple_numbers",
	"searching": false,
	"lengthChange": false,
	"pageLength": 10,
	"language": {
		"decimal": "",
		"emptyTable": "No hay información",
		"info": "Mostrando _START_ a _END_ de _TOTAL_ resultados",
		"infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
		"infoFiltered": "(Filtrado de _MAX_ total entradas)",
		"infoPostFix": "",
		"thousands": ",",
		"lengthMenu": "Mostrar _MENU_ Entradas",
		"loadingRecords": "Cargando...",
		"processing": "Procesando...",
		"search": "Buscar:",
		"zeroRecords": "Sin resultados encontrados",
		"paginate": {
			"first": "Primero",
			"last": "Ultimo",
			"next": "Siguiente",
			"previous": "Anterior"
		}
	},
	"columnDefs": [
		{ orderable: false, targets: -1 }
	 ] 
  };

//Funcion que al cargar la pagina llena de opciones el select requerido para el año
window.onload = function() {
	initializePlan();
	initializeGeneracion();
	initializeLGAC();
};

function initializePlan(){
	var myDate = new Date();
	var year = myDate.getFullYear();
	for(var i = year; i >= 2012; i--){
		$("#RegistrarAnioPlan").append(new Option(i, i));
		$("#ModificarAnioPlan").append(new Option(i, i));
	}

	$('#PlanRegistro').on('hidden.bs.modal', function () {
		$( ".alertError" ).html("");
		document.getElementById("formularioRegistroPlan").reset();
	});
	$('#PlanModificar').on('hidden.bs.modal', function () {
		$( ".alertError" ).html("");
		document.getElementById("formularioModificarPlan").reset();
	});

	$('#Mostrar').on('change', function() {
		filtrado();
	});

	$('#busqueda').keyup(function() {
		busquedaPlan();			
	});

	$("#formularioModificarPlan").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });
	$("#formularioRegistroPlan").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });

	$('#PlanesTabla').DataTable(configTable);
}

function busquedaPlan() {
	var aux = document.getElementsByName("opcionPlan");
		var checkvalor="";
		for (let i = 0; i < aux.length; i++) {
			if( aux[i].checked) {
				//console.log(aux[i].value);
				checkvalor = aux[i].value;
			}
		}

		var valor = $('#busqueda').val();
	
		if(valor!=""){
			var parametros = {
				"busqueda" : valor,
				"check" : checkvalor
			};

			$.ajax({
				headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
				url: '/Plan_de_Estudios/Busqueda',
				data: parametros,
				type: "POST",
				success: function(resultado){
					$('#PlanesTabla').DataTable().clear().destroy();
					var longArray = resultado.length;
					var tabla="";
					for (let i = 0; i < longArray; i++) {
						tabla = tabla + '<tr>';
						tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Nombre + '</td>';
						tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Anio + '</td>';
						if (resultado[i].Vigente=="on") {
							tabla = tabla + '<td style="vertical-align:middle; text-align:center">Vigente</td>';
						} else {
							tabla = tabla + '<td style="vertical-align:middle; text-align:center">No vigente</td>';
						}
						tabla = tabla + '<td  style=\'vertical-align:middle;  text-align:center\'><button type=\'button\' class=\'btn btn-primary btn-sm\' onclick=\'llenarModificarPlan('+JSON.stringify(resultado[i])+')\' data-toggle=\'modal\' data-target=\'#PlanModificar\'>Modificar</button></td>';
						tabla = tabla + '</tr>';
					}
					document.getElementById('tablaPlanes').innerHTML=tabla;
					$('#PlanesTabla').DataTable(configTable);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log(XMLHttpRequest);
					console.log(textStatus);
					console.log(errorThrown);
				}
			});
		}
		else{
			filtrado();
		}
}

function filtrado(){
	var mostrar = $('#Mostrar').val();

	var parametros = {
		"mostrar" : mostrar
	};

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Plan_de_Estudios/FiltradoTabla',
		data: parametros,
		type: "POST",
		success: function(resultado){
			$('#PlanesTabla').DataTable().clear().destroy();
			console.log(resultado);
			var longArray = resultado.length;
			var tabla="";
			for (let i = 0; i < longArray; i++) {
				tabla = tabla + '<tr>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Nombre + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Anio + '</td>';
				if (resultado[i].Vigente=="on") {
					tabla = tabla + '<td style="vertical-align:middle; text-align:center">Vigente</td>';
				} else {
					tabla = tabla + '<td style="vertical-align:middle; text-align:center">No vigente</td>';
				}
				tabla = tabla + '<td  style=\'vertical-align:middle;  text-align:center\'><button type=\'button\' class=\'btn btn-primary btn-sm\' onclick=\'llenarModificarPlan('+JSON.stringify(resultado[i])+')\' data-toggle=\'modal\' data-target=\'#PlanModificar\'>Modificar</button></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('tablaPlanes').innerHTML=tabla;
			$('#PlanesTabla').DataTable(configTable);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}


//Funcion que obtiene el formulario de registro de Plan y hace la peticion por AJAX
function registrarPlan(){
	var newForm = new FormData(document.getElementById('formularioRegistroPlan'));
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Plan_de_Estudios/Registrar_Plan",
		contentType: false,
		processData: false,
		data: newForm,
		type: "POST",
		success: function(resultado){
			$('#PlanRegistro').modal('hide');
			document.getElementById("formularioRegistroPlan").reset();
			alert(resultado);
			location.reload();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.Nombre.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.Nombre[i];
					if(XMLHttpRequest.responseJSON.errors.Nombre.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertNombreRegistro").html(mensajes);
			} catch (error) {
				$("#alertNombreRegistro").html("");
			}

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.Anio.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.Anio[i];
					if(XMLHttpRequest.responseJSON.errors.Anio.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertAnioRegistro").html(mensajes);
			} catch (error) {
				$("#alertAnioRegistro").html("");
			}

		}
	});
}

//Funcion que llena el formulario de modificar plan
function llenarModificarPlan(plan) {
	var id = plan.id;
	var nombre = plan.Nombre;
	var anio = plan.Anio;
	var vigente = plan.Vigente; 

	document.getElementById("ModificarIDPlan").value = id;
	document.getElementById("ModificarNombrePlan").value = nombre;
	document.getElementById("ModificarAnioPlan").value = anio;
	if(vigente=="on"){
		$("#ModificarVigente").attr('checked', true);
	}else{
		$("#ModificarVigente").attr('checked',false);
	}
	
}


//Funcion que obtiene el formulario de modificación de Plan y hace la peticion por AJAX
function modificarPlan(){
	var newForm = new FormData(document.getElementById('formularioModificarPlan'));
	var id = document.getElementById('ModificarIDPlan').value;
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Plan_de_Estudios/Modificar_Plan/"+id,
		contentType: false,
		processData: false,
		data: newForm,
		type: "POST",
		success: function(resultado){
			$('#PlanModificar').modal('hide');
			document.getElementById("formularioModificarPlan").reset();
			alert(resultado);
			location.reload();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.Nombre.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.Nombre[i];
					if(XMLHttpRequest.responseJSON.errors.Nombre.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertNombreModificar").html(mensajes);
			} catch (error) {
				$("#alertNombreModificar").html("");
			}

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.Anio.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.Anio[i];
					if(XMLHttpRequest.responseJSON.errors.Anio.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertAnioModificar").html(mensajes);
			} catch (error) {
				$("#alertAnioModificar").html("");
			}

		}
	});
}