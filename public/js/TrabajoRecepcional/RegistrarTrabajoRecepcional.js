
var Estudiantes = "";
var Profesores = "";

var validarContDatosGenerales = 0;

var Bandera = true;

window.onload = function() {
	initializeEstudiante();
};

function initializeEstudiante() {
    limpiarTMP();
	Anios();
	getEstudiantes();
	getProfesores();
	getLGACs();
}

//FUNCIONES DE INICIO
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
	switch (valor) {
		case "EnProceso":
			$("#DireccionRepositorio").val("");
			$("#DireccionRepositorio").prop('disabled', true);
			$("#DireccionDocumento").val("");
			$("#DireccionDocumento").prop('disabled', true);
			$("#MesPublicacion").prop('disabled', true);
			$("#AnioPublicacion").prop('disabled', true);
			document.getElementById('ArchivoTesis').value = null;
			document.getElementById('ArchivoActaDeExamen').value = null;
			$("#archivosEvidencia").css('display','none');
			$("#divJurados").css('display','none');

			$("#JuradoP").val(null);
			$("#IdJuradoP").val(null);
			$("#ArchivoEvJuradoP").val(null);

			$("#JuradoS").val(null);
			$("#IdJuradoS").val(null);
			$("#ArchivoEvJuradoS").val(null);

			$("#JuradoV").val(null);
			$("#IdJuradoV").val(null);
			$("#ArchivoEvJuradoV").val(null);
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
			break;
		default:
			$("#DireccionRepositorio").prop('disabled', false);
			$("#DireccionDocumento").prop('disabled', false);
			$("#archivosEvidencia").css('display','flex');
			$("#MesPublicacion").prop('disabled', false);
			$("#AnioPublicacion").prop('disabled', false);
			$("#divJurados").css('display','contents');
			break;
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
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
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
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
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
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
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

//FUNCIONES DE VALIDACION
function EjecutarValidaciones() {
	$("#btnRegistrar").prop('disabled', true);
	$("#btnCancelar").prop('disabled', true);

	ValidarDatosG();
}

function validarValidaciones() {
	if(validarContDatosGenerales==0){
		if(Bandera==true){
			console.log(Bandera);
			RegistrarDatosGenerales();
			//RegistrarDatosGenerales();
		}else{
			console.log(Bandera);
			$("#btnRegistrar").prop('disabled', false);
			$("#btnCancelar").prop('disabled', false);
			alert("Alguno de los campos no ha sido llenado de forma correcta.");
			Bandera = true;
		}
	}
}

function ValidarDatosG(){
	validarContDatosGenerales = 1;
	var formDatosGenerales = new FormData(document.getElementById('FormDatosGenerales'));
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Trabajos_Recepcionales/Registrar_Trabajo_Recepcional/ValidarDatosGeneralesTesis",
		data: formDatosGenerales,
		type: "POST",
		contentType: false,
		processData: false,
		success: function(resultado){
			$("#alertAutorRegistro").html("");
			$("#alertIdAutorRegistro").html("");
			$("#alertTituloRegistro").html("");
			$("#alertDireccionRepositorioRegistro").html("");
			$("#alertLGACRegistro").html("");
			$("#alertDireccionDocumentoRegistro").html("");
			$("#alertArchivoTesisRegistro").html("");
			$("#alertArchivoActaDeExamenRegistro").html("");
			$("#alertArchivoMesPublicacionRegistro").html("");
			$("#alertArchivoAnioPublicacionRegistro").html("");

			
			$("#alertDirectorRegistro").html("");
			$("#alertIdDirectorRegistro").html("");
			$("#alertArchivoEvDirectorRegistro").html("");

			$("#alertCodirectorRegistro").html("");
			$("#alertIdCodirectorRegistro").html("");
			$("#alertArchivoEvCodirectorRegistro").html("");

			$("#alertJuradoPRegistro").html("");
			$("#alertIdJuradoPRegistro").html("");
			$("#alertArchivoEvJuradoPRegistro").html("");

			$("#alertJuradoSRegistro").html("");
			$("#alertIdJuradoSRegistro").html("");
			$("#alertArchivoEvJuradoSRegistro").html("");

			$("#alertJuradoVRegistro").html("");
			$("#alertIdJuradoVRegistro").html("");
			$("#alertArchivoEvJuradoVRegistro").html("");

			if(resultado!=true){
				for (const atributo in resultado) {
					var mensajes="";
					for (let i = 0; i < resultado[atributo].length; i++) {
						mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
						if(resultado[atributo].length-i!=1){
							mensajes = mensajes + "<br>"
						}
					}
					
					$("#alert"+atributo+"Registro").html(mensajes);
				}
				Bandera = false;
			}

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


//FUNCIONES DE REGISTRO
function RegistrarDatosGenerales() {
	var formDatosGenerales = new FormData(document.getElementById('FormDatosGenerales'));
	
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Trabajos_Recepcionales/Registrar_Trabajo_Recepcional/RegistrarDG",
		data: formDatosGenerales,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(resultado){
			//RegistrarPreparacionAcademica(idEstudiante);
			alert("Trabejo Recepcional Registrado");
			console.log(resultado);
			location.reload();
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