

function initializeGeneracion(){
	var myDate = new Date();
	var year = myDate.getFullYear();
	for(var i = year; i >= 2012; i--){
		$("#RegistrarAnioComienzoGen").append(new Option(i, i));
		$("#ModificarAnioComienzoGen").append(new Option(i, i));
	}
	
	var anioFin = parseInt($('#RegistrarAnioComienzoGen').val())+2;
	$('#RegistrarAnioConclusionGen').val(anioFin);

	$('#RegistrarAnioComienzoGen').on('change', function() {
		var anioFin = parseInt($('#RegistrarAnioComienzoGen').val())+2;
		$('#RegistrarAnioConclusionGen').val(anioFin);
	});

	$('#ModificarAnioComienzoGen').on('change', function() {
		var anioFin = parseInt($('#ModificarAnioComienzoGen').val())+2;
		$('#ModificarAnioConclusionGen').val(anioFin);
	});

	$('#GenRegistro').on('hidden.bs.modal', function () {
		$( ".alertError" ).html("");
		document.getElementById("formularioRegistroGen").reset();
		var anioFin = parseInt($('#RegistrarAnioComienzoGen').val())+2;
		$('#RegistrarAnioConclusionGen').val(anioFin);
	});
	$('#GenModificar').on('hidden.bs.modal', function () {
		$( ".alertError" ).html("");
		document.getElementById("formularioModificarGen").reset();
	});

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Plan_de_Estudios/ObtenerPlanes',
		type: "POST",
		success: function(resultado){
			for(var i = 0; i < resultado.length; i++){
				$("#RegistrarPlanGen").append(new Option(resultado[i].Nombre, resultado[i].id));
				$("#ModificarPlanGen").append(new Option(resultado[i].Nombre, resultado[i].id));
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});

	$('#MostrarGen').on('change', function() {
		filtradoGen();
	});

	$('#busquedaGen').keyup(function() {
		busquedaGen();
	});

	$("#formularioModificarGen").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });

	$("#formularioRegistroGen").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });

	$('#GeneracionesTabla').DataTable(configTable);
	$('.dataTables_length').addClass('bs-select');
}

function busquedaGen() {
	var aux = document.getElementsByName("opcionGen");
		var checkvalor="";
		for (let i = 0; i < aux.length; i++) {
			if( aux[i].checked) {
				//console.log(aux[i].value);
				checkvalor = aux[i].value;
			}
		}

		var valor = $('#busquedaGen').val();
	
		if(valor!=""){
			var parametros = {
				"busqueda" : valor,
				"check" : checkvalor
			};

			$.ajax({
				headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
				url: '/Plan_de_Estudios/BusquedaGen',
				data: parametros,
				type: "POST",
				success: function(resultado){
					$('#GeneracionesTabla').DataTable().clear().destroy();
					var longArray = resultado.length;
					var tabla="";
					for (let i = 0; i < longArray; i++) {
						tabla = tabla + '<tr>';
						tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Generacion + '° Gen</td>';
						tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Nombre + '</td>';
						tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Mes_Inicio + " " + resultado[i].Anio_Inicio + '</td>';
						tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Mes_Fin + " " + resultado[i].Anio_Fin + '</td>';
						tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Estado + '</td>';
						tabla = tabla + '<td  style=\'vertical-align:middle;  text-align:center\'><button type=\'button\' class=\'btn btn-primary btn-sm\' onclick=\'llenarModificarGen('+JSON.stringify(resultado[i])+')\' data-toggle=\'modal\' data-target=\'#GenModificar\'>Modificar</button></td>';
						tabla = tabla + '</tr>';
					}
					document.getElementById('tablaGeneraciones').innerHTML=tabla;
					$('#GeneracionesTabla').DataTable(configTable);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log(XMLHttpRequest);
					console.log(textStatus);
					console.log(errorThrown);
				}
			});
		}else{
			filtradoGen();
		}
}

function filtradoGen(){
	var mostrar = $('#MostrarGen').val();

	var parametros = {
		"mostrar" : mostrar
	};

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Plan_de_Estudios/FiltradoTablaGen',
		data: parametros,
		type: "POST",
		success: function(resultado){
			$('#GeneracionesTabla').DataTable().clear().destroy();
			var longArray = resultado.length;
			var tabla="";
			for (let i = 0; i < longArray; i++) {
				tabla = tabla + '<tr>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Generacion + '° Gen</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Nombre + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Mes_Inicio + " " + resultado[i].Anio_Inicio + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Mes_Fin + " " + resultado[i].Anio_Fin + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + resultado[i].Estado + '</td>';
				tabla = tabla + '<td  style=\'vertical-align:middle;  text-align:center\'><button type=\'button\' class=\'btn btn-primary btn-sm\' onclick=\'llenarModificarGen('+JSON.stringify(resultado[i])+')\' data-toggle=\'modal\' data-target=\'#GenModificar\'>Modificar</button></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('tablaGeneraciones').innerHTML=tabla;
			$('#GeneracionesTabla').DataTable(configTable);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}


function registrarGeneracion(){
	var newForm = new FormData(document.getElementById('formularioRegistroGen'));
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Plan_de_Estudios/Registrar_Generacion",
		contentType: false,
		processData: false,
		data: newForm,
		type: "POST",
		success: function(resultado){
			$('#GenRegistro').modal('hide');
			document.getElementById("formularioRegistroGen").reset();
			var anioFin = parseInt($('#RegistrarAnioComienzoGen').val())+2;
			$('#RegistrarAnioConclusionGen').val(anioFin);
			alert(resultado);
			location.reload();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.Generacion.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.Generacion[i];
					if(XMLHttpRequest.responseJSON.errors.Generacion.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertGeneracionRegistro").html(mensajes);
			} catch (error) {
				$("#alertGeneracionRegistro").html("");
			}

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.Anio_Inicio.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.Anio_Inicio[i];
					if(XMLHttpRequest.responseJSON.errors.Anio_Inicio.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertAnioComienzoRegistro").html(mensajes);
			} catch (error) {
				$("#alertAnioComienzoRegistro").html("");
			}

		}
	});
}


function llenarModificarGen(generacion) {
	document.getElementById("ModificarIDGen").value = generacion.id;
	document.getElementById("ModificarNumeroGen").value = generacion.Generacion;
	document.getElementById("ModificarMesComienzoGen").value = generacion.Mes_Inicio;
	document.getElementById("ModificarAnioComienzoGen").value = generacion.Anio_Inicio;
	document.getElementById("ModificarMesConclusionGen").value = generacion.Mes_Fin;
	document.getElementById("ModificarAnioConclusionGen").value = generacion.Anio_Fin;
	document.getElementById("ModificarPlanGen").value = generacion.Id_Plan;
	if(generacion.Estado=="Vigente"){
		$("#ModificarGenVigente").attr('checked', true);
	}else{
		$("#ModificarGenVigente").attr('checked',false);
	}
	
}



function modificarGen(){
	var newForm = new FormData(document.getElementById('formularioModificarGen'));
	var id = document.getElementById('ModificarIDGen').value;
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Plan_de_Estudios/Modificar_Generacion/"+id,
		contentType: false,
		processData: false,
		data: newForm,
		type: "POST",
		success: function(resultado){
			$('#GenModificar').modal('hide');
			document.getElementById("formularioModificarGen").reset();
			alert(resultado);
			location.reload();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.Generacion.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.Generacion[i];
					if(XMLHttpRequest.responseJSON.errors.Generacion.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertGeneracionModificar").html(mensajes);
			} catch (error) {
				$("#alertGeneracionModificar").html("");
			}

			try {
				var mensajes="";
				for (let i = 0; i < XMLHttpRequest.responseJSON.errors.Anio_Inicio.length; i++) {
					mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+XMLHttpRequest.responseJSON.errors.Anio_Inicio[i];
					if(XMLHttpRequest.responseJSON.errors.Anio_Inicio.length-i!=1){
						mensajes = mensajes + "<br>"
					}
				}
				$("#alertAnioComienzoModificar").html(mensajes);
			} catch (error) {
				$("#alertAnioComienzoModificar").html("");
			}

		}
	});
}