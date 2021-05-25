var ArregloCartasNAB = [];
var arregloPaises=[];
var ArregloPlanes=[];

var ContadorPreparacionAcademica = -1;
var ContadorSuperacionAcademica = -1;
var ContadorDistinciones = -1;
var ContadorTrayectoria = -1;
var ContadorPertenencias = -1;

var GradosAcademicos = "";
var TipoSuperacion = "";
var TipoDistincion = "";
var TipoTrayectoria = "";

var element = document.createElement("input");
element.setAttribute("value", "true");

var validarContDatosGenerales = 0;
var validarContPreparacionAcad = 0;
var validarContSuperacionAcad = 0;
var validarContDistinciones = 0;
var validarContTrayectorias = 0;
var validarContPertenencias = 0;

var Bandera = true;

window.onload = function() {
	initializeProfesor();
};

function initializeProfesor() {
	limpiarTMP();
	getTipoContratacion();
	getTipoColaboracion();
	Anios();
	getPaises();
	getGradosAcademicos();
	getTiposSuperacion();
	getTiposTrayectoria();
	getLGACsByPlan();
}

function getTipoContratacion(){
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Auxiliar/TipoContratacion',
		type: "POST",
		success: function(resultado){
			for(var i = 0; i < resultado.length; i++){
				$("#TipoContratacion").append(new Option(resultado[i].Tipo, resultado[i].id));
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function getTipoColaboracion(){
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Auxiliar/TipoColaboracion',
		type: "POST",
		success: function(resultado){
			for(var i = 0; i < resultado.length; i++){
				$("#TipoColaboracion").append(new Option(resultado[i].Tipo, resultado[i].id));
			}
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
	for(var i = year; i >= 1980; i--){
		$("#AnioIngreso").append(new Option(i, i));
		$("#AnioSalida").append(new Option(i, i));
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
				ArregloPlanes[i]=resultado[i].id;
				var optionPlan = new Option(resultado[i].Nombre, resultado[i].id);
				$("#PlanEstudios").append(optionPlan);
				var cad="";
				cad=cad+ '<div id="Plan'+resultado[i].id+'" style="display:none;">';
					for(var j = 0; j < resultado[i].LGACs.length; j++){
						cad=cad+ '<div class="form-check">';
							if(i==0){
								cad=cad+ '<input class="form-check-input" type="checkbox" value=" '+resultado[i].LGACs[j].id+'" id="lgac'+resultado[i].LGACs[j].id+'" name="Id_LGAC[]">';
							}else{
								cad=cad+ '<input class="form-check-input" type="checkbox" value="'+resultado[i].LGACs[j].id+'" id="lgac'+resultado[i].LGACs[j].id+'" name="Id_LGAC[]">';
							}
							cad=cad+ '<label class="form-check-label" for="lgac'+resultado[i].LGACs[j].id+'">';
								cad=cad+ resultado[i].LGACs[j].Nombre;
							cad=cad+ '</label>';
						cad=cad+ '</div>';
					}
				cad=cad+ '</div>';
				$("#alertId_LGACProfRegistro").before(cad);
				LGACController();
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
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

function getPaises() {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Auxiliar/Paises",
		type: "POST",
		dataType: "json",
		success: function(resultado){
			resultado.forEach(function(resultado){
				arregloPaises.push(resultado.Pais);
			});
			autocompletePaises(arregloPaises);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function getGradosAcademicos() {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Auxiliar/Grados",
		type: "POST",
		dataType: "json",
		success: function(resultado){
			GradosAcademicos = resultado;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function getTiposSuperacion() {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Auxiliar/TipoSuperacion",
		type: "POST",
		dataType: "json",
		success: function(resultado){
			TipoSuperacion = resultado;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function getTiposTrayectoria() {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Auxiliar/TipoTrayectoria",
		type: "POST",
		dataType: "json",
		success: function(resultado){
			TipoTrayectoria = resultado;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}


function autocompletePaises(arreglo) {
	$( "#Pais" ).autocomplete({
		source: arreglo
	});
}

function añadirPreparacionAcademica(){
	$("#btnQuitar").prop('disabled', false);
	ContadorPreparacionAcademica += 1;
		var cardEstudios = '<div class="Estudios-form card" id="CardPA'+ContadorPreparacionAcademica+'">';
				cardEstudios += '<div data-toggle="collapse" style="cursor: pointer" data-target="#RegistroEstudios'+ContadorPreparacionAcademica+'">';
					cardEstudios += '<i class="fas fa-angle-right"></i> Nuevo Registro ';
				cardEstudios += '</div>';
				cardEstudios += '<div id="RegistroEstudios'+ContadorPreparacionAcademica+'" class="collapse show">'
					cardEstudios += '<hr>';
					cardEstudios += '<form class="form-group" action="" name="PreparacionAcademica">';
						cardEstudios += '<div class="row">';
							cardEstudios += '<div class="col-md-6">';
								cardEstudios += '<div class="form-group">';
									cardEstudios += '<label style="display:block;">Grado</label>';
									for (let i = 0; i < GradosAcademicos.length; i++) {
										cardEstudios += '<div class="form-check-inline">';
											cardEstudios += '<label class="form-check-label" for="'+GradosAcademicos[i].Grado+ContadorPreparacionAcademica+'">';
											if(i<1){
												cardEstudios += '<input type="radio" class="form-check-input" id="'+GradosAcademicos[i].Grado+ContadorPreparacionAcademica+'" name="Id_Grado" value="'+GradosAcademicos[i].id+'" checked>'+GradosAcademicos[i].Grado;
											}else{
												cardEstudios += '<input type="radio" class="form-check-input" id="'+GradosAcademicos[i].Grado+ContadorPreparacionAcademica+'" name="Id_Grado" value="'+GradosAcademicos[i].id+'">'+GradosAcademicos[i].Grado;
											}
											cardEstudios += '</label>';
										cardEstudios += '</div>';
									}
								cardEstudios += '</div>';
								cardEstudios += '<div class="form-group">';
									cardEstudios += '<input type="text" class="form-control" id="Titulo'+ContadorPreparacionAcademica+'" name="Titulo" placeholder="Título">';
									cardEstudios += '<span class="alertError" id="alertPrepAcadTitulo'+ContadorPreparacionAcademica+'ProfRegistro"></span>';
								cardEstudios += '</div>';
								cardEstudios += '<div class="form-group">';
									cardEstudios += '<input type="text" class="form-control" id="Universidad'+ContadorPreparacionAcademica+'" name="Universidad" placeholder="Universidad o Institución">';
									cardEstudios += '<span class="alertError" id="alertPrepAcadUniversidad'+ContadorPreparacionAcademica+'ProfRegistro"></span>';
								cardEstudios += '</div>';
								cardEstudios += '<div class="form-row">';
									cardEstudios += '<div class="form-group col-md-4">';
										cardEstudios += ' <select class="form-control" id="Anio'+ContadorPreparacionAcademica+'" name="Anio">';
											var myDate = new Date();
											var year = myDate.getFullYear();
											for(var i = year; i >= 1980; i--){
												cardEstudios += '<option value="'+i+'">'+i+'</option>';
											}
										cardEstudios += '</select>';
									cardEstudios += '</div>';
									cardEstudios += '<div class="form-group col-md-8">';
										cardEstudios += '<input type="text" class="form-control" id="Lugar'+ContadorPreparacionAcademica+'" name="Lugar" placeholder="Lugar">';
										cardEstudios += '<span class="alertError" id="alertPrepAcadLugar'+ContadorPreparacionAcademica+'ProfRegistro"></span>';
									cardEstudios += '</div>';
								cardEstudios += '</div>';
							cardEstudios += '</div>';
							cardEstudios += '<div class="col-md-6">';
								cardEstudios += '<label>Archivo Evidencia</label>';
								cardEstudios += '<span class="alertError" id="alertPrepAcadArchivo'+ContadorPreparacionAcademica+'ProfRegistro"></span>';
								cardEstudios += '<div class="container p-y-1 col-md-9">';
									cardEstudios += '<div class="row m-b-1">';
										cardEstudios += '<div class="col-sm-12">';
											cardEstudios += '<div class="form-group inputDnD">';
												cardEstudios += '<label class="sr-only" for="inputFile">File Upload</label>';
												cardEstudios += '<input type="file" name="Archivo" class="form-control-file text-primary font-weight-bold" id="Archivo'+ContadorPreparacionAcademica+'" accept="application/pdf" onchange="ControladorPrepAcad(\''+ContadorPreparacionAcademica+'\')" data-title="Arrastre y suelte el archivo">';
											cardEstudios += '</div>';
										cardEstudios += '</div>';
									cardEstudios += '</div>';
								cardEstudios += '</div>';
								cardEstudios += '<div class="container col-md-12">';
									cardEstudios += '<label>Vista Previa de Archivos Cargados</label>';
									cardEstudios += '<table class="table table-sm">';
										cardEstudios += '<thead>';
											cardEstudios += '<tr><th>Archivos</th></tr>';
										cardEstudios += '</thead>';
										cardEstudios += '<tbody id="VistaPrevEstudios'+ContadorPreparacionAcademica+'">';
										cardEstudios += '</tbody>';
									cardEstudios += '</table>';
								cardEstudios += '</div>';
							cardEstudios += '</div>';
						cardEstudios += '</div>';
					cardEstudios += '</form>';
				cardEstudios += '</div>';	
		cardEstudios += '</div>';
	
	$("#Estudios").append(cardEstudios);
}

function quitarPreparacionAcademica(){
	var idDiv="#CardPA"+ContadorPreparacionAcademica;
	$(idDiv).remove();
	ContadorPreparacionAcademica -= 1;
	if(ContadorPreparacionAcademica<0){
		$("#btnQuitar").prop('disabled', true);
	}
}

function añadirSuperacionAcademica() {
	$("#btnQuitarSuperacion").prop('disabled', false);
	ContadorSuperacionAcademica += 1;
	var cardSuperacion = '<div class="Cursos-form card" id="CardSA'+ContadorSuperacionAcademica+'">';
		cardSuperacion += '<div data-toggle="collapse" style="cursor: pointer" data-target="#RegistroSuperacion'+ContadorSuperacionAcademica+'">';
			cardSuperacion += '<i class="fas fa-angle-right"></i> Nuevo Registro ';
		cardSuperacion += '</div>';
		cardSuperacion += '<div id="RegistroSuperacion'+ContadorSuperacionAcademica+'" class="collapse show">'
			cardSuperacion += '<hr>';
			cardSuperacion += '<form class="form-group" name="SuperacionAcademica">';
				cardSuperacion += '<div class="form-group">';
					cardSuperacion += '<label style="display:block;">Tipo de Documento</label>';
					for (let i = 0; i < TipoSuperacion.length; i++) {
						cardSuperacion += '<div class="form-check-inline">';
							cardSuperacion += '<label class="form-check-label" for="'+TipoSuperacion[i].Tipo+ContadorSuperacionAcademica+'">';
							if(i<1){
								cardSuperacion += '<input type="radio" class="form-check-input" id="'+TipoSuperacion[i].Tipo+ContadorSuperacionAcademica+'" name="Tipo_Documento" value="'+TipoSuperacion[i].id+'" onclick="SuperacionOtro(this, \''+ContadorSuperacionAcademica+'\')" checked>'+TipoSuperacion[i].Tipo;
							}else{
								cardSuperacion += '<input type="radio" class="form-check-input" id="'+TipoSuperacion[i].Tipo+ContadorSuperacionAcademica+'" name="Tipo_Documento" value="'+TipoSuperacion[i].id+'" onclick="SuperacionOtro(this, \''+ContadorSuperacionAcademica+'\')">'+TipoSuperacion[i].Tipo;
							}
							cardSuperacion += '</label>';
						cardSuperacion += '</div>';
					}
						cardSuperacion += '<div class="form-check-inline">';
							cardSuperacion += '<input type="radio" class="form-check-input col-md-1" id="Otro'+ContadorSuperacionAcademica+'" name="Tipo_Documento" value="0" onclick="SuperacionOtro(this, \''+ContadorSuperacionAcademica+'\')">';
							cardSuperacion += '<input class="form-control form-control-sm col-md-10" type="text" disabled placeholder="Otro" id="TextOtro'+ContadorSuperacionAcademica+'"  name="OpcionOtro">';
						cardSuperacion += '</div>';
						cardSuperacion += '<span class="alertError" id="alertSuperacionOpcionOtro'+ContadorSuperacionAcademica+'ProfRegistro"></span>';
				cardSuperacion += '</div>';
				cardSuperacion += '<div class="form-group">';
					cardSuperacion += '<input type="text" class="form-control" id="Titulo'+ContadorSuperacionAcademica+'" placeholder="Título" name="Titulo">';
					cardSuperacion += '<span class="alertError" id="alertSuperacionTitulo'+ContadorSuperacionAcademica+'ProfRegistro"></span>';
				cardSuperacion += '</div>';
				cardSuperacion += '<div class="form-row">';
					cardSuperacion += '<div class="form-group col-md-4">';
						cardSuperacion += ' <select class="form-control" id="Anio'+ContadorSuperacionAcademica+'" name="Anio">';
						var myDate = new Date();
						var year = myDate.getFullYear();
						for(var i = year; i >= 1980; i--){
							cardSuperacion += '<option value="'+i+'">'+i+'</option>';
						}
						cardSuperacion += '</select>';
					cardSuperacion += '</div>';
					cardSuperacion += '<div class="form-group col-md-8">';
						cardSuperacion += '<input type="text" class="form-control" id="Periodo'+ContadorSuperacionAcademica+'" name="Periodo" placeholder="Periodo">';
						cardSuperacion += '<span class="alertError" id="alertSuperacionPeriodo'+ContadorSuperacionAcademica+'ProfRegistro"></span>';	
					cardSuperacion += '</div>';
				cardSuperacion += '</div>';
				cardSuperacion += '<div class="form-group">';
					cardSuperacion += '<textarea class="form-control" id="Descripcion'+ContadorSuperacionAcademica+'" rows="3" placeholder="Descripción" name="Descripcion"></textarea>';
					cardSuperacion += '<span class="alertError" id="alertSuperacionDescripcion'+ContadorSuperacionAcademica+'ProfRegistro"></span>';
				cardSuperacion += '</div>';
				cardSuperacion += '<label>Archivo Evidencia</label>';
				cardSuperacion += '<span class="alertError" id="alertSuperacionArchivo'+ContadorSuperacionAcademica+'ProfRegistro"></span>';
				cardSuperacion += '<div class="container p-y-1 col-md-9">';
					cardSuperacion += '<div class="row m-b-1">';
						cardSuperacion += '<div class="col-sm-12">';
							cardSuperacion += '<div class="form-group inputDnD">';
								cardSuperacion += '<label class="sr-only" for="inputFile">File Upload</label>';
								cardSuperacion += '<input type="file" name="Archivo" class="form-control-file text-primary font-weight-bold" id="ArchivoSuperacion'+ContadorSuperacionAcademica+'" accept="application/pdf" onchange="ControladorSupAcad(\''+ContadorSuperacionAcademica+'\')" data-title="Arrastre y suelte el archivo">';
							cardSuperacion += '</div>';
						cardSuperacion += '</div>';
					cardSuperacion += '</div>';
				cardSuperacion += '</div>';
				cardSuperacion += '<div class="container col-md-12">';
					cardSuperacion += '<label>Vista Previa de Archivos Cargados</label>';
					cardSuperacion += '<table class="table table-sm">';
						cardSuperacion += '<thead><tr><th>Archivos</th></tr></thead>';
						cardSuperacion += '<tbody id="VistaPrevSuperacion'+ContadorSuperacionAcademica+'">';
						cardSuperacion += '</tbody>';
					cardSuperacion += '</table>';
				cardSuperacion += '</div>';
			cardSuperacion += '</form>';
		cardSuperacion += '</div>';
	cardSuperacion += '</div>';
	$("#Cursos").append(cardSuperacion);
}

function quitarSuperacionAcademica(){
	var idDiv="#CardSA"+ContadorSuperacionAcademica;
	$(idDiv).remove();
	ContadorSuperacionAcademica -= 1;
	if(ContadorSuperacionAcademica<0){
		$("#btnQuitarSuperacion").prop('disabled', true);
	}
}

function añadirDistincion() {
	$("#btnQuitarDistincion").prop('disabled', false);
	ContadorDistinciones += 1;
	var cardDistincion = '<div class="Cursos-form card" id="CardD'+ContadorDistinciones+'">';
		cardDistincion += '<div data-toggle="collapse" style="cursor: pointer" data-target="#RegistroDistincion'+ContadorDistinciones+'">';
			cardDistincion += '<i class="fas fa-angle-right"></i> Nuevo Registro ';
		cardDistincion += '</div>';
		cardDistincion += '<div id="RegistroDistincion'+ContadorDistinciones+'" class="collapse show">'
			cardDistincion += '<hr>';
			cardDistincion += '<form class="form-group" name="Distinciones">';
				cardDistincion += '<div class="form-group">';
					cardDistincion += '<label style="display:block;">Tipo de Documento</label>';
						cardDistincion += '<div class="form-check-inline">';
							cardDistincion += '<label class="form-check-label" for="Prodep'+ContadorDistinciones+'">';
							cardDistincion += '<input type="radio" class="form-check-input" id="Prodep'+ContadorDistinciones+'" name="Nombre_Distincion" value="PRODEP" onclick="DistincionOtro(this, \''+ContadorDistinciones+'\')" checked>PRODEP';
						cardDistincion += '</div>';
						cardDistincion += '<div class="form-check-inline">';
							cardDistincion += '<label class="form-check-label" for="SNI'+ContadorDistinciones+'">';
							cardDistincion += '<input type="radio" class="form-check-input" id="SNI'+ContadorDistinciones+'" name="Nombre_Distincion" value="SNI" onclick="DistincionOtro(this, \''+ContadorDistinciones+'\')">SNI';
						cardDistincion += '</div>';
						cardDistincion += '<div class="form-check-inline">';
							cardDistincion += '<input type="radio" class="form-check-input col-md-1" id="OtroDistincion'+ContadorDistinciones+'" name="Nombre_Distincion" value="0" onclick="DistincionOtro(this, \''+ContadorDistinciones+'\')">';
							cardDistincion += '<input class="form-control form-control-sm col-md-10" type="text" disabled placeholder="Otro" id="TextOtroDistincion'+ContadorDistinciones+'"  name="OpcionOtro">';
						cardDistincion += '</div>';
						cardDistincion += '<span class="alertError" id="alertDistincionOpcionOtro'+ContadorDistinciones+'ProfRegistro"></span>';
				cardDistincion += '</div>';
				cardDistincion += '<div class="form-row">';
					cardDistincion += '<div class="form-group col-md-4">';
						cardDistincion += ' <select class="form-control" id="Anio'+ContadorDistinciones+'" name="Anio">';
						var myDate = new Date();
						var year = myDate.getFullYear();
						for(var i = year; i >= 1980; i--){
							cardDistincion += '<option value="'+i+'">'+i+'</option>';
						}
						cardDistincion += '</select>';
					cardDistincion += '</div>';
					cardDistincion += '<div class="form-group col-md-8">';
						cardDistincion += '<input type="text" class="form-control" id="Periodo'+ContadorDistinciones+'" name="Periodo" placeholder="Periodo">';
						cardDistincion += '<span class="alertError" id="alertDistincionPeriodo'+ContadorDistinciones+'ProfRegistro"></span>';	
					cardDistincion += '</div>';
				cardDistincion += '</div>';
				cardDistincion += '<div class="form-group">';
					cardDistincion += '<textarea class="form-control" id="Descripcion'+ContadorDistinciones+'" rows="3" placeholder="Descripción" name="Descripcion"></textarea>';
					cardDistincion += '<span class="alertError" id="alertDistincionDescripcion'+ContadorDistinciones+'ProfRegistro"></span>';
				cardDistincion += '</div>';
				cardDistincion += '<label>Archivo Evidencia</label>';
				cardDistincion += '<span class="alertError" id="alertDistincionArchivo'+ContadorDistinciones+'ProfRegistro"></span>';
				cardDistincion += '<div class="container p-y-1 col-md-9">';
					cardDistincion += '<div class="row m-b-1">';
						cardDistincion += '<div class="col-sm-12">';
							cardDistincion += '<div class="form-group inputDnD">';
								cardDistincion += '<label class="sr-only" for="inputFile">File Upload</label>';
								cardDistincion += '<input type="file" name="Archivo" class="form-control-file text-primary font-weight-bold" id="ArchivoDistincion'+ContadorDistinciones+'" accept="application/pdf" onchange="ControladorDistincion(\''+ContadorDistinciones+'\')" data-title="Arrastre y suelte el archivo">';
							cardDistincion += '</div>';
						cardDistincion += '</div>';
					cardDistincion += '</div>';
				cardDistincion += '</div>';
				cardDistincion += '<div class="container col-md-12">';
					cardDistincion += '<label>Vista Previa de Archivos Cargados</label>';
					cardDistincion += '<table class="table table-sm">';
						cardDistincion += '<thead><tr><th>Archivos</th></tr></thead>';
						cardDistincion += '<tbody id="VistaPrevDistincion'+ContadorDistinciones+'">';
						cardDistincion += '</tbody>';
					cardDistincion += '</table>';
				cardDistincion += '</div>';
			cardDistincion += '</form>';
		cardDistincion += '</div>';
	cardDistincion += '</div>';
	$("#Distinciones").append(cardDistincion);
}

function quitarDistincion(){
	var idDiv="#CardD"+ContadorDistinciones;
	$(idDiv).remove();
	ContadorDistinciones -= 1;
	if(ContadorDistinciones<0){
		$("#btnQuitarDistincion").prop('disabled', true);
	}
}

function añadirTrayectoria(){
	$("#btnQuitarTrayectoria").prop('disabled', false);
	ContadorTrayectoria += 1;
	var cardTrayectoria = '<div class="Trayectoria-form card" id="CardTP'+ContadorTrayectoria+'">';
		cardTrayectoria += '<div data-toggle="collapse" style="cursor: pointer" data-target="#RegistroTrayectoria'+ContadorTrayectoria+'">';
			cardTrayectoria += '<i class="fas fa-angle-right"></i> Nuevo Registro ';
		cardTrayectoria += '</div>';
		cardTrayectoria += '<div id="RegistroTrayectoria'+ContadorTrayectoria+'" class="collapse show">'
			cardTrayectoria += '<hr>';
			cardTrayectoria += '<form class="form-group" action="" name="TrayectoriaProfesional">';
				cardTrayectoria += '<div class="row">';
					cardTrayectoria += '<div class="col-md-6">';
						cardTrayectoria += '<div class="form-group">';
							cardTrayectoria += '<label style="display:block;">Trayectoria Profesional</label>';
							for (let i = 0; i < TipoTrayectoria.length; i++) {
								cardTrayectoria += '<div class="form-check-inline">';
									cardTrayectoria += '<label class="form-check-label" for="'+TipoTrayectoria[i].Tipo+ContadorTrayectoria+'">';
										if(i<1){
											cardTrayectoria += '<input type="radio" class="form-check-input" id="'+TipoTrayectoria[i].Tipo+ContadorTrayectoria+'" name="Tipo_Documento" value="'+TipoTrayectoria[i].id+'" checked onclick="TrayectoriaOtro(this, \''+ContadorTrayectoria+'\')">'+TipoTrayectoria[i].Tipo;
										}else{
											cardTrayectoria += '<input type="radio" class="form-check-input" id="'+TipoTrayectoria[i].Tipo+ContadorTrayectoria+'" name="Tipo_Documento" value="'+TipoTrayectoria[i].id+'" onclick="TrayectoriaOtro(this, \''+ContadorTrayectoria+'\')">'+TipoTrayectoria[i].Tipo;
										}
									cardTrayectoria += '</label>';
								cardTrayectoria += '</div>';
							}
							cardTrayectoria += '<div class="form-check-inline">';
								cardTrayectoria += '<input type="radio" class="form-check-input col-md-1" id="OtroTrayectoria'+ContadorTrayectoria+'" name="Tipo_Documento" value="0" onclick="TrayectoriaOtro(this, \''+ContadorTrayectoria+'\')">';
								cardTrayectoria += '<input class="form-control form-control-sm col-md-10" type="text" disabled placeholder="Otro" id="TextOtroTrayectoria'+ContadorTrayectoria+'"  name="OpcionOtro">';
							cardTrayectoria += '</div>';
							cardTrayectoria += '<span class="alertError" id="alertTrayectoriaOpcionOtro'+ContadorTrayectoria+'ProfRegistro"></span>';
						cardTrayectoria += '</div>';
						cardTrayectoria += '<div class="form-group">';
							cardTrayectoria += '<input type="text" class="form-control" id="Titulo'+ContadorTrayectoria+'" placeholder="Título" name="Titulo">';
							cardTrayectoria += '<span class="alertError" id="alertTrayectoriaTitulo'+ContadorTrayectoria+'ProfRegistro"></span>';
						cardTrayectoria += '</div>';
						cardTrayectoria += '<div class="form-row">';
							cardTrayectoria += '<div class="form-group col-md-4">';
								cardTrayectoria += ' <select class="form-control" id="Anio'+ContadorTrayectoria+'" name="Anio">';
								var myDate = new Date();
								var year = myDate.getFullYear();
								for(var i = year; i >= 1980; i--){
									cardTrayectoria += '<option value="'+i+'">'+i+'</option>';
								}
								cardTrayectoria += '</select>';
							cardTrayectoria += '</div>';
							cardTrayectoria += '<div class="form-group col-md-8">';
								cardTrayectoria += '<input type="text" class="form-control" id="Periodo'+ContadorTrayectoria+'" name="Periodo" placeholder="Periodo">';
								cardTrayectoria += '<span class="alertError" id="alertTrayectoriaPeriodo'+ContadorTrayectoria+'ProfRegistro"></span>';	
							cardTrayectoria += '</div>';
						cardTrayectoria += '</div>';
						cardTrayectoria += '<div class="form-group">';
							cardTrayectoria += '<textarea class="form-control" id="Trayectoria'+ContadorTrayectoria+'" rows="3" placeholder="Descripción" name="Descripcion"></textarea>';
							cardTrayectoria += '<span class="alertError" id="alertTrayectoriaDescripcion'+ContadorTrayectoria+'ProfRegistro"></span>';
						cardTrayectoria += '</div>';
					cardTrayectoria += '</div>';
					cardTrayectoria += '<div class="col-md-6">';
						cardTrayectoria += '<label>Archivo Evidencia</label>';
						cardTrayectoria += '<span class="alertError" id="alertTrayectoriaArchivo'+ContadorTrayectoria+'ProfRegistro"></span>';
						cardTrayectoria += '<div class="container p-y-1 col-md-9">';
							cardTrayectoria += '<div class="row m-b-1">';
								cardTrayectoria += '<div class="col-sm-12">';
									cardTrayectoria += '<div class="form-group inputDnD">';
										cardTrayectoria += '<label class="sr-only" for="inputFile">File Upload</label>';
										cardTrayectoria += '<input type="file" name="Archivo" class="form-control-file text-primary font-weight-bold" id="ArchivoTrayectoria'+ContadorTrayectoria+'" accept="application/pdf" onchange="ControladorTrayectoria(\''+ContadorTrayectoria+'\')" data-title="Arrastre y suelte el archivo">';
									cardTrayectoria += '</div>';
								cardTrayectoria += '</div>';
							cardTrayectoria += '</div>';
						cardTrayectoria += '</div>';
						cardTrayectoria += '<div class="container col-md-12">';
							cardTrayectoria += '<label>Vista Previa de Archivos Cargados</label>';
							cardTrayectoria += '<table class="table table-sm">';
								cardTrayectoria += '<thead>';
									cardTrayectoria += '<tr><th>Archivos</th></tr>';
								cardTrayectoria += '</thead>';
								cardTrayectoria += '<tbody id="VistaPrevTrayectoria'+ContadorTrayectoria+'">';
								cardTrayectoria += '</tbody>';
							cardTrayectoria += '</table>';
						cardTrayectoria += '</div>';
					cardTrayectoria += '</div>';
				cardTrayectoria += '</div>';
			cardTrayectoria += '</form>';
		cardTrayectoria += '</div>';
	cardTrayectoria += '</div>';
	
	$("#Trayectorias").append(cardTrayectoria);
}

function quitarTrayectoria(){
	var idDiv="#CardTP"+ContadorTrayectoria;
	$(idDiv).remove();
	ContadorTrayectoria -= 1;
	if(ContadorTrayectoria<0){
		$("#btnQuitarTrayectoria").prop('disabled', true);
	}
}

function añadirPertenencias(){
	$("#btnQuitarPertenencias").prop('disabled', false);
	ContadorPertenencias += 1;
	var cardPertenencia = '<div class="Pertenencias-form card" id="CardP'+ContadorPertenencias+'">';
		cardPertenencia += '<div data-toggle="collapse" style="cursor: pointer" data-target="#RegistroPertenencia'+ContadorPertenencias+'">';
			cardPertenencia += '<i class="fas fa-angle-right"></i> Nuevo Registro ';
		cardPertenencia += '</div>';
		cardPertenencia += '<div id="RegistroPertenencia'+ContadorPertenencias+'" class="collapse show">'
			cardPertenencia += '<hr>';
			cardPertenencia += '<form class="form-group" action="" name="Pertenencias">';
				cardPertenencia += '<div class="row">';
					cardPertenencia += '<div class="col-md-6">';
						cardPertenencia += '<div class="form-group">';
							cardPertenencia += '<input type="text" class="form-control" id="OrganizacionPertenencias'+ContadorPertenencias+'" name="Nombre_Organizacion" placeholder="Organización o Comité">';
							cardPertenencia += '<span class="alertError" id="alertPertenenciaNombre_Organizacion'+ContadorPertenencias+'ProfRegistro"></span>';
						cardPertenencia += '</div>';
						cardPertenencia += '<div class="form-row">';
							cardPertenencia += '<div class="form-group col-md-4">';
								cardPertenencia += ' <select class="form-control" id="Anio'+ContadorPertenencias+'" name="Anio">';
								var myDate = new Date();
								var year = myDate.getFullYear();
								for(var i = year; i >= 1980; i--){
									cardPertenencia += '<option value="'+i+'">'+i+'</option>';
								}
								cardPertenencia += '</select>';
							cardPertenencia += '</div>';
							cardPertenencia += '<div class="form-group col-md-8">';
								cardPertenencia += '<input type="text" class="form-control" id="Periodo'+ContadorPertenencias+'" name="Periodo" placeholder="Periodo">';
								cardPertenencia += '<span class="alertError" id="alertPertenenciaPeriodo'+ContadorPertenencias+'ProfRegistro"></span>';	
							cardPertenencia += '</div>';
						cardPertenencia += '</div>';
						cardPertenencia += '<div class="form-group">';
							cardPertenencia += '<textarea class="form-control" id="Pertenencia'+ContadorPertenencias+'" rows="3" placeholder="Descripción" name="Descripcion"></textarea>';
							cardPertenencia += '<span class="alertError" id="alertPertenenciaDescripcion'+ContadorPertenencias+'ProfRegistro"></span>';
						cardPertenencia += '</div>';
					cardPertenencia += '</div>';
					cardPertenencia += '<div class="col-md-6">';
						cardPertenencia += '<label>Archivo Evidencia</label>';
						cardPertenencia += '<span class="alertError" id="alertPertenenciaArchivo'+ContadorPertenencias+'ProfRegistro"></span>';
						cardPertenencia += '<div class="container p-y-1 col-md-9">';
							cardPertenencia += '<div class="row m-b-1">';
								cardPertenencia += '<div class="col-sm-12">';
									cardPertenencia += '<div class="form-group inputDnD">';
										cardPertenencia += '<label class="sr-only" for="inputFile">File Upload</label>';
										cardPertenencia += '<input type="file" name="Archivo" class="form-control-file text-primary font-weight-bold" id="ArchivoPertenencia'+ContadorPertenencias+'" accept="application/pdf" onchange="ControladorPertenencia(\''+ContadorPertenencias+'\')" data-title="Arrastre y suelte el archivo">';
									cardPertenencia += '</div>';
								cardPertenencia += '</div>';
							cardPertenencia += '</div>';
						cardPertenencia += '</div>';
						cardPertenencia += '<div class="container col-md-12">';
							cardPertenencia += '<label>Vista Previa de Archivos Cargados</label>';
							cardPertenencia += '<table class="table table-sm">';
								cardPertenencia += '<thead>';
									cardPertenencia += '<tr><th>Archivos</th></tr>';
								cardPertenencia += '</thead>';
								cardPertenencia += '<tbody id="VistaPrevPertenencia'+ContadorPertenencias+'">';
								cardPertenencia += '</tbody>';
							cardPertenencia += '</table>';
						cardPertenencia += '</div>';
					cardPertenencia += '</div>';
				cardPertenencia += '</div>';
			cardPertenencia += '</form>';
		cardPertenencia += '</div>';
	cardPertenencia += '</div>';
	
	$("#Pertenencias").append(cardPertenencia);
}

function quitarPertenencias (){
	var idDiv="#CardP"+ContadorPertenencias;
	$(idDiv).remove();
	ContadorPertenencias -= 1;
	if(ContadorPertenencias<0){
		$("#btnQuitarPertenencias").prop('disabled', true);
	}
}

function ControladorPrepAcad(posicion) {
	var Archivo = document.getElementById('Archivo'+posicion).files;
	var form = new FormData();
	form.append('ArchivoEvidencia[]', Archivo[0]);
	form.append('idPosicion', posicion);
	form.append('TipoEvidencia', "PrepAcad");

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
				tabla = tabla + '<tr>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevEstudios'+posicion).innerHTML=tabla;
		}
	});
}

function ControladorSupAcad(posicion) {
	var Archivo = document.getElementById('ArchivoSuperacion'+posicion).files;
	var form = new FormData();
	form.append('ArchivoEvidencia[]', Archivo[0]);
	form.append('idPosicion', posicion);
	form.append('TipoEvidencia', "SupAcad");

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
				tabla = tabla + '<tr>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevSuperacion'+posicion).innerHTML=tabla;
		}
	});
}

function ControladorDistincion(posicion) {
	var Archivo = document.getElementById('ArchivoDistincion'+posicion).files;
	var form = new FormData();
	form.append('ArchivoEvidencia[]', Archivo[0]);
	form.append('idPosicion', posicion);
	form.append('TipoEvidencia', "Distincion");

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
				tabla = tabla + '<tr>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevDistincion'+posicion).innerHTML=tabla;
		}
	});
}

function ControladorTrayectoria(posicion) {
	var Archivo = document.getElementById('ArchivoTrayectoria'+posicion).files;
	var form = new FormData();
	form.append('ArchivoEvidencia[]', Archivo[0]);
	form.append('idPosicion', posicion);
	form.append('TipoEvidencia', "Trayectoria");

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
				tabla = tabla + '<tr>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevTrayectoria'+posicion).innerHTML=tabla;
		}
	});
}

