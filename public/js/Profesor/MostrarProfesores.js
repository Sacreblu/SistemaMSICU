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
	initializeProfesor();
};

function initializeProfesor() {
    $('#ProfesorTabla').DataTable(configTable);
	$("#formBusqueda").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });
	$('#Mostrar').on('change', function() {
		filtradoProfesor();
	});

	$('#verDatos').on('hidden.bs.modal', function () {
		$('#Secciones a:first').tab('show') // Select first tab
	})

	getTipoContratacion();
	limpiarTMP();
}

function getTipoContratacion(){
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Auxiliar/TipoContratacion',
		type: "POST",
		success: function(resultado){
			for(var i = 0; i < resultado.length; i++){
				$("#Mostrar").append(new Option(resultado[i].Tipo, resultado[i].id));
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function busquedaProfe() {
	var form = new FormData(document.getElementById("formBusqueda"));
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Profesores/BusquedaProfesor',
		data: form,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(resultado){
			$('#ProfesorTabla').DataTable().clear().destroy();
			var longArray = resultado.length;
			var tabla="";
			for (let i = 0; i < longArray; i++) {
				tabla = tabla + '<tr>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor(\''+resultado[i].id+'\')">' + resultado[i].No_CVU + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor(\''+resultado[i].id+'\')">' + resultado[i].Nombre + ' ' + resultado[i].Apellido_P + ' ' + resultado[i].Apellido_M + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor(\''+resultado[i].id+'\')">' + resultado[i].Correo + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor(\''+resultado[i].id+'\')">' + resultado[i].Tipo + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor(\''+resultado[i].id+'\')">' + resultado[i].Mes_Ingreso + " " + resultado[i].Anio_Ingreso + '</td>';
				tabla = tabla + '<td  style=\'vertical-align:middle;  text-align:center\'>';
				tabla = tabla + '<button type=\'button\' class=\'btn btn-primary btn-xs\' onclick=\'ModificarProfesor(\"'+resultado[i].id+'\")\'>Modificar</button>';
				tabla = tabla + '<button type=\'button\' class=\'btn btn-warning btn-xs btn-deshab\' onclick=\'DeshabilitarProfesor(\"'+resultado[i].id+'\")\'>Deshabilitar</button>';
				tabla = tabla + '</td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('tablaProfesores').innerHTML=tabla;
			$('#ProfesorTabla').DataTable(configTable);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function filtradoProfesor(){
	var mostrar = $('#Mostrar').val();

	var parametros = {
		"mostrar" : mostrar
	};

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Profesores/FiltradoTablaProfesores',
		data: parametros,
		type: "POST",
		success: function(resultado){
			$('#ProfesorTabla').DataTable().clear().destroy();
			//console.log(resultado);
			var longArray = resultado.length;
			var tabla="";
			for (let i = 0; i < longArray; i++) {
				tabla = tabla + '<tr>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor(\''+resultado[i].id+'\')">' + resultado[i].No_CVU + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor(\''+resultado[i].id+'\')">' + resultado[i].Nombre + ' ' + resultado[i].Apellido_P + ' ' + resultado[i].Apellido_M + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor(\''+resultado[i].id+'\')">' + resultado[i].Correo + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor(\''+resultado[i].id+'\')">' + resultado[i].Tipo + '</td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor(\''+resultado[i].id+'\')">' + resultado[i].Mes_Ingreso + " " + resultado[i].Anio_Ingreso + '</td>';
				tabla = tabla + '<td  style=\'vertical-align:middle;  text-align:center\'>';
				tabla = tabla + '<button type=\'button\' class=\'btn btn-primary btn-xs\' onclick=\'ModificarProfesor(\"'+resultado[i].id+'\")\'>Modificar</button>';
				tabla = tabla + '<button type=\'button\' class=\'btn btn-warning btn-xs btn-deshab\' onclick=\'DeshabilitarProfesor(\"'+resultado[i].id+'\")\'>Deshabilitar</button>';
				tabla = tabla + '</td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('tablaProfesores').innerHTML=tabla;
			$('#ProfesorTabla').DataTable(configTable);
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function DeshabilitarProfesor(idProfesor) {
	var parametros = {
		"idProfe" : idProfesor
	};

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Profesores/DeshabilitarProfesor',
		data: parametros,
		type: "POST",
		success: function(resultado){
			console.log("wea " +idProfesor);
			filtradoProfesor();
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

function verInformacionProfesor(idProfesor){
	var parametros = {
		"idProfe" : idProfesor
	};
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Profesores/obtenerInformacionProfesor',
		data: parametros,
		type: "POST",
		success: function(resultado){
			$('#TablaEstudios').DataTable().clear().destroy();
			$('#TablaSuperacion').DataTable().clear().destroy();
			$('#TablaDistincion').DataTable().clear().destroy();
			$('#TablaTrayectoria').DataTable().clear().destroy();
			$('#TablaPertenencias').DataTable().clear().destroy();
			$('#NombreProfesor').html(resultado[0].DatosGenerales[0].Nombre+" "+resultado[0].DatosGenerales[0].Apellido_P+" "+resultado[0].DatosGenerales[0].Apellido_M);
			$('#No_CVU').html(resultado[0].DatosGenerales[0].No_CVU);
			$('#Correo').html(resultado[0].DatosGenerales[0].Correo);
			if(resultado[0].DatosGenerales[0].CorreoPersonal!=null){
				$('#CorreoPersonal').html(resultado[0].DatosGenerales[0].CorreoPersonal);
			}else{
				$('#CorreoPersonal').html("*Sin especificar*");
			}
			
			$('#Pais').html(resultado[0].DatosGenerales[0].Pais);
			$('#TipoContratacion').html(resultado[0].DatosGenerales[0].TipoContratacion);
			$('#Institucion').html(resultado[0].DatosGenerales[0].Institucion);
			$('#TipoColaboracion').html(resultado[0].DatosGenerales[0].TipoColaboracion);
			$('#FechaIngreso').html(resultado[0].DatosGenerales[0].Mes_Ingreso+" "+resultado[0].DatosGenerales[0].Anio_Ingreso);
			if(resultado[0].DatosGenerales[0].Mes_Salida==null||resultado[0].DatosGenerales[0].Anio_Salida==null){
				$('#FechaSalida').html("*Sin especificar*");
			}else{
				$('#FechaSalida').html(resultado[0].DatosGenerales[0].Mes_Salida+" "+resultado[0].DatosGenerales[0].Anio_Salida);
			}
			var LGACs ="";
			for(var i=0; i<resultado[0].DatosGenerales[0].LGACs.length; i++){
				LGACs = LGACs + resultado[0].DatosGenerales[0].LGACs[i].Nombre+" ("+resultado[0].DatosGenerales[0].LGACs[i].NombrePlan+")";
				if(i!=resultado[0].DatosGenerales[0].LGACs.length-1){
					LGACs = LGACs + "<br>";
				}
			}
			$('#LGACs').html(LGACs);
			if(resultado[0].DatosGenerales[0].Fecha_Ingreso_NAB==null){
				$('#IngresoNAB').html("*Sin especificar*");
			}else{
				$('#IngresoNAB').html(resultado[0].DatosGenerales[0].Fecha_Ingreso_NAB);
			}
			var Cartas = "";
			for(var i=0; i<resultado[0].DatosGenerales[0].CartasNAB.length; i++){
				Cartas = Cartas + '<tr>';
					Cartas = Cartas + '<td style="vertical-align:middle; text-align:center"><a href="'+resultado[0].DatosGenerales[0].CartasNAB[i].Ruta_Archivo+'" target="_blank" rel="noopener noreferrer">'+resultado[0].DatosGenerales[0].CartasNAB[i].NombreArchivo+'</a></td>';
					if(resultado[0].DatosGenerales[0].CartasNAB[i].Vigente=="off"){
						Cartas = Cartas + '<td style="vertical-align:middle; text-align:center;"></td>';
					}else{
						Cartas = Cartas + '<td style="vertical-align:middle; text-align:center;">Vigente</td>';
					}
					Cartas = Cartas + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].DatosGenerales[0].CartasNAB[i].Fecha_Registro+'</td>';
				Cartas = Cartas + '</tr>';
			}
			$('#VistaCartas').html(Cartas);

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

			var Superacion = "";
			for (let i = 0; i < resultado[0].SuperacionAcademica.length; i++) {
				Superacion = Superacion + '<tr>';
					Superacion = Superacion + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].SuperacionAcademica[i].Titulo+'</td>';
					Superacion = Superacion + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].SuperacionAcademica[i].TipoDocumento+'</td>';
					Superacion = Superacion + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].SuperacionAcademica[i].Periodo+'</td>';
					Superacion = Superacion + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].SuperacionAcademica[i].Anio+'</td>';
					Superacion = Superacion + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].SuperacionAcademica[i].Descripcion+'</td>';
					Superacion = Superacion + '<td style="vertical-align:middle; text-align:center"><a href="'+resultado[0].SuperacionAcademica[i].Ruta_Archivo+'" target="_blank" rel="noopener noreferrer">'+resultado[0].SuperacionAcademica[i].NombreArchivo+'</a></td>';
				Superacion = Superacion + '</tr>';
			}
			$('#VistaSuperacion').html(Superacion);
			$('#TablaSuperacion').DataTable(configTableInfo);

			var Distincion = "";
			for (let i = 0; i < resultado[0].Distinciones.length; i++) {
				Distincion = Distincion + '<tr>';
					Distincion = Distincion + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].Distinciones[i].Nombre_Distincion+'</td>';
					Distincion = Distincion + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].Distinciones[i].Periodo+'</td>';
					Distincion = Distincion + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].Distinciones[i].Anio+'</td>';
					Distincion = Distincion + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].Distinciones[i].Descripcion+'</td>';
					Distincion = Distincion + '<td style="vertical-align:middle; text-align:center"><a href="'+resultado[0].Distinciones[i].Ruta_Archivo+'" target="_blank" rel="noopener noreferrer">'+resultado[0].Distinciones[i].NombreArchivo+'</a></td>';
				Distincion = Distincion + '</tr>';
			}
			$('#VistaDistincion').html(Distincion);
			$('#TablaDistincion').DataTable(configTableInfo);

			var Trayectoria = "";
			for (let i = 0; i < resultado[0].Trayectoria.length; i++) {
				Trayectoria = Trayectoria + '<tr>';
					Trayectoria = Trayectoria + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].Trayectoria[i].Titulo+'</td>';
					Trayectoria = Trayectoria + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].Trayectoria[i].TipoDocumento+'</td>';
					Trayectoria = Trayectoria + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].Trayectoria[i].Periodo+'</td>';
					Trayectoria = Trayectoria + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].Trayectoria[i].Anio+'</td>';
					Trayectoria = Trayectoria + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].Trayectoria[i].Descripcion+'</td>';
					Trayectoria = Trayectoria + '<td style="vertical-align:middle; text-align:center"><a href="'+resultado[0].Trayectoria[i].Ruta_Archivo+'" target="_blank" rel="noopener noreferrer">'+resultado[0].Trayectoria[i].NombreArchivo+'</a></td>';
				Trayectoria = Trayectoria + '</tr>';
			}
			$('#VistaTrayectoria').html(Trayectoria);
			$('#TablaTrayectoria').DataTable(configTableInfo);

			var Pertenencias = "";
			for (let i = 0; i < resultado[0].Pertenencias.length; i++) {
				Pertenencias = Pertenencias + '<tr>';
					Pertenencias = Pertenencias + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].Pertenencias[i].Nombre_Organizacion+'</td>';
					Pertenencias = Pertenencias + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].Pertenencias[i].Periodo+'</td>';
					Pertenencias = Pertenencias + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].Pertenencias[i].Anio+'</td>';
					Pertenencias = Pertenencias + '<td style="vertical-align:middle; text-align:center;">'+resultado[0].Pertenencias[i].Descripcion+'</td>';
					Pertenencias = Pertenencias + '<td style="vertical-align:middle; text-align:center"><a href="'+resultado[0].Pertenencias[i].Ruta_Archivo+'" target="_blank" rel="noopener noreferrer">'+resultado[0].Pertenencias[i].NombreArchivo+'</a></td>';
				Pertenencias = Pertenencias + '</tr>';
			}
			$('#VistaPertenencias').html(Pertenencias);
			$('#TablaPertenencias').DataTable(configTableInfo);

			//document.getElementById("NombreProfesor").innerHTML = resultado.DatosGenerales[0].Nombre;
			$('#Modificar').attr("onclick","ModificarProfesor(\'"+resultado[0].DatosGenerales[0].id+"\')");
			$('#Deshabilitar').attr("onclick","DeshabilitarProfesor(\'"+resultado[0].DatosGenerales[0].id+"\')");
			$('#verDatos').modal('show');
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function ModificarProfesor(idProfesor) {
	location.href="/Profesores/Modificar_Profesor/"+idProfesor;
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

