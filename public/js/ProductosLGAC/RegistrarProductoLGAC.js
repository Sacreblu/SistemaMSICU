var validarContDatosGenerales = 0;
var validarContProfesores = 0;
var validarContEstudiantes = 0;

var ContadorProfesores = -1;
var ContadorEstudiantes = -1;

var arregloNombresEstudiantes=[];
var arregloNombresProfesores=[];

var Profesores = "";
var Estudiantes = "";
var Convenios = "";
var EE = "";
var eePorplan = "";



var arregloPlanesByLGAC=[];

var Bandera = true;

window.onload = function() {
	initializeConvenio();
};

function initializeConvenio() {
    limpiarTMP();
	getLGACsByPlan();

	$('#btnAgregarProfesor').on("click",function(e){
		e.preventDefault();
	});

	$('#btnQuitarProfesor').on("click",function(e){
		e.preventDefault();
	});

	$('#btnAgregarEstudiante').on("click",function(e){
		e.preventDefault();
	});

	$('#btnQuitarEstudiante').on("click",function(e){
		e.preventDefault();
	});

	getConvenios();
	getEstudiantes();
	getProfesores();

	//getPlanEstudios();
	
	Anios();
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
			location.reload();
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function Anios(){
	var myDate = new Date();
	var year = myDate.getFullYear();
	for(var i = year; i >= 2010; i--){
		$("#AnioInicio").append(new Option(i, i));
		$("#AnioFin").append(new Option(i, i));
	}
}

function getLGACsByPlan(){
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Auxiliar/LGACsByPlan',
		type: "POST",
		success: function(resultado){
			console.log(resultado);
			for(var i = 0; i < resultado.length; i++){
				var optionPlan = new Option(resultado[i].Nombre, resultado[i].id);
				$("#PlanEstudios").append(optionPlan);
				arregloPlanesByLGAC=resultado;
			}
			ControladorLGACByPlan();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function ControladorLGACByPlan() {
	var plan = $("#PlanEstudios").val();

	var lgacByplan = arregloPlanesByLGAC.filter(function (lgacByplan) { return lgacByplan.id == plan; });

	console.log(lgacByplan);
	/*for (let i = 0; i < lgacByplan.length; i++) {
		var optionLGAC = new Option(lgacByplan[i].Nombre, lgacByplan[i].id);
		$("#LGAC").append(optionLGAC);
	}*/
}

function LGACController(){
	var valor = document.getElementById('PlanEstudios').value;
	var cont = 0;
	for (let i = 0; i < ArregloPlanes.length; i++) {
		if(ArregloPlanes[i]==valor){
			document.getElementById("Plan"+ArregloPlanes[i]).style.display = "block";
		}else{
			document.getElementById("Plan"+ArregloPlanes[i]).style.display = "none";
		}
	}
	
}

//Funciones Convenios
function getConvenios(){
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Convenios_Movilidad/ObtenerConveniosPorSector",
		type: "POST",
		dataType: "json",
		success: function(resultado){
			var Json ="[";
			var arregloNombres=[];
			for (let i = 0; i < resultado.length; i++) {
				arregloNombres.push(resultado[i].Nombre_Clave);
				if (i == resultado.length-1) {
					Json += '{"NombreClave" : "'+resultado[i].Nombre_Clave+'", "id" : "'+resultado[i].id+'", "Institucion" : "'+resultado[i].Institucion_Organizacion+'", "Sector" : "'+resultado[i].Sector+'"}';
				}else{
					Json += '{"NombreClave" : "'+resultado[i].Nombre_Clave+'", "id" : "'+resultado[i].id+'", "Institucion" : "'+resultado[i].Institucion_Organizacion+'", "Sector" : "'+resultado[i].Sector+'"},';
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

function autocompleteConvenios(arreglo) {
	$( "#NombreConvenio" ).autocomplete({
		source: arreglo
	});
}

function ControladorConvenio(){
	var valor = $("#NombreConvenio").val();
	var convenio = Convenios.filter(function (convenio) { return convenio.NombreClave == valor; });
    try {
		$("#IdConvenio").val(convenio[0]["id"]);
		$("#Institucion").val(convenio[0]["Institucion"]);

	} catch (error) {
		$("#IdConvenio").val("");
	}
}

//Funciones EE
function getPlanEstudios() {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Plan_de_Estudios/ObtenerPlanes',
		type: "POST",
		success: function(resultado){
			for(var i = 0; i < resultado.length; i++){
				$("#PlanEstudios").append(new Option(resultado[i].Nombre, resultado[i].id));
			}
			getEE();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
			location.reload();
		}
	});
}

function getEE(){
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/EE/ObtenerEE",
		type: "POST",
		dataType: "json",
		success: function(resultado){
			var Json ="[";
			var arregloNombres=[];
			for (let i = 0; i < resultado.length; i++) {
				arregloNombres.push(resultado[i].NombreEE);
				if (i == resultado.length-1) {
					Json += '{"NombreEE" : "'+resultado[i].NombreEE+'", "id" : "'+resultado[i].id+'", "id_Plan" : "'+resultado[i].id_Plan+'", "Area" : "'+resultado[i].Area+'"}';
				}else{
					Json += '{"NombreEE" : "'+resultado[i].NombreEE+'", "id" : "'+resultado[i].id+'", "id_Plan" : "'+resultado[i].id_Plan+'", "Area" : "'+resultado[i].Area+'"},';
				}
			}
			Json +="]";
			Json = JSON.parse(Json);
			EE = Json;
			console.log(resultado);
			ControladorPlanEstudiosEE();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
					
			location.reload();
		}
	});
}

function ControladorPlanEstudiosEE() {
	var plan = $("#PlanEstudios").val();

	eePorplan = EE.filter(function (ee) { return ee.id_Plan == plan; });

	var arregloNombres=[];
	for (let i = 0; i < eePorplan.length; i++) {
		arregloNombres.push(eePorplan[i].NombreEE);
	}
	autocompleteEE(arregloNombres);
}

function autocompleteEE(arreglo) {
	$( "#EE" ).autocomplete({
		source: arreglo
	});
}

function ControladorEE(){
	var valor = $("#EE").val();
	var ee = EE.filter(function (ee) { return ee.NombreEE == valor; });
    try {
		$("#IdEE").val(ee[0]["id"]);
		console.log(ee[0]["id"]);

	} catch (error) {
		$("#IdEE").val("");
		console.log("Sin resultado");
	}
}

//Funciones Profesor
function a??adirProfesor(){
	$("#btnQuitarProfesor").prop('disabled', false);
	ContadorProfesores += 1;
		var Profesor = '<div id="divProfesor'+ContadorProfesores+'" class="form-group" style="text-align: left;">';
			Profesor += '<input type="text" class="form-control" onchange="ControladorColaboracionProfesor(\''+ContadorProfesores+'\')" id="ColabProf'+ContadorProfesores+'" name="ColabProf" placeholder="Escribe el nombre de un profesor">';
			Profesor += '<input type="hidden" id="IdColabProf'+ContadorProfesores+'" name="IdColabProf"></input>';
			Profesor += '<span class="alertError" id="alertIdColabProfRegistro'+ContadorProfesores+'"></span>';
			Profesor += '<span class="alertError" id="alertColabProfRegistro'+ContadorProfesores+'"></span>';
		Profesor += '</div>';
	$("#ListaProfesores").append(Profesor);
	$("#ListaProfesores").addClass("show");
	autocompleteProfesores(ContadorProfesores);
}

function quitarProfesor(){
	var idDiv="#divProfesor"+ContadorProfesores;
	$(idDiv).remove();
	ContadorProfesores -= 1;
	if(ContadorProfesores<0){
		$("#btnQuitarProfesor").prop('disabled', true);
		$("#ListaProfesores").removeClass("show");
	}
}

function getProfesores(){
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Profesores/ObtenerProfesores",
		type: "POST",
		dataType: "json",
		success: function(resultado){
			var Json ="[";
			for (let i = 0; i < resultado.length; i++) {
				arregloNombresProfesores.push(resultado[i].Nombre+' '+resultado[i].Apellido_P+' '+resultado[i].Apellido_M);
				if (i == resultado.length-1) {
					Json += '{"Nombre" : "'+resultado[i].Nombre+' '+resultado[i].Apellido_P+' '+resultado[i].Apellido_M+'", "id" : "'+resultado[i].id+'"}';
				}else{
					Json += '{"Nombre" : "'+resultado[i].Nombre+' '+resultado[i].Apellido_P+' '+resultado[i].Apellido_M+'", "id" : "'+resultado[i].id+'"},';
				}
			}
			Json +="]";
			Json = JSON.parse(Json);
			Profesores = Json;
			autocompleteProfResponsable();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);

			location.reload();
		}
	});
}

function autocompleteProfResponsable() {
	var arreglo = arregloNombresProfesores;
	$( "#ProfesorResponsable" ).autocomplete({
		source: arreglo
	});
}

function ControladorProfesorResponsable(contProf){
	var valor = $("#ProfesorResponsable").val();
	var profesor = Profesores.filter(function (profesor) { return profesor.Nombre == valor; });
    try {
		$("#IdProfesorResponsable").val(profesor[0]["id"]);
	} catch (error) {
		$("#IdProfesorResponsable").val("");
	}
}

function autocompleteProfesores(numProfesor) {
	var arreglo = arregloNombresProfesores;
	$( "#ColabProf"+numProfesor ).autocomplete({
		source: arreglo
	});
}

function ControladorColaboracionProfesor(contProf){
	var valor = $("#ColabProf"+contProf).val();
	var profesor = Profesores.filter(function (profesor) { return profesor.Nombre == valor; });
    try {
		$("#IdColabProf"+contProf).val(profesor[0]["id"]);
	} catch (error) {
		$("#IdColabProf"+contProf).val("");
	}
}


//Funciones Estudiantes
function a??adirEstudiantes(){
	$("#btnQuitarEstudiante").prop('disabled', false);
	ContadorEstudiantes += 1;
		var Estudiante = '<div id="divEstudiante'+ContadorEstudiantes+'" class="form-group" style="text-align: left;">';
			Estudiante += '<input type="text" class="form-control" onchange="ControladorColaboracionEstudiante(\''+ContadorEstudiantes+'\')" id="ColabEst'+ContadorEstudiantes+'" name="ColabEst" placeholder="Escribe el nombre de un estudiante">';
			Estudiante += '<input type="hidden" id="IdColabEst'+ContadorEstudiantes+'" name="IdColabEst"></input>';
			Estudiante += '<span class="alertError" id="alertIdColabEstRegistro'+ContadorEstudiantes+'"></span>';
			Estudiante += '<span class="alertError" id="alertColabEstRegistro'+ContadorEstudiantes+'"></span>';
		Estudiante += '</div>';
	$("#ListaEstudiantes").append(Estudiante);
	$("#ListaEstudiantes").addClass("show");
	autocompleteEstudiantes(ContadorEstudiantes);
}

function quitarEstudiantes(){
	var idDiv="#divEstudiante"+ContadorEstudiantes;
	$(idDiv).remove();
	ContadorEstudiantes -= 1;
	if(ContadorEstudiantes<0){
		$("#btnQuitarEstudiante").prop('disabled', true);
		$("#ListaEstudiantes").removeClass("show");
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
			for (let i = 0; i < resultado.length; i++) {
				arregloNombresEstudiantes.push(resultado[i].Nombre+' '+resultado[i].Apellido_P+' '+resultado[i].Apellido_M);
				if (i == resultado.length-1) {
					Json += '{"Nombre" : "'+resultado[i].Nombre+' '+resultado[i].Apellido_P+' '+resultado[i].Apellido_M+'", "id" : "'+resultado[i].id+'"}';
				}else{
					Json += '{"Nombre" : "'+resultado[i].Nombre+' '+resultado[i].Apellido_P+' '+resultado[i].Apellido_M+'", "id" : "'+resultado[i].id+'"},';
				}
			}
			Json +="]";
			Json = JSON.parse(Json);
			Estudiantes = Json;
			console.log(Estudiantes);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
					
			location.reload();
		}
	});
}

function autocompleteEstudiantes(numEstudiante) {
	var arreglo = arregloNombresEstudiantes;
	$( "#ColabEst"+numEstudiante ).autocomplete({
		source: arreglo
	});

}

function ControladorColaboracionEstudiante(contEst){
	var valor = $("#ColabEst"+contEst).val();
	var estudiante = Estudiantes.filter(function (estudiante) { return estudiante.Nombre == valor; });
    try {
		$("#IdColabEst"+contEst).val(estudiante[0]["id"]);
	} catch (error) {
		$("#IdColabEst"+contEst).val("");
	}
}





//FUNCIONES PARA ARCHIVO 
function ControladorArchivoEvidencia(){
	var Archivo = document.getElementById('ArchivoEvidencia').files;
	var form = new FormData();
	form.append('ArchivoEvidencia[]', Archivo[0]);
	form.append('idPosicion', "0");
	form.append('TipoEvidencia', "EvidenciaTrabajoSector");
	
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
				tabla = tabla + '<tr id="VistaArchivoEv">';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarArchivoEvidencia()" class="btn btn-danger btn-xs">Quitar</button></td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevArchivoEvidencia').innerHTML=tabla;
		}
	});
}

function quitarArchivoEvidencia() {
	var idDiv = "#VistaArchivoEv";
	$(idDiv).remove();
	document.getElementById('ArchivoEvidencia').value = null;
}

//FUNCIONES DE VALIDACION
function EjecutarValidaciones() {
	$("#btnRegistrar").prop('disabled', true);
	$("#btnCancelar").prop('disabled', true);

	ValidarDatosG();
	ValidarProfesores();
	ValidarEstudiantes();
}

function validarValidaciones() {
	
	if(validarContDatosGenerales==0 && validarContProfesores == 0 && validarContEstudiantes==0){
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
	}else{
		console.log(validarContDatosGenerales);
		console.log(validarContProfesores);
		console.log(validarContEstudiantes);
	}
}

function ValidarDatosG(){
	validarContDatosGenerales = 1;
	var formDatosGenerales = new FormData(document.getElementById('FormDatosGenerales'));
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Trabajos_En_Sector/Registrar_Trabajos_Sectores/ValidarDatosGeneralesTrabajoSector",
		data: formDatosGenerales,
		type: "POST",
		contentType: false,
		processData: false,
		success: function(resultado){
			$("#alertNombreConvenioRegistro").html("");
			$("#alertIdConvenioRegistro").html("");
			$("#alertNombreProyectoRegistro").html("");
			$("#alertInstitucionRegistro").html("");
			$("#alertResponsableProyectoRegistro").html("");
			$("#alertProfesorResponsableRegistro").html("");
			$("#alertIdProfesorResponsableRegistro").html("");
			$("#alertAnioInicioRegistro").html("");
			$("#alertAnioFinRegistro").html("");
			$("#alertIdEERegistro").html("");

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

function ValidarProfesores(){
	validarContProfesores = ContadorProfesores+1;
	
	for (let i = 0; i <= ContadorProfesores; i++) {
		var ColabProf = $('#ColabProf'+i).val();
		var IdColabProf = $('#IdColabProf'+i).val();

		var parametros = {
			"ColabProf" : ColabProf,
			"IdColabProf" : IdColabProf
		};

		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: '/Trabajos_En_Sector/Registrar_Trabajos_Sectores/ValidarProfesoresTrabajoSector',
			data: parametros,
			type: "POST",
			success: function(resultado){
				$("#alertColabProfRegistro"+i).html("");
				$("#alertIdColabProfRegistro"+i).html("");

				if(resultado!=true){
					for (const atributo in resultado) {
						var mensajes="";
						for (let i = 0; i < resultado[atributo].length; i++) {
							mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
							if(resultado[atributo].length-i!=1){
								mensajes = mensajes + "<br>"
							}
						}
						$("#alert"+atributo+"Registro"+i).html(mensajes);
					}
					Bandera = false;
				}
				validarContProfesores--;
				validarValidaciones();
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	}
}

function ValidarEstudiantes(){
	validarContEstudiantes = ContadorEstudiantes+1;
	
	for (let i = 0; i <= ContadorEstudiantes; i++) {
		var ColabEst = $('#ColabEst'+i).val();
		var IdColabEst = $('#IdColabEst'+i).val();

		var parametros = {
			"ColabEst" : ColabEst,
			"IdColabEst" : IdColabEst
		};

		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: '/Trabajos_En_Sector/Registrar_Trabajos_Sectores/ValidarEstudiantesTrabajoSector',
			data: parametros,
			type: "POST",
			success: function(resultado){
				$("#alertColabEstRegistro"+i).html("");
				$("#alertIdColabEstRegistro"+i).html("");

				if(resultado!=true){
					for (const atributo in resultado) {
						var mensajes="";
						for (let i = 0; i < resultado[atributo].length; i++) {
							mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
							if(resultado[atributo].length-i!=1){
								mensajes = mensajes + "<br>"
							}
						}
						$("#alert"+atributo+"Registro"+i).html(mensajes);
					}
					Bandera = false;
				}
				validarContEstudiantes--;
				validarValidaciones();
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	}
}


//FUNCIONES DE REGISTRO
function RegistrarDatosGenerales() {
	var formDatosGenerales = new FormData(document.getElementById('FormDatosGenerales'));
	
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Trabajos_En_Sector/Registrar_Trabajos_Sectores/RegistrarDG",
		data: formDatosGenerales,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(idTS){
			RegistrarColaboracionesProfesor(idTS);
			RegistrarColaboracionesEstudiante(idTS);
			alert("Trabajo con Sector Registrado");
			location.reload();
			console.log(idTS);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function RegistrarColaboracionesProfesor(idTS) {
	for (let i = 0; i <= ContadorProfesores; i++) {
		var IdColabProf = $('#IdColabProf'+i).val();

		var parametros = {
			"IdTrabajoSector" : idTS,
			"IdColabProf" : IdColabProf
		};

		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: '/Trabajos_En_Sector/Registrar_Trabajos_Sectores/RegistrarColaboracionProfesores',
			data: parametros,
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
}

function RegistrarColaboracionesEstudiante(idTS) {
	for (let i = 0; i <= ContadorEstudiantes; i++) {
		var IdColabEst = $('#IdColabEst'+i).val();

		var parametros = {
			"IdTrabajoSector" : idTS,
			"IdColabEst" : IdColabEst
		};

		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: '/Trabajos_En_Sector/Registrar_Trabajos_Sectores/RegistrarColaboracionEstudiantes',
			data: parametros,
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
}

function Cancelar() {
	location.reload();
}