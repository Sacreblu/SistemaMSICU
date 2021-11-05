

function initializeGeneracion(){

	$('#EERegistro').on('hidden.bs.modal', function () {
		$( ".alertError" ).html("");
		document.getElementById("formularioRegistroEE").reset();
	});
	$('#EEModificar').on('hidden.bs.modal', function () {
		$( ".alertError" ).html("");
		document.getElementById("formularioModificarEE").reset();
	});

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Plan_de_Estudios/ObtenerPlanes',
		type: "POST",
		success: function(resultado){
			for(var i = 0; i < resultado.length; i++){
				$("#RegistrarPlanEE").append(new Option(resultado[i].Nombre, resultado[i].id));
				$("#ModificarPlanEE").append(new Option(resultado[i].Nombre, resultado[i].id));
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});

	$('#MostrarEE').on('change', function() {
		filtradoEE();
	});

	$('#busquedaEE').keyup(function() {
		busquedaEE();
	});

	$("#formularioModificarEE").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });

	$("#formularioRegistroEE").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });

	$('#EETabla').DataTable(configTable);
	$('.dataTables_length').addClass('bs-select');
}

function busquedaEE() {
	var aux = document.getElementsByName("opcionEE");
		var checkvalor="";
		for (let i = 0; i < aux.length; i++) {
			if( aux[i].checked) {
				//console.log(aux[i].value);
				checkvalor = aux[i].value;
			}
		}

		var valor = $('#busquedaEE').val();
	
		if(valor!=""){
			var parametros = {
				"busqueda" : valor,
				"check" : checkvalor
			};

			$.ajax({
				headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
				url: '/Plan_de_Estudios/BusquedaEE',
				data: parametros,
				type: "POST",
				success: function(resultado){
					$('#EETabla').DataTable().clear().destroy();
					var longArray = resultado.length;
					var tabla="";
					for (let i = 0; i < longArray; i++) {
						tabla = tabla + '<tr onclick="llenarModificarEE('+JSON.stringify(resultado[i])+')" data-toggle="modal" data-target="#EEModificar" title="Modificar" style="cursor:pointer">';
						tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].NombreEE + '</td>';
						tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].planNombre + '</td>';
						tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Area +'</td>';
						tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Creditos + '</td>';
						tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].HrsTeoriaConProfesor + '</td>';
						tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].HrsTeoriaSinProfesor + '</td>';
						tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].HrsPracticasConProfesor + '</td>';
						tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].HrsPracticasSinProfesor + '</td>';
						tabla = tabla + '</tr>';
					}
					document.getElementById('tablaEE').innerHTML=tabla;
					$('#EETabla').DataTable(configTable);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log(XMLHttpRequest);
					console.log(textStatus);
					console.log(errorThrown);
				}
			});
		}else{
			//filtradoEE();
		}
}

function filtradoEE(){
	var mostrar = $('#MostrarEE').val();

	var parametros = {
		"mostrar" : mostrar
	};

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Plan_de_Estudios/FiltradoTablaEE',
		data: parametros,
		type: "POST",
		success: function(resultado){
			$('#EETabla').DataTable().clear().destroy();
			var longArray = resultado.length;
			var tabla="";
			for (let i = 0; i < longArray; i++) {
				tabla = tabla + '<tr onclick="llenarModificarEE('+JSON.stringify(resultado[i])+')" data-toggle="modal" data-target="#EEModificar" title="Modificar" style="cursor:pointer">';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].NombreEE + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].planNombre + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Area +'</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Creditos + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].HrsTeoriaConProfesor + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].HrsTeoriaSinProfesor + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].HrsPracticasConProfesor + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].HrsPracticasSinProfesor + '</td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('tablaEE').innerHTML=tabla;
			$('#EETabla').DataTable(configTable);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}


function registrarEE(){
	var newForm = new FormData(document.getElementById('formularioRegistroEE'));
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Plan_de_Estudios/Registrar_EE",
		contentType: false,
		processData: false,
		data: newForm,
		type: "POST",
		success: function(resultado){
			$('#EERegistro').modal('hide');
			document.getElementById("formularioRegistroEE").reset();
			alert(resultado);
			location.reload();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.NombreEE.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.NombreEE[i];
					if(XMLHttpRequest.responseJSON.errors.NombreEE.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertNombreEERegistro").html(mensajes);
			} catch (error) {
				$("#alertNombreEERegistro").html("");
			}

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.CreditosEE.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.CreditosEE[i];
					if(XMLHttpRequest.responseJSON.errors.CreditosEE.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertCreditosEERegistro").html(mensajes);
			} catch (error) {
				$("#alertCreditosEERegistro").html("");
			}

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.TeoriaConProfesorEE.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.TeoriaConProfesorEE[i];
					if(XMLHttpRequest.responseJSON.errors.TeoriaConProfesorEE.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertTeoriaConProfesorEERegistro").html(mensajes);
			} catch (error) {
				$("#alertTeoriaConProfesorEERegistro").html("");
			}

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.TeoriaSinProfesorEE.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.TeoriaSinProfesorEE[i];
					if(XMLHttpRequest.responseJSON.errors.TeoriaSinProfesorEE.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertTeoriaSinProfesorEERegistro").html(mensajes);
			} catch (error) {
				$("#alertTeoriaSinProfesorEERegistro").html("");
			}

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.PracticasConProfesorEE.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.PracticasConProfesorEE[i];
					if(XMLHttpRequest.responseJSON.errors.PracticasConProfesorEE.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertPracticasConProfesorEERegistro").html(mensajes);
			} catch (error) {
				$("#alertPracticasConProfesorEERegistro").html("");
			}

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.PracticasSinProfesorEE.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.PracticasSinProfesorEE[i];
					if(XMLHttpRequest.responseJSON.errors.PracticasSinProfesorEE.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertPracticasSinProfesorEERegistro").html(mensajes);
			} catch (error) {
				$("#alertPracticasSinProfesorEERegistro").html("");
			}
		}
	});
}


function llenarModificarEE(EE) {
	console.log(EE);
	document.getElementById("ModificarIDEE").value = EE.id;
	document.getElementById("ModificarNombreEE").value = EE.NombreEE;
	document.getElementById("ModificarAreaEE").value = EE.Area;
	document.getElementById("ModificarCreditosEE").value = EE.Creditos;
	document.getElementById("ModificarTeoriaConProfesorEE").value = EE.HrsTeoriaConProfesor;
	document.getElementById("ModificarTeoriaSinProfesorEE").value = EE.HrsTeoriaSinProfesor;
	document.getElementById("ModificarPracticasConProfesorEE").value = EE.HrsPracticasConProfesor;
	document.getElementById("ModificarPracticasSinProfesorEE").value = EE.HrsPracticasSinProfesor;
	document.getElementById("ModificarPlanEE").value = EE.id_Plan;
}



function modificarEE(){
	var newForm = new FormData(document.getElementById('formularioModificarEE'));
	var id = document.getElementById('ModificarIDEE').value;
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Plan_de_Estudios/Modificar_EE/"+id,
		contentType: false,
		processData: false,
		data: newForm,
		type: "POST",
		success: function(resultado){
			$('#EEModificar').modal('hide');
			document.getElementById("formularioModificarEE").reset();
			alert(resultado);
			//location.reload();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.NombreEE.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.NombreEE[i];
					if(XMLHttpRequest.responseJSON.errors.NombreEE.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertNombreEEModificar").html(mensajes);
			} catch (error) {
				$("#alertNombreEEModificar").html("");
			}

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.CreditosEE.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.CreditosEE[i];
					if(XMLHttpRequest.responseJSON.errors.CreditosEE.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertCreditosEEModificar").html(mensajes);
			} catch (error) {
				$("#alertCreditosEEModificar").html("");
			}

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.TeoriaConProfesorEE.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.TeoriaConProfesorEE[i];
					if(XMLHttpRequest.responseJSON.errors.TeoriaConProfesorEE.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertTeoriaConProfesorEEModificar").html(mensajes);
			} catch (error) {
				$("#alertTeoriaConProfesorEEModificar").html("");
			}

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.TeoriaSinProfesorEE.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.TeoriaSinProfesorEE[i];
					if(XMLHttpRequest.responseJSON.errors.TeoriaSinProfesorEE.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertTeoriaSinProfesorEEModificar").html(mensajes);
			} catch (error) {
				$("#alertTeoriaSinProfesorEEModificar").html("");
			}

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.PracticasConProfesorEE.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.PracticasConProfesorEE[i];
					if(XMLHttpRequest.responseJSON.errors.PracticasConProfesorEE.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertPracticasConProfesorEEModificar").html(mensajes);
			} catch (error) {
				$("#alertPracticasConProfesorEEModificar").html("");
			}

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.PracticasSinProfesorEE.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.PracticasSinProfesorEE[i];
					if(XMLHttpRequest.responseJSON.errors.PracticasSinProfesorEE.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertPracticasSinProfesorEEModificar").html(mensajes);
			} catch (error) {
				$("#alertPracticasSinProfesorEEModificar").html("");
			}

		}
	});
}