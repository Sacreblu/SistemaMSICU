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

window.onload = function() {
	initializeTrabajos();
};

function initializeTrabajos() {
    $('#TrabajoTabla').DataTable(configTable);
	$("#formBusqueda").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });

	getConvenios();

	$('#Mostrar').on('change', function() {
		filtradoTrabajoEnSector();
	});

	limpiarTMP();
}

function getConvenios(){
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Convenios_Movilidad/ObtenerConveniosPorSector",
		type: "POST",
		dataType: "json",
		success: function(resultado){
			for(var i = 0; i < resultado.length; i++){
				$("#Mostrar").append(new Option(resultado[i].Nombre_Clave, resultado[i].id));
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
					
			location.reload();
		}
	});
}

function filtradoTrabajoEnSector(){
	var mostrar = $('#Mostrar').val();

	var parametros = {
		"mostrar" : mostrar
	};

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Trabajos_En_Sector/FiltradoTablaTS',
		data: parametros,
		type: "POST",
		success: function(resultado){
			$('#TrabajoTabla').DataTable().clear().destroy();
			console.log(resultado);
			var longArray = resultado.length;
			var tabla="";
			for (let i = 0; i < longArray; i++) {
				tabla = tabla + '<tr>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].NombreProyecto + '</td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].Nombre_Clave + '</td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].Nombre +' '+resultado[i].Apellido_P+' '+ resultado[i].Apellido_M+ '</td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].anioInicio + '</td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].anioFin + '</td>';
					tabla = tabla + '<td  style=\'vertical-align:middle;  text-align:center\'>';
					tabla = tabla + '<button type=\'button\' class=\'btn btn-primary btn-xs\' onclick=\'ModificarTrabajo(\"'+resultado[i].id+'\")\'>Modificar</button>';
					tabla = tabla + '<button type=\'button\' class=\'btn btn-danger btn-xs btn-deshab\' onclick=\'EliminarTrabajo(\"'+resultado[i].id+'\")\'>Eliminar</button>';
					tabla = tabla + '</td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('tablaTrabajos').innerHTML=tabla;
			$('#TrabajoTabla').DataTable(configTable);
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function busquedaTrabajoEnSector() {
	var form = new FormData(document.getElementById("formBusqueda"));
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Trabajos_En_Sector/BusquedaTrabajoEnSector',
		data: form,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(resultado){
			console.log(resultado);
			$('#TrabajoTabla').DataTable().clear().destroy();
			var longArray = resultado.length;
			var tabla="";
			for (let i = 0; i < longArray; i++) {
				tabla = tabla + '<tr>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].NombreProyecto + '</td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].Nombre_Clave + '</td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].Nombre +' '+resultado[i].Apellido_P+' '+ resultado[i].Apellido_M+ '</td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].anioInicio + '</td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].anioFin + '</td>';
					tabla = tabla + '<td  style=\'vertical-align:middle;  text-align:center\'>';
					tabla = tabla + '<button type=\'button\' class=\'btn btn-primary btn-xs\' onclick=\'ModificarTrabajo(\"'+resultado[i].id+'\")\'>Modificar</button>';
					tabla = tabla + '<button type=\'button\' class=\'btn btn-danger btn-xs btn-deshab\' onclick=\'EliminarTrabajo(\"'+resultado[i].id+'\")\'>Eliminar</button>';
					tabla = tabla + '</td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('tablaTrabajos').innerHTML=tabla;
			$('#TrabajoTabla').DataTable(configTable);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function verInformacionTrabajo(idTS){
	var parametros = {
		"idTS" : idTS
	};

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Trabajos_En_Sector/obtenerInformacionTS',
		data: parametros,
		type: "POST",
		success: function(resultado){
			console.log(resultado);
			
			$('#NombreProyecto').html(resultado.DatosGenerales.NombreProyecto);
			$('#Nombre_Clave').html(resultado.DatosGenerales.Nombre_Clave);
			$('#Institucion').html(resultado.DatosGenerales.Institucion);
			$('#ResponsableProyecto').html(resultado.DatosGenerales.ResponsableProyecto);
			$('#anioInicio').html(resultado.DatosGenerales.anioInicio);
			$('#anioFin').html(resultado.DatosGenerales.anioFin);

			if(resultado.DatosGenerales.RutaArchivoEvidencia!=null){
				var ArchivoEvidencia = '<tr>';
					ArchivoEvidencia += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado.DatosGenerales.RutaArchivoEvidencia+'" target="_blank" rel="noopener noreferrer">'+resultado.DatosGenerales.NombreArchivoEvidencia+'</a></td>';
				ArchivoEvidencia += '</tr>';
				$('#ArchivoEvidencia').html(ArchivoEvidencia);
			}else{
				var ArchivoEvidencia = '<tr>';
					ArchivoEvidencia += '<td style="vertical-align:middle; text-align:center">*Archivo Evidencia Sin Agregar*</td>';
				ArchivoEvidencia += '</tr>';
				$('#ArchivoEvidencia').html(ArchivoEvidencia);
			}
			
			$('#ProfResponsable').html(resultado.DatosGenerales.Nombre+" "+resultado.DatosGenerales.Apellido_P+" "+resultado.DatosGenerales.Apellido_M);
			
			if(resultado.DatosGenerales.NombreEE!=null){
				$('#EE').html(resultado.DatosGenerales.NombreEE+" ("+resultado.DatosGenerales.NombrePlan+")");
			}else{
				$('#EE').html("*Sin Experiencia Educativa Asociada*");
			}
			
			$("#ColabProf").html("");
			for (let i = 0; i < resultado.ColabProf.length; i++) {
				var profesor = '<p style="font-size:16px;" style="width:800px;">'+resultado.ColabProf[i].Nombre+" "+resultado.ColabProf[i].Apellido_P+" "+resultado.ColabProf[i].Apellido_M+'</p>';
				$("#ColabProf").append(profesor);
			}

			$("#ColabEst").html("");
			for (let i = 0; i < resultado.ColabEst.length; i++) {
				var estudiante = '<p style="font-size:16px;" style="width:800px;">'+resultado.ColabEst[i].Nombre+" "+resultado.ColabEst[i].Apellido_P+" "+resultado.ColabEst[i].Apellido_M+'</p>';
				$("#ColabEst").append(estudiante);
			}

			$('#Modificar').attr("onclick","ModificarTrabajo(\'"+resultado.DatosGenerales.id+"\')");
			$('#Deshabilitar').attr("onclick","EliminarTrabajo(\'"+resultado.DatosGenerales.id+"\')");
			$('#verDatos').modal('show');
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function ModificarTrabajo(idTS) {
	location.href="/Trabajos_En_Sector/Modificar_Trabajos_Sectores/"+idTS;
}

function EliminarTrabajo(idTS) {
	var parametros = {
		"idTS" : idTS
	};

	if (window.confirm("¿Desea elimiar este registro?")) {
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: '/Trabajos_En_Sector/Eliminar_Trabajos_Sectores',
			data: parametros,
			type: "POST",
			success: function(resultado){
				//filtradoMovilidades();
				$("#verDatos").modal("hide");
				alert(resultado);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	}
}

function limpiarTMP() {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Auxiliar/LimpiarTMP",
		type: "POST",
		success: function(resultado){
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			location.reload();
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