function ControladorPertenencia(posicion) {
	var Archivo = document.getElementById('ArchivoPertenencia'+posicion).files;
	var form = new FormData();
	form.append('ArchivoEvidencia[]', Archivo[0]);
	form.append('idPosicion', posicion);
	form.append('TipoEvidencia', "Pertenencia");

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
				tabla = tabla + '<tr>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevPertenencia'+posicion).innerHTML=tabla;
		}
	});
}

function ControladorCartasNAB() {
	var Archivos = document.getElementById('Archivos').files;
	
	for (let i = 0; i < Archivos.length; i++) {
		var contador = ArregloCartasNAB.length;
		ArregloCartasNAB[contador]=Archivos[i];		
	}

	crearCopiasCatas();
}

function SuperacionOtro(input, numSuperacion) {
	if(input.value!="0"){
		$( "#TextOtro"+numSuperacion ).prop( "disabled", true );
	}else{
		$( "#TextOtro"+numSuperacion ).prop( "disabled", false );
	}
}

function DistincionOtro(input, numDistincion) {
	if(input.value!="0"){
		$( "#TextOtroDistincion"+numDistincion ).prop( "disabled", true );
	}else{
		$( "#TextOtroDistincion"+numDistincion ).prop( "disabled", false );
	}
}

function TrayectoriaOtro(input, numTrayecoria) {
	if(input.value!="0"){
		$( "#TextOtroTrayectoria"+numTrayecoria ).prop( "disabled", true );
	}else{
		$( "#TextOtroTrayectoria"+numTrayecoria ).prop( "disabled", false );
	}
}

