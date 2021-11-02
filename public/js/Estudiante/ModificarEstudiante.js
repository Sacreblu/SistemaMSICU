
var LGACs = "";
var Planes = "";
var Generaciones = "";
var IdPlanEstudios = "";
var GradosAcademicos = "";
var Bandera = true;

var validarContDatosGenerales = 0;

//PREPARACION ACADEMICA
var ContadorPreparacionAcademicaGuardada = -1;
var ContadorPreparacionAcademica = 0;
var ArregloBorrarEstudios = [];
var validarContPreparacionAcad = 0;

window.onload = function () {
	initializeProfesor();
};

function initializeProfesor() {
	limpiarTMP();
	console.log(informacion);
	
	getPlanes();
	getLGACs();
	getGradosAcademicos();

	setDatosGenerales();
	setPreparacionAcademica();

}

//FUNCIONES INICIALES
function getGradosAcademicos() {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Auxiliar/Grados",
		type: "POST",
		dataType: "json",
		async: false,
		success: function (resultado) {
			GradosAcademicos = resultado;
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function getPlanes(){
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Plan_de_Estudios/ObtenerPlanes',
		type: "POST",
		success: function(resultado){
            Planes = resultado;
            getGeneraciones();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function getLGACs(){
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/LGACs/ObtenerLGACs',
		type: "POST",
		success: function(resultado){
            LGACs = resultado;
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
			$("#Generacion").val(Generaciones.filter(function (G) { return G.id == informacion[0].DatosGenerales[0].Id_Generacion; })[0].id);
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
	
	setLGACs(plan[0].id);
}

function setLGACs(IdPlan){
    var lgac = LGACs.filter(function (lgac) { return lgac.Id_Plan == IdPlan; });
    if(IdPlanEstudios!=IdPlan){
        IdPlanEstudios=IdPlan;
        var aux = '<label>Linea de Generación y Aplicación de Conocimiento</label>';
        aux += '<span class="alertError" id="alertId_LGACEstModificar"></span>';
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
		$("input[name=Id_LGAC][value=" + informacion[0].DatosGenerales[0].Id_LGAC + "]").prop('checked', true);
	
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
	$("input[name=Estado][value='" + informacion[0].DatosGenerales[0].Estado + "']").prop('checked', true);
	$("#Nombre").val(informacion[0].DatosGenerales[0].Nombre);
	$("#ApellidoP").val(informacion[0].DatosGenerales[0].Apellido_P);
	$("#ApellidoM").val(informacion[0].DatosGenerales[0].Apellido_M);
	$("#Correo").val(informacion[0].DatosGenerales[0].Correo);
	$("#CorreoPersonal").val(informacion[0].DatosGenerales[0].CorreoPersonal);
	$("#CVU").val(informacion[0].DatosGenerales[0].No_CVU);
	$("#Matricula").val(informacion[0].DatosGenerales[0].Matricula);
	
	if(informacion[0].DatosGenerales[0].Estado=="Egresado"){
		$("#divArchivoCarta").css("display","block");
		$("#EstadoCheck").val("true");
		var tabla = "<tr>";
			tabla += '<td style="vertical-align:middle; text-align:center"><a href="' + informacion[0].DatosGenerales[0].Ruta_Carta + '" target="_blank" rel="noopener noreferrer">' + informacion[0].DatosGenerales[0].NombreCarta + '</a></td>';
		tabla += '</tr>'
		$("#VistaCartaGuardada").html(tabla);
	}else{
		$("#EstadoCheck").val("false");
		$("#divArchivoCarta").css("display","none");
	}
}

function setPreparacionAcademica() {
	for (let p = 0; p < informacion.PreparacionAcademica.length; p++) {
		ContadorPreparacionAcademicaGuardada += 1;
		var cardEstudios = '<div class="Estudios-form card" id="CardPAGuardada' + ContadorPreparacionAcademicaGuardada + '">';
			cardEstudios += '<div data-toggle="collapse" style="cursor: pointer" data-target="#ModificarEstudios'+ContadorPreparacionAcademicaGuardada+'">';
				cardEstudios += '<i class="fas fa-angle-right"></i> '+informacion[0].PreparacionAcademica[p].Titulo;
			cardEstudios += '</div>';
			cardEstudios += '<div id="ModificarEstudios'+ContadorPreparacionAcademicaGuardada+'" class="collapse show">'
				cardEstudios += '<hr>';
				cardEstudios += '<form class="form-group" action="#" name="PreparacionAcademicaGuardada">';
					cardEstudios += '<div class="row">';
						cardEstudios += '<div class="col-md-6">';
							cardEstudios += '<div class="form-group">';
								cardEstudios += '<label style="display:block;">Grado</label>';
								for (let i = 0; i < GradosAcademicos.length; i++) {
									cardEstudios += '<div class="form-check-inline">';
										cardEstudios += '<label class="form-check-label" for="' + GradosAcademicos[i].Grado + ContadorPreparacionAcademicaGuardada + '">';
										if (GradosAcademicos[i].id == informacion[0].PreparacionAcademica[p].Id_Grado) {
											cardEstudios += '<input type="radio" class="form-check-input" id="' + GradosAcademicos[i].Grado + ContadorPreparacionAcademicaGuardada + '" name="Id_Grado" value="' + GradosAcademicos[i].id + '" checked>' + GradosAcademicos[i].Grado;
										} else {
											cardEstudios += '<input type="radio" class="form-check-input" id="' + GradosAcademicos[i].Grado + ContadorPreparacionAcademicaGuardada + '" name="Id_Grado" value="' + GradosAcademicos[i].id + '">' + GradosAcademicos[i].Grado;
										}
										cardEstudios += '</label>';
									cardEstudios += '</div>';
								}
							cardEstudios += '</div>';
							cardEstudios += '<div class="form-group">';
								cardEstudios += '<input type="hidden" name="Contador" value="' + ContadorPreparacionAcademicaGuardada + '">';
								cardEstudios += '<input type="hidden" name="IdRegistro" id="RegistroEstudiosID' + ContadorPreparacionAcademicaGuardada + '" value="' + informacion[0].PreparacionAcademica[p].id + '">';
								cardEstudios += '<input type="text" class="form-control" id="Titulo' + ContadorPreparacionAcademicaGuardada + '" name="Titulo" placeholder="Título" value="' + informacion[0].PreparacionAcademica[p].Titulo + '">';
								cardEstudios += '<span class="alertError" id="alertPrepAcadTitulo' + ContadorPreparacionAcademicaGuardada + 'EstModificar"></span>';
							cardEstudios += '</div>';
							cardEstudios += '<div class="form-group">';
								cardEstudios += '<input type="text" class="form-control" id="Universidad' + ContadorPreparacionAcademicaGuardada + '" name="Universidad" placeholder="Universidad o Institución" value="' + informacion[0].PreparacionAcademica[p].Universidad + '">';
								cardEstudios += '<span class="alertError" id="alertPrepAcadUniversidad' + ContadorPreparacionAcademicaGuardada + 'EstModificar"></span>';
							cardEstudios += '</div>';
							cardEstudios += '<div class="form-row">';
								cardEstudios += '<div class="form-group col-md-4">';
									cardEstudios += ' <select class="form-control" id="Anio' + ContadorPreparacionAcademicaGuardada + '" name="Anio">';
									var myDate = new Date();
									var year = myDate.getFullYear();
									for (var i = year; i >= 1980; i--) {
										cardEstudios += '<option value="' + i + '">' + i + '</option>';
									}
									cardEstudios += '</select>';
								cardEstudios += '</div>';
								cardEstudios += '<div class="form-group col-md-8">';
									cardEstudios += '<input type="text" class="form-control" id="Lugar' + ContadorPreparacionAcademicaGuardada + '" name="Lugar" placeholder="Lugar"  value="' + informacion[0].PreparacionAcademica[p].Lugar + '">';
									cardEstudios += '<span class="alertError" id="alertPrepAcadLugar' + ContadorPreparacionAcademicaGuardada + 'EstModificar"></span>';
								cardEstudios += '</div>';
							cardEstudios += '</div>';
							cardEstudios += '<div class="col-md-12" style="text-align: center;">';
								cardEstudios += '<button class="btn btn-danger btn-sm" onclick="EliminarRegistroEstudios(\'' + ContadorPreparacionAcademicaGuardada + '\')">Eliminar Registro</button>';
							cardEstudios += '</div>';
						cardEstudios += '</div>';
						cardEstudios += '<div class="col-md-6">';
							cardEstudios += '<label>Archivo Evidencia</label>';
							cardEstudios += '<span class="alertError" id="alertPrepAcadArchivo' + ContadorPreparacionAcademicaGuardada + 'EstModificar"></span>';
							cardEstudios += '<div class="container p-y-1 col-md-9">';
								cardEstudios += '<div class="row m-b-1">';
									cardEstudios += '<div class="col-sm-12">';
										cardEstudios += '<div class="form-group inputDnD">';
											cardEstudios += '<label class="sr-only" for="inputFile">File Upload</label>';
											cardEstudios += '<input type="file" name="Archivo" class="form-control-file text-primary font-weight-bold" id="ArchivoEstudios' + ContadorPreparacionAcademicaGuardada + '" accept="application/pdf" onchange="ControladorPrepAcad(\'' + ContadorPreparacionAcademicaGuardada + '\')" data-title="Arrastre y suelte el archivo">';
										cardEstudios += '</div>';
									cardEstudios += '</div>';
								cardEstudios += '</div>';
							cardEstudios += '</div>';
							cardEstudios += '<div class="container col-md-12">';
								cardEstudios += '<ul class="nav nav-tabs" id="ArchivosEstudios' + ContadorPreparacionAcademicaGuardada + '" role="tablist">';
									cardEstudios += '<li class="nav-item">';
										cardEstudios += '<a class="nav-link" id="ArchivosCargadosEstudios-tab' + ContadorPreparacionAcademicaGuardada + '" data-toggle="tab" href="#ArchivosCargadosEstudios' + ContadorPreparacionAcademicaGuardada + '" role="tab" aria-controls="Archivos Cargados Preparación Academica" aria-selected="true">Archivos Cargados</a>';
									cardEstudios += '</li>';
									cardEstudios += '<li class="nav-item">';
										cardEstudios += '<a class="nav-link active" id="ArchivosGuardadosEstudios-tab' + ContadorPreparacionAcademicaGuardada + '" data-toggle="tab" href="#ArchivosGuardadosEstudios' + ContadorPreparacionAcademicaGuardada + '" role="tab" aria-controls="Archivos Guardados Preparación Academica" aria-selected="false">Archivos Guardados</a>';
									cardEstudios += '</li>';
								cardEstudios += '</ul>';
								cardEstudios += '<div class="tab-content" id="ArchivosEstudiosContent' + ContadorPreparacionAcademicaGuardada + '">';
									cardEstudios += '<div class="tab-pane fade show active" id="ArchivosGuardadosEstudios' + ContadorPreparacionAcademicaGuardada + '" role="tabpanel" aria-labelledby="ArchivosGuardadosEstudios-tab' + ContadorPreparacionAcademicaGuardada + '">';
										cardEstudios += '<table class="table table-sm">';
											cardEstudios += '<thead>';
												cardEstudios += '<tr><th>Archivos</th></tr>';
											cardEstudios += '</thead>';
											cardEstudios += '<tbody id="EstudiosGuardados' + ContadorPreparacionAcademicaGuardada + '">';
												cardEstudios += '<tr>';
													cardEstudios += '<td style="vertical-align:middle; text-align:center"><a href="' + informacion[0].PreparacionAcademica[p].Ruta_Archivo + '" target="_blank" rel="noopener noreferrer">' + informacion[0].PreparacionAcademica[p].NombreArchivo + '</a></td>';
												cardEstudios += '</tr>';
											cardEstudios += '</tbody>';
										cardEstudios += '</table>';
									cardEstudios += '</div>';
									cardEstudios += '<div class="tab-pane fade" id="ArchivosCargadosEstudios' + ContadorPreparacionAcademicaGuardada + '" role="tabpanel" aria-labelledby="ArchivosCargadosEstudios-tab' + ContadorPreparacionAcademicaGuardada + '">'
										cardEstudios += '<table class="table table-sm">';
											cardEstudios += '<thead>';
												cardEstudios += '<tr><th colspan="2">Archivos</th></tr>';
											cardEstudios += '</thead>';
											cardEstudios += '<tbody id="VistaPrevEstudios' + ContadorPreparacionAcademicaGuardada + '">';
											cardEstudios += '</tbody>';
										cardEstudios += '</table>';
									cardEstudios += '</div>'
								cardEstudios += '</div>';
							cardEstudios += '</div>';
						cardEstudios += '</div>';
					cardEstudios += '</div>';
				cardEstudios += '</form>';
			cardEstudios += '</div>';
		cardEstudios += '</div>';

		$("#Estudios").append(cardEstudios);
		$("#Anio" + ContadorPreparacionAcademicaGuardada).val(informacion[0].PreparacionAcademica[p].Anio);
	}
	ContadorPreparacionAcademica = ContadorPreparacionAcademicaGuardada;
}

//FUNCIONES CONTROLADOR DE CARTAS de LIBERACION
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
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="../'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
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
		$("#divArchivoCarta").css("display","none");
	}
}

//FUNCIONES CONTROLADOR DE PREPARARCION ACADEMICA
function ControladorPrepAcad(posicion) {
	var Archivo = document.getElementById('ArchivoEstudios' + posicion).files;
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
		success: function (result) {
			var tabla = "";
			for (let i = 0; i < result.length; i++) {
				tabla = tabla + '<tr id="VistaEstudios' + posicion + '">';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarArchivoEstudios(\'' + posicion + '\')" class="btn btn-danger btn-xs">Quitar</button></td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="../' + result[i][0] + '" target="_blank" rel="noopener noreferrer">' + result[i][1] + '</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevEstudios' + posicion).innerHTML = tabla;
		}
	});
}

function añadirPreparacionAcademica() {
	$("#btnQuitar").prop('disabled', false);
	ContadorPreparacionAcademica += 1;
	var cardEstudios = '<div class="Estudios-form card" id="CardPA' + ContadorPreparacionAcademica + '">';
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
										cardEstudios += '<label class="form-check-label" for="' + GradosAcademicos[i].Grado + ContadorPreparacionAcademica + '">';
										if (i < 1) {
											cardEstudios += '<input type="radio" class="form-check-input" id="' + GradosAcademicos[i].Grado + ContadorPreparacionAcademica + '" name="Id_Grado" value="' + GradosAcademicos[i].id + '" checked>' + GradosAcademicos[i].Grado;
										} else {
											cardEstudios += '<input type="radio" class="form-check-input" id="' + GradosAcademicos[i].Grado + ContadorPreparacionAcademica + '" name="Id_Grado" value="' + GradosAcademicos[i].id + '">' + GradosAcademicos[i].Grado;
										}
										cardEstudios += '</label>';
									cardEstudios += '</div>';
								}
							cardEstudios += '</div>';
						cardEstudios += '<div class="form-group">';
							cardEstudios += '<input type="text" class="form-control" id="Titulo' + ContadorPreparacionAcademica + '" name="Titulo" placeholder="Título">';
							cardEstudios += '<span class="alertError" id="alertPrepAcadTitulo' + ContadorPreparacionAcademica + 'EstRegistro"></span>';
						cardEstudios += '</div>';
						cardEstudios += '<div class="form-group">';
							cardEstudios += '<input type="text" class="form-control" id="Universidad' + ContadorPreparacionAcademica + '" name="Universidad" placeholder="Universidad o Institución">';
							cardEstudios += '<span class="alertError" id="alertPrepAcadUniversidad' + ContadorPreparacionAcademica + 'EstRegistro"></span>';
						cardEstudios += '</div>';
						cardEstudios += '<div class="form-row">';
							cardEstudios += '<div class="form-group col-md-4">';
								cardEstudios += ' <select class="form-control" id="Anio' + ContadorPreparacionAcademica + '" name="Anio">';
									var myDate = new Date();
									var year = myDate.getFullYear();
									for (var i = year; i >= 1980; i--) {
										cardEstudios += '<option value="' + i + '">' + i + '</option>';
									}
								cardEstudios += '</select>';
							cardEstudios += '</div>';
							cardEstudios += '<div class="form-group col-md-8">';
								cardEstudios += '<input type="text" class="form-control" id="Lugar' + ContadorPreparacionAcademica + '" name="Lugar" placeholder="Lugar">';
								cardEstudios += '<span class="alertError" id="alertPrepAcadLugar' + ContadorPreparacionAcademica + 'EstRegistro"></span>';
							cardEstudios += '</div>';
						cardEstudios += '</div>';
					cardEstudios += '</div>';
					cardEstudios += '<div class="col-md-6">';
						cardEstudios += '<label>Archivo Evidencia</label>';
						cardEstudios += '<span class="alertError" id="alertPrepAcadArchivo' + ContadorPreparacionAcademica + 'EstRegistro"></span>';
						cardEstudios += '<div class="container p-y-1 col-md-9">';
							cardEstudios += '<div class="row m-b-1">';
								cardEstudios += '<div class="col-sm-12">';
									cardEstudios += '<div class="form-group inputDnD">';
										cardEstudios += '<label class="sr-only" for="inputFile">File Upload</label>';
										cardEstudios += '<input type="file" name="Archivo" class="form-control-file text-primary font-weight-bold" id="ArchivoEstudios' + ContadorPreparacionAcademica + '" accept="application/pdf" onchange="ControladorPrepAcad(\'' + ContadorPreparacionAcademica + '\')" data-title="Arrastre y suelte el archivo">';
									cardEstudios += '</div>';
								cardEstudios += '</div>';
							cardEstudios += '</div>';
						cardEstudios += '</div>';
						cardEstudios += '<div class="container col-md-12">';
							cardEstudios += '<label>Vista Previa de Archivos Cargados</label>';
							cardEstudios += '<table class="table table-sm">';
								cardEstudios += '<thead>';
									cardEstudios += '<tr><th colspan="2">Archivos</th></tr>';
								cardEstudios += '</thead>';
								cardEstudios += '<tbody id="VistaPrevEstudios' + ContadorPreparacionAcademica + '">';
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

function quitarPreparacionAcademica() {
	var idDiv = "#CardPA" + ContadorPreparacionAcademica;
	$(idDiv).remove();
	ContadorPreparacionAcademica -= 1;
	if (ContadorPreparacionAcademica <= ContadorPreparacionAcademicaGuardada) {
		$("#btnQuitar").prop('disabled', true);
	}
}

function quitarArchivoEstudios(posicion) {
	$("#VistaEstudios" + posicion).remove();
	document.getElementById('ArchivoEstudios' + posicion).value = null;
}

function EliminarRegistroEstudios(posicion) {
	var r = confirm("¿Esta seguro de eliminar este registro? \n (Se ejecutara al guardar los cambios)");
	if (r == true) {
		ArregloBorrarEstudios.push($("#RegistroEstudiosID" + posicion).val());
		$("#CardPAGuardada" + posicion).remove();
	} else {
		$('form[name="PreparacionAcademicaGuardada"]').submit(function (e) {
			e.preventDefault();
		});
	}


}

//VALIDACIONES
function EjecutarValidaciones() {
	$("#btnGuardar").prop('disabled', true);
	$("#btnCancelar").prop('disabled', true);

	ValidarDatosG();
	ValidarPreparacion();
}

function ValidarDatosG(){
	validarContDatosGenerales = 1;
	var formDatosGenerales = new FormData(document.getElementById('FormDatosGenerales'));
	var checkEstado = $("#EstadoCheck").val();
	var Estado = $("input[name='Estado']:checked").val();
	if(checkEstado == "false" && Estado=="Egresado"){
		formDatosGenerales.append('ArchivoVerificacion', "true");
	}else{
		formDatosGenerales.append('ArchivoVerificacion', "false");
	}
	var id = informacion[0].DatosGenerales[0].id;
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Estudiantes/Modificar_Estudiante/ValidarDatosGeneralesEstudiante/" + id,
		data: formDatosGenerales,
		type: "POST",
		contentType: false,
		processData: false,
		success: function(resultado){
			console.log(resultado);
			$("#alertNombreEstModificar").html("");
			$("#alertApellido_PEstModificar").html("");
			$("#alertApellido_MEstModificar").html("");
			$("#alertCorreoEstModificar").html("");
			$("#alertCorreoPersonalEstModificar").html("");
			$("#alertNo_CVUEstModificar").html("");
			$("#alertMatriculaEstModificar").html("");
			$("#alertId_LGACEstModificar").html("");
			$("#alertArchivoCartaLibEstModificar").html("");
			
			if(resultado!=true){
				for (const atributo in resultado) {
					var mensajes="";
					for (let i = 0; i < resultado[atributo].length; i++) {
						mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
						if(resultado[atributo].length-i!=1){
							mensajes = mensajes + "<br>"
						}
					}
					$("#alert"+atributo+"EstModificar").html(mensajes);
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

function ValidarPreparacion() {
	var ArregloPrepAcadGuardada = document.getElementsByName('PreparacionAcademicaGuardada');
	var ArregloPrepAcad = document.getElementsByName('PreparacionAcademica');

	validarContPreparacionAcad = ArregloPrepAcadGuardada.length + ArregloPrepAcad.length;

	for (let i = 0; i < ArregloPrepAcadGuardada.length; i++) {
		ValidarEstudiosGuardados(new FormData(ArregloPrepAcadGuardada[i]));
	}

	for (let i = 0; i < ArregloPrepAcad.length; i++) {

		var formPrepAcad = new FormData(ArregloPrepAcad[i]);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Estudiantes/Registrar_Estudiante/ValidarPreparacionAcademicaEstudiante",
			data: formPrepAcad,
			type: "POST",
			contentType: false,
			processData: false,
			success: function (resultado) {

				$("#alertPrepAcadTitulo" + parseInt(ContadorPreparacionAcademicaGuardada + i + 1) + "EstRegistro").html("");
				$("#alertPrepAcadUniversidad" + parseInt(ContadorPreparacionAcademicaGuardada + i + 1) + "EstRegistro").html("");
				$("#alertPrepAcadLugar" + parseInt(ContadorPreparacionAcademicaGuardada + i + 1) + "EstRegistro").html("");
				$("#alertPrepAcadArchivo" + parseInt(ContadorPreparacionAcademicaGuardada + i + 1) + "EstRegistro").html("");

				if (resultado != true) {
					for (const atributo in resultado) {
						var mensajes = "";
						for (let i = 0; i < resultado[atributo].length; i++) {
							mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> ' + resultado[atributo][i];
							if (resultado[atributo].length - i != 1) {
								mensajes = mensajes + "<br>"
							}
						}
						$("#alertPrepAcad" + atributo + parseInt(ContadorPreparacionAcademicaGuardada + i + 1) + "EstRegistro").html(mensajes);
					}
					Bandera = false;
				}
				validarContPreparacionAcad--;
				validarValidaciones();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	}
}

async function ValidarEstudiosGuardados(formPrepAcad) {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Estudiantes/Modificar_Estudiante/ValidarPreparacionAcademicaEstudiantes",
		data: formPrepAcad,
		type: "POST",
		contentType: false,
		processData: false,
		success: function (resultado) {

			var valor = formPrepAcad.get("Contador");

			$("#alertPrepAcadTitulo" + valor + "EstModificar").html("");
			$("#alertPrepAcadUniversidad" + valor + "EstModificar").html("");
			$("#alertPrepAcadLugar" + valor + "EstModificar").html("");
			$("#alertPrepAcadArchivo" + valor + "EstModificar").html("");

			if (resultado != true) {
				for (const atributo in resultado) {
					var mensajes = "";
					for (let i = 0; i < resultado[atributo].length; i++) {
						mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> ' + resultado[atributo][i];
						if (resultado[atributo].length - i != 1) {
							mensajes = mensajes + "<br>"
						}
					}
					$("#alertPrepAcad" + atributo + valor + "EstModificar").html(mensajes);
				}
				Bandera = false;
			}
			validarContPreparacionAcad--;
			validarValidaciones();
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function validarValidaciones() {
	if (validarContDatosGenerales == 0 && validarContPreparacionAcad == 0) {
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

//OPERACIONES DATOS GENERALES
function ModificarDatosGenerales() {
	var formDatosGenerales = new FormData(document.getElementById('FormDatosGenerales'));
	var id = informacion[0].DatosGenerales[0].id;
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Estudiantes/Modificar_Estudiante/ModificarEstudiante/" + id,
		data: formDatosGenerales,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function (resultado) {

			ModificarPreparacionAcademica(id);
			console.log(resultado);
			alert("Los cambios han sido guardados");
			
			location.href="/Estudiantes";

		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

//OPERACIONES PREPARACION ACADEMICA
function ModificarPreparacionAcademica(idEstudiante) {
	EliminarRegistrosEstudios();
	RegistrarEstudiosAcademicos(idEstudiante);
	ModificarRegistrosEstudios(idEstudiante);
}

function EliminarRegistrosEstudios() {
	if (ArregloBorrarEstudios.length != 0) {
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Estudiantes/Modificar_Estudiante/EliminarPreparacionAcademica",
			data: { "Ids": ArregloBorrarEstudios },
			type: "POST",
			success: function (resultado) {
				console.log(resultado);
			}
		});
	} else {
		console.log("nada para borrar");
	}
}

function RegistrarEstudiosAcademicos(idEstudiante) {
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
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	}		
}

function ModificarRegistrosEstudios(idEstudiante) {
	var ArregloPrepAcad = document.getElementsByName('PreparacionAcademicaGuardada');
	for (let i = 0; i < ArregloPrepAcad.length; i++) {
		var formPrepAcad = new FormData(ArregloPrepAcad[i]);
		formPrepAcad.append("idEstudiante", idEstudiante);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Estudiantes/Modificar_Estudiante/ModificarPreparacionAcademica",
			data: formPrepAcad,
			type: "POST",
			contentType: false,
			processData: false,
			success: function (resultado) {
				console.log(resultado);
				location.href="/Estudiantes";
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	}
}

function Cancelar(){
	location.reload();
}










