var validarContDatosGenerales = 0;

var validarContProfesores = 0;
var ContadorProfesores = -1;
var ContadorProfesoresGuardados = 0;
var ArregloBorrarProfesores = [];

var validarContEstudiantes = 0;
var ContadorEstudiantes = -1;
var ContadorEstudiantesGuardados = 0;
var ArregloBorrarEstudiantes = [];


var validarContMaterias = 0;
var ContadorMaterias = -1;
var ContadorMateriasGuardados = 0;
var ArregloBorrarMaterias = [];

var arregloNombresEstudiantes=[];
var arregloNombresProfesores=[];
var arregloPlanesEstudios=[];

var Profesores = "";
var Estudiantes = "";
var Convenios = "";
var EE = "";
var eePorplan = "";

var Bandera = true;

window.onload = function() {
	initializeConvenio();
};

function initializeConvenio() {
    limpiarTMP();
	
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

	
	$('#btnSi').on("click",function(e){
		e.preventDefault();
	});

	$('#btnNo').on("click",function(e){
		e.preventDefault();
	});

	$('#btnAgregarMateria').on("click",function(e){
		e.preventDefault();
	});

	$('#btnQuitarMateria').on("click",function(e){
		e.preventDefault();
	});

	getConvenios();
	getEstudiantes();
	getProfesores();
	getPlanEstudios();
	
	
	Anios();

	setProfesores();
	setEstudiantes();
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

	$("#AnioInicio").val(informacion['DatosGenerales'].anioInicio);
	$("#AnioFin").val(informacion['DatosGenerales'].anioFin);
}

function setProfesores() {
	for (let p = 0; p < informacion.ColabProf.length; p++) {
		ContadorProfesoresGuardados += 1;
		var Profesor = '<div id="divProfesor'+ContadorProfesoresGuardados+'" class="form-group row" style="text-align: left;">';
			Profesor += '<div class="col-md-2" style="text-align: center; display:flex; align-items:center;">';
				Profesor += '<button class="btn btn-danger btn-xs" onclick="EliminarRegistroColabProf(\'' + ContadorProfesoresGuardados + '\')">Eliminar</button>';
			Profesor += '</div>';
			Profesor += '<div class="col-md-10">';
				Profesor += '<input type="text" class="form-control" value="'+informacion.ColabProf[p].Nombre+' '+informacion.ColabProf[p].Apellido_P+' '+informacion.ColabProf[p].Apellido_M+'" onchange="ControladorColaboracionProfesor(\''+ContadorProfesoresGuardados+'\')" id="ColabProf'+ContadorProfesoresGuardados+'" name="ColabProfModificar" placeholder="Escribe el nombre de un profesor">';
				Profesor += '<input type="hidden" value="'+informacion.ColabProf[p].idProfesor+'" id="IdColabProf'+ContadorProfesoresGuardados+'" name="IdColabProfModificar"></input>';
				Profesor += '<input type="hidden" value="'+informacion.ColabProf[p].id+'" id="IdRegColabProf'+ContadorProfesoresGuardados+'" name="IdRegColabProfModificar"></input>';
			Profesor += '</div>';
			Profesor += '<span class="alertError" id="alertIdColabProfModificar'+ContadorProfesoresGuardados+'"></span>';
			Profesor += '<span class="alertError" id="alertColabProfModificar'+ContadorProfesoresGuardados+'"></span>';
		Profesor += '</div>';
		$("#ListaProfesores").append(Profesor);
		$("#ListaProfesores").addClass("show");
		
		autocompleteProfesores(ContadorProfesoresGuardados);
	}
	ContadorProfesores = ContadorProfesoresGuardados;
}

function setEstudiantes() {
	for (let p = 0; p < informacion.ColabEst.length; p++) {
		ContadorEstudiantesGuardados += 1;
		var Estudiante = '<div id="divEstudiante'+ContadorEstudiantesGuardados+'" class="form-group row" style="text-align: left;">';
			Estudiante += '<div class="col-md-2" style="text-align: center; display:flex; align-items:center;">';
				Estudiante += '<button class="btn btn-danger btn-xs" onclick="EliminarRegistroColabEst(\'' + ContadorEstudiantesGuardados + '\')">Eliminar</button>';
			Estudiante += '</div>';
			Estudiante += '<div class="col-md-10">';
				Estudiante += '<input type="text" class="form-control" value="'+informacion.ColabEst[p].Nombre+' '+informacion.ColabEst[p].Apellido_P+' '+informacion.ColabEst[p].Apellido_M+'" onchange="ControladorColaboracionEstudiante(\''+ContadorEstudiantesGuardados+'\')" id="ColabEst'+ContadorEstudiantesGuardados+'" name="ColabEstModificar" placeholder="Escribe el nombre de un estudiante">';
				Estudiante += '<input type="hidden" value="'+informacion.ColabEst[p].idEstudiante+'" id="IdColabEst'+ContadorEstudiantesGuardados+'" name="IdColabEstModificar"></input>';
				Estudiante += '<input type="hidden" value="'+informacion.ColabEst[p].id+'" id="IdRegColabEst'+ContadorEstudiantesGuardados+'" name="IdRegColabEstModificar"></input>';
			Estudiante += '</div>';
			Estudiante += '<span class="alertError" id="alertIdColabEstModificar'+ContadorEstudiantesGuardados+'"></span>';
			Estudiante += '<span class="alertError" id="alertColabEstModificar'+ContadorEstudiantesGuardados+'"></span>';
		Estudiante += '</div>';

		$("#ListaEstudiantes").append(Estudiante);
		$("#ListaEstudiantes").addClass("show");
		
		autocompleteEstudiantes(ContadorEstudiantesGuardados);
	}
	ContadorEstudiantes = ContadorEstudiantesGuardados;
}

function setMaterias() {
	console.log(informacion.EEAsociada.length);
	if(informacion.EEAsociada.length>0){
		$("#AsociarMaterias").css("display", "block");
		$("#ListaMaterias").addClass("show");
	}
	for (let p = 0; p < informacion.EEAsociada.length; p++) {
		ContadorMateriasGuardados += 1;
		var Materia = '<div class="row" id="materia'+ContadorMateriasGuardados+'" style="margin-bottom:10px !important; border: 1px solid rgb(212, 212, 212); border-radius: 5px; padding-bottom: 5px">';
			Materia += '<div class="form-group col-md-5" style="text-align: left; padding: 0px 7px !important;">';
				Materia += '<label>Plan de Estudios</label>';
				Materia += '<select class="form-control" id="PlanEstudios'+ContadorMateriasGuardados+'" name="PlanEstudios" onchange="ControladorPlanEstudiosEE(\''+ContadorMateriasGuardados+'\')">';
				Materia += '</select>';
			Materia += '</div>';
			Materia += '<div class="form-group col-md-7" style="text-align: left; padding: 0px 7px !important;">';
				Materia += '<label>Experiencia Educativa Asociada</label>';
				Materia += '<input type="text" class="form-control" onchange="ControladorEE(\''+ContadorMateriasGuardados+'\')" id="EE'+ContadorMateriasGuardados+'" name="EEModificar" value="'+informacion.EEAsociada[p].NombreEE+'">';
				Materia += '<input type="hidden" id="IdEE'+ContadorMateriasGuardados+'" name="IdEEModificar" value="'+informacion.EEAsociada[p].idEE+'">';
				Materia += '<input type="hidden" id="IdRegEE'+ContadorMateriasGuardados+'" name="IdRegEEModificar" value="'+informacion.EEAsociada[p].id+'">';
			Materia += '</div>';
			Materia += '<span class="alertError" id="alertIdEEModificar'+ContadorMateriasGuardados+'"></span>';
			Materia += '<span class="alertError" id="alertEEModificar'+ContadorMateriasGuardados+'"></span>';
		
			Materia += '<div class="col-md-5" style="text-align: center; display:flex; align-items:center;"></div>';
			Materia += '<div class="col-md-2" style="text-align: center; display:flex; align-items:center;">';
				Materia += '<button class="btn btn-danger btn-xs" onclick="EliminarRegistroEEAsociada(\'' + ContadorMateriasGuardados + '\')">Eliminar</button>';
			Materia += '</div>';
			Materia += '<div class="col-md-5" style="text-align: center; display:flex; align-items:center;"></div>';
		Materia += '</div>';

		$("#ListaMaterias").append(Materia);
		console.log("Planes: "+arregloPlanesEstudios.length);
		for(var i = 0; i < arregloPlanesEstudios.length; i++){
			$("#PlanEstudios"+ContadorMateriasGuardados).append(new Option(arregloPlanesEstudios[i].Nombre, arregloPlanesEstudios[i].id));
		}

		$("#PlanEstudios"+ContadorMateriasGuardados).val(informacion.EEAsociada[p].id_Plan);

		$("#ListaMaterias").addClass("show");
		
		ControladorPlanEstudiosEE(ContadorMateriasGuardados);
	}
	ContadorMaterias = ContadorMateriasGuardados;
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
			arregloPlanesEstudios=resultado;
			
			getEE();
			/*if(informacion['EEAsociadas'].length!=0){
				$("#PlanEstudios").val(informacion['DatosGenerales'].id_Plan);
			}*/
			
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
			setMaterias();
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
					
			location.reload();
		}
	});
}


