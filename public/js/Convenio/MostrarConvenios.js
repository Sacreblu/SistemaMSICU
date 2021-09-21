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
	initializeConvenio();
};

function initializeConvenio() {
    $('#ConveniosTabla').DataTable(configTable);
	$("#formBusqueda").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });
	$('#Mostrar').on('change', function() {
		filtradoConvenio();
	});

	$('#verDatos').on('hidden.bs.modal', function () {
		$('#Secciones a:first').tab('show') // Select first tab
	})

	limpiarTMP();
}


function filtradoConvenio(){
	var mostrar = $('#Mostrar').val();

	var parametros = {
		"mostrar" : mostrar
	};

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Convenios_Movilidad/FiltradoTablaConvenios',
		data: parametros,
		type: "POST",
		success: function(resultado){
			$('#ConveniosTabla').DataTable().clear().destroy();
			console.log(resultado);
			var longArray = resultado.length;
			var tabla="";
			for (let i = 0; i < longArray; i++) {
				tabla = tabla + '<tr>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionConvenio(\''+resultado[0].id+'\')">' + resultado[0].Nombre_Convenio + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionConvenio(\''+resultado[0].id+'\')">' + resultado[0].Sector + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionConvenio(\''+resultado[0].id+'\')">' + resultado[0].Institucion_Organizacion + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionConvenio(\''+resultado[0].id+'\')">' + resultado[0].Fecha_Conclusion + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionConvenio(\''+resultado[0].id+'\')">' + resultado[0].Pais + '</td>';
				tabla = tabla + '<td  style=\'vertical-align:middle;  text-align:center\'>';
				tabla = tabla + '<button type=\'button\' class=\'btn btn-primary btn-xs\' onclick=\'ModificarConvenio(\"'+resultado[0].id+'\")\'>Modificar</button>';
				tabla = tabla + '<button type=\'button\' class=\'btn btn-danger btn-xs btn-deshab\' onclick=\'EliminarConvenio(\"'+resultado[0].id+'\")\'>Eliminar</button>';
				tabla = tabla + '</td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('tablaConvenios').innerHTML=tabla;
			$('#ConveniosTabla').DataTable(configTable);
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function busquedaConvenio() {
	var form = new FormData(document.getElementById("formBusqueda"));
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Convenios_Movilidad/BusquedaConvenios',
		data: form,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(resultado){
			$('#ConveniosTabla').DataTable().clear().destroy();
			var longArray = resultado.length;
			var tabla="";
			for (let i = 0; i < longArray; i++) {
				tabla = tabla + '<tr>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionConvenio(\''+resultado[i].id+'\')">' + resultado[i].Nombre_Convenio + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionConvenio(\''+resultado[i].id+'\')">' + resultado[i].Sector + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionConvenio(\''+resultado[i].id+'\')">' + resultado[i].Institucion_Organizacion + '° Gen</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionConvenio(\''+resultado[i].id+'\')">' + resultado[i].Fecha_Conclusion +'</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionConvenio(\''+resultado[i].id+'\')">' + resultado[i].Pais +'</td>';
				tabla = tabla + '<td  style=\'vertical-align:middle;  text-align:center\'>';
				tabla = tabla + '<button type=\'button\' class=\'btn btn-primary btn-xs\' onclick=\'ModificarConvenio(\"'+resultado[i].id+'\")\'>Modificar</button>';
				tabla = tabla + '<button type=\'button\' class=\'btn btn-danger btn-xs btn-deshab\' onclick=\'EliminarConvenio(\"'+resultado[i].id+'\")\'>Eliminar</button>';
				tabla = tabla + '</td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('tablaConvenios').innerHTML=tabla;
			$('#ConveniosTabla').DataTable(configTable);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function verInformacionConvenio(idConvenio){
	var parametros = {
		"idConvenio" : idConvenio
	};
	
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Convenios_Movilidad/obtenerInformacionConvenios',
		data: parametros,
		type: "POST",
		success: function(resultado){
			console.log(resultado);

			$('#Nombre_Convenio').html(resultado.Nombre_Convenio);
			$('#Sector').html(resultado.Sector);
			$('#F_Comienzo').html(resultado.Fecha_Inicio);
			$('#F_Conclusion').html(resultado.Fecha_Conclusion);
			$('#Institucion').html(resultado.Institucion_Organizacion);
			$('#Pais').html(resultado.Pais);
			$('#Ciudad').html(resultado.Ciudad);

			if(resultado.Ruta_Evidencia!=null){
				var EvidenciaConvenio = '<tr>';
					EvidenciaConvenio += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado.Ruta_Evidencia+'" target="_blank" rel="noopener noreferrer">'+resultado.Nombre_Evidencia+'</a></td>';
				EvidenciaConvenio += '</tr>';
				$('#EvidenciaConvenio').html(EvidenciaConvenio);
			}else{
				$('#EvidenciaConvenio').html("*Sin especificar*");
			}

			
			$('#Modificar').attr("onclick","ModificarConvenio(\'"+resultado.id+"\')");
			$('#Deshabilitar').attr("onclick","EliminarConvenio(\'"+resultado.id+"\')");
			$('#verDatos').modal('show');
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function ModificarConvenio(idConvenio) {
	location.href="/Convenios_Movilidad/Modificar_Convenios_Movilidad/"+idConvenio;
}

function EliminarConvenio(idConvenio) {
	var parametros = {
		"idConvenio" : idConvenio
	};

	if (window.confirm("¿Desea elimiar este registro?")) {
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: '/Convenios_Movilidad/EliminarConvenio',
			data: parametros,
			type: "POST",
			success: function(resultado){
				filtradoConvenio();
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

