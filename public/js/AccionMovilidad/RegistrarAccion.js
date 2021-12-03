var validarContDatosGenerales = 0;

var Estudiantes = "";
var Convenios = "";

var Bandera = true;

window.onload = function() {
	initializeConvenio();
};

function initializeConvenio() {
    limpiarTMP();
	
	getEstudiantes();
	getConvenios();
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
					
			location.reload();
		}
	});
}

function getConvenios(){
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Convenios_Movilidad/ObtenerEstancias",
		type: "POST",
		dataType: "json",
		success: function(resultado){
			var Json ="[";
			var arregloNombres=[];
			for (let i = 0; i < resultado.length; i++) {
				arregloNombres.push(resultado[i].Nombre_Clave);
				if (i == resultado.length-1) {
					Json += '{"NombreClave" : "'+resultado[i].Nombre_Clave+'", "id" : "'+resultado[i].id+'", "Institucion" : "'+resultado[i].Institucion_Organizacion+'", "Dependencia" : "'+resultado[i].Dependencia+'", "Sector" : "'+resultado[i].Sector+'", "FechaI" : "'+resultado[i].Fecha_Inicio+'", "FechaC" : "'+resultado[i].Fecha_Conclusion+'"}';
				}else{
					Json += '{"NombreClave" : "'+resultado[i].Nombre_Clave+'", "id" : "'+resultado[i].id+'", "Institucion" : "'+resultado[i].Institucion_Organizacion+'", "Dependencia" : "'+resultado[i].Dependencia+'", "Sector" : "'+resultado[i].Sector+'", "FechaI" : "'+resultado[i].Fecha_Inicio+'", "FechaC" : "'+resultado[i].Fecha_Conclusion+'"},';
				}
			}
			Json +="]";
			Json = JSON.parse(Json);
			Convenios = Json;
			console.log(resultado);
			autocompleteConvenios(arregloNombres);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
					
			location.reload();
		}
	});
}

function autocompleteEstudiantes(arreglo) {
	$( "#NombreEstudiante" ).autocomplete({
		source: arreglo
	});
}

function autocompleteConvenios(arreglo) {
	$( "#NombreConvenio" ).autocomplete({
		source: arreglo
	});
}

function ControladorEstudiante(){
	var valor = $("#NombreEstudiante").val();
	var estudiante = Estudiantes.filter(function (estudiante) { return estudiante.Nombre == valor; });
    try {
		$("#IdEstudiante").val(estudiante[0]["id"]);
	} catch (error) {
		$("#IdEstudiante").val("");
	}
}

function ControladorConvenio(){
	var valor = $("#NombreConvenio").val();
	var convenio = Convenios.filter(function (convenio) { return convenio.NombreClave == valor; });
    try {
		console.log(convenio);
		$("#IdConvenio").val(convenio[0]["id"]);
		$("#IdSector").val(convenio[0]["Sector"]);
		$("#InstitucionDestino").val(convenio[0]["Institucion"]);
		
		if(convenio[0]["Dependencia"]!=null){	
			$("#DependenciaDestino").val(convenio[0]["Dependencia"]);
		}
		
		$('#InstitucionDestino').attr('readonly', true);
		$('#DependenciaDestino').attr('readonly', true);

	} catch (error) {
		$("#IdConvenio").val("");
	}
}

function ControladorTipoMov() {
	var tipo = $('#tipoM').val();
	var valor = $("#NombreConvenio").val();
	var convenio = Convenios.filter(function (convenio) { return convenio.NombreClave == valor; });

	if(tipo == 1){
		$("#InstitucionOrigen").val("Universidad Veracruzana");
		$("#DependenciaOrigen").val("Facultad de Estadística e Informática");
		$("#ProgramaOrigen").val("Maestría en Sistemas Interactivos Centrados en el Usuario");

		if(convenio[0]!=undefined){
			$("#InstitucionDestino").val(convenio[0]["Institucion"]);
			$("#DependenciaDestino").val(convenio[0]["Dependencia"]);
			$("#ProgramaDestino").val("");
		}else{
			$("#InstitucionDestino").val("");
			$("#DependenciaDestino").val("");
			$("#ProgramaDestino").val("");
		}

		$('#ProgramaOrigen').attr('readonly', true);
		$('#ProgramaDestino').removeAttr('readonly');
	}else{
		$("#InstitucionDestino").val("Universidad Veracruzana");
		$("#DependenciaDestino").val("Facultad de Estadística e Informática");
		$("#ProgramaDestino").val("Maestría en Sistemas Interactivos Centrados en el Usuario");
	
		if(convenio[0]!=undefined){
			$("#InstitucionOrigen").val(convenio[0]["Institucion"]);
			$("#DependenciaOrigen").val(convenio[0]["Dependencia"]);
			$("#ProgramaOrigen").val("");
		}else{
			$("#InstitucionOrigen").val("");
			$("#DependenciaOrigen").val("");
			$("#ProgramaOrigen").val("");
		}

		$('#ProgramaDestino').attr('readonly', true);
		$('#ProgramaOrigen').removeAttr('readonly');
	}
}


//FUNCIONES PARA ARCHIVO 
function ControladorFormato(){
	var Archivo = document.getElementById('ArchivoFormMovilidad').files;
	var form = new FormData();
	form.append('ArchivoEvidencia[]', Archivo[0]);
	form.append('idPosicion', "0");
	form.append('TipoEvidencia', "FormatoMovilidad");
	
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
				tabla = tabla + '<tr id="VistaArchivoFormatoMovilidad">';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarArchivoFormato()" class="btn btn-danger btn-xs">Quitar</button></td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevFormato').innerHTML=tabla;
		}
	});
}

function quitarArchivoFormato() {
	var idDiv = "#VistaArchivoFormatoMovilidad";
	$(idDiv).remove();
	document.getElementById('ArchivoFormMovilidad').value = null;
}

function ControladorCartaSolicitud(){
	var Archivo = document.getElementById('ArchivoSolicitudMovilidad').files;
	var form = new FormData();
	form.append('ArchivoEvidencia[]', Archivo[0]);
	form.append('idPosicion', "0");
	form.append('TipoEvidencia', "CartaSolicitud");
	
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
				tabla = tabla + '<tr id="VistaArchivoCartaSolicitud">';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarArchivoCartaSolicitud()" class="btn btn-danger btn-xs">Quitar</button></td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevCartaSolicitud').innerHTML=tabla;
		}
	});
}

function quitarArchivoCartaSolicitud() {
	var idDiv = "#VistaArchivoCartaSolicitud";
	$(idDiv).remove();
	document.getElementById('ArchivoSolicitudMovilidad').value = null;
}

function ControladorCartaAceptacion(){
	var Archivo = document.getElementById('ArchivoCartaAceptacion').files;
	var form = new FormData();
	form.append('ArchivoEvidencia[]', Archivo[0]);
	form.append('idPosicion', "0");
	form.append('TipoEvidencia', "CartaAceptacion");
	
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
				tabla = tabla + '<tr id="VistaArchivoCartaAceptacion">';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarArchivoCartaAceptacion()" class="btn btn-danger btn-xs">Quitar</button></td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevCartaAceptacion').innerHTML=tabla;
		}
	});
}

function quitarArchivoCartaAceptacion() {
	var idDiv = "#VistaArchivoCartaAceptacion";
	$(idDiv).remove();
	document.getElementById('ArchivoCartaAceptacion').value = null;
}

function ControladorReporteActividades(){
	var Archivo = document.getElementById('ArchivoReporteActividades').files;
	var form = new FormData();
	form.append('ArchivoEvidencia[]', Archivo[0]);
	form.append('idPosicion', "0");
	form.append('TipoEvidencia', "ReporteActividades");
	
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
				tabla = tabla + '<tr id="VistaArchivoReporteActividades">';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarArchivoReporteActividades()" class="btn btn-danger btn-xs">Quitar</button></td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevReporteActividades').innerHTML=tabla;
		}
	});
}