//Funciones Materias
function respuestaEE(respuesta){
	if(respuesta=="si"){
		$("#AsociarMaterias").css("display", "block");
	}else{
		if(informacion.EEAsociada.length>0){
			var r = confirm("¿Desea eliminar todas las EE asociadas? \n (Se ejecutara al guardar los cambios)");
			if (r == true) {
				ArregloBorrarMaterias = [];
				for (let i = 0; i < informacion.EEAsociada.length; i++) {
					ArregloBorrarMaterias.push(informacion.EEAsociada[i].id);
				}
				ContadorMaterias = -1;
				ContadorMateriasGuardados = 0;

				$("#btnQuitarMateria").prop('disabled', true);
				$("#AsociarMaterias").css("display", "none");
				$("#ListaMaterias").html("");
				$("#ListaMaterias").removeClass("show");
			} else {
				$('#FormDatosGenerales').submit(function (e) {
					e.preventDefault();
				});
			}
		}
	}
}

function ControladorPlanEstudiosEE(contMateria) {
	
	var plan = $("#PlanEstudios"+contMateria).val();

	eePorplan = EE.filter(function (ee) { return ee.id_Plan == plan; });

	var arregloNombres=[];
	for (let i = 0; i < eePorplan.length; i++) {
		arregloNombres.push(eePorplan[i].NombreEE);
	}
	autocompleteEE(arregloNombres, contMateria);
}

function autocompleteEE(arreglo, contMateria) {
	console.log("EE"+contMateria);
	
	$( "#EE"+contMateria ).autocomplete({
		source: arreglo
	});
}

function ControladorEE(contMateria){
	var valor = $("#EE"+contMateria).val();
	
	console.log(EE);

	var ee = EE.filter(function (ee) { return ee.NombreEE == valor; });
    try {
		$("#IdEE"+contMateria).val(ee[0]["id"]);
		console.log(ee[0]["id"]);

	} catch (error) {
		$("#IdEE"+contMateria).val("");
		console.log("Sin resultado");
	}
}

function añadirMateria(){
	$("#btnQuitarMateria").prop('disabled', false);
	ContadorMaterias += 1;
	
		var Materia = '<div class="row" id="materia'+ContadorMaterias+'">';
			Materia += '<div class="form-group col-md-5" style="text-align: left; padding: 0px 7px !important;">';
				Materia += '<label>Plan de Estudios</label>';
				Materia += '<select class="form-control" id="PlanEstudios'+ContadorMaterias+'" name="PlanEstudios" onchange="ControladorPlanEstudiosEE(\''+ContadorMaterias+'\')">';
				Materia += '</select>';
			Materia += '</div>';

			Materia += '<div class="form-group col-md-7" style="text-align: left; padding: 0px 7px !important;">';
				Materia += '<label for="EE">Experiencia Educativa Asociada</label>';
				Materia += '<input type="text" class="form-control" onchange="ControladorEE(\''+ContadorMaterias+'\')" id="EE'+ContadorMaterias+'" name="EE">';
				Materia += '<input type="hidden" id="IdEE'+ContadorMaterias+'" name="IdEE">';
			Materia += '</div>';
			Materia += '<span class="alertError" id="alertIdEERegistro'+ContadorMaterias+'"></span>';
			Materia += '<span class="alertError" id="alertEERegistro'+ContadorMaterias+'"></span>';
		Materia += '</div>';
	$("#ListaMaterias").append(Materia);

	for(var i = 0; i < arregloPlanesEstudios.length; i++){
		$("#PlanEstudios"+ContadorMaterias).append(new Option(arregloPlanesEstudios[i].Nombre, arregloPlanesEstudios[i].id));
	}

	$("#ListaMaterias").addClass("show");
	
	ControladorPlanEstudiosEE(ContadorMaterias);
}

function quitarMateria(){
	var idDiv="#materia"+ContadorMaterias;
	$(idDiv).remove();
	ContadorMaterias -= 1;
	if(ContadorMaterias<=ContadorMateriasGuardados){
		$("#btnQuitarMateria").prop('disabled', true);
		if(informacion.EEAsociada.length<1){
			$("#ListaMaterias").removeClass("show");
		}
	}
}

function EliminarRegistroEEAsociada(posicion) {
	var r = confirm("¿Esta seguro de eliminar este registro? \n (Se ejecutara al guardar los cambios)");
	if (r == true) {
		ArregloBorrarMaterias.push($("#IdRegEE" + posicion).val());
		$("#materia" + posicion).remove();
	} else {
		$('#FormDatosGenerales').submit(function (e) {
			e.preventDefault();
		});
	}
}

//Funciones Profesor
function añadirProfesor(){
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
	if(ContadorProfesores<=ContadorProfesoresGuardados){
		$("#btnQuitarProfesor").prop('disabled', true);
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

function EliminarRegistroColabProf(posicion) {
	var r = confirm("¿Esta seguro de eliminar este registro? \n (Se ejecutara al guardar los cambios)");
	if (r == true) {
		ArregloBorrarProfesores.push($("#IdRegColabProf" + posicion).val());
		$("#divProfesor" + posicion).remove();
	} else {
		$('#FormDatosGenerales').submit(function (e) {
			e.preventDefault();
		});
	}
}

//Funciones Estudiantes
function añadirEstudiantes(){
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
	if(ContadorEstudiantes<=ContadorEstudiantesGuardados){
		$("#btnQuitarEstudiante").prop('disabled', true);
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

function EliminarRegistroColabEst(posicion) {
	var r = confirm("¿Esta seguro de eliminar este registro? \n (Se ejecutara al guardar los cambios)");
	if (r == true) {
		ArregloBorrarEstudiantes.push($("#IdRegColabEst" + posicion).val());
		$("#divEstudiante" + posicion).remove();
	} else {
		$('#FormDatosGenerales').submit(function (e) {
			e.preventDefault();
		});
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
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="../'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
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
	ValidarMaterias();
}

function validarValidaciones() {
	
	if(validarContDatosGenerales==0 && validarContProfesores == 0 && validarContEstudiantes==0 && validarContMaterias==0){
		if(Bandera==true){
			console.log(Bandera);
			ModificarDatosGenerales();
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
	var id = informacion.DatosGenerales.id;
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Trabajos_En_Sector/Modificar_Trabajos_Sectores/ValidarDatosGeneralesTrabajoSector/" + id,
		data: formDatosGenerales,
		type: "POST",
		contentType: false,
		processData: false,
		success: function(resultado){
			$("#alertNombreConvenioModificar").html("");
			$("#alertIdConvenioModificar").html("");
			$("#alertNombreProyectoModificar").html("");
			$("#alertInstitucionModificar").html("");
			$("#alertResponsableProyectoModificar").html("");
			$("#alertProfesorResponsableModificar").html("");
			$("#alertIdProfesorResponsableModificar").html("");
			$("#alertAnioInicioModificar").html("");
			$("#alertAnioFinModificar").html("");
			$("#alertIdEEModificar").html("");

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
	
	var ArregloColabProfModificar = document.getElementsByName('ColabProfModificar');
	var ArregloIdColabProfModificar = document.getElementsByName('IdColabProfModificar');
	var ArregloIdRegColabProfModificar = document.getElementsByName('IdRegColabProfModificar');

	var ArregloColabProf = document.getElementsByName('ColabProf');
	var ArregloIdColabProf = document.getElementsByName('IdColabProf');

	validarContProfesores = ArregloColabProfModificar.length + ArregloColabProf.length;

	for (let i = 0; i < ArregloColabProfModificar.length; i++) {
		var ColabProf = ArregloColabProfModificar[i].value;
		var IdColabProf = ArregloIdColabProfModificar[i].value;
		var IdRegColabProf = ArregloIdRegColabProfModificar[i].value;

		var parametros = {
			"ColabProf" : ColabProf,
			"IdColabProf" : IdColabProf,
			"IdRegColabProf" : IdRegColabProf,
			'posicion': i+1
		};
		
		ValidarColabProfGuardados(parametros);
	}
	
	for (let i = 0; i < ArregloColabProf.length; i++) {
		var ColabProf = ArregloColabProf[i].value;
		var IdColabProf = ArregloIdColabProf[i].value;

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
				$("#alertColabProfRegistro"+parseInt(ContadorProfesoresGuardados + i + 1)).html("");
				$("#alertIdColabProfRegistro"+parseInt(ContadorProfesoresGuardados + i + 1)).html("");

				if(resultado!=true){
					for (const atributo in resultado) {
						var mensajes="";
						for (let i = 0; i < resultado[atributo].length; i++) {
							mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
							if(resultado[atributo].length-i!=1){
								mensajes = mensajes + "<br>"
							}
						}
						$("#alert"+atributo+"Registro"+parseInt(ContadorProfesoresGuardados + i + 1)).html(mensajes);
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

async function ValidarColabProfGuardados(parametros) {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Trabajos_En_Sector/Modificar_Trabajos_Sectores/ValidarProfesoresTrabajoSector',
		data: parametros,
		type: "POST",
		success: function(resultado){
			$("#alertColabProfModificar"+parametros.posicion).html("");
			$("#alertIdColabProfModificar"+parametros.posicion).html("");

			if(resultado!=true){
				for (const atributo in resultado) {
					var mensajes="";
					for (let i = 0; i < resultado[atributo].length; i++) {
						mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
						if(resultado[atributo].length-i!=1){
							mensajes = mensajes + "<br>"
						}
					}
					$("#alert"+atributo+"Modificar"+parametros.posicion).html(mensajes);
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

function ValidarEstudiantes(){
	var ArregloColabEstModificar = document.getElementsByName('ColabEstModificar');
	var ArregloIdColabEstModificar = document.getElementsByName('IdColabEstModificar');
	var ArregloIdRegColabEstModificar = document.getElementsByName('IdRegColabEstModificar');

	var ArregloColabEst = document.getElementsByName('ColabEst');
	var ArregloIdColabEst = document.getElementsByName('IdColabEst');

	validarContEstudiantes = ArregloColabEstModificar.length + ArregloColabEst.length;
	

	console.log("arreglo mod est: "+ArregloColabEstModificar.length);
	console.log("arreglo reg est: "+ArregloColabEst.length);
	for (let i = 0; i < ArregloColabEstModificar.length; i++) {
		var ColabEst = ArregloColabEstModificar[i].value;
		var IdColabEst = ArregloIdColabEstModificar[i].value;
		var IdRegColabEst = ArregloIdRegColabEstModificar[i].value;

		var parametros = {
			"ColabEst" : ColabEst,
			"IdColabEst" : IdColabEst,
			"IdRegColabEst" : IdRegColabEst,
			'posicion': i+1
		};
		
		ValidarColabEstGuardados(parametros);
	}

	for (let i = 0; i < ArregloColabEst.length; i++) {
		var ColabEst = ArregloColabEst[i].value;
		var IdColabEst = ArregloIdColabEst[i].value;

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
				$("#alertColabEstRegistro"+parseInt(ContadorEstudiantesGuardados + i + 1)).html("");
				$("#alertIdColabEstRegistro"+parseInt(ContadorEstudiantesGuardados + i + 1)).html("");

				console.log(resultado);
				if(resultado!=true){
					for (const atributo in resultado) {
						var mensajes="";
						for (let i = 0; i < resultado[atributo].length; i++) {
							mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
							if(resultado[atributo].length-i!=1){
								mensajes = mensajes + "<br>"
							}
						}
						$("#alert"+atributo+"Registro"+parseInt(ContadorEstudiantesGuardados + i + 1)).html(mensajes);
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

async function ValidarColabEstGuardados(parametros) {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Trabajos_En_Sector/Modificar_Trabajos_Sectores/ValidarEstudiantesTrabajoSector',
		data: parametros,
		type: "POST",
		success: function(resultado){
			$("#alertColabProfModificar"+parametros.posicion).html("");
			$("#alertIdColabProfModificar"+parametros.posicion).html("");

			if(resultado!=true){
				for (const atributo in resultado) {
					var mensajes="";
					for (let i = 0; i < resultado[atributo].length; i++) {
						mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
						if(resultado[atributo].length-i!=1){
							mensajes = mensajes + "<br>"
						}
					}
					$("#alert"+atributo+"Modificar"+parametros.posicion).html(mensajes);
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

function ValidarMaterias(){
	var ArregloEEModificar = document.getElementsByName('EEModificar');
	var ArregloIdEEModificar = document.getElementsByName('IdEEModificar');
	var ArregloIdRegEEModificar = document.getElementsByName('IdRegEEModificar');

	var ArregloEE = document.getElementsByName('EE');
	var ArregloIdEE = document.getElementsByName('IdEE');

	validarContMaterias = ArregloEEModificar.length + ArregloEE.length;
	
	for (let i = 0; i < ArregloEEModificar.length; i++) {
		var EE = ArregloEEModificar[i].value;
		var IdEE = ArregloIdEEModificar[i].value;
		var IdRegEE = ArregloIdRegEEModificar[i].value;

		var parametros = {
			"EE" : EE,
			"IdEE" : IdEE,
			"IdRegEE" : IdRegEE,
			'posicion': i+1
		};
		
		ValidarMateriasGuardadas(parametros);
	}

	for (let i = 0; i < ArregloEE.length; i++) {
		var EE = ArregloEE[i].value;
		var IdEE = ArregloIdEE[i].value;

		var parametros = {
			"EE" : EE,
			"IdEE" : IdEE
		};

		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: '/Trabajos_En_Sector/Registrar_Trabajos_Sectores/ValidarEEAsociada',
			data: parametros,
			type: "POST",
			success: function(resultado){
				$("#alertEERegistro"+parseInt(ContadorMateriasGuardados + i + 1)).html("");
				$("#alertIdEERegistro"+parseInt(ContadorMateriasGuardados + i + 1)).html("");

				console.log(resultado);
				if(resultado!=true){
					for (const atributo in resultado) {
						var mensajes="";
						for (let i = 0; i < resultado[atributo].length; i++) {
							mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
							if(resultado[atributo].length-i!=1){
								mensajes = mensajes + "<br>"
							}
						}
						$("#alert"+atributo+"Registro"+parseInt(ContadorMateriasGuardados + i + 1)).html(mensajes);
					}
					Bandera = false;
				}
				validarContMaterias--;
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

async function ValidarMateriasGuardadas(parametros) {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Trabajos_En_Sector/Modificar_Trabajos_Sectores/ValidarEEAsociada',
		data: parametros,
		type: "POST",
		success: function(resultado){
			$("#alertEEModificar"+parametros.posicion).html("");
			$("#alertIdEEModificar"+parametros.posicion).html("");

			if(resultado!=true){
				for (const atributo in resultado) {
					var mensajes="";
					for (let i = 0; i < resultado[atributo].length; i++) {
						mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
						if(resultado[atributo].length-i!=1){
							mensajes = mensajes + "<br>"
						}
					}
					$("#alert"+atributo+"Modificar"+parametros.posicion).html(mensajes);
				}
				Bandera = false;
			}
			validarContMaterias--;
			validarValidaciones();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}






function ModificarDatosGenerales() {
	var formDatosGenerales = new FormData(document.getElementById('FormDatosGenerales'));
	var id = informacion.DatosGenerales.id;

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Trabajos_En_Sector/Modificar_Trabajos_Sectores/ModificarDG/" + id,
		data: formDatosGenerales,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(result){
			ModificarColaboracionesProfesor(id);
			ModificarColaboracionesEstudiante(id);
			ModificarMaterias(id);
			alert("Trabajo con Sector Modificado");
			location.reload();
			console.log(result);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}


//FUNCIONES DE REGISTRO
function ModificarColaboracionesProfesor(idTS) {
	EliminarRegistrosColabProf();
	RegistrarColaboracionesProfesor(idTS);
	ModificarColaboracionesProfesorGuardadas(idTS);
}

function EliminarRegistrosColabProf() {
	if (ArregloBorrarProfesores.length != 0) {
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Trabajos_En_Sector/Modificar_Trabajos_Sectores/EliminarColabProf",
			data: { "Ids": ArregloBorrarProfesores },
			type: "POST",
			success: function (resultado) {
				console.log(resultado);
			}
		});
	} else {
		console.log("nada para borrar");
	}
}

function RegistrarColaboracionesProfesor(idTS) {
	var ArregloIdColabProf = document.getElementsByName('IdColabProf');

	for (let i = 0; i < ArregloIdColabProf.length; i++) {
		var IdColabProf = ArregloIdColabProf[i].value;

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

function ModificarColaboracionesProfesorGuardadas(idTS){
	var ArregloIdColabProfModificar = document.getElementsByName('IdColabProfModificar');
	var ArregloIdRegColabProfModificar = document.getElementsByName('IdRegColabProfModificar');

	for (let i = 0; i < ArregloIdRegColabProfModificar.length; i++) {
		var IdColabProf = ArregloIdColabProfModificar[i].value;
		var IdRegColabProf = ArregloIdRegColabProfModificar[i].value;

		var parametros = {
			"IdColabProf" : IdColabProf,
			"IdRegColabProf" : IdRegColabProf
		};

		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: '/Trabajos_En_Sector/Modificar_Trabajos_Sectores/ModificarColabProf',
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

function ModificarColaboracionesEstudiante(idTS) {
	EliminarRegistrosColabEst();
	RegistrarColaboracionesEstudiante(idTS);
	ModificarColaboracionesEstudianteGuardadas(idTS);
}

function EliminarRegistrosColabEst() {
	if (ArregloBorrarEstudiantes.length != 0) {
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Trabajos_En_Sector/Modificar_Trabajos_Sectores/EliminarColabEst",
			data: { "Ids": ArregloBorrarEstudiantes },
			type: "POST",
			success: function (resultado) {
				console.log(resultado);
			}
		});
	} else {
		console.log("nada para borrar");
	}
}

function RegistrarColaboracionesEstudiante(idTS) {
	var ArregloIdColabEst = document.getElementsByName('IdColabEst');
	for (let i = 0; i < ArregloIdColabEst.length; i++) {
		var IdColabEst = ArregloIdColabEst[0].value;

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

function ModificarColaboracionesEstudianteGuardadas(idTS){
	var ArregloIdColabEstModificar = document.getElementsByName('IdColabEstModificar');
	var ArregloIdRegColabEstModificar = document.getElementsByName('IdRegColabEstModificar');

	for (let i = 0; i < ArregloIdRegColabEstModificar.length; i++) {
		var IdColabEst = ArregloIdColabEstModificar[i].value;
		var IdRegColabEst = ArregloIdRegColabEstModificar[i].value;

		var parametros = {
			"IdColabEst" : IdColabEst,
			"IdRegColabEst" : IdRegColabEst
		};

		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: '/Trabajos_En_Sector/Modificar_Trabajos_Sectores/ModificarColabEst',
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

function ModificarMaterias(idTS) {
	EliminarRegistrosMaterias();
	RegistrarMateriasAsociadas(idTS);
	ModificarMateriasAsociadasGuardadas(idTS);
}

function EliminarRegistrosMaterias() {
	if (ArregloBorrarMaterias.length != 0) {
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Trabajos_En_Sector/Modificar_Trabajos_Sectores/EliminarEE",
			data: { "Ids": ArregloBorrarMaterias },
			type: "POST",
			success: function (resultado) {
				console.log(resultado);
			}
		});
	} else {
		console.log("nada para borrar");
	}
}

function RegistrarMateriasAsociadas(idTS) {
	var ArregloIdEE = document.getElementsByName('IdEE');
	for (let i = 0; i < ArregloIdEE.length; i++) {
		var IdEE = ArregloIdEE[0].value;

		var parametros = {
			"IdTrabajoSector" : idTS,
			"IdEE" : IdEE
		};

		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: '/Trabajos_En_Sector/Registrar_Trabajos_Sectores/RegistrarEEAsociadas',
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

function ModificarMateriasAsociadasGuardadas(idTS){
	var ArregloIdEEModificar = document.getElementsByName('IdEEModificar');
	var ArregloIdRegEEModificar = document.getElementsByName('IdRegEEModificar');

	for (let i = 0; i < ArregloIdRegEEModificar.length; i++) {
		var IdEE = ArregloIdEEModificar[i].value;
		var IdRegEE = ArregloIdRegEEModificar[i].value;

		var parametros = {
			"IdEE" : IdEE,
			"IdRegEE" : IdRegEE
		};

		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: '/Trabajos_En_Sector/Modificar_Trabajos_Sectores/ModificarEE',
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