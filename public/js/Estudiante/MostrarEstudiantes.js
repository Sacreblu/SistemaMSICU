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

var configTableInfo = {
	"pagingType": "simple_numbers",
	"searching": false,
	"lengthChange": false,
	"pageLength": 5,
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
	initializeEstudiante();
};

function initializeEstudiante() {
    $('#EstudianteTabla').DataTable(configTable);
	$("#formBusqueda").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });

	$('#Mostrar').on('change', function() {
		filtradoEstudiante();
	});

	$('#verDatos').on('hidden.bs.modal', function () {
		$('#Secciones a:first').tab('show') // Select first tab
	})

	//getGeneraciones();
	limpiarTMP();
}

function getGeneraciones(){
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Genetaciones/ObtenerGeneraciones',
		type: "POST",
		success: function(resultado){
            Generaciones = resultado;
			for(var i = 0; i < resultado.length; i++){
				$("#Generacion").append(new Option(resultado[i].Generacion+"° Gen", resultado[i].id));
			}
            setPlanEstudios(document.getElementById("Generacion"));
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

function filtradoEstudiante(){
	var mostrar = $('#Mostrar').val();

	var parametros = {
		"mostrar" : mostrar
	};

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Estudiantes/FiltradoTablaEstudiantes',
		data: parametros,
		type: "POST",
		success: function(resultado){
			$('#EstudianteTabla').DataTable().clear().destroy();
			//console.log(resultado);
			var longArray = resultado.length;
			var tabla="";
			for (let i = 0; i < longArray; i++) {
				tabla = tabla + '<tr>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionEstudiante(\''+resultado[i].id+'\')">' + resultado[i].No_CVU + '</td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionEstudiante(\''+resultado[i].id+'\')">' + resultado[i].Matricula + '</td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor(\''+resultado[i].id+'\')">' + resultado[i].Nombre + ' ' + resultado[i].Apellido_P + ' ' + resultado[i].Apellido_M + '</td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor(\''+resultado[i].id+'\')">' + resultado[i].Correo + '</td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor(\''+resultado[i].id+'\')">' + resultado[i].Generacion + '° Gen</td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor(\''+resultado[i].id+'\')">' + resultado[i].Estado + '</td>';
					tabla = tabla + '<td  style=\'vertical-align:middle;  text-align:center\'>';
						tabla = tabla + '<button type=\'button\' class=\'btn btn-primary btn-xs\' onclick=\'ModificarEstudiante(\"'+resultado[i].id+'\")\'>Modificar</button>';
					tabla = tabla + '</td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('tablaEstudiantes').innerHTML=tabla;
			$('#EstudianteTabla').DataTable(configTable);
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function busquedaEstudiante() {
	var form = new FormData(document.getElementById("formBusqueda"));
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Estudiantes/BusquedaEstudiante',
		data: form,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(resultado){
			$('#EstudianteTabla').DataTable().clear().destroy();
			var longArray = resultado.length;
			var tabla="";
			for (let i = 0; i < longArray; i++) {
				tabla = tabla + '<tr>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionEstudiante(\''+resultado[i].id+'\')">' + resultado[i].No_CVU + '</td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionEstudiante(\''+resultado[i].id+'\')">' + resultado[i].Matricula + '</td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor(\''+resultado[i].id+'\')">' + resultado[i].Nombre + ' ' + resultado[i].Apellido_P + ' ' + resultado[i].Apellido_M + '</td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor(\''+resultado[i].id+'\')">' + resultado[i].Correo + '</td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor(\''+resultado[i].id+'\')">' + resultado[i].Generacion + '° Gen</td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor(\''+resultado[i].id+'\')">' + resultado[i].Estado + '</td>';
					tabla = tabla + '<td  style=\'vertical-align:middle;  text-align:center\'>';
						tabla = tabla + '<button type=\'button\' class=\'btn btn-primary btn-xs\' onclick=\'ModificarEstudiante(\"'+resultado[i].id+'\")\'>Modificar</button>';
					tabla = tabla + '</td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('tablaEstudiantes').innerHTML=tabla;
			$('#EstudianteTabla').DataTable(configTable);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function verInformacionEstudiante(idEstudiante){
	var parametros = {
		"idEstudiante" : idEstudiante
	};
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Estudiantes/obtenerInformacionEstudiante',
		data: parametros,
		type: "POST",
		success: function(resultado){
			$('#TablaEstudios').DataTable().clear().destroy();
			
			$('#NombreEstudiante').html(resultado[0].DatosGenerales[0].Nombre+" "+resultado[0].DatosGenerales[0].Apellido_P+" "+resultado[0].DatosGenerales[0].Apellido_M);
			$('#Estado').html(resultado[0].DatosGenerales[0].Estado);
			$('#No_CVU').html(resultado[0].DatosGenerales[0].No_CVU);
			$('#Matricula').html(resultado[0].DatosGenerales[0].Matricula);
			$('#CorreoPersonal').html(resultado[0].DatosGenerales[0].CorreoPersonal);
			$('#Correo').html(resultado[0].DatosGenerales[0].Correo);
			$('#Generacion').html(resultado[0].DatosGenerales[0].Generacion+"° Gen");
			$('#PlanEstudios').html(resultado[0].DatosGenerales[0].PlanEstudios);
			$('#LGACs').html(resultado[0].DatosGenerales[0].LGAC);

			var CartaLib = '<tr>';
				CartaLib += '<td style="vertical-align:middle; text-align:center"><a href="'+resultado[0].DatosGenerales[0].Ruta_Carta+'" target="_blank" rel="noopener noreferrer">'+resultado[0].DatosGenerales[0].NombreCarta+'</a></td>';
				CartaLib += '</tr>';
			$('#VistaCarta').html(CartaLib);

			if(resultado[0].DatosGenerales[0].Estado == "Egresado"){
				$("#divArchivoEvidencia").css("display", "block");
			}else{
				$("#divArchivoEvidencia").css("display", "none");
			}
			var Estudios = "";
			for (let i = 0; i < resultado[0].PreparacionAcademica.length; i++) {
				Estudios = Estudios + '<tr>';
					Estudios = Estudios + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].PreparacionAcademica[i].Titulo+'</td>';
					Estudios = Estudios + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].PreparacionAcademica[i].Grado+'</td>';
					Estudios = Estudios + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].PreparacionAcademica[i].Universidad+'</td>';
					Estudios = Estudios + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].PreparacionAcademica[i].Anio+'</td>';
					Estudios = Estudios + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].PreparacionAcademica[i].Lugar+'</td>';
					Estudios = Estudios + '<td style="vertical-align:middle; text-align:center"><a href="'+resultado[0].PreparacionAcademica[i].Ruta_Archivo+'" target="_blank" rel="noopener noreferrer">'+resultado[0].PreparacionAcademica[i].NombreArchivo+'</a></td>';
				Estudios = Estudios + '</tr>';
			}
			$('#VistaEstudios').html(Estudios);
			$('#TablaEstudios').DataTable(configTableInfo);

			//document.getElementById("NombreProfesor").innerHTML = resultado.DatosGenerales[0].Nombre;
			$('#Modificar').attr("onclick","ModificarEstudiante(\'"+resultado[0].DatosGenerales[0].id+"\')");
			$('#verDatos').modal('show');
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function ModificarEstudiante(idEstudiante) {
	location.href="/Estudiantes/Modificar_Estudiante/"+idEstudiante;
}