function quitarArchivoReporteActividades() {
	var idDiv = "#VistaArchivoReporteActividades";
	$(idDiv).remove();
	document.getElementById('ArchivoReporteActividades').value = null;
}


function ControladorDocumentacionComp(){
	var Archivo = document.getElementById('ArchivoDocumentacionComp').files;
	var form = new FormData();
	form.append('ArchivoEvidencia[]', Archivo[0]);
	form.append('idPosicion', "0");
	form.append('TipoEvidencia', "DocumentacionComp");
	
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
				tabla = tabla + '<tr id="VistaArchivoDocumentacionComp">';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarArchivoDocumentacionComp()" class="btn btn-danger btn-xs">Quitar</button></td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevDocumentacionComp').innerHTML=tabla;
		}
	});
}

function quitarArchivoDocumentacionComp() {
	var idDiv = "#VistaArchivoDocumentacionComp";
	$(idDiv).remove();
	document.getElementById('ArchivoDocumentacionComp').value = null;
}

function ControladorCartaLiberacion(){
	var Archivo = document.getElementById('ArchivoCartaLiberacion').files;
	var form = new FormData();
	form.append('ArchivoEvidencia[]', Archivo[0]);
	form.append('idPosicion', "0");
	form.append('TipoEvidencia', "CartaLiberacion");
	
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
				tabla = tabla + '<tr id="VistaArchivoCartaLiberacion">';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarArchivoCartaLiberacion()" class="btn btn-danger btn-xs">Quitar</button></td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevCartaLiberacion').innerHTML=tabla;
		}
	});
}

function quitarArchivoCartaLiberacion() {
	var idDiv = "#VistaArchivoCartaLiberacion";
	$(idDiv).remove();
	document.getElementById('ArchivoCartaLiberacion').value = null;
}



function ControladorArchivoCongreso(){
	var Archivo = document.getElementById('ArchivoCongreso').files;
	var form = new FormData();
	form.append('ArchivoEvidencia[]', Archivo[0]);
	form.append('idPosicion', "0");
	form.append('TipoEvidencia', "ArchivoCongreso");
	
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
				tabla = tabla + '<tr id="VistaArchivoCongreso">';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarArchivoCongreso()" class="btn btn-danger btn-xs">Quitar</button></td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevArchivoCongreso').innerHTML=tabla;
		}
	});
}

function quitarArchivoCongreso() {
	var idDiv = "#VistaArchivoCongreso";
	$(idDiv).remove();
	document.getElementById('ArchivoCongreso').value = null;
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
		url: "/Acciones_Movilidad/Registrar_Acciones_Movilidad/ValidarDatosGeneralesMovilidad",
		data: formDatosGenerales,
		type: "POST",
		contentType: false,
		processData: false,
		success: function(resultado){
			$("#alertNombreConvenioRegistro").html("");
			$("#alertIdConvenioRegistro").html("");
			$("#alertNombreEstudianteRegistro").html("");
			$("#alertIdEstudianteRegistro").html("");
			$("#alertInstitucionDestinoRegistro").html("");
			$("#alertInstitucionOrigenRegistro").html("");
			$("#alertProgramaDestinoRegistro").html("");
			$("#alertProgramaOrigenRegistro").html("");
			$("#alertPeriodoComienzoRegistro").html("");
			$("#alertPeriodoConclusionRegistro").html("");
			$("#alertDependenciaDestinoRegistro").html("");
			$("#alertDependenciaOrigenRegistro").html("");
			$("#alertMotivoRegistro").html("");


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

			console.log(resultado);

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
		url: "/Acciones_Movilidad/Registrar_Acciones_Movilidad/RegistrarDG",
		data: formDatosGenerales,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(resultado){
			alert("Acción de Movilidad Registrada");
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