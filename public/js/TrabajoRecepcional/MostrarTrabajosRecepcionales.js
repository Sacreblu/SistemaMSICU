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
	initializeProfesor();
};

function initializeProfesor() {
    $('#TrabajosTabla').DataTable(configTable);
	$("#formBusqueda").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });
	$('#Mostrar').on('change', function() {
		filtradoTrabajo();
	});

	$('#verDatos').on('hidden.bs.modal', function () {
		$('#Secciones a:first').tab('show') // Select first tab
	})

	limpiarTMP();
}


function filtradoTrabajo(){
	var mostrar = $('#Mostrar').val();

	var parametros = {
		"mostrar" : mostrar
	};

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Trabajos_Recepcionales/FiltradoTablaTesis',
		data: parametros,
		type: "POST",
		success: function(resultado){
			$('#TrabajosTabla').DataTable().clear().destroy();
			//console.log(resultado);
			var longArray = resultado.length;
			var tabla="";
			for (let i = 0; i < longArray; i++) {
				tabla = tabla + '<tr>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].Titulo + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].Nombre + ' ' + resultado[i].Apellido_P + ' ' + resultado[i].Apellido_M + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].Generacion + '° Gen</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].NombreLGAC + ' (Plan '+resultado[i].Anio+')</td>';
				if(resultado[i].Estado == "EnProceso"){
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">En Proceso</td>';
				}else{
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].Estado + '</td>';
				}
				tabla = tabla + '<td  style=\'vertical-align:middle;  text-align:center\'>';
				tabla = tabla + '<button type=\'button\' class=\'btn btn-primary btn-xs\' onclick=\'ModificarTrabajo(\"'+resultado[i].id+'\")\'>Modificar</button>';
				tabla = tabla + '<button type=\'button\' class=\'btn btn-danger btn-xs btn-deshab\' onclick=\'EliminarTrabajo(\"'+resultado[i].id+'\")\'>Eliminar</button>';
				tabla = tabla + '</td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('tablaTrabajos').innerHTML=tabla;
			$('#TrabajosTabla').DataTable(configTable);
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function busquedaTesis() {
	var form = new FormData(document.getElementById("formBusqueda"));
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Trabajos_Recepcionales/BusquedaTesis',
		data: form,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(resultado){
			$('#TrabajosTabla').DataTable().clear().destroy();
			var longArray = resultado.length;
			var tabla="";
			for (let i = 0; i < longArray; i++) {
				tabla = tabla + '<tr>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].Titulo + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].Nombre + ' ' + resultado[i].Apellido_P + ' ' + resultado[i].Apellido_M + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].Generacion + '° Gen</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].NombreLGAC + ' (Plan '+resultado[i].Anio+')</td>';
				if(resultado[i].Estado == "EnProceso"){
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">En Proceso</td>';
				}else{
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo(\''+resultado[i].id+'\')">' + resultado[i].Estado + '</td>';
				}
				tabla = tabla + '<td  style=\'vertical-align:middle;  text-align:center\'>';
				tabla = tabla + '<button type=\'button\' class=\'btn btn-primary btn-xs\' onclick=\'ModificarTrabajo(\"'+resultado[i].id+'\")\'>Modificar</button>';
				tabla = tabla + '<button type=\'button\' class=\'btn btn-danger btn-xs btn-deshab\' onclick=\'EliminarTrabajo(\"'+resultado[i].id+'\")\'>Eliminar</button>';
				tabla = tabla + '</td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('tablaTrabajos').innerHTML=tabla;
			$('#TrabajosTabla').DataTable(configTable);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function verInformacionTrabajo(idTesis){
	var parametros = {
		"idTesis" : idTesis
	};
	
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Trabajos_Recepcionales/obtenerInformacionTesis',
		data: parametros,
		type: "POST",
		success: function(resultado){
			console.log(resultado);

			$('#Titulo').html(resultado[0].DatosGenerales.Titulo);
			$('#Autor').html(resultado[0].DatosGenerales.Nombre+" "+resultado[0].DatosGenerales.Apellido_P+" "+resultado[0].DatosGenerales.Apellido_M);
			
			if(resultado[0].DatosGenerales.Estado=="EnProceso"){
				$('#Estado').html("En Proceso");
			}else{
				$('#Estado').html(resultado[0].DatosGenerales.Estado);
			}
			$('#Generacion').html(resultado[0].DatosGenerales.Generacion+"° Generación");
			
			if(resultado[0].DatosGenerales.Mes_Publicacion!=null){
				$('#MesPub').html(resultado[0].DatosGenerales.Mes_Publicacion);
			}else{
				$('#MesPub').html("*Sin especificar*");
			}
			if(resultado[0].DatosGenerales.Anio_Publicacion!=null){
				$('#AnioPub').html(resultado[0].DatosGenerales.Anio_Publicacion);
			}else{
				$('#AnioPub').html("*Sin especificar*");
			}
			if(resultado[0].DatosGenerales.Direccion_Documento!=null){
				$('#DireccionRepositorio').html(resultado[0].DatosGenerales.Direccion_Documento);
			}else{
				$('#DireccionRepositorio').html("*Sin especificar*");
			}
			if(resultado[0].DatosGenerales.Direccion_Repositorio!=null){
				$('#DireccionDocumento').html(resultado[0].DatosGenerales.Direccion_Repositorio);
			}else{
				$('#DireccionDocumento').html("*Sin especificar*");
			}

			$('#LGACs').html(resultado[0].DatosGenerales.NombreLGAC+" (Plan "+resultado[0].DatosGenerales.Anio+")");
			
			if(resultado[0].DatosGenerales.Ruta_Archivo_Tesis!=null){
				var EvidenciaTesis = '<tr>';
					EvidenciaTesis += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado[0].DatosGenerales.Ruta_Archivo_Tesis+'" target="_blank" rel="noopener noreferrer">'+resultado[0].DatosGenerales.Nombre_Archivo_Tesis+'</a></td>';
				EvidenciaTesis += '</tr>';
				$('#EvidenciaTesis').html(EvidenciaTesis);
			}else{
				$('#EvidenciaTesis').html("*Sin especificar*");
			}
			if(resultado[0].DatosGenerales.Ruta_Acta_Examen!=null){
				var EvidenciaActa = '<tr>';
					EvidenciaActa += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado[0].DatosGenerales.Ruta_Acta_Examen+'" target="_blank" rel="noopener noreferrer">'+resultado[0].DatosGenerales.Nombre_Acta_Examen+'</a></td>';
				EvidenciaActa += '</tr>';
				$('#EvidenciaActa').html(EvidenciaActa);
			}else{
				$('#EvidenciaActa').html("*Sin especificar*");
			}
			

			var tabla="";
			if(resultado[0].DatosGenerales.Estado=="EnProceso"){
				tabla = '<tr>';
					tabla += '<td style="vertical-align:middle; text-align:center">' + resultado[0].Colaboraciones.NombreDirector+' '+resultado[0].Colaboraciones.ApellidoPDirector+' '+resultado[0].Colaboraciones.ApellidoMDirector+'</td>';
					tabla += '<td style="vertical-align:middle; text-align:center">Director</td>';
					tabla += '<td style="vertical-align:middle; text-align:center">*Sin Evaluación*</td>';
				tabla += '</tr>';
				if(resultado[0].Colaboraciones.Codirector!=null){
					tabla += '<tr>';
						tabla += '<td style="vertical-align:middle; text-align:center">' + resultado[0].Colaboraciones.NombreDirector+' '+resultado[0].Colaboraciones.ApellidoPDirector+' '+resultado[0].Colaboraciones.ApellidoMDirector+'</td>';
						tabla += '<td style="vertical-align:middle; text-align:center">Codirector</td>';
						tabla += '<td style="vertical-align:middle; text-align:center">*Sin Evaluación*</td>';
					tabla += '</tr>';
				}
			}else{
				if (resultado[0].Colaboraciones.Nombre_Ev_Director!=null) {
					tabla = '<tr>';
						tabla += '<td style="vertical-align:middle; text-align:center">' + resultado[0].Colaboraciones.NombreDirector+' '+resultado[0].Colaboraciones.ApellidoPDirector+' '+resultado[0].Colaboraciones.ApellidoMDirector+'</td>';
						tabla += '<td style="vertical-align:middle; text-align:center">Director</td>';
						tabla += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado[0].Colaboraciones.Ruta_Ev_Director+'" target="_blank" rel="noopener noreferrer">'+resultado[0].Colaboraciones.Nombre_Ev_Director+'</a></td>';
					tabla += '</tr>';
				}else{
					tabla += '<tr>';
						tabla += '<td style="vertical-align:middle; text-align:center">' + resultado[0].Colaboraciones.NombreDirector+' '+resultado[0].Colaboraciones.ApellidoPDirector+' '+resultado[0].Colaboraciones.ApellidoMDirector+'</td>';
						tabla += '<td style="vertical-align:middle; text-align:center">Director</td>';
						tabla += '<td style="vertical-align:middle; text-align:center">*Sin Evaluación*</td>';
					tabla += '</tr>';
				}
				if(resultado[0].Colaboraciones.Codirector!=null){
					tabla += '<tr>';
						tabla += '<td style="vertical-align:middle; text-align:center">' + resultado[0].Colaboraciones.NombreCodirector+' '+resultado[0].Colaboraciones.ApellidoPCodirector+' '+resultado[0].Colaboraciones.ApellidoMCodirector+'</td>';
						tabla += '<td style="vertical-align:middle; text-align:center">Codirector</td>';
						tabla += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado[0].Colaboraciones.Ruta_Ev_Codirector+'" target="_blank" rel="noopener noreferrer">'+resultado[0].Colaboraciones.Nombre_Ev_Codirector+'</a></td>';
					tabla += '</tr>';
				}
				tabla += '<tr>';
					tabla += '<td style="vertical-align:middle; text-align:center">' + resultado[0].Colaboraciones.NombreJuradoP+' '+resultado[0].Colaboraciones.ApellidoPJuradoP+' '+resultado[0].Colaboraciones.ApellidoMJuradoP+'</td>';
					tabla += '<td style="vertical-align:middle; text-align:center">Jurado Presidente</td>';
					tabla += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado[0].Colaboraciones.Ruta_Ev_JuradoP+'" target="_blank" rel="noopener noreferrer">'+resultado[0].Colaboraciones.Nombre_Ev_JuradoP+'</a></td>';
				tabla += '</tr>';
				tabla += '<tr>';
					tabla += '<td style="vertical-align:middle; text-align:center">' + resultado[0].Colaboraciones.NombreJuradoS+' '+resultado[0].Colaboraciones.ApellidoPJuradoS+' '+resultado[0].Colaboraciones.ApellidoMJuradoS+'</td>';
					tabla += '<td style="vertical-align:middle; text-align:center">Jurado Secretario</td>';
					tabla += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado[0].Colaboraciones.Ruta_Ev_JuradoS+'" target="_blank" rel="noopener noreferrer">'+resultado[0].Colaboraciones.Nombre_Ev_JuradoS+'</a></td>';
				tabla += '</tr>';
				tabla += '<tr>';
					tabla += '<td style="vertical-align:middle; text-align:center">' + resultado[0].Colaboraciones.NombreJuradoV+' '+resultado[0].Colaboraciones.ApellidoPJuradoV+' '+resultado[0].Colaboraciones.ApellidoMJuradoV+'</td>';
					tabla += '<td style="vertical-align:middle; text-align:center">Jurado Vocal</td>';
					tabla += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado[0].Colaboraciones.Ruta_Ev_JuradoV+'" target="_blank" rel="noopener noreferrer">'+resultado[0].Colaboraciones.Nombre_Ev_JuradoV+'</a></td>';
				tabla += '</tr>';
			}
			$('#VistaEvaluaciones').html(tabla);

			//document.getElementById("NombreProfesor").innerHTML = resultado.DatosGenerales[0].Nombre;
			$('#Modificar').attr("onclick","ModificarTrabajo(\'"+resultado[0].DatosGenerales.id+"\')");
			$('#Deshabilitar').attr("onclick","EliminarTrabajo(\'"+resultado[0].DatosGenerales.id+"\')");
			$('#verDatos').modal('show');
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function ModificarTrabajo(idTesis) {
	location.href="/Trabajos_Recepcionales/Modificar_Trabajo/"+idTesis;
}

function EliminarTrabajo(idTesis) {
	var parametros = {
		"idTesis" : idTesis
	};

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Trabajos_Recepcionales/EliminarTesis',
		data: parametros,
		type: "POST",
		success: function(resultado){
			filtradoTrabajo();
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

