var validarContDatosGenerales = 0;

var arregloPaises=[];

var Bandera = true;

window.onload = function () {
	initializeConvenio();
};

function initializeConvenio() {
	limpiarTMP();
	console.log(informacion);
	getEstudiantes();
	getConvenios();
	
	setInformacion();
}

//FUNCIONES INICIALES
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

function setInformacion() {
	var valor = informacion.Sector;

	switch (valor) {
		case 5:
				$('#divInstOrigen').css("display","none");
				$('#divProgDestino').css("display","none");
				$('#divProgOrigen').css("display","none");
				$('#divSelectTipo').css("display","none");
				$('#divPeriodos').css("display","none");
				$('#divDependDestino').css("display","none");
				$('#divDependOrigen').css("display","none");
				$('#divArchivos').css("display","none");
				$('#divArchivoCongreso').css("display","block");
			break;
		case 4:
				$('#divPeriodos').css("display","flex");
				$('#divInstOrigen').css("display","block");
				$('#divProgDestino').css("display","block");
				$('#divProgOrigen').css("display","block");
				$('#divSelectTipo').css("display","block");
				$('#divDependDestino').css("display","block");
				$('#divDependOrigen').css("display","block");
				$('#divArchivos').css("display","flex");
				$('#divArchivoCongreso').css("display","none");
			break;
		default:
				$('#divPeriodos').css("display","flex");
				$('#divInstOrigen').css("display","none");
				$('#divProgDestino').css("display","none");
				$('#divProgOrigen').css("display","none");
				$('#divSelectTipo').css("display","none");
				$('#divDependDestino').css("display","none");
				$('#divDependOrigen').css("display","none");
				$('#divArchivos').css("display","flex");
				$('#divArchivoCongreso').css("display","none");
			break;
	}
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
		url: "/Convenios_Movilidad/ObtenerConvenios",
		type: "POST",
		dataType: "json",
		success: function(resultado){
			var Json ="[";
			var arregloNombres=[];
			for (let i = 0; i < resultado.length; i++) {
				arregloNombres.push(resultado[i].Nombre_Clave);
				if (i == resultado.length-1) {
					Json += '{"NombreClave" : "'+resultado[i].Nombre_Clave+'", "id" : "'+resultado[i].id+'", "Institucion" : "'+resultado[i].Institucion_Organizacion+'", "Dependencia" : "'+resultado[i].Dependencia+'", "Sector" : "'+resultado[i].Sector+'"}';
				}else{
					Json += '{"NombreClave" : "'+resultado[i].Nombre_Clave+'", "id" : "'+resultado[i].id+'", "Institucion" : "'+resultado[i].Institucion_Organizacion+'", "Dependencia" : "'+resultado[i].Dependencia+'", "Sector" : "'+resultado[i].Sector+'"},';
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
		$("#IdConvenio").val(convenio[0]["id"]);
		$("#IdSector").val(convenio[0]["Sector"]);
		switch (convenio[0]["Sector"]) {
			case "5":
				$("#InstitucionDestino").val(convenio[0]["Institucion"]);
				
				$("#PeriodoComienzo").val(convenio[0]["FechaI"].substr(0, 7));
				$("#PeriodoConclusion").val(convenio[0]["FechaC"].substr(0, 7));
			
				$('#divInstOrigen').css("display","none");
				$('#divProgDestino').css("display","none");
				$('#divProgOrigen').css("display","none");
				$('#divSelectTipo').css("display","none");
				$('#divPeriodos').css("display","none");
				$('#divDependDestino').css("display","none");
				$('#divDependOrigen').css("display","none");
				$('#divArchivos').css("display","none");
				$('#divArchivoCongreso').css("display","block");

				
				$("#InstitucionOrigen").val("");
				$("#ProgramaDestino").val("");
				$("#ProgramaOrigen").val("");
				$("#PeriodoComienzo").val("");
				$("#PeriodoConclusion").val("");
				$("#DependenciaDestino").val("");
				$("#DependenciaOrigen").val("");
				$("#InstitucionOrigen").val("");

				quitarArchivoCartaAceptacion();
				quitarArchivoDocumentacionComp();
				quitarArchivoCartaSolicitud();
				quitarArchivoCartaLiberacion();
				quitarArchivoFormato();
				quitarArchivoReporteActividades();
				break;
			case "4":

				$("#PeriodoComienzo").val("");
				$("#PeriodoConclusion").val("");

				$("#InstitucionDestino").val(convenio[0]["Institucion"]);
				$("#DependenciaDestino").val(convenio[0]["Dependencia"]);

				$("#InstitucionOrigen").val("Universidad Veracruzana");
				$("#DependenciaOrigen").val("Facultad de Estadística e Informática");
				$("#ProgramaOrigen").val("Maestría en Sistemas Interactivos Centrados en el Usuario");

				$('#InstitucionOrigen').attr('readonly', true);
				$('#DependenciaOrigen').attr('readonly', true);
				$('#ProgramaOrigen').attr('readonly', true);

				$('#divPeriodos').css("display","flex");
				$('#divInstOrigen').css("display","block");
				$('#divProgDestino').css("display","block");
				$('#divProgOrigen').css("display","block");
				$('#divSelectTipo').css("display","block");
				$('#divDependDestino').css("display","block");
				$('#divDependOrigen').css("display","block");
				$('#divArchivos').css("display","flex");
				$('#divArchivoCongreso').css("display","none");

				quitarArchivoCongreso();

				break;
			default:
				$("#PeriodoComienzo").val("");
				$("#PeriodoConclusion").val("");

				$("#InstitucionDestino").val(convenio[0]["Institucion"]);
				$('#divPeriodos').css("display","flex");
				$('#divInstOrigen').css("display","none");
				$('#divProgDestino').css("display","none");
				$('#divProgOrigen').css("display","none");
				$('#divSelectTipo').css("display","none");
				$('#divDependDestino').css("display","none");
				$('#divDependOrigen').css("display","none");
				$('#divArchivos').css("display","flex");
				$('#divArchivoCongreso').css("display","none");
				quitarArchivoCongreso();
				break;
		}

	} catch (error) {
		$("#IdConvenio").val("");
	}
}

function ControladorTipoMov() {
	var tipo = $('#tipoM').val();
	var valor = $("#NombreConvenio").val();
	var convenio = Convenios.filter(function (convenio) { return convenio.NombreClave == valor; });
	
	if(tipo == 1){
		console.log(tipo);
		$("#InstitucionOrigen").val("Universidad Veracruzana");
		$("#DependenciaOrigen").val("Facultad de Estadística e Informática");
		$("#ProgramaOrigen").val("Maestría en Sistemas Interactivos Centrados en el Usuario");

		$("#InstitucionDestino").val(convenio[0]["Institucion"]);
		$("#DependenciaDestino").val(convenio[0]["Dependencia"]);
		$("#ProgramaDestino").val("");

		$('#InstitucionOrigen').attr('readonly', true);
		$('#DependenciaOrigen').attr('readonly', true);
		$('#ProgramaOrigen').attr('readonly', true);

		$('#InstitucionDestino').removeAttr('readonly');
		$('#DependenciaDestino').removeAttr('readonly');
		$('#ProgramaDestino').removeAttr('readonly');
	}else{
		if (tipo!=0) {
			console.log(tipo);
			$("#InstitucionDestino").val("Universidad Veracruzana");
			$("#DependenciaDestino").val("Facultad de Estadística e Informática");
			$("#ProgramaDestino").val("Maestría en Sistemas Interactivos Centrados en el Usuario");
		
			$("#InstitucionOrigen").val(convenio[0]["Institucion"]);
			$("#DependenciaOrigen").val(convenio[0]["Dependencia"]);
			$("#ProgramaOrigen").val("");

			$('#InstitucionDestino').attr('readonly', true);
			$('#DependenciaDestino').attr('readonly', true);
			$('#ProgramaDestino').attr('readonly', true);

			$('#InstitucionOrigen').removeAttr('readonly');
			$('#DependenciaOrigen').removeAttr('readonly');
			$('#ProgramaOrigen').removeAttr('readonly');
		}
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
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="../'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
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
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="../'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
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
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="../'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
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
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="../'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
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
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="../'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
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
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="../'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
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
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="../'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
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



//VALIDACIONES
function EjecutarValidaciones() {
	$("#btnGuardar").prop('disabled', true);
	$("#btnCancelar").prop('disabled', true);

	ValidarDatosG();
}

function ValidarDatosG(){
	validarContDatosGenerales = 1;
	var formDatosGenerales = new FormData(document.getElementById('FormDatosGenerales'));
	var id = informacion.id;
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Acciones_Movilidad/Modificar_Acciones_Movilidad/ValidarDatosGeneralesMovilidad/" + id,
		data: formDatosGenerales,
		type: "POST",
		contentType: false,
		processData: false,
		success: function(resultado){
			$("#alertNombreConvenioModificar").html("");
			$("#alertIdConvenioModificar").html("");
			$("#alertNombreEstudianteModificar").html("");
			$("#alertIdEstudianteModificar").html("");
			$("#alertInstitucionDestinoModificar").html("");
			$("#alertInstitucionOrigenModificar").html("");
			$("#alertProgramaDestinoModificar").html("");
			$("#alertProgramaOrigenModificar").html("");
			$("#alertPeriodoComienzoModificar").html("");
			$("#alertPeriodoConclusionModificar").html("");
			$("#alertDependenciaDestinoModificar").html("");
			$("#alertDependenciaOrigenModificar").html("");
			$("#alertMotivoModificar").html("");

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
			alert("Alguno de los campos no ha sido llenado de forma correcta.");
		}
	}
}

function ModificarDatosGenerales() {
	var formDatosGenerales = new FormData(document.getElementById('FormDatosGenerales'));
	var id = informacion.id;
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url:  "/Acciones_Movilidad/Modificar_Acciones_Movilidad/ModificarDG/" + id,
		data: formDatosGenerales,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(resultado){
			alert("Acción de Movilidad Modificada");
			
			//location.href="/Convenios_Movilidad";
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










