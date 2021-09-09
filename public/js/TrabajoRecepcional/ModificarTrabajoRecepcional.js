
var Bandera = true;

var validarContDatosGenerales = 0;

window.onload = function () {
	initializeProfesor();
};

function initializeProfesor() {
	limpiarTMP();
	console.log(informacion);
	
	Anios();
	getEstudiantes();
	getProfesores();
	getLGACs();

	setDatosGenerales();
	setColaboraciones();

}

//FUNCIONES INICIALES
function Anios(){
	var myDate = new Date();
	var year = myDate.getFullYear();
	$("#AnioPublicacion").append(new Option("-- Elige un año --", ""));
	for(var i = year; i >= 1980; i--){
		$("#AnioPublicacion").append(new Option(i, i));
	}
}

function getLGACs(){
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Auxiliar/getLGACs',
		type: "POST",
		success: function(resultado){
			for (let i = 0; i < resultado.length; i++) {
				var optionLGAC = new Option(resultado[i].Nombre+" (Plan "+resultado[i].Anio+")", resultado[i].id);
				$("#LGAC").append(optionLGAC);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function getEstudiantes(){
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Estudiantes/ObtenerEstudiantes",
		type: "POST",
		dataType: "json",
		success: function(resultado){
			var Json ="[";
			var arregloNombres=[];
			for (let i = 0; i < resultado.length; i++) {
				arregloNombres.push(resultado[i].Nombre+' '+resultado[i].Apellido_P+' '+resultado[i].Apellido_M);
				if (i == resultado.length-1) {
					Json += '{"Nombre" : "'+resultado[i].Nombre+' '+resultado[i].Apellido_P+' '+resultado[i].Apellido_M+'", "id" : "'+resultado[i].id+'"}';
				}else{
					Json += '{"Nombre" : "'+resultado[i].Nombre+' '+resultado[i].Apellido_P+' '+resultado[i].Apellido_M+'", "id" : "'+resultado[i].id+'"},';
				}
			}
			Json +="]";
			Json = JSON.parse(Json);
			Estudiantes = Json;
			autocompleteEstudiantes(arregloNombres);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function getProfesores(){
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Profesores/ObtenerProfesores",
		type: "POST",
		dataType: "json",
		success: function(resultado){
			var Json ="[";
			var arregloNombres=[];
			for (let i = 0; i < resultado.length; i++) {
				arregloNombres.push(resultado[i].Nombre+' '+resultado[i].Apellido_P+' '+resultado[i].Apellido_M);
				if (i == resultado.length-1) {
					Json += '{"Nombre" : "'+resultado[i].Nombre+' '+resultado[i].Apellido_P+' '+resultado[i].Apellido_M+'", "id" : "'+resultado[i].id+'"}';
				}else{
					Json += '{"Nombre" : "'+resultado[i].Nombre+' '+resultado[i].Apellido_P+' '+resultado[i].Apellido_M+'", "id" : "'+resultado[i].id+'"},';
				}
			}
			Json +="]";
			Json = JSON.parse(Json);
			Profesores = Json;
			autocompleteProfesores(arregloNombres);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function autocompleteEstudiantes(arreglo) {
	$( "#Autor" ).autocomplete({
		source: arreglo
	});
}

function autocompleteProfesores(arreglo) {
	$( "#Director" ).autocomplete({
		source: arreglo
	});
	$( "#Codirector" ).autocomplete({
		source: arreglo
	});
	$( "#JuradoP" ).autocomplete({
		source: arreglo
	});
	$( "#JuradoS" ).autocomplete({
		source: arreglo
	});
	$( "#JuradoV" ).autocomplete({
		source: arreglo
	});
}

function ControladorAutor(){
	var valor = $("#Autor").val();
	var estudiante = Estudiantes.filter(function (estudiante) { return estudiante.Nombre == valor; });
    try {
		$("#IdAutor").val(estudiante[0]["id"]);
		setGen_LGAC(estudiante[0]["id"]);
	} catch (error) {
		$("#IdAutor").val("");
	}
}

function ControladorColaboraciones(colaborador) {
	var valor = $("#"+colaborador).val();
	var profes = Profesores.filter(function (profesor) { return profesor.Nombre == valor; });
    try {
		$("#Id"+colaborador).val(profes[0]["id"]);
	} catch (error) {
		$("#Id"+colaborador).val(null);
	}
}

function setGen_LGAC(idEstudiante){
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Estudiantes/getEstudiante",
		data: {"idEstudiante": idEstudiante},
		type: "POST",
		cache: false,
		success: function(result){
			$("#Generacion").val(result[0]["NombreGen"]+"° Gen");
			$("#IdGeneracion").val(result[0]["Id_Generacion"]);
			$("#LGAC").val(result[0]["Id_LGAC"]);
			$("#LGACname").val(result[0]["NombreLGAC"]);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function controladorEstado(){
	var valor = $("#Estado").val();
	console.log(valor);
	switch (valor) {
		case "EnProceso":
				$("#DireccionRepositorio").val("");
				$("#DireccionRepositorio").prop('disabled', true);
				$("#DireccionDocumento").val("");
				$("#DireccionDocumento").prop('disabled', true);
				$("#MesPublicacion").prop('disabled', true);
				$("#AnioPublicacion").prop('disabled', true);
				$("#MesPublicacion").val("");
				$("#AnioPublicacion").val("");
				document.getElementById('ArchivoTesis').value = null;
				document.getElementById('ArchivoActaDeExamen').value = null;
				$("#archivosEvidencia").css('display','none');
				$("#divJurados").css('display','none');

				$("#EvDirectorGuardado").html("");
				$("#EvCodirectorGuardado").html("");

				$("#JuradoP").val(null);
				$("#IdJuradoP").val(null);
				$("#ArchivoEvJuradoP").val(null);
				$("#EvJuradoPGuardado").html("");
				
				$("#JuradoS").val(null);
				$("#IdJuradoS").val(null);
				$("#ArchivoEvJuradoS").val(null);
				$("#EvJuradoSGuardado").html("");

				$("#JuradoV").val(null);
				$("#IdJuradoV").val(null);
				$("#ArchivoEvJuradoV").val(null);
				$("#EvJuradoVGuardado").html("");
			
			break;
		case "Presentado":
			$("#DireccionRepositorio").val("");
			$("#DireccionRepositorio").prop('disabled', true);
			$("#DireccionDocumento").val("");
			$("#DireccionDocumento").prop('disabled', true);
			$("#archivosEvidencia").css('display','flex');
			$("#MesPublicacion").prop('disabled', false);
			$("#AnioPublicacion").prop('disabled', false);
			$("#divJurados").css('display','contents');
			
			$("#MesPublicacion").val(informacion[0].DatosGenerales.Mes_Publicacion);
			$("#AnioPublicacion").val(informacion[0].DatosGenerales.Anio_Publicacion);

			if(informacion[0].Colaboraciones.JuradoP!=null){
				var evDirector = '<tr>';
					evDirector += '<td style="vertical-align:middle; text-align:center"><a href="'+informacion[0].Colaboraciones.Ruta_Ev_Director+'" target="_blank" rel="noopener noreferrer">'+informacion[0].Colaboraciones.Nombre_Ev_Director+'</a></td>';
				evDirector += '</tr>';
				$("#EvDirectorGuardado").html(evDirector);

				if(informacion[0].Colaboraciones.Codirector!=null){
					var evCodirector = '<tr>';
						evCodirector += '<td style="vertical-align:middle; text-align:center"><a href="'+informacion[0].Colaboraciones.Ruta_Ev_Codirector+'" target="_blank" rel="noopener noreferrer">'+informacion[0].Colaboraciones.Nombre_Ev_Codirector+'</a></td>';
					evCodirector += '</tr>';
					$("#EvCodirectorGuardado").html(evCodirector);
				}

				$("#JuradoP").val(informacion[0].Colaboraciones.NombreJuradoP+" "+informacion[0].Colaboraciones.ApellidoPJuradoP+" "+informacion[0].Colaboraciones.ApellidoMJuradoP);
				$("#IdJuradoP").val(informacion[0].Colaboraciones.JuradoP);
				var evJuradoP = '<tr>';
					evJuradoP += '<td style="vertical-align:middle; text-align:center"><a href="'+informacion[0].Colaboraciones.Ruta_Ev_JuradoP+'" target="_blank" rel="noopener noreferrer">'+informacion[0].Colaboraciones.Nombre_Ev_JuradoP+'</a></td>';
				evJuradoP += '</tr>';
				$("#EvJuradoPGuardado").html(evJuradoP);

				$("#JuradoS").val(informacion[0].Colaboraciones.NombreJuradoS+" "+informacion[0].Colaboraciones.ApellidoPJuradoS+" "+informacion[0].Colaboraciones.ApellidoMJuradoS);
				$("#IdJuradoS").val(informacion[0].Colaboraciones.JuradoS);
				var evJuradoS = '<tr>';
					evJuradoS += '<td style="vertical-align:middle; text-align:center"><a href="'+informacion[0].Colaboraciones.Ruta_Ev_JuradoS+'" target="_blank" rel="noopener noreferrer">'+informacion[0].Colaboraciones.Nombre_Ev_JuradoS+'</a></td>';
				evJuradoS += '</tr>';
				$("#EvJuradoSGuardado").html(evJuradoS);

				$("#JuradoV").val(informacion[0].Colaboraciones.NombreJuradoV+" "+informacion[0].Colaboraciones.ApellidoPJuradoV+" "+informacion[0].Colaboraciones.ApellidoMJuradoV);
				$("#IdJuradoV").val(informacion[0].Colaboraciones.JuradoS);
				var evJuradoV = '<tr>';
					evJuradoV += '<td style="vertical-align:middle; text-align:center"><a href="'+informacion[0].Colaboraciones.Ruta_Ev_JuradoV+'" target="_blank" rel="noopener noreferrer">'+informacion[0].Colaboraciones.Nombre_Ev_JuradoV+'</a></td>';
				evJuradoV += '</tr>';
				$("#EvJuradoVGuardado").html(evJuradoV);
			}
			
			break;
		default:
			$("#DireccionRepositorio").prop('disabled', false);
			$("#DireccionDocumento").prop('disabled', false);
			$("#archivosEvidencia").css('display','flex');
			$("#MesPublicacion").prop('disabled', false);
			$("#AnioPublicacion").prop('disabled', false);
			$("#divJurados").css('display','contents');
			$("#MesPublicacion").val(informacion[0].DatosGenerales.Mes_Publicacion);
			$("#AnioPublicacion").val(informacion[0].DatosGenerales.Anio_Publicacion);

			if(informacion[0].DatosGenerales.Direccion_Documento!=null){
				$("#DireccionDocumento").val(informacion[0].DatosGenerales.Direccion_Documento);
				$("#DireccionRepositorio").val(informacion[0].DatosGenerales.Direccion_Repositorio);
			}

			if(informacion[0].Colaboraciones.JuradoP!=null){
				var evDirector = '<tr>';
					evDirector += '<td style="vertical-align:middle; text-align:center"><a href="'+informacion[0].Colaboraciones.Ruta_Ev_Director+'" target="_blank" rel="noopener noreferrer">'+informacion[0].Colaboraciones.Nombre_Ev_Director+'</a></td>';
				evDirector += '</tr>';
				$("#EvDirectorGuardado").html(evDirector);

				if(informacion[0].Colaboraciones.Codirector!=null){
					var evCodirector = '<tr>';
						evCodirector += '<td style="vertical-align:middle; text-align:center"><a href="'+informacion[0].Colaboraciones.Ruta_Ev_Codirector+'" target="_blank" rel="noopener noreferrer">'+informacion[0].Colaboraciones.Nombre_Ev_Codirector+'</a></td>';
					evCodirector += '</tr>';
					$("#EvCodirectorGuardado").html(evCodirector);
				}

				$("#JuradoP").val(informacion[0].Colaboraciones.NombreJuradoP+" "+informacion[0].Colaboraciones.ApellidoPJuradoP+" "+informacion[0].Colaboraciones.ApellidoMJuradoP);
				$("#IdJuradoP").val(informacion[0].Colaboraciones.JuradoP);
				var evJuradoP = '<tr>';
					evJuradoP += '<td style="vertical-align:middle; text-align:center"><a href="'+informacion[0].Colaboraciones.Ruta_Ev_JuradoP+'" target="_blank" rel="noopener noreferrer">'+informacion[0].Colaboraciones.Nombre_Ev_JuradoP+'</a></td>';
				evJuradoP += '</tr>';
				$("#EvJuradoPGuardado").html(evJuradoP);

				$("#JuradoS").val(informacion[0].Colaboraciones.NombreJuradoS+" "+informacion[0].Colaboraciones.ApellidoPJuradoS+" "+informacion[0].Colaboraciones.ApellidoMJuradoS);
				$("#IdJuradoS").val(informacion[0].Colaboraciones.JuradoS);
				var evJuradoS = '<tr>';
					evJuradoS += '<td style="vertical-align:middle; text-align:center"><a href="'+informacion[0].Colaboraciones.Ruta_Ev_JuradoS+'" target="_blank" rel="noopener noreferrer">'+informacion[0].Colaboraciones.Nombre_Ev_JuradoS+'</a></td>';
				evJuradoS += '</tr>';
				$("#EvJuradoSGuardado").html(evJuradoS);

				$("#JuradoV").val(informacion[0].Colaboraciones.NombreJuradoV+" "+informacion[0].Colaboraciones.ApellidoPJuradoV+" "+informacion[0].Colaboraciones.ApellidoMJuradoV);
				$("#IdJuradoV").val(informacion[0].Colaboraciones.JuradoS);
				var evJuradoV = '<tr>';
					evJuradoV += '<td style="vertical-align:middle; text-align:center"><a href="'+informacion[0].Colaboraciones.Ruta_Ev_JuradoV+'" target="_blank" rel="noopener noreferrer">'+informacion[0].Colaboraciones.Nombre_Ev_JuradoV+'</a></td>';
				evJuradoV += '</tr>';
				$("#EvJuradoVGuardado").html(evJuradoV);
			}
			break;
	}
}

function limpiarTMP() {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Auxiliar/LimpiarTMP",
		type: "POST",
		success: function (resultado) {
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

//FUNCIONES PARA MOSTRAR LA INFORMACION
function setDatosGenerales() {
	$("#Autor").val(informacion[0].DatosGenerales.Nombre+" "+informacion[0].DatosGenerales.Apellido_P+" "+informacion[0].DatosGenerales.Apellido_M);
	$("#IdAutor").val(informacion[0].DatosGenerales.Id_Autor);
	$("#Estado").val(informacion[0].DatosGenerales.Estado);
	$("#EstadoPrevio").val(informacion[0].DatosGenerales.Estado);
	$("#Generacion").val(informacion[0].DatosGenerales.Generacion+"° Gen");
	$("#IdGeneracion").val(informacion[0].DatosGenerales.Id_Generacion);
	$("#Titulo").val(informacion[0].DatosGenerales.Titulo);
	$("#MesPublicacion").val(informacion[0].DatosGenerales.Mes_Publicacion);
	$("#AnioPublicacion").val(informacion[0].DatosGenerales.Anio_Publicacion);
	$("#DireccionRepositorio").val(informacion[0].DatosGenerales.Direccion_Repositorio);
	$("#LGACname").val(informacion[0].DatosGenerales.NombreLGAC);
	$("#LGAC").val(informacion[0].DatosGenerales.Id_LGAC);
	$("#DireccionDocumento").val(informacion[0].DatosGenerales.Direccion_Documento);
	
	$("#NombreArchivoTesis").val(informacion[0].DatosGenerales.Nombre_Archivo_Tesis);
	$("#NombreArchivoActaDeExamen").val(informacion[0].DatosGenerales.Nombre_Acta_Examen);

	if(informacion[0].DatosGenerales.Estado!="EnProceso"){
		var archivotesis = '<tr>';
			archivotesis += '<td style="vertical-align:middle; text-align:center"><a href="'+informacion[0].DatosGenerales.Ruta_Archivo_Tesis+'" target="_blank" rel="noopener noreferrer">'+informacion[0].DatosGenerales.Nombre_Archivo_Tesis+'</a></td>';
		archivotesis += '</tr>';
		$("#TrabajoRecepcionalGuardado").html(archivotesis);

		var archivoacta = '<tr>';
			archivoacta += '<td style="vertical-align:middle; text-align:center"><a href="'+informacion[0].DatosGenerales.Ruta_Acta_Examen+'" target="_blank" rel="noopener noreferrer">'+informacion[0].DatosGenerales.Nombre_Acta_Examen+'</a></td>';
		archivoacta += '</tr>';
		$("#ActaExamenGuardado").html(archivoacta);
	}
	
		
	controladorEstado();
}

function setColaboraciones(){
	$("#Director").val(informacion[0].Colaboraciones.NombreDirector+" "+informacion[0].Colaboraciones.ApellidoPDirector+" "+informacion[0].Colaboraciones.ApellidoMDirector);
	$("#IdDirector").val(informacion[0].Colaboraciones.Director);

	if(informacion[0].Colaboraciones.Codirector!=null){
		$("#Codirector").val(informacion[0].Colaboraciones.NombreCodirector+" "+informacion[0].Colaboraciones.ApellidoPCodirector+" "+informacion[0].Colaboraciones.ApellidoMCodirector);
		$("#IdCodirector").val(informacion[0].Colaboraciones.Codirector);
	}
	
	if(informacion[0].DatosGenerales.Estado != "EnProceso"){
		$("#NombreArchivoEvDirector").val(informacion[0].Colaboraciones.Nombre_Ev_Director);
		var evDirector = '<tr>';
			evDirector += '<td style="vertical-align:middle; text-align:center"><a href="'+informacion[0].Colaboraciones.Ruta_Ev_Director+'" target="_blank" rel="noopener noreferrer">'+informacion[0].Colaboraciones.Nombre_Ev_Director+'</a></td>';
		evDirector += '</tr>';
		$("#EvDirectorGuardado").html(evDirector);

		if(informacion[0].Colaboraciones.Codirector!=null){
			$("#NombreArchivoEvCodirector").val(informacion[0].Colaboraciones.Nombre_Ev_Codirector);
			var evCodirector = '<tr>';
				evCodirector += '<td style="vertical-align:middle; text-align:center"><a href="'+informacion[0].Colaboraciones.Ruta_Ev_Codirector+'" target="_blank" rel="noopener noreferrer">'+informacion[0].Colaboraciones.Nombre_Ev_Codirector+'</a></td>';
			evCodirector += '</tr>';
			$("#EvCodirectorGuardado").html(evCodirector);
		}
		
		$("#JuradoP").val(informacion[0].Colaboraciones.NombreJuradoP+" "+informacion[0].Colaboraciones.ApellidoPJuradoP+" "+informacion[0].Colaboraciones.ApellidoMJuradoP);
		$("#IdJuradoP").val(informacion[0].Colaboraciones.JuradoP);
		$("#NombreArchivoEvJuradoP").val(informacion[0].Colaboraciones.Nombre_Ev_JuradoP);
		var evJuradoP = '<tr>';
			evJuradoP += '<td style="vertical-align:middle; text-align:center"><a href="'+informacion[0].Colaboraciones.Ruta_Ev_JuradoP+'" target="_blank" rel="noopener noreferrer">'+informacion[0].Colaboraciones.Nombre_Ev_JuradoP+'</a></td>';
		evJuradoP += '</tr>';
		$("#EvJuradoPGuardado").html(evJuradoP);

		$("#JuradoS").val(informacion[0].Colaboraciones.NombreJuradoS+" "+informacion[0].Colaboraciones.ApellidoPJuradoS+" "+informacion[0].Colaboraciones.ApellidoMJuradoS);
		$("#IdJuradoS").val(informacion[0].Colaboraciones.JuradoS);
		$("#NombreArchivoEvJuradoS").val(informacion[0].Colaboraciones.Nombre_Ev_JuradoS);
		var evJuradoS = '<tr>';
			evJuradoS += '<td style="vertical-align:middle; text-align:center"><a href="'+informacion[0].Colaboraciones.Ruta_Ev_JuradoS+'" target="_blank" rel="noopener noreferrer">'+informacion[0].Colaboraciones.Nombre_Ev_JuradoS+'</a></td>';
		evJuradoS += '</tr>';
		$("#EvJuradoSGuardado").html(evJuradoS);

		$("#JuradoV").val(informacion[0].Colaboraciones.NombreJuradoV+" "+informacion[0].Colaboraciones.ApellidoPJuradoV+" "+informacion[0].Colaboraciones.ApellidoMJuradoV);
		$("#IdJuradoV").val(informacion[0].Colaboraciones.JuradoS);
		$("#NombreArchivoEvJuradoV").val(informacion[0].Colaboraciones.Nombre_Ev_JuradoV);
		var evJuradoV = '<tr>';
			evJuradoV += '<td style="vertical-align:middle; text-align:center"><a href="'+informacion[0].Colaboraciones.Ruta_Ev_JuradoV+'" target="_blank" rel="noopener noreferrer">'+informacion[0].Colaboraciones.Nombre_Ev_JuradoV+'</a></td>';
		evJuradoV += '</tr>';
		$("#EvJuradoVGuardado").html(evJuradoV);
	}
	

	
}

//FUNCIONES PARA ARCHIVO TRABAJO RECEPCIONAL
function ControladorTesis(){
	var Archivo = document.getElementById('ArchivoTesis').files;
	var form = new FormData();
	form.append('ArchivoEvidencia[]', Archivo[0]);
	form.append('idPosicion', "0");
	form.append('TipoEvidencia', "ArchivoTesis");
	
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Auxiliar/ArchivosEvidencia",
		type: "POST",
		data: form,
		cache: false,
		contentType: false,
		processData: false,
		success: function(result){
			var tabla="";
			for (let i = 0; i < result.length; i++) {
				tabla = tabla + '<tr id="VistaArchivoTesis">';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarArchivoTesis()" class="btn btn-danger btn-xs">Quitar</button></td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="../'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevTrabajoRecepcional').innerHTML=tabla;
		}
	});
}

function quitarArchivoTesis() {
	var idDiv = "#VistaArchivoTesis";
	$(idDiv).remove();
	document.getElementById('ArchivoTesis').value = null;
}
//FUNCIONES APARA ARCHIVO ACTA DE EXAMEN
function ControladorActaExamen(){
	var Archivo = document.getElementById('ArchivoActaDeExamen').files;
	var form = new FormData();
	form.append('ArchivoEvidencia[]', Archivo[0]);
	form.append('idPosicion', "0");
	form.append('TipoEvidencia', "ArchivoActaDeExamen");
	
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Auxiliar/ArchivosEvidencia",
		type: "POST",
		data: form,
		cache: false,
		contentType: false,
		processData: false,
		success: function(result){
			var tabla="";
			for (let i = 0; i < result.length; i++) {
				tabla = tabla + '<tr id="VistaArchivoActaExamen">';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarArchivoActaExamen()" class="btn btn-danger btn-xs">Quitar</button></td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="../'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevActaExamen').innerHTML=tabla;
		}
	});
}

function quitarArchivoActaExamen() {
	var idDiv = "#VistaArchivoActaExamen";
	$(idDiv).remove();
	document.getElementById('ArchivoActaDeExamen').value = null;
}

function ControladorEvaluaciones(colaborador){
	var Archivo = document.getElementById('ArchivoEv'+colaborador).files;
	var form = new FormData();
	form.append('ArchivoEvidencia[]', Archivo[0]);
	form.append('idPosicion', "0");
	form.append('TipoEvidencia', "Evaluacion"+colaborador);
	
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Auxiliar/ArchivosEvidencia",
		type: "POST",
		data: form,
		cache: false,
		contentType: false,
		processData: false,
		success: function(result){
			var tabla="";
			for (let i = 0; i < result.length; i++) {
				tabla = tabla + '<tr id="VistaEvaluacion'+colaborador+'">';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarEvaluacion(\''+colaborador+'\')" class="btn btn-danger btn-xs">Quitar</button></td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="../'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevEv'+colaborador).innerHTML=tabla;
		}
	});
}

function quitarEvaluacion(colaborador) {
	var idDiv = "#VistaEvaluacion"+colaborador;
	$(idDiv).remove();
	document.getElementById('ArchivoEv'+colaborador).value = null;
}


//VALIDACIONES
function EjecutarValidaciones() {
	$("#btnGuardar").prop('disabled', true);
	$("#btnCancelar").prop('disabled', true);

	ValidarDatosG();
}

function ValidarDatosG(){
	validarContDatosGenerales = 1;
	var formDatosGenerales = new FormData(document.getElementById('FormDatosGenerales'));

	var id = informacion[0].DatosGenerales.id;
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Trabajos_Recepcionales/Modificar_Trabajo_Recepcional/ValidarDatosGeneralesTesis/" + id,
		data: formDatosGenerales,
		type: "POST",
		contentType: false,
		processData: false,
		success: function(resultado){
			console.log(resultado);
			$("#alertAutorModificar").html("");
			$("#alertIdAutorModificar").html("");
			$("#alertTituloModificar").html("");
			$("#alertDireccionRepositorioModificar").html("");
			$("#alertLGACModificar").html("");
			$("#alertDireccionDocumentoModificar").html("");
			$("#alertArchivoTesisModificar").html("");
			$("#alertArchivoActaDeExamenModificar").html("");
			$("#alertArchivoMesPublicacionModificar").html("");
			$("#alertArchivoAnioPublicacionModificar").html("");

			
			$("#alertDirectorModificar").html("");
			$("#alertIdDirectorModificar").html("");
			$("#alertArchivoEvDirectorModificar").html("");

			$("#alertCodirectorModificar").html("");
			$("#alertIdCodirectorModificar").html("");
			$("#alertArchivoEvCodirectorModificar").html("");

			$("#alertJuradoPModificar").html("");
			$("#alertIdJuradoPModificar").html("");
			$("#alertArchivoEvJuradoPModificar").html("");

			$("#alertJuradoSModificar").html("");
			$("#alertIdJuradoSModificar").html("");
			$("#alertArchivoEvJuradoSModificar").html("");

			$("#alertJuradoVModificar").html("");
			$("#alertIdJuradoVModificar").html("");
			$("#alertArchivoEvJuradoVModificar").html("");
			
			if(resultado!=true){
				for (const atributo in resultado) {
					var mensajes="";
					for (let i = 0; i < resultado[atributo].length; i++) {
						mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
						if(resultado[atributo].length-i!=1){
							mensajes = mensajes + "<br>"
						}
					}
					$("#alert"+atributo+"Modificar").html(mensajes);
				}
				Bandera = false;
			}

			console.log($("#EstadoPrevio").val());
			validarContDatosGenerales --;
			validarValidaciones();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function validarValidaciones() {
	if (validarContDatosGenerales == 0 ) {
		if (Bandera == true) {
			console.log(Bandera);
			ModificarDatosGenerales();
		} else {
			console.log(Bandera);
			Bandera = true;
			$("#btnGuardar").prop('disabled', false);
			$("#btnCancelar").prop('disabled', false);
			alert("Alguno de los formularios no ha sido llenado de forma correcta.");
		}
	}
}

function ModificarDatosGenerales() {
	var formDatosGenerales = new FormData(document.getElementById('FormDatosGenerales'));
	var id = informacion[0].DatosGenerales.id;
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Trabajos_Recepcionales/Modificar_Trabajo_Recepcional/ModificarDG/" + id,
		data: formDatosGenerales,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(resultado){
			//RegistrarPreparacionAcademica(idEstudiante);
			alert("Trabajo Recepcional Modificado");
			console.log(resultado);
			location.href="/Trabajos_Recepcionales";
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function Cancelar() {
	location.reload();
}