function validarValidaciones() {
	if(validarContDatosGenerales==0 && validarContPreparacionAcad==0 && validarContSuperacionAcad==0 && validarContDistinciones==0 && validarContTrayectorias==0 && validarContPertenencias==0){
		if(Bandera==true){
			console.log(Bandera);
			RegistrarDatosGenerales();
		}else{
			console.log(Bandera);
			$("#btnRegistrar").prop('disabled', false);
			$("#btnCancelar").prop('disabled', false);
			alert("Alguno de los formularios no ha sido llenado de forma correcta.");
			Bandera = true;

		}
	}
}

function ValidarDatosG(){
	validarContDatosGenerales = 1;
	var formDatosGenerales = new FormData(document.getElementById('FormDatosGenerales'));
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Profesores/Registrar_Profesor/ValidarDatosGeneralesProfesor",
		data: formDatosGenerales,
		type: "POST",
		contentType: false,
		processData: false,
		success: function(resultado){
			$("#alertNombreProfRegistro").html("");
			$("#alertApellido_PProfRegistro").html("");
			$("#alertApellido_MProfRegistro").html("");
			$("#alertCorreoProfRegistro").html("");
			$("#alertNo_CVUProfRegistro").html("");
			$("#alertInstitucionProfRegistro").html("");
			$("#alertPaisProfRegistro").html("");
			$("#alertId_LGACProfRegistro").html("");
			
			if(resultado!=true){
				for (const atributo in resultado) {
					var mensajes="";
					for (let i = 0; i < resultado[atributo].length; i++) {
						mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
						if(resultado[atributo].length-i!=1){
							mensajes = mensajes + "<br>"
						}
					}
					$("#alert"+atributo+"ProfRegistro").html(mensajes);
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

function ValidarPreparacion(){
	var ArregloPrepAcad = document.getElementsByName('PreparacionAcademica');
	validarContPreparacionAcad = ArregloPrepAcad.length;
	for (let i = 0; i < ArregloPrepAcad.length; i++) {
		var formPrepAcad = new FormData(ArregloPrepAcad[i]);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Registrar_Profesor/ValidarPreparacionAcademicaProfesor",
			data: formPrepAcad,
			type: "POST",
			contentType: false,
			processData: false,
			success: function(resultado){
				$("#alertPrepAcadTitulo"+i+"ProfRegistro").html("");
				$("#alertPrepAcadUniversidad"+i+"ProfRegistro").html("");
				$("#alertPrepAcadLugar"+i+"ProfRegistro").html("");
				$("#alertPrepAcadArchivo"+i+"ProfRegistro").html("");

				if(resultado!=true){
					for (const atributo in resultado) {
						var mensajes="";
						for (let i = 0; i < resultado[atributo].length; i++) {
							mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
							if(resultado[atributo].length-i!=1){
								mensajes = mensajes + "<br>"
							}
						}
						$("#alertPrepAcad"+atributo+i+"ProfRegistro").html(mensajes);
					}
					Bandera = false;
				}
				validarContPreparacionAcad --;
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

function ValidarSuperacion(){
	var ArregloSupAcad = document.getElementsByName('SuperacionAcademica');
	validarContSuperacionAcad = ArregloSupAcad.length;
	for (let i = 0; i < ArregloSupAcad.length; i++) {
		var formSupAcad = new FormData(ArregloSupAcad[i]);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Registrar_Profesor/ValidarSuperacionAcademicaProfesor",
			data: formSupAcad,
			type: "POST",
			contentType: false,
			processData: false,
			success: function(resultado){
				
				$("#alertSuperacionOpcionOtro"+i+"ProfRegistro").html("");
				$("#alertSuperacionTitulo"+i+"ProfRegistro").html("");
				$("#alertSuperacionPeriodo"+i+"ProfRegistro").html("");
				$("#alertSuperacionDescripcion"+i+"ProfRegistro").html("");
				$("#alertSuperacionArchivo"+i+"ProfRegistro").html("");
				
				if(resultado!=true){
					for (const atributo in resultado) {
						var mensajes="";
						for (let i = 0; i < resultado[atributo].length; i++) {
							mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
							if(resultado[atributo].length-i!=1){
								mensajes = mensajes + "<br>"
							}
						}
						$("#alertSuperacion"+atributo+i+"ProfRegistro").html(mensajes);
					}
					Bandera = false;
				}
				validarContSuperacionAcad--;
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

function ValidarDistincion(){
	var ArregloDistinciones = document.getElementsByName('Distinciones');
	validarContDistinciones = ArregloDistinciones.length;
	for (let i = 0; i < ArregloDistinciones.length; i++) {
		var formDistincion = new FormData(ArregloDistinciones[i]);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Registrar_Profesor/ValidarDistincionProfesor",
			data: formDistincion,
			type: "POST",
			contentType: false,
			processData: false,
			success: function(resultado){
				
				$("#alertDistincionOpcionOtro"+i+"ProfRegistro").html("");
				$("#alertDistincionPeriodo"+i+"ProfRegistro").html("");
				$("#alertDistincionDescripcion"+i+"ProfRegistro").html("");
				$("#alertDistincionArchivo"+i+"ProfRegistro").html("");
				
				if(resultado!=true){
					for (const atributo in resultado) {
						var mensajes="";
						for (let i = 0; i < resultado[atributo].length; i++) {
							mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
							if(resultado[atributo].length-i!=1){
								mensajes = mensajes + "<br>"
							}
						}
						$("#alertDistincion"+atributo+i+"ProfRegistro").html(mensajes);
					}
					Bandera = false;
				}
				validarContDistinciones--;
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

function ValidarTrayectoria(){
	var ArregloTrayectorias = document.getElementsByName('TrayectoriaProfesional');
	validarContTrayectorias = ArregloTrayectorias.length;
	for (let i = 0; i < ArregloTrayectorias.length; i++) {
		var formTrayectoria = new FormData(ArregloTrayectorias[i]);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Registrar_Profesor/ValidarTrayectoriaProfesor",
			data: formTrayectoria,
			type: "POST",
			contentType: false,
			processData: false,
			success: function(resultado){
				
				$("#alertTrayectoriaOpcionOtro"+i+"ProfRegistro").html("");
				$("#alertTrayectoriaPeriodo"+i+"ProfRegistro").html("");
				$("#alertTrayectoriaDescripcion"+i+"ProfRegistro").html("");
				$("#alertTrayectoriaArchivo"+i+"ProfRegistro").html("");
				
				if(resultado!=true){
					for (const atributo in resultado) {
						var mensajes="";
						for (let i = 0; i < resultado[atributo].length; i++) {
							mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
							if(resultado[atributo].length-i!=1){
								mensajes = mensajes + "<br>"
							}
						}
						$("#alertTrayectoria"+atributo+i+"ProfRegistro").html(mensajes);
					}
					Bandera = false;
				}
				validarContTrayectorias--;
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

function ValidarPertenencias(){
	var ArregloPertenencias = document.getElementsByName('Pertenencias');
	validarContPertenencias = ArregloPertenencias.length;
	for (let i = 0; i < ArregloPertenencias.length; i++) {
		var formPertenencia = new FormData(ArregloPertenencias[i]);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Registrar_Profesor/ValidarPertenenciaProfesor",
			data: formPertenencia,
			type: "POST",
			contentType: false,
			processData: false,
			success: function(resultado){
				
				$("#alertPertenenciaOrganizacion"+i+"ProfRegistro").html("");
				$("#alertPertenenciaPeriodo"+i+"ProfRegistro").html("");
				$("#alertPertenenciaDescripcion"+i+"ProfRegistro").html("");
				$("#alertPertenenciaArchivo"+i+"ProfRegistro").html("");
				
				if(resultado!=true){
					for (const atributo in resultado) {
						var mensajes="";
						for (let i = 0; i < resultado[atributo].length; i++) {
							mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
							if(resultado[atributo].length-i!=1){
								mensajes = mensajes + "<br>"
							}
						}
						$("#alertPertenencia"+atributo+i+"ProfRegistro").html(mensajes);
					}
					Bandera = false;
				}
				validarContPertenencias--;
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

function EjecutarValidaciones() {
	$("#btnRegistrar").prop('disabled', true);
	$("#btnCancelar").prop('disabled', true);

	ValidarDatosG();
	ValidarPreparacion();
	ValidarSuperacion();
	ValidarDistincion();
	ValidarTrayectoria();
	ValidarPertenencias();
}

function RegistrarDatosGenerales() {
	var formDatosGenerales = new FormData(document.getElementById('FormDatosGenerales'));
	
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Profesores/Registrar_Profesor/RegistrarProfesor",
		data: formDatosGenerales,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(idProfesor){
			if(ArregloCartasNAB.length>0){
				RegistrarCartasNAB(idProfesor);
			}
			RegistrarPreparacionAcademica(idProfesor);
			RegistrarSuperacionAcademica(idProfesor);
			RegistrarDistinciones(idProfesor);
			RegistrarTrayectoria(idProfesor);
			RegistrarPertenencia(idProfesor);

			alert("Profesor Registrado");
			location.reload();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function RegistrarCartasNAB(idProfesor) {
	if(ArregloCartasNAB.length!=0){
		var f = new Date();
		var fecha = f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate();
		var aux = document.getElementsByName("EstadoCarta");
		var checkvalor="ninguno";
		for (let i = 0; i < aux.length; i++) {
			if( aux[i].checked==true) {
				checkvalor = aux[i].value;
			}
		}
		var form = new FormData();
		form.append('fechaRegistro', fecha);
		form.append('ArchivoVigente', checkvalor);
		form.append('idProfesor', idProfesor);
		for(var i=0; i<ArregloCartasNAB.length; i++){
			form.append('cartas[]', ArregloCartasNAB[i]);
		}

		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Registrar_Profesor/RegistrarCartasNAB",
			type: "POST",
			data: form,
			cache: false,
			contentType: false,
			processData: false,
			success: function(result){
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	}
}

function RegistrarPreparacionAcademica(idProfesor) {
	var ArregloPrepAcad = document.getElementsByName('PreparacionAcademica');
	for (let i = 0; i < ArregloPrepAcad.length; i++) {
		var formPrepAcad = new FormData(ArregloPrepAcad[i]);
		formPrepAcad.append("idProfesor", idProfesor);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Registrar_Profesor/RegistrarPreparacionAcademica",
			data: formPrepAcad,
			type: "POST",
			contentType: false,
			processData: false,
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

function RegistrarSuperacionAcademica(idProfesor) {
	var ArregloSupAcad = document.getElementsByName('SuperacionAcademica');
	for (let i = 0; i < ArregloSupAcad.length; i++) {
		var formSupAcad = new FormData(ArregloSupAcad[i]);
		formSupAcad.append("idProfesor", idProfesor);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Registrar_Profesor/RegistrarSuperacionAcademica",
			data: formSupAcad,
			type: "POST",
			contentType: false,
			processData: false,
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

function RegistrarDistinciones(idProfesor) {
	var ArregloDistinciones = document.getElementsByName('Distinciones');
	for (let i = 0; i < ArregloDistinciones.length; i++) {
		var formDistincion = new FormData(ArregloDistinciones[i]);
		formDistincion.append("idProfesor", idProfesor);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Registrar_Profesor/RegistrarDistincion",
			data: formDistincion,
			type: "POST",
			contentType: false,
			processData: false,
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

function RegistrarTrayectoria(idProfesor) {
	var ArregloTrayectoria = document.getElementsByName('TrayectoriaProfesional');
	for (let i = 0; i < ArregloTrayectoria.length; i++) {
		var formTrayectoria = new FormData(ArregloTrayectoria[i]);
		formTrayectoria.append("idProfesor", idProfesor);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Registrar_Profesor/RegistrarTrayectorias",
			data: formTrayectoria,
			type: "POST",
			contentType: false,
			processData: false,
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

function RegistrarPertenencia(idProfesor) {
	var ArregloPertenencia = document.getElementsByName('Pertenencias');
	for (let i = 0; i < ArregloPertenencia.length; i++) {
		var formPertenencia = new FormData(ArregloPertenencia[i]);
		formPertenencia.append("idProfesor", idProfesor);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Registrar_Profesor/RegistrarPertenencia",
			data: formPertenencia,
			type: "POST",
			contentType: false,
			processData: false,
			success: function(resultado){
				console.log(resultado);
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

function crearCopiasCatas() {
	var form = new FormData();
	
	for(var i=0; i<ArregloCartasNAB.length; i++){
		form.append('cartas[]', ArregloCartasNAB[i]);
	}

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Auxiliar/CartasNAB",
		type: "POST",
		data: form,
		cache: false,
		contentType: false,
		processData: false,
		success: function(result){
			var tabla="";
			for (let i = 0; i < result.length; i++) {
				tabla = tabla + '<tr id="tr'+i+'">';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarArchivo(\''+i+'\')" class="btn btn-danger btn-xs">Quitar</button></td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">';
				tabla = tabla + '<div style="padding-left:10px">';
				if(i == 0){
					tabla = tabla + '<input class="form-check-input" style="margin-top:.2rem;" type="radio" name="EstadoCarta" id="Carta'+i+'" value="'+i+'" aria-label="Vigencia de Cartas" checked>';
				}else{
					tabla = tabla + '<input class="form-check-input" style="margin-top:.2rem;" type="radio" name="EstadoCarta" id="Carta'+i+'" value="'+i+'" aria-label="Vigencia de Cartas">';
				}
				tabla = tabla + '<label class="form-check-label" for="Carta'+i+'">Vigente</label>';
				tabla = tabla + '</div>';
				tabla = tabla + '</td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevCartas').innerHTML=tabla;
		}
	});
}

function quitarArchivo(id) {
	ArregloCartasNAB.splice(id, 1);
	var idtr="#tr"+id;
	$(idtr).remove();
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Auxiliar/QuitarCartaNAB",
		type: "POST",
		data: {"id":id},
		success: function(result){
			crearCopiasCatas();
		}
	});
}

function Cancelar() {
	location.reload();
}