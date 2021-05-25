
var LGACs = "";
var Planes = "";
var Generaciones = "";
var IdPlanEstudios = "";
var GradosAcademicos = "";

var validarContDatosGenerales = 0;
var validarContPreparacionAcad = 0;

var ContadorPreparacionAcademica = -1;

var Bandera = true;

window.onload = function() {
	initializeEstudiante();
};

function initializeEstudiante() {
    getPlaness();
	getGradosAcademicos();
}

//FUNCIONES DE INICIO
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

function getPlaness(){
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Plan_de_Estudios/ObtenerPlanes',
		type: "POST",
		success: function(resultado){
            Planes = resultado;
            getGeneraciones();
			/*for(var i = 0; i < resultado.length; i++){
				$("#Generacion").append(new Option(resultado[i].Generacion+"° Gen", resultado[i].id));
			}*/
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function getLGACs(IdPLan){

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/LGACs/ObtenerLGACs',
		type: "POST",
		success: function(resultado){
            LGACs = resultado;
            setLGACs(IdPLan);
			/*for(var i = 0; i < resultado.length; i++){
				$("#Generacion").append(new Option(resultado[i].Generacion+"° Gen", resultado[i].id));
			}*/
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
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

function setPlanEstudios(gen){
    var generacion = Generaciones.filter(function (generacion) { return generacion.id == gen.value; });
    var plan = Planes.filter(function (plan) { return plan.id == generacion[0].Id_Plan; });
    $("#Plan").val(plan[0].Nombre);
	$("#Id_Plan").val(plan[0].id);
    getLGACs(plan[0].id);
}

function setLGACs(IdPlan){
    var lgac = LGACs.filter(function (lgac) { return lgac.Id_Plan == IdPlan; });
    if(IdPlanEstudios!=IdPlan){
        IdPlanEstudios=IdPlan;
        var aux = '<label>Linea de Generación y Aplicación de Conocimiento</label>';
        aux += '<span class="alertError" id="alertId_LGACEstRegistro"></span>';
        aux += '<div>';
        for (let i = 0; i < lgac.length; i++) {
            aux += '<div class="form-check">';
                aux += '<label class="form-check-label" style="padding-left:18px" for="LGAC'+lgac[i].id+'">';
                    aux += '<input type="radio" class="form-check-input" id="LGAC'+lgac[i].id+'" name="Id_LGAC" value="'+lgac[i].id+'" >'+lgac[i].Nombre;
                aux += '</label>';
            aux += '</div>';
        }
        aux += '</div>';
        $("#LGACs").html(aux);
    }
    
}

//FUNCIONES PARA CARTAS DE LIBERACION
function ControladorCartaLiberacion() {
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
				tabla = tabla + '<tr id="VistaCartaLib">';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarCartaLiberacion()" class="btn btn-danger btn-xs">Quitar</button></td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevCartaLiberacion').innerHTML=tabla;
		}
	});
}

function quitarCartaLiberacion() {
	var idDiv = "#VistaCartaLib";
	$(idDiv).remove();
	document.getElementById('ArchivoCartaLiberacion').value = null;
}

function controladorEstado(){
	if($("input[name='Estado']:checked").val()=="Egresado"){
		$("#divArchivoCarta").css("display","block");
	}else{
		$("#divArchivoCarta").css("display","none")
	}
}

//FUNCIONES DE VALIDACION
function EjecutarValidaciones() {
	$("#btnRegistrar").prop('disabled', true);
	$("#btnCancelar").prop('disabled', true);

	ValidarDatosG();
	ValidarPreparacion();
}

function validarValidaciones() {
	if(validarContDatosGenerales==0 && validarContPreparacionAcad == 0){
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
		url: "/Estudiantes/Registrar_Estudiante/ValidarDatosGeneralesEstudiante",
		data: formDatosGenerales,
		type: "POST",
		contentType: false,
		processData: false,
		success: function(resultado){
			$("#alertNombreEstRegistro").html("");
			$("#alertApellido_PEstRegistro").html("");
			$("#alertApellido_MEstRegistro").html("");
			$("#alertCorreoEstRegistro").html("");
			$("#alertCorreoPersonalEstRegistro").html("");
			$("#alertNo_CVUEstRegistro").html("");
			$("#alertMatriculaEstRegistro").html("");
			$("#alertId_LGACEstRegistro").html("");
			$("#alertArchivoCartaLibEstRegistro").html("");
			
			if(resultado!=true){
				for (const atributo in resultado) {
					var mensajes="";
					for (let i = 0; i < resultado[atributo].length; i++) {
						mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
						if(resultado[atributo].length-i!=1){
							mensajes = mensajes + "<br>"
						}
					}
					$("#alert"+atributo+"EstRegistro").html(mensajes);
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
	console.log(ArregloPrepAcad.length);
	for (let i = 0; i < ArregloPrepAcad.length; i++) {
		var formPrepAcad = new FormData(ArregloPrepAcad[i]);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Estudiantes/Registrar_Estudiante/ValidarPreparacionAcademicaEstudiante",
			data: formPrepAcad,
			type: "POST",
			contentType: false,
			processData: false,
			success: function(resultado){
				$("#alertPrepAcadTitulo"+i+"EstRegistro").html("");
				$("#alertPrepAcadUniversidad"+i+"EstRegistro").html("");
				$("#alertPrepAcadLugar"+i+"EstRegistro").html("");
				$("#alertPrepAcadArchivo"+i+"EstRegistro").html("");

				if(resultado!=true){
					for (const atributo in resultado) {
						var mensajes="";
						for (let i = 0; i < resultado[atributo].length; i++) {
							mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
							if(resultado[atributo].length-i!=1){
								mensajes = mensajes + "<br>"
							}
						}
						$("#alertPrepAcad"+atributo+i+"EstRegistro").html(mensajes);
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

//FUNCIONES DE REGISTRO
function RegistrarDatosGenerales() {
	var formDatosGenerales = new FormData(document.getElementById('FormDatosGenerales'));
	
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Estudiantes/Registrar_Estudiante/RegistrarEstudiante",
		data: formDatosGenerales,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(idEstudiante){
			RegistrarPreparacionAcademica(idEstudiante);
			alert("Estudiante Registrado");
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function RegistrarPreparacionAcademica(idEstudiante) {
	var ArregloPrepAcad = document.getElementsByName('PreparacionAcademica');
	for (let i = 0; i < ArregloPrepAcad.length; i++) {
		var formPrepAcad = new FormData(ArregloPrepAcad[i]);
		formPrepAcad.append("idEstudiante", idEstudiante);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Estudiantes/Registrar_Estudiante/RegistrarPreparacionAcademica",
			data: formPrepAcad,
			type: "POST",
			contentType: false,
			processData: false,
			success: function(resultado){
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
}

//FUNCIONES CONTROLADOR DE PREPARACION ACADEMICA
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
									cardEstudios += '<span class="alertError" id="alertPrepAcadTitulo'+ContadorPreparacionAcademica+'EstRegistro"></span>';
								cardEstudios += '</div>';
								cardEstudios += '<div class="form-group">';
									cardEstudios += '<input type="text" class="form-control" id="Universidad'+ContadorPreparacionAcademica+'" name="Universidad" placeholder="Universidad o Institución">';
									cardEstudios += '<span class="alertError" id="alertPrepAcadUniversidad'+ContadorPreparacionAcademica+'EstRegistro"></span>';
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
										cardEstudios += '<span class="alertError" id="alertPrepAcadLugar'+ContadorPreparacionAcademica+'EstRegistro"></span>';
									cardEstudios += '</div>';
								cardEstudios += '</div>';
							cardEstudios += '</div>';
							cardEstudios += '<div class="col-md-6">';
								cardEstudios += '<label>Archivo Evidencia</label>';
								cardEstudios += '<span class="alertError" id="alertPrepAcadArchivo'+ContadorPreparacionAcademica+'EstRegistro"></span>';
								cardEstudios += '<div class="container p-y-1 col-md-9">';
									cardEstudios += '<div class="row m-b-1">';
										cardEstudios += '<div class="col-sm-12">';
											cardEstudios += '<div class="form-group inputDnD">';
												cardEstudios += '<label class="sr-only" for="inputFile">File Upload</label>';
												cardEstudios += '<input type="file" name="Archivo" class="form-control-file text-primary font-weight-bold" id="ArchivoEstudios'+ContadorPreparacionAcademica+'" accept="application/pdf" onchange="ControladorPrepAcad(\''+ContadorPreparacionAcademica+'\')" data-title="Arrastre y suelte el archivo">';
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

function ControladorPrepAcad(posicion) {
	var Archivo = document.getElementById('ArchivoEstudios'+posicion).files;
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


function Cancelar() {
	location.reload();
}