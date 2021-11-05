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
	initializeMovilidades();
};

function initializeMovilidades() {
    $('#MovilidadTabla').DataTable(configTable);
	$("#formBusqueda").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });
	$('#Mostrar').on('change', function() {
		filtradoMovilidades();
	});

	/*$('#verDatos').on('hidden.bs.modal', function () {
		$('#Secciones a:first').tab('show') // Select first tab
	})*/

	limpiarTMP();
}


function filtradoMovilidades(){
	var mostrar = $('#Mostrar').val();

	var parametros = {
		"mostrar" : mostrar
	};

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Acciones_Movilidad/FiltradoTablaMovilidades',
		data: parametros,
		type: "POST",
		success: function(resultado){
			$('#MovilidadTabla').DataTable().clear().destroy();
			console.log(resultado);
			var longArray = resultado.length;
			var tabla="";
			for (let i = 0; i < longArray; i++) {
				tabla = tabla + '<tr>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionMovilidad(\''+resultado[i].id+'\')">' + resultado[i].Nombre +' '+resultado[i].Apellido_P+' '+ resultado[i].Apellido_M+ '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionMovilidad(\''+resultado[i].id+'\')">' + resultado[i].Nombre_Clave + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionMovilidad(\''+resultado[i].id+'\')">' + resultado[i].PeriodoInicio.substr(0, 7) + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionMovilidad(\''+resultado[i].id+'\')">' + resultado[i].PeriodoConclusion.substr(0, 7) + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionMovilidad(\''+resultado[i].id+'\')">' + resultado[i].InstitucionDestino + '</td>';
				tabla = tabla + '<td  style=\'vertical-align:middle;  text-align:center\'>';
				tabla = tabla + '<button type=\'button\' class=\'btn btn-primary btn-xs\' onclick=\'ModificarMovilidad(\"'+resultado[i].id+'\")\'>Modificar</button>';
				tabla = tabla + '<button type=\'button\' class=\'btn btn-danger btn-xs btn-deshab\' onclick=\'EliminarMovilidad(\"'+resultado[i].id+'\")\'>Eliminar</button>';
				tabla = tabla + '</td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('tablaMovilidades').innerHTML=tabla;
			$('#MovilidadTabla').DataTable(configTable);
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function busquedaMovilidad() {
	var form = new FormData(document.getElementById("formBusqueda"));
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Acciones_Movilidad/BusquedaMovilidades',
		data: form,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(resultado){
			$('#MovilidadTabla').DataTable().clear().destroy();
			var longArray = resultado.length;
			var tabla="";
			for (let i = 0; i < longArray; i++) {
				tabla = tabla + '<tr>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionMovilidad(\''+resultado[i].id+'\')">' + resultado[i].Nombre +' '+resultado[i].Apellido_P+' '+ resultado[i].Apellido_M+ '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionMovilidad(\''+resultado[i].id+'\')">' + resultado[i].Nombre_Clave + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionMovilidad(\''+resultado[i].id+'\')">' + resultado[i].PeriodoInicio.substr(0, 7) + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionMovilidad(\''+resultado[i].id+'\')">' + resultado[i].PeriodoConclusion.substr(0, 7) + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionMovilidad(\''+resultado[i].id+'\')">' + resultado[i].InstitucionDestino + '</td>';
				tabla = tabla + '<td  style=\'vertical-align:middle;  text-align:center\'>';
				tabla = tabla + '<button type=\'button\' class=\'btn btn-primary btn-xs\' onclick=\'ModificarMovilidad(\"'+resultado[i].id+'\")\'>Modificar</button>';
				tabla = tabla + '<button type=\'button\' class=\'btn btn-danger btn-xs btn-deshab\' onclick=\'EliminarMovilidad(\"'+resultado[i].id+'\")\'>Eliminar</button>';
				tabla = tabla + '</td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('tablaMovilidades').innerHTML=tabla;
			$('#MovilidadTabla').DataTable(configTable);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function verInformacionMovilidad(idAccion){
	var parametros = {
		"idAccion" : idAccion
	};
	
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Acciones_Movilidad/obtenerInformacionMovilidades',
		data: parametros,
		type: "POST",
		success: function(resultado){

			$('#Nombre_Clave').html(resultado.Nombre_Clave);
			$('#Estudiante').html(resultado.Nombre+" "+resultado.Apellido_P+" "+resultado.Apellido_M);
			$('#P_Comienzo').html(resultado.PeriodoInicio.substr(0, 7));
			$('#P_Conclusion').html(resultado.PeriodoConclusion.substr(0, 7));
			$('#InstDestino').html(resultado.InstitucionDestino);
			$('#Motivo').html(resultado.Motivo);
			switch (resultado.Sector) {
				case 5:
					$('#divInstOrigen').css("display","none");
					$('#divDepOrigen').css("display","none");
					$('#divDepDestino').css("display","none");
					$('#divProgOrigen').css("display","none");
					$('#divProgDestino').css("display","none");
					$('#divCongresoEvidencia').css("display","flex");
					$('#divArchivosEvidencia').css("display","none");

					if(resultado.RutaArchivoCongreso!=null){
						var evidencia = '<tr>';
							evidencia += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado.RutaArchivoCongreso+'" target="_blank" rel="noopener noreferrer">'+resultado.NombreArchivoCongreso+'</a></td>';
						evidencia += '</tr>';
						$('#EvidenciaCongreso').html(evidencia);
					}else{
						$('#EvidenciaCongreso').html("*Sin especificar*");
					}

					break;
				case 4:
					$('#divInstOrigen').css("display","inline-block");
					$('#divDepOrigen').css("display","inline-block");
					$('#divDepDestino').css("display","inline-block");
					$('#divProgOrigen').css("display","inline-block");
					$('#divProgDestino').css("display","inline-block");

					$('#InstOrigen').html(resultado.InstitucionOrigen);

					if(resultado.DependenciaOrigen!=null){
						$('#DepOrigen').html(resultado.DependenciaOrigen);
					}else{
						$('#DepOrigen').html("*Sin especificar*");
					}

					if(resultado.DependenciaDestino!=null){
						$('#DepDestino').html(resultado.DependenciaDestino);
					}else{
						$('#DepDestino').html("*Sin especificar*");
					}

					$('#ProgOrigen').html(resultado.ProgramaOrigen);
					$('#ProgDestino').html(resultado.ProgramaDestino);
					

					$('#divCongresoEvidencia').css("display","none");
					$('#divArchivosEvidencia').css("display","flex");

					if(resultado.RutaFormatoSolicitud!=null){
						var evidencia = '<tr>';
							evidencia += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado.RutaFormatoSolicitud+'" target="_blank" rel="noopener noreferrer">'+resultado.NombreFormatoSolicitud+'</a></td>';
						evidencia += '</tr>';
						$('#FormatoMovilidad').html(evidencia);
					}else{
						$('#FormatoMovilidad').html("*Documento sin cargar*");
					}
					
					if(resultado.RutaCartaMovilidad!=null){
						var evidencia = '<tr>';
							evidencia += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado.RutaCartaMovilidad+'" target="_blank" rel="noopener noreferrer">'+resultado.NombreCartaMovilidad+'</a></td>';
						evidencia += '</tr>';
						$('#CartaSolicitudMov').html(evidencia);
					}else{
						$('#CartaSolicitudMov').html("*Documento sin cargar*");
					}

					if(resultado.RutaCartaAceptacion!=null){
						var evidencia = '<tr>';
							evidencia += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado.RutaCartaAceptacion+'" target="_blank" rel="noopener noreferrer">'+resultado.NombreCartaAceptacion+'</a></td>';
						evidencia += '</tr>';
						$('#CartaAceptacion').html(evidencia);
					}else{
						$('#CartaAceptacion').html("*Documento sin cargar*");
					}

					if(resultado.RutaReporteActividades!=null){
						var evidencia = '<tr>';
							evidencia += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado.RutaReporteActividades+'" target="_blank" rel="noopener noreferrer">'+resultado.NombreReporteActividades+'</a></td>';
						evidencia += '</tr>';
						$('#ReporteActividades').html(evidencia);
					}else{
						$('#ReporteActividades').html("*Documento sin cargar*");
					}
					
					if(resultado.RutaDocumentacionComp!=null){
						var evidencia = '<tr>';
							evidencia += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado.RutaDocumentacionComp+'" target="_blank" rel="noopener noreferrer">'+resultado.NombreDocumentacionComp+'</a></td>';
						evidencia += '</tr>';
						$('#DocumentacionComp').html(evidencia);
					}else{
						$('#DocumentacionComp').html("*Documento sin cargar*");
					}
					
					if(resultado.RutaCartaLiberacion!=null){
						var evidencia = '<tr>';
							evidencia += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado.RutaCartaLiberacion+'" target="_blank" rel="noopener noreferrer">'+resultado.NombreCartaLiberacion+'</a></td>';
						evidencia += '</tr>';
						$('#CartaLiberacion').html(evidencia);
					}else{
						$('#CartaLiberacion').html("*Documento sin cargar*");
					}
					break;
				default:
					$('#divInstOrigen').css("display","none");
					$('#divDepOrigen').css("display","none");
					$('#divDepDestino').css("display","none");
					$('#divProgOrigen').css("display","none");
					$('#divProgDestino').css("display","none");
					$('#divCongresoEvidencia').css("display","none");
					$('#divArchivosEvidencia').css("display","flex");

					if(resultado.RutaFormatoSolicitud!=null){
						var evidencia = '<tr>';
							evidencia += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado.RutaFormatoSolicitud+'" target="_blank" rel="noopener noreferrer">'+resultado.NombreFormatoSolicitud+'</a></td>';
						evidencia += '</tr>';
						$('#FormatoMovilidad').html(evidencia);
					}else{
						$('#FormatoMovilidad').html("*Documento sin cargar*");
					}
					
					if(resultado.RutaCartaMovilidad!=null){
						var evidencia = '<tr>';
							evidencia += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado.RutaCartaMovilidad+'" target="_blank" rel="noopener noreferrer">'+resultado.NombreCartaMovilidad+'</a></td>';
						evidencia += '</tr>';
						$('#CartaSolicitudMov').html(evidencia);
					}else{
						$('#CartaSolicitudMov').html("*Documento sin cargar*");
					}

					if(resultado.RutaCartaAceptacion!=null){
						var evidencia = '<tr>';
							evidencia += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado.RutaCartaAceptacion+'" target="_blank" rel="noopener noreferrer">'+resultado.NombreCartaAceptacion+'</a></td>';
						evidencia += '</tr>';
						$('#CartaAceptacion').html(evidencia);
					}else{
						$('#CartaAceptacion').html("*Documento sin cargar*");
					}

					if(resultado.RutaReporteActividades!=null){
						var evidencia = '<tr>';
							evidencia += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado.RutaReporteActividades+'" target="_blank" rel="noopener noreferrer">'+resultado.NombreReporteActividades+'</a></td>';
						evidencia += '</tr>';
						$('#ReporteActividades').html(evidencia);
					}else{
						$('#ReporteActividades').html("*Documento sin cargar*");
					}
					
					if(resultado.RutaDocumentacionComp!=null){
						var evidencia = '<tr>';
							evidencia += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado.RutaDocumentacionComp+'" target="_blank" rel="noopener noreferrer">'+resultado.NombreDocumentacionComp+'</a></td>';
						evidencia += '</tr>';
						$('#DocumentacionComp').html(evidencia);
					}else{
						$('#DocumentacionComp').html("*Documento sin cargar*");
					}
					
					if(resultado.RutaCartaLiberacion!=null){
						var evidencia = '<tr>';
							evidencia += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado.RutaCartaLiberacion+'" target="_blank" rel="noopener noreferrer">'+resultado.NombreCartaLiberacion+'</a></td>';
						evidencia += '</tr>';
						$('#CartaLiberacion').html(evidencia);
					}else{
						$('#CartaLiberacion').html("*Documento sin cargar*");
					}
					break;
			}
			$('#Modificar').attr("onclick","ModificarMovilidad(\'"+resultado.id+"\')");
			$('#Deshabilitar').attr("onclick","EliminarMovilidad(\'"+resultado.id+"\')");
			$('#verDatos').modal('show');
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function ModificarMovilidad(idMovilidad) {
	location.href="/Acciones_Movilidad/Modificar_Acciones_Movilidad/"+idMovilidad;
}

function EliminarMovilidad(idMovilidad) {
	var parametros = {
		"idMovilidad" : idMovilidad
	};

	if (window.confirm("¿Desea elimiar este registro?")) {
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: '/Acciones_Movilidad/EliminarMovilidad',
			data: parametros,
			type: "POST",
			success: function(resultado){
				filtradoMovilidades();
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
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

