
//Funcion que al cargar la pagina llena de opciones el select requerido para el año


function initializeLGAC(){
	$('#LGACRegistro').on('hidden.bs.modal', function () {
		$( ".alertError" ).html("");
		document.getElementById("formularioRegistroLGAC").reset();
	});
	$('#LGACModificar').on('hidden.bs.modal', function () {
		$( ".alertError" ).html("");
		document.getElementById("formularioModificarLGAC").reset();
	});

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Plan_de_Estudios/ObtenerPlanes',
		type: "POST",
		success: function(resultado){
			for(var i = 0; i < resultado.length; i++){
				$("#RegistrarPlanLGAC").append(new Option(resultado[i].Nombre, resultado[i].id));
				$("#ModificarPlanLGAC").append(new Option(resultado[i].Nombre, resultado[i].id));
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});

	$('#MostrarLGAC').on('change', function() {
		filtradoLGAC();
	});

	$('#busquedaLGAC').keyup(function() {
		busquedaLGAC();
	});

	$("#formularioModificarLGAC").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });

	$("#formularioRegistroLGAC").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });

	
	$('#LGACTabla').DataTable(configTable);
	
}

function busquedaLGAC() {
	var aux = document.getElementsByName("opcionLGAC");
		var checkvalor="";
		for (let i = 0; i < aux.length; i++) {
			if( aux[i].checked) {
				//console.log(aux[i].value);
				checkvalor = aux[i].value;
			}
		}

		var valor = $('#busquedaLGAC').val();
	
		if(valor!=""){
			var parametros = {
				"busqueda" : valor,
				"check" : checkvalor
			};

			$.ajax({
				headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
				url: '/Plan_de_Estudios/BusquedaLGAC',
				data: parametros,
				type: "POST",
				success: function(resultado){
					$('#LGACTabla').DataTable().clear().destroy();
					var longArray = resultado.length;
					var tabla="";
					for (let i = 0; i < longArray; i++) {
						var valor="";
						if (resultado[i].Vigente == "on") {
							valor = "Vigente";
						} else {
							valor = "No Vigente";
						}
						tabla = tabla + '<tr>';
						tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Nombre + '</td>';
						tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].planNombre + '</td>';
						tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + valor + '</td>';
						tabla = tabla + '<td  style=\'vertical-align:middle;  text-align:center\'><button type=\'button\' class=\'btn btn-primary btn-sm\' onclick=\'llenarModificarLGAC('+JSON.stringify(resultado[i])+')\' data-toggle=\'modal\' data-target=\'#LGACModificar\'>Modificar</button></td>';
						tabla = tabla + '</tr>';
					}
					document.getElementById('tablaLGAC').innerHTML=tabla;
					$('#LGACTabla').DataTable(configTable);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log(XMLHttpRequest);
					console.log(textStatus);
					console.log(errorThrown);
				}
			});
		}else{
			filtradoLGAC();
		}
}

function filtradoLGAC(){
	var mostrar = $('#MostrarLGAC').val();

	var parametros = {
		"mostrar" : mostrar
	};

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Plan_de_Estudios/FiltradoTablaLGAC',
		data: parametros,
		type: "POST",
		success: function(resultado){
			$('#LGACTabla').DataTable().clear().destroy();
			//console.log(resultado);
			var longArray = resultado.length;
			var tabla="";
			for (let i = 0; i < longArray; i++) {
				var valor="";
				if (resultado[i].Vigente == "on") {
					valor = "Vigente";
				} else {
					valor = "No Vigente";
				}
				tabla = tabla + '<tr>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Nombre + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].planNombre + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + valor + '</td>';
				tabla = tabla + '<td  style=\'vertical-align:middle;  text-align:center\'><button type=\'button\' class=\'btn btn-primary btn-sm\' onclick=\'llenarModificarLGAC('+JSON.stringify(resultado[i])+')\' data-toggle=\'modal\' data-target=\'#GenModificar\'>Modificar</button></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('tablaLGAC').innerHTML=tabla;
			$('#LGACTabla').DataTable(configTable);
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}


function registrarLGAC(){
	var newForm = new FormData(document.getElementById('formularioRegistroLGAC'));
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Plan_de_Estudios/Registrar_LGAC",
		contentType: false,
		processData: false,
		data: newForm,
		type: "POST",
		success: function(resultado){
			$('#LGACRegistro').modal('hide');
			document.getElementById("formularioRegistroLGAC").reset();
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
				$("#alertNombreLGACRegistro").html(mensajes);
			} catch (error) {
				$("#alertNombreLGACRegistro").html("");
			}
		}
	});
}


function llenarModificarLGAC(lgac) {
	document.getElementById("ModificarIDLGAC").value = lgac.id;
	document.getElementById("ModificarNombreLGAC").value = lgac.Nombre;
	document.getElementById("ModificarPlanLGAC").value = lgac.Id_Plan;
	if(lgac.Vigente=="on"){
		$("#ModificarLGACVigente").attr('checked', true);
	}else{
		$("#ModificarLGACVigente").attr('checked',false);
	}
	
}



function modificarLGAC(){
	var newForm = new FormData(document.getElementById('formularioModificarLGAC'));
	var id = document.getElementById('ModificarIDLGAC').value;
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Plan_de_Estudios/Modificar_LGAC/"+id,
		contentType: false,
		processData: false,
		data: newForm,
		type: "POST",
		success: function(resultado){
			$('#LGACModificar').modal('hide');
			document.getElementById("formularioModificarLGAC").reset();
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
				$("#alertNombreLGACModificar").html(mensajes);
			} catch (error) {
				$("#alertNombreLGACModificar").html("");
			}

		}
	});
}