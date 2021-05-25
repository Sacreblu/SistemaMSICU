var ArregloTipoContratacion = [];
var ArregloTipoColaboracion = [];
var arregloPaises = [];
var ArregloPlanes = [];

var GradosAcademicos = "";
var TipoSuperacion = "";
var TipoDistincion = "";
var TipoTrayectoria = "";
var Bandera = true;

//CARTAS NAB
var ArregloCartasNABCargadas = [];
var ArregloCartasNABGuardadas = [];

//PREPARACION ACADEMICA
var ContadorPreparacionAcademicaGuardada = -1;
var ContadorPreparacionAcademica = 0;
var ArregloBorrarEstudios = [];
var validarContPreparacionAcad = 0;

//SUPERACION ACADEMICA
var ContadorSuperacionAcademicaGuardada = -1;
var ContadorSuperacionAcademica = 0;
var ArregloBorrarSuperacion = [];
var validarContSuperacionAcad = 0;

//DISTINCIONES
var ContadorDistincionGuardada = -1;
var ContadorDistinciones = 0;
var ArregloBorrarDistincion = [];
var validarContDistinciones = 0;

//TRAYECTORIAS
var ContadorTrayectoriaGuardada = -1;
var ContadorTrayectoria = 0;
var ArregloBorrarTrayectoria = [];
var validarContTrayectoria = 0;

//PERTENENCIAS
var ContadorPertenenciaGuardada = -1;
var ContadorPertenencias = 0;
var ArregloBorrarPertenencia = [];
var validarContPertenencia = 0;

window.onload = function () {
	initializeProfesor();
};

function initializeProfesor() {
	limpiarTMP();
	console.log(informacion);
	getTipoContratacion();
	getTipoColaboracion();
	Anios();
	getPaises();
	getGradosAcademicos();
	getTiposSuperacion();
	getTiposTrayectoria();
	getLGACsByPlan();

	setDatosGenerales();
	setPreparacionAcademica();
	setSuperacionAcademica();
	setDistinciones();
	setTrayectoria();
	setPertenencia();

	ArregloCartasNABGuardadas = informacion[0].DatosGenerales[0].CartasNAB;
}

//FUNCIONES INICIALES
function getTipoContratacion() {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Auxiliar/TipoContratacion',
		type: "POST",
		async: false,
		success: function (resultado) {
			ArregloTipoContratacion = resultado;
			for (var i = 0; i < resultado.length; i++) {
				$("#TipoContratacion").append(new Option(resultado[i].Tipo, resultado[i].id));
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function getTipoColaboracion() {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Auxiliar/TipoColaboracion',
		type: "POST",
		async: false,
		success: function (resultado) {
			ArregloTipoColaboracion = resultado;
			for (var i = 0; i < resultado.length; i++) {
				$("#TipoColaboracion").append(new Option(resultado[i].Tipo, resultado[i].id));
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function Anios() {
	var myDate = new Date();
	var year = myDate.getFullYear();
	for (var i = year; i >= 1980; i--) {
		$("#AnioIngreso").append(new Option(i, i));
		$("#AnioSalida").append(new Option(i, i));
	}
}

function getLGACsByPlan() {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: '/Auxiliar/LGACsByPlan',
		type: "POST",
		async: false,
		success: function (resultado) {
			for (var i = 0; i < resultado.length; i++) {
				ArregloPlanes[i] = resultado[i].id;
				var optionPlan = new Option(resultado[i].Nombre, resultado[i].id);
				$("#PlanEstudios").append(optionPlan);
				var cad = "";
				cad = cad + '<div id="Plan' + resultado[i].id + '" style="display:none;">';
				for (var j = 0; j < resultado[i].LGACs.length; j++) {
					cad = cad + '<div class="form-check">';
					cad = cad + '<input class="form-check-input" type="checkbox" value=" ' + resultado[i].LGACs[j].id + '" id="lgac' + resultado[i].LGACs[j].id + '" name="Id_LGAC[]">';
					cad = cad + '<label class="form-check-label" for="lgac' + resultado[i].LGACs[j].id + '">';
					cad = cad + resultado[i].LGACs[j].Nombre;
					cad = cad + '</label>';
					cad = cad + '</div>';
				}
				cad = cad + '</div>';
				$("#alertId_LGACProfModificar").before(cad);
				LGACController();
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function LGACController() {
	var valor = document.getElementById('PlanEstudios').value;
	var cont = 0;
	for (let i = 0; i < ArregloPlanes.length; i++) {
		if (ArregloPlanes[i] == valor) {
			document.getElementById("Plan" + ArregloPlanes[i]).style.display = "block";
		} else {
			document.getElementById("Plan" + ArregloPlanes[i]).style.display = "none";
		}
	}

}

function getPaises() {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Auxiliar/Paises",
		type: "POST",
		dataType: "json",
		success: function (resultado) {
			resultado.forEach(function (resultado) {
				arregloPaises.push(resultado.Pais);
			});
			autocompletePaises(arregloPaises);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
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

function getTiposSuperacion() {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Auxiliar/TipoSuperacion",
		type: "POST",
		async:false,
		dataType: "json",
		success: function (resultado) {
			TipoSuperacion = resultado;
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
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
		async:false,
		success: function (resultado) {
			TipoTrayectoria = resultado;
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function autocompletePaises(arreglo) {
	$("#Pais").autocomplete({
		source: arreglo
	});
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
	$("#Nombre").val(informacion[0].DatosGenerales[0].Nombre);
	$("#ApellidoP").val(informacion[0].DatosGenerales[0].Apellido_P);
	$("#ApellidoM").val(informacion[0].DatosGenerales[0].Apellido_M);
	$("#Correo").val(informacion[0].DatosGenerales[0].Correo);
	$("#CorreoPersonal").val(informacion[0].DatosGenerales[0].CorreoPersonal);
	$("#CVU").val(informacion[0].DatosGenerales[0].No_CVU);
	$("#TipoContratacion").val(ArregloTipoContratacion.filter(function (TC) { return TC.Tipo == informacion[0].DatosGenerales[0].TipoContratacion; })[0].id);
	$("#Institucion").val(informacion[0].DatosGenerales[0].Institucion);
	$("#TipoColaboracion").val(ArregloTipoColaboracion.filter(function (TC) { return TC.Tipo == informacion[0].DatosGenerales[0].TipoColaboracion; })[0].id);
	$("#Pais").val(informacion[0].DatosGenerales[0].Pais);
	$("#MesIngreso").val(informacion[0].DatosGenerales[0].Mes_Ingreso);
	$("#AnioIngreso").val(informacion[0].DatosGenerales[0].Anio_Ingreso);
	$("#MesSalida").val(informacion[0].DatosGenerales[0].Mes_Salida);
	$("#AnioSalida").val(informacion[0].DatosGenerales[0].Anio_Salida);
	for (let i = 0; i < informacion[0].DatosGenerales[0].LGACs.length; i++) {
		$('#lgac' + informacion[0].DatosGenerales[0].LGACs[i].Id_LGAC).attr('checked', true);
	}
	$("#IngresoNAB").val(informacion[0].DatosGenerales[0].Fecha_Ingreso_NAB);

	var tabla = "";
	for (let i = 0; i < informacion[0].DatosGenerales[0].CartasNAB.length; i++) {
		tabla = tabla + '<tr id="trCG' + informacion[0].DatosGenerales[0].CartasNAB[i].id + '">';
		tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="borrarCartaGuardada(\'' + informacion[0].DatosGenerales[0].CartasNAB[i].id + '\')" class="btn btn-danger btn-xs">Borrar</button></td>';
		tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="' + informacion[0].DatosGenerales[0].CartasNAB[i].Ruta_Archivo + '" target="_blank" rel="noopener noreferrer">' + informacion[0].DatosGenerales[0].CartasNAB[i].NombreArchivo + '</a></td>';
		tabla = tabla + '<td style="vertical-align:middle; text-align:center">';
		tabla = tabla + '<div style="padding-left:10px">';
		if (informacion[0].DatosGenerales[0].CartasNAB[i].Vigente == "on") {
			tabla = tabla + '<input class="form-check-input" style="margin-top:.2rem;" type="radio" name="EstadoCarta" id="CartaGuardada' + informacion[0].DatosGenerales[0].CartasNAB[i].id + '" value="' + informacion[0].DatosGenerales[0].CartasNAB[i].id + '" aria-label="Vigencia de Cartas" checked>';
		} else {
			tabla = tabla + '<input class="form-check-input" style="margin-top:.2rem;" type="radio" name="EstadoCarta" id="CartaGuardada' + informacion[0].DatosGenerales[0].CartasNAB[i].id + '" value="' + informacion[0].DatosGenerales[0].CartasNAB[i].id + '" aria-label="Vigencia de Cartas">';
		}
		tabla = tabla + '<label class="form-check-label" for="CartaGuardada' + informacion[0].DatosGenerales[0].CartasNAB[i].id + '">Vigente</label>';
		tabla = tabla + '</div>';
		tabla = tabla + '</td>';
		tabla = tabla + '</tr>';
	}
	$("#VistaCartasGuardadas").html(tabla);
	//console.log(ArregloTipoContratacion.filter(function (TC) { return TC.Tipo == informacion[0].DatosGenerales[0].TipoContratacion; }));
}

function setPreparacionAcademica() {
	for (let p = 0; p < informacion[0].PreparacionAcademica.length; p++) {
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
								cardEstudios += '<span class="alertError" id="alertPrepAcadTitulo' + ContadorPreparacionAcademicaGuardada + 'ProfModificar"></span>';
							cardEstudios += '</div>';
							cardEstudios += '<div class="form-group">';
								cardEstudios += '<input type="text" class="form-control" id="Universidad' + ContadorPreparacionAcademicaGuardada + '" name="Universidad" placeholder="Universidad o Institución" value="' + informacion[0].PreparacionAcademica[p].Universidad + '">';
								cardEstudios += '<span class="alertError" id="alertPrepAcadUniversidad' + ContadorPreparacionAcademicaGuardada + 'ProfModificar"></span>';
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
									cardEstudios += '<span class="alertError" id="alertPrepAcadLugar' + ContadorPreparacionAcademicaGuardada + 'ProfModificar"></span>';
								cardEstudios += '</div>';
							cardEstudios += '</div>';
							cardEstudios += '<div class="col-md-12" style="text-align: center;">';
								cardEstudios += '<button class="btn btn-danger btn-sm" onclick="EliminarRegistroEstudios(\'' + ContadorPreparacionAcademicaGuardada + '\')">Eliminar Registro</button>';
							cardEstudios += '</div>';
						cardEstudios += '</div>';
						cardEstudios += '<div class="col-md-6">';
							cardEstudios += '<label>Archivo Evidencia</label>';
							cardEstudios += '<span class="alertError" id="alertPrepAcadArchivo' + ContadorPreparacionAcademicaGuardada + 'ProfModificar"></span>';
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

function setSuperacionAcademica(){
	for (let p = 0; p < informacion[0].SuperacionAcademica.length; p++) {
		ContadorSuperacionAcademicaGuardada += 1;
		var cardSuperacion = '<div class="Cursos-form card" id="CardSAGuardada'+ContadorSuperacionAcademicaGuardada+'">';
			cardSuperacion += '<div data-toggle="collapse" style="cursor: pointer" data-target="#ModificarSuperacion'+ContadorSuperacionAcademicaGuardada+'">';
				cardSuperacion += '<i class="fas fa-angle-right"></i> '+informacion[0].SuperacionAcademica[p].Titulo;
			cardSuperacion += '</div>';
			cardSuperacion += '<div id="ModificarSuperacion'+ContadorSuperacionAcademicaGuardada+'" class="collapse show">'
				cardSuperacion += '<hr>';
				cardSuperacion += '<form class="form-group" action="#" name="SuperacionAcademicaGuardada">';
					cardSuperacion += '<div class="form-group">';
						cardSuperacion += '<label style="display:block;">Tipo de Documento</label>';
						for (let i = 0; i < TipoSuperacion.length; i++) {
							cardSuperacion += '<div class="form-check-inline">';
								cardSuperacion += '<label class="form-check-label" for="'+TipoSuperacion[i].Tipo+ContadorSuperacionAcademicaGuardada+'">';
								if(TipoSuperacion[i].id==informacion[0].SuperacionAcademica[p].Tipo_Documento){
									cardSuperacion += '<input type="radio" class="form-check-input" id="'+TipoSuperacion[i].Tipo+ContadorSuperacionAcademicaGuardada+'" name="Tipo_Documento" value="'+TipoSuperacion[i].id+'" onclick="SuperacionOtro(this, \''+ContadorSuperacionAcademicaGuardada+'\')" checked>'+TipoSuperacion[i].Tipo;
								}else{
									cardSuperacion += '<input type="radio" class="form-check-input" id="'+TipoSuperacion[i].Tipo+ContadorSuperacionAcademicaGuardada+'" name="Tipo_Documento" value="'+TipoSuperacion[i].id+'" onclick="SuperacionOtro(this, \''+ContadorSuperacionAcademicaGuardada+'\')">'+TipoSuperacion[i].Tipo;
								}
								cardSuperacion += '</label>';
							cardSuperacion += '</div>';
						}
						cardSuperacion += '<div class="form-check-inline">';
							cardSuperacion += '<input type="radio" class="form-check-input col-md-1" id="Otro'+ContadorSuperacionAcademicaGuardada+'" name="Tipo_Documento" value="0" onclick="SuperacionOtro(this, \''+ContadorSuperacionAcademicaGuardada+'\')">';
							cardSuperacion += '<input class="form-control form-control-sm col-md-10" type="text" disabled placeholder="Otro" id="TextOtro'+ContadorSuperacionAcademicaGuardada+'"  name="OpcionOtro">';
						cardSuperacion += '</div>';
						cardSuperacion += '<span class="alertError" id="alertSuperacionOpcionOtro'+ContadorSuperacionAcademicaGuardada+'ProfModificar"></span>';
					cardSuperacion += '</div>';
					cardSuperacion += '<div class="form-group">';
						cardSuperacion += '<input type="hidden" name="Contador" value="' + ContadorSuperacionAcademicaGuardada + '">';
						cardSuperacion += '<input type="hidden" name="IdRegistro" id="RegistroSuperacionID' + ContadorSuperacionAcademicaGuardada + '" value="' + informacion[0].SuperacionAcademica[p].id + '">';
						cardSuperacion += '<input type="text" class="form-control" id="Titulo'+ContadorSuperacionAcademicaGuardada+'" placeholder="Título" name="Titulo" value="' + informacion[0].SuperacionAcademica[p].Titulo + '">';
						cardSuperacion += '<span class="alertError" id="alertSuperacionTitulo'+ContadorSuperacionAcademicaGuardada+'ProfModificar"></span>';
					cardSuperacion += '</div>';
					cardSuperacion += '<div class="form-row">';
						cardSuperacion += '<div class="form-group col-md-4">';
							cardSuperacion += ' <select class="form-control" id="AnioSuperacion'+ContadorSuperacionAcademicaGuardada+'" name="Anio">';
							var myDate = new Date();
							var year = myDate.getFullYear();
							for(var i = year; i >= 1980; i--){
								cardSuperacion += '<option value="'+i+'">'+i+'</option>';
							}
							cardSuperacion += '</select>';
						cardSuperacion += '</div>';
						cardSuperacion += '<div class="form-group col-md-8">';
							cardSuperacion += '<input type="text" class="form-control" id="Periodo'+ContadorSuperacionAcademicaGuardada+'" name="Periodo" placeholder="Periodo" value="' + informacion[0].SuperacionAcademica[p].Periodo + '">';
							cardSuperacion += '<span class="alertError" id="alertSuperacionPeriodo'+ContadorSuperacionAcademicaGuardada+'ProfModificar"></span>';	
						cardSuperacion += '</div>';
					cardSuperacion += '</div>';
					cardSuperacion += '<div class="form-group">';
						cardSuperacion += '<textarea class="form-control" id="Descripcion'+ContadorSuperacionAcademicaGuardada+'" rows="3" placeholder="Descripción" name="Descripcion">'+ informacion[0].SuperacionAcademica[p].Descripcion +'</textarea>';
						cardSuperacion += '<span class="alertError" id="alertSuperacionDescripcion'+ContadorSuperacionAcademicaGuardada+'ProfModificar"></span>';
					cardSuperacion += '</div>';
					cardSuperacion += '<label>Archivo Evidencia</label>';
					cardSuperacion += '<span class="alertError" id="alertSuperacionArchivo'+ContadorSuperacionAcademicaGuardada+'ProfModificar"></span>';
					cardSuperacion += '<div class="container p-y-1 col-md-9">';
						cardSuperacion += '<div class="row m-b-1">';
							cardSuperacion += '<div class="col-sm-12">';
								cardSuperacion += '<div class="form-group inputDnD">';
									cardSuperacion += '<label class="sr-only" for="inputFile">File Upload</label>';
									cardSuperacion += '<input type="file" name="Archivo" class="form-control-file text-primary font-weight-bold" id="ArchivoSuperacion'+ContadorSuperacionAcademicaGuardada+'" accept="application/pdf" onchange="ControladorSupAcad(\''+ContadorSuperacionAcademicaGuardada+'\')" data-title="Arrastre y suelte el archivo">';
								cardSuperacion += '</div>';
							cardSuperacion += '</div>';
						cardSuperacion += '</div>';
					cardSuperacion += '</div>';
					cardSuperacion += '<div class="container col-md-12">';
						cardSuperacion += '<ul class="nav nav-tabs" id="ArchivosSuperacion' + ContadorSuperacionAcademicaGuardada + '" role="tablist">';
							cardSuperacion += '<li class="nav-item">';
								cardSuperacion += '<a class="nav-link" id="ArchivosCargadosSuperaion-tab' + ContadorSuperacionAcademicaGuardada + '" data-toggle="tab" href="#ArchivosCargadosSuperacion' + ContadorSuperacionAcademicaGuardada + '" role="tab" aria-controls="Archivos Cargados Superación Academica" aria-selected="true">Archivos Cargados</a>';
							cardSuperacion += '</li>';
							cardSuperacion += '<li class="nav-item">';
								cardSuperacion += '<a class="nav-link active" id="ArchivosGuardadosSuperacion-tab' + ContadorSuperacionAcademicaGuardada + '" data-toggle="tab" href="#ArchivosGuardadosSuperacion' + ContadorSuperacionAcademicaGuardada + '" role="tab" aria-controls="Archivos Guardados Superación Academica" aria-selected="false">Archivos Guardados</a>';
							cardSuperacion += '</li>';
						cardSuperacion += '</ul>';
						cardSuperacion += '<div class="tab-content" id="ArchivosSuperacionContent' + ContadorSuperacionAcademicaGuardada + '">';
							cardSuperacion += '<div class="tab-pane fade show active" id="ArchivosGuardadosSuperacion' + ContadorSuperacionAcademicaGuardada + '" role="tabpanel" aria-labelledby="ArchivosGuardadosSuperacion-tab' + ContadorSuperacionAcademicaGuardada + '">';
								cardSuperacion += '<table class="table table-sm">';
									cardSuperacion += '<thead>';
										cardSuperacion += '<tr><th>Archivos</th></tr>';
									cardSuperacion += '</thead>';
									cardSuperacion += '<tbody id="SuperacionGuardados' + ContadorSuperacionAcademicaGuardada + '">';
										cardSuperacion += '<tr>';
											cardSuperacion += '<td style="vertical-align:middle; text-align:center"><a href="' + informacion[0].SuperacionAcademica[p].Ruta_Archivo + '" target="_blank" rel="noopener noreferrer">' + informacion[0].SuperacionAcademica[p].NombreArchivo + '</a></td>';
										cardSuperacion += '</tr>';
									cardSuperacion += '</tbody>';
								cardSuperacion += '</table>';
							cardSuperacion += '</div>';
							cardSuperacion += '<div class="tab-pane fade" id="ArchivosCargadosSuperacion' + ContadorSuperacionAcademicaGuardada + '" role="tabpanel" aria-labelledby="ArchivosCargadosSuperacion-tab' + ContadorSuperacionAcademicaGuardada + '">'
								cardSuperacion += '<table class="table table-sm">';
									cardSuperacion += '<thead>';
										cardSuperacion += '<tr><th colspan="2">Archivos</th></tr>';
									cardSuperacion += '</thead>';
									cardSuperacion += '<tbody id="VistaPrevSuperacion' + ContadorSuperacionAcademicaGuardada + '">';
									cardSuperacion += '</tbody>';
								cardSuperacion += '</table>';
							cardSuperacion += '</div>';
						cardSuperacion += '</div>';
					cardSuperacion += '</div>';
					cardSuperacion += '<div class="col-md-12" style="text-align: center;">';
						cardSuperacion += '<button class="btn btn-danger btn-sm" onclick="EliminarRegistroSuperacion(\'' + ContadorSuperacionAcademicaGuardada + '\')">Eliminar Registro</button>';
					cardSuperacion += '</div>';		
				cardSuperacion += '</form>';
			cardSuperacion += '</div>';	
		cardSuperacion += '</div>';	

		$("#Cursos").append(cardSuperacion);
		$("#AnioSuperacion" + ContadorSuperacionAcademicaGuardada).val(informacion[0].PreparacionAcademica[p].Anio);
	}
	ContadorSuperacionAcademica = ContadorSuperacionAcademicaGuardada;
}

function setDistinciones(){
	var Distinciones=["PRODEP", "SNI"];
	for (let p = 0; p < informacion[0].Distinciones.length; p++) {
		ContadorDistincionGuardada += 1;
		
		var cardDistincion = '<div class="Distinciones-form card" id="CardDGuardada'+ContadorDistincionGuardada+'">';
			cardDistincion += '<div data-toggle="collapse" style="cursor: pointer" data-target="#ModificarDistinciones'+ContadorDistincionGuardada+'">';
				cardDistincion += '<i class="fas fa-angle-right"></i> '+informacion[0].Distinciones[p].Nombre_Distincion+' '+informacion[0].Distinciones[p].Anio;
			cardDistincion += '</div>';
			cardDistincion += '<div id="ModificarDistinciones'+ContadorDistincionGuardada+'" class="collapse show">'
				cardDistincion += '<hr>';
				cardDistincion += '<form class="form-group" name="DistincionesGuardadas">';
					cardDistincion += '<div class="form-group">';
						cardDistincion += '<label style="display:block;">Tipo de Documento</label>';
						var aux = false;
						for (let i = 0; i < Distinciones.length; i++) {
							if(Distinciones[i] == informacion[0].Distinciones[p].Nombre_Distincion){
								cardDistincion += '<div class="form-check-inline">';
									cardDistincion += '<label class="form-check-label" for="'+Distinciones[i]+ContadorDistincionGuardada+'">';
									cardDistincion += '<input type="radio" class="form-check-input" id="'+Distinciones[i]+ContadorDistincionGuardada+'" name="Nombre_Distincion" value="'+Distinciones[i]+'" onclick="DistincionOtro(this, \''+ContadorDistincionGuardada+'\')" checked>'+Distinciones[i];
								cardDistincion += '</div>';
								aux = true;
							}else{
								cardDistincion += '<div class="form-check-inline">';
									cardDistincion += '<label class="form-check-label" for="'+Distinciones[i]+ContadorDistincionGuardada+'">';
									cardDistincion += '<input type="radio" class="form-check-input" id="'+Distinciones[i]+ContadorDistincionGuardada+'" name="Nombre_Distincion" value="'+Distinciones[i]+'" onclick="DistincionOtro(this, \''+ContadorDistincionGuardada+'\')">'+Distinciones[i];
								cardDistincion += '</div>';
							}
						}
						if(aux==true){
							cardDistincion += '<div class="form-check-inline">';
								cardDistincion += '<input type="radio" class="form-check-input col-md-1" id="OtroDistincion'+ContadorDistincionGuardada+'" name="Nombre_Distincion" value="0" onclick="DistincionOtro(this, \''+ContadorDistincionGuardada+'\')">';
								cardDistincion += '<input class="form-control form-control-sm col-md-10" type="text" disabled placeholder="Otro" id="TextOtroDistincion'+ContadorDistincionGuardada+'"  name="OpcionOtro">';
							cardDistincion += '</div>';
						}else{
							cardDistincion += '<div class="form-check-inline">';
								cardDistincion += '<input type="radio" class="form-check-input col-md-1" id="OtroDistincion'+ContadorDistincionGuardada+'" name="Nombre_Distincion" value="0" onclick="DistincionOtro(this, \''+ContadorDistincionGuardada+'\')" checked>';
								cardDistincion += '<input class="form-control form-control-sm col-md-10" type="text" placeholder="Otro" id="TextOtroDistincion'+ContadorDistincionGuardada+'"  name="OpcionOtro" value="'+informacion[0].Distinciones[p].Nombre_Distincion+'">';
							cardDistincion += '</div>';
						}
						cardDistincion += '<span class="alertError" id="alertDistincionOpcionOtro'+ContadorDistincionGuardada+'ProfModificar"></span>';
					
					cardDistincion += '</div>';
					cardDistincion += '<div class="form-row">';
						cardDistincion += '<div class="form-group col-md-4">';
							cardDistincion += ' <select class="form-control" id="AnioDistincion'+ContadorDistincionGuardada+'" name="Anio">';
							var myDate = new Date();
							var year = myDate.getFullYear();
							for(var i = year; i >= 1980; i--){
								cardDistincion += '<option value="'+i+'">'+i+'</option>';
							}
							cardDistincion += '</select>';
						cardDistincion += '</div>';
						cardDistincion += '<div class="form-group col-md-8">';
							cardDistincion += '<input type="hidden" name="Contador" value="' + ContadorDistincionGuardada + '">';
							cardDistincion += '<input type="hidden" name="IdRegistro" id="RegistroDistincionID' + ContadorDistincionGuardada + '" value="' + informacion[0].Distinciones[p].id + '">';
							cardDistincion += '<input type="text" class="form-control" id="Periodo'+ContadorDistincionGuardada+'" name="Periodo" placeholder="Periodo" value="'+informacion[0].Distinciones[p].Periodo+'">';
							cardDistincion += '<span class="alertError" id="alertDistincionPeriodo'+ContadorDistincionGuardada+'ProfModificar"></span>';	
						cardDistincion += '</div>';
					cardDistincion += '</div>';
					cardDistincion += '<div class="form-group">';
						cardDistincion += '<textarea class="form-control" id="Descripcion'+ContadorDistincionGuardada+'" rows="3" placeholder="Descripción" name="Descripcion">'+informacion[0].Distinciones[p].Descripcion+'</textarea>';
						cardDistincion += '<span class="alertError" id="alertDistincionDescripcion'+ContadorDistincionGuardada+'ProfModificar"></span>';
					cardDistincion += '</div>';

					cardDistincion += '<label>Archivo Evidencia</label>';
					cardDistincion += '<span class="alertError" id="alertSuperacionArchivo'+ContadorDistincionGuardada+'ProfModificar"></span>';
					cardDistincion += '<div class="container p-y-1 col-md-9">';
						cardDistincion += '<div class="row m-b-1">';
							cardDistincion += '<div class="col-sm-12">';
								cardDistincion += '<div class="form-group inputDnD">';
									cardDistincion += '<label class="sr-only" for="inputFile">File Upload</label>';
									cardDistincion += '<input type="file" name="Archivo" class="form-control-file text-primary font-weight-bold" id="ArchivoDistincion'+ContadorDistincionGuardada+'" accept="application/pdf" onchange="ControladorDistincion(\''+ContadorDistincionGuardada+'\')" data-title="Arrastre y suelte el archivo">';
								cardDistincion += '</div>';
							cardDistincion += '</div>';
						cardDistincion += '</div>';
					cardDistincion += '</div>';


					cardDistincion += '<div class="container col-md-12">';
						cardDistincion += '<ul class="nav nav-tabs" id="ArchivosDistincion' + ContadorDistincionGuardada + '" role="tablist">';
							cardDistincion += '<li class="nav-item">';
								cardDistincion += '<a class="nav-link" id="ArchivosCargadosDistincion-tab' + ContadorDistincionGuardada + '" data-toggle="tab" href="#ArchivosCargadosDistincion' + ContadorDistincionGuardada + '" role="tab" aria-controls="Archivos Cargados Distincion" aria-selected="true">Archivos Cargados</a>';
							cardDistincion += '</li>';
							cardDistincion += '<li class="nav-item">';
								cardDistincion += '<a class="nav-link active" id="ArchivosGuardadosDistincion-tab' + ContadorDistincionGuardada + '" data-toggle="tab" href="#ArchivosGuardadosDistincion' + ContadorDistincionGuardada + '" role="tab" aria-controls="Archivos Guardados Distincion" aria-selected="false">Archivos Guardados</a>';
							cardDistincion += '</li>';
						cardDistincion += '</ul>';
						cardDistincion += '<div class="tab-content" id="ArchivosDistincionContent' + ContadorDistincionGuardada + '">';
							
							cardDistincion += '<div class="tab-pane fade show active" id="ArchivosGuardadosDistincion' + ContadorDistincionGuardada + '" role="tabpanel" aria-labelledby="ArchivosGuardadosDistincion-tab' + ContadorDistincionGuardada + '">';
								cardDistincion += '<table class="table table-sm">';
									cardDistincion += '<thead>';
										cardDistincion += '<tr><th>Archivos</th></tr>';
									cardDistincion += '</thead>';
									cardDistincion += '<tbody id="DistincionGuardados' + ContadorDistincionGuardada + '">';
										cardDistincion += '<tr>';
											cardDistincion += '<td style="vertical-align:middle; text-align:center"><a href="' + informacion[0].Distinciones[p].Ruta_Archivo + '" target="_blank" rel="noopener noreferrer">' + informacion[0].Distinciones[p].NombreArchivo + '</a></td>';
										cardDistincion += '</tr>';
									cardDistincion += '</tbody>';
								cardDistincion += '</table>';
							cardDistincion += '</div>';

							cardDistincion += '<div class="tab-pane fade" id="ArchivosCargadosDistincion' + ContadorDistincionGuardada + '" role="tabpanel" aria-labelledby="ArchivosCargadosDistincion-tab' + ContadorDistincionGuardada + '">'
								cardDistincion += '<table class="table table-sm">';
									cardDistincion += '<thead>';
										cardDistincion += '<tr><th colspan="2">Archivos</th></tr>';
									cardDistincion += '</thead>';
									cardDistincion += '<tbody id="VistaPrevDistincion' + ContadorDistincionGuardada + '">';
									cardDistincion += '</tbody>';
								cardDistincion += '</table>';
							cardDistincion += '</div>'
						cardDistincion += '</div>';
					cardDistincion += '</div>';
					cardDistincion += '<div class="col-md-12" style="text-align: center;">';
						cardDistincion += '<button class="btn btn-danger btn-sm" onclick="EliminarRegistroDistincion(\'' + ContadorDistincionGuardada + '\')">Eliminar Registro</button>';
					cardDistincion += '</div>';
				cardDistincion += '</form>';
			cardDistincion += '</div>';
		cardDistincion += '</div>';

		$("#Distinciones").append(cardDistincion);
		$("#AnioDistincion" + ContadorDistincionGuardada).val(informacion[0].Distinciones[p].Anio);
	}
	ContadorDistincion = ContadorDistincionGuardada;
}

function setTrayectoria(){
	for (let p = 0; p < informacion[0].Trayectoria.length; p++) {
		ContadorTrayectoriaGuardada += 1;
		
		var cardTrayectoria = '<div class="Trayectoria-form card" id="CardTPGuardada'+ContadorTrayectoriaGuardada+'">';
			cardTrayectoria += '<div data-toggle="collapse" style="cursor: pointer" data-target="#ModificarTrayectoria'+ContadorTrayectoriaGuardada+'">';
				cardTrayectoria += '<i class="fas fa-angle-right"></i> '+informacion[0].Trayectoria[p].Titulo;
			cardTrayectoria += '</div>';
			cardTrayectoria += '<div id="ModificarTrayectoria'+ContadorTrayectoriaGuardada+'" class="collapse show">'
				cardTrayectoria += '<hr>';	
				cardTrayectoria += '<form class="form-group" name="TrayectoriaProfesionalGuardada">';
					cardTrayectoria += '<div class="row">';
						cardTrayectoria += '<div class="col-md-6">';
							cardTrayectoria += '<div class="form-group">';
								cardTrayectoria += '<label style="display:block;">Trayectoria Profesional</label>';
								for (let i = 0; i < TipoTrayectoria.length; i++) {
									cardTrayectoria += '<div class="form-check-inline">';
										cardTrayectoria += '<label class="form-check-label" for="'+TipoTrayectoria[i].Tipo+ContadorTrayectoriaGuardada+'">';
											if(TipoTrayectoria[i].id==informacion[0].Trayectoria[p].Tipo_Documento){
												cardTrayectoria += '<input type="radio" class="form-check-input" id="'+TipoTrayectoria[i].Tipo+ContadorTrayectoriaGuardada+'" name="Tipo_Documento" value="'+TipoTrayectoria[i].id+'" checked onclick="TrayectoriaOtro(this, \''+ContadorTrayectoriaGuardada+'\')">'+TipoTrayectoria[i].Tipo;
											}else{
												cardTrayectoria += '<input type="radio" class="form-check-input" id="'+TipoTrayectoria[i].Tipo+ContadorTrayectoriaGuardada+'" name="Tipo_Documento" value="'+TipoTrayectoria[i].id+'" onclick="TrayectoriaOtro(this, \''+ContadorTrayectoriaGuardada+'\')">'+TipoTrayectoria[i].Tipo;
											}
										cardTrayectoria += '</label>';
									cardTrayectoria += '</div>';
								}
								cardTrayectoria += '<div class="form-check-inline">';
									cardTrayectoria += '<input type="radio" class="form-check-input col-md-1" id="OtroTrayectoria'+ContadorTrayectoriaGuardada+'" name="Tipo_Documento" value="0" onclick="TrayectoriaOtro(this, \''+ContadorTrayectoriaGuardada+'\')">';
									cardTrayectoria += '<input class="form-control form-control-sm col-md-10" type="text" disabled placeholder="Otro" id="TextOtroTrayectoria'+ContadorTrayectoriaGuardada+'"  name="OpcionOtro">';
								cardTrayectoria += '</div>';
								cardTrayectoria += '<span class="alertError" id="alertTrayectoriaOpcionOtro'+ContadorTrayectoriaGuardada+'ProfModificar"></span>';
							cardTrayectoria += '</div>';
							cardTrayectoria += '<div class="form-group">';
								cardTrayectoria += '<input type="hidden" name="Contador" value="' + ContadorTrayectoriaGuardada + '">';
								cardTrayectoria += '<input type="hidden" name="IdRegistro" id="RegistroTrayectoriaID' + ContadorTrayectoriaGuardada + '" value="' + informacion[0].Trayectoria[p].id + '">';
								cardTrayectoria += '<input type="text" class="form-control" id="Titulo'+ContadorTrayectoriaGuardada+'" placeholder="Título" name="Titulo" value="' + informacion[0].Trayectoria[p].Titulo + '">';
								cardTrayectoria += '<span class="alertError" id="alertTrayectoriaTitulo'+ContadorTrayectoriaGuardada+'ProfModificar"></span>';
							cardTrayectoria += '</div>';
							cardTrayectoria += '<div class="form-row">';
								cardTrayectoria += '<div class="form-group col-md-4">';
									cardTrayectoria += ' <select class="form-control" id="AnioTrayectoria'+ContadorTrayectoriaGuardada+'" name="Anio">';
									var myDate = new Date();
									var year = myDate.getFullYear();
									for(var i = year; i >= 1980; i--){
										cardTrayectoria += '<option value="'+i+'">'+i+'</option>';
									}
									cardTrayectoria += '</select>';
								cardTrayectoria += '</div>';
								cardTrayectoria += '<div class="form-group col-md-8">';
									cardTrayectoria += '<input type="text" class="form-control" id="Periodo'+ContadorTrayectoriaGuardada+'" name="Periodo" placeholder="Periodo" value="' + informacion[0].Trayectoria[p].Periodo + '">';
									cardTrayectoria += '<span class="alertError" id="alertTrayectoriaPeriodo'+ContadorTrayectoriaGuardada+'ProfModificar"></span>';	
								cardTrayectoria += '</div>';
							cardTrayectoria += '</div>';
							cardTrayectoria += '<div class="form-group">';
								cardTrayectoria += '<textarea class="form-control" id="Trayectoria'+ContadorTrayectoriaGuardada+'" rows="3" placeholder="Descripción" name="Descripcion">'+ informacion[0].Trayectoria[p].Descripcion +'</textarea>';
								cardTrayectoria += '<span class="alertError" id="alertTrayectoriaDescripcion'+ContadorTrayectoriaGuardada+'ProfModificar"></span>';
							cardTrayectoria += '</div>';
						cardTrayectoria += '</div>';

						cardTrayectoria += '<div class="col-md-6">';
							cardTrayectoria += '<label>Archivo Evidencia</label>';
							cardTrayectoria += '<span class="alertError" id="alertTrayectoriaArchivo' + ContadorTrayectoriaGuardada + 'ProfModificar"></span>';
							cardTrayectoria += '<div class="container p-y-1 col-md-9">';
								cardTrayectoria += '<div class="row m-b-1">';
									cardTrayectoria += '<div class="col-sm-12">';
										cardTrayectoria += '<div class="form-group inputDnD">';
											cardTrayectoria += '<label class="sr-only" for="inputFile">File Upload</label>';
											cardTrayectoria += '<input type="file" name="Archivo" class="form-control-file text-primary font-weight-bold" id="ArchivoTrayectoria' + ContadorTrayectoriaGuardada + '" accept="application/pdf" onchange="ControladorTrayectoria(\'' + ContadorTrayectoriaGuardada + '\')" data-title="Arrastre y suelte el archivo">';
										cardTrayectoria += '</div>';
									cardTrayectoria += '</div>';
								cardTrayectoria += '</div>';
							cardTrayectoria += '</div>';
							cardTrayectoria += '<div class="container col-md-12">';
								cardTrayectoria += '<ul class="nav nav-tabs" id="ArchivosTrayectoria' + ContadorTrayectoriaGuardada + '" role="tablist">';
									cardTrayectoria += '<li class="nav-item">';
										cardTrayectoria += '<a class="nav-link" id="ArchivosCargadosTrayectoria-tab' + ContadorTrayectoriaGuardada + '" data-toggle="tab" href="#ArchivosCargadosTrayectoria' + ContadorTrayectoriaGuardada + '" role="tab" aria-controls="Archivos Cargados Trayectoria" aria-selected="true">Archivos Cargados</a>';
									cardTrayectoria += '</li>';
									cardTrayectoria += '<li class="nav-item">';
										cardTrayectoria += '<a class="nav-link active" id="ArchivosGuardadosTrayectoria-tab' + ContadorTrayectoriaGuardada + '" data-toggle="tab" href="#ArchivosGuardadosTrayectoria' + ContadorTrayectoriaGuardada + '" role="tab" aria-controls="Archivos Guardados Trayectoria" aria-selected="false">Archivos Guardados</a>';
									cardTrayectoria += '</li>';
								cardTrayectoria += '</ul>';
								cardTrayectoria += '<div class="tab-content" id="ArchivosTrayectoriaContent' + ContadorTrayectoriaGuardada + '">';
									cardTrayectoria += '<div class="tab-pane fade show active" id="ArchivosGuardadosTrayectoria' + ContadorTrayectoriaGuardada + '" role="tabpanel" aria-labelledby="ArchivosGuardadosTrayectoria-tab' + ContadorTrayectoriaGuardada + '">';
										cardTrayectoria += '<table class="table table-sm">';
											cardTrayectoria += '<thead>';
												cardTrayectoria += '<tr><th>Archivos</th></tr>';
											cardTrayectoria += '</thead>';
											cardTrayectoria += '<tbody id="TrayectoriaGuardados' + ContadorTrayectoriaGuardada + '">';
												cardTrayectoria += '<tr>';
													cardTrayectoria += '<td style="vertical-align:middle; text-align:center"><a href="' + informacion[0].Trayectoria[p].Ruta_Archivo + '" target="_blank" rel="noopener noreferrer">' + informacion[0].Trayectoria[p].NombreArchivo + '</a></td>';
												cardTrayectoria += '</tr>';
											cardTrayectoria += '</tbody>';
										cardTrayectoria += '</table>';
									cardTrayectoria += '</div>';
									cardTrayectoria += '<div class="tab-pane fade" id="ArchivosCargadosTrayectoria' + ContadorTrayectoriaGuardada + '" role="tabpanel" aria-labelledby="ArchivosCargadosTrayectoria-tab' + ContadorTrayectoriaGuardada + '">'
										cardTrayectoria += '<table class="table table-sm">';
											cardTrayectoria += '<thead>';
												cardTrayectoria += '<tr><th colspan="2">Archivos</th></tr>';
											cardTrayectoria += '</thead>';
											cardTrayectoria += '<tbody id="VistaPrevTrayectoria' + ContadorTrayectoriaGuardada + '">';
											cardTrayectoria += '</tbody>';
										cardTrayectoria += '</table>';
									cardTrayectoria += '</div>'
								cardTrayectoria += '</div>';
							cardTrayectoria += '</div>';
							cardTrayectoria += '<div class="col-md-12" style="text-align: center;">';
								cardTrayectoria += '<button class="btn btn-danger btn-sm" onclick="EliminarRegistroTrayectoria(\'' + ContadorTrayectoriaGuardada + '\')">Eliminar Registro</button>';
							cardTrayectoria += '</div>';
						cardTrayectoria += '</div>';
					cardTrayectoria += '</div>';
				cardTrayectoria += '</form>';
			cardTrayectoria += '</div>';
		cardTrayectoria += '</div>';

		$("#Trayectorias").append(cardTrayectoria);
		$("#AnioTrayectoria" + ContadorTrayectoriaGuardada).val(informacion[0].Trayectoria[p].Anio);
	}
	ContadorTrayectoria = ContadorTrayectoriaGuardada;
}

function setPertenencia(){
	for (let p = 0; p < informacion[0].Pertenencias.length; p++) {
		ContadorPertenenciaGuardada += 1;
		
		var cardPertenencia = '<div class="Pertenencias-form card" id="CardPGuardada'+ContadorPertenenciaGuardada+'">';
			cardPertenencia += '<div data-toggle="collapse" style="cursor: pointer" data-target="#ModificarPertenencia'+ContadorPertenenciaGuardada+'">';
				cardPertenencia += '<i class="fas fa-angle-right"></i> '+informacion[0].Pertenencias[p].Nombre_Organizacion;
			cardPertenencia += '</div>';
			cardPertenencia += '<div id="ModificarPertenencia'+ContadorPertenenciaGuardada+'" class="collapse show">'
				cardPertenencia += '<hr>';	
				cardPertenencia += '<form class="form-group" action="" name="PertenenciasGuardadas">';
					cardPertenencia += '<div class="row">';
						
						cardPertenencia += '<div class="col-md-6">';
							cardPertenencia += '<div class="form-group">';
								cardPertenencia += '<input type="hidden" name="Contador" value="' + ContadorPertenenciaGuardada + '">';
								cardPertenencia += '<input type="hidden" name="IdRegistro" id="RegistroPertenenciaID' + ContadorPertenenciaGuardada + '" value="' + informacion[0].Pertenencias[p].id + '">';
								cardPertenencia += '<input type="text" class="form-control" id="OrganizacionPertenencias'+ContadorPertenenciaGuardada+'" name="Nombre_Organizacion" placeholder="Organización o Comité" value="'+informacion[0].Pertenencias[p].Nombre_Organizacion+'">';
								cardPertenencia += '<span class="alertError" id="alertPertenenciaNombre_Organizacion'+ContadorPertenenciaGuardada+'ProfModificar"></span>';
							cardPertenencia += '</div>';
							cardPertenencia += '<div class="form-row">';
								cardPertenencia += '<div class="form-group col-md-4">';
									cardPertenencia += ' <select class="form-control" id="AnioPertenencia'+ContadorPertenenciaGuardada+'" name="Anio">';
									var myDate = new Date();
									var year = myDate.getFullYear();
									for(var i = year; i >= 1980; i--){
										cardPertenencia += '<option value="'+i+'">'+i+'</option>';
									}
									cardPertenencia += '</select>';
								cardPertenencia += '</div>';
								cardPertenencia += '<div class="form-group col-md-8">';
									cardPertenencia += '<input type="text" class="form-control" id="Periodo'+ContadorPertenenciaGuardada+'" name="Periodo" placeholder="Periodo" value="'+informacion[0].Pertenencias[p].Periodo+'">';
									cardPertenencia += '<span class="alertError" id="alertPertenenciaPeriodo'+ContadorPertenenciaGuardada+'ProfModificar"></span>';	
								cardPertenencia += '</div>';
							cardPertenencia += '</div>';
							cardPertenencia += '<div class="form-group">';
								cardPertenencia += '<textarea class="form-control" id="Pertenencia'+ContadorPertenenciaGuardada+'" rows="3" placeholder="Descripción" name="Descripcion">'+informacion[0].Pertenencias[p].Descripcion+'</textarea>';
								cardPertenencia += '<span class="alertError" id="alertPertenenciaDescripcion'+ContadorPertenenciaGuardada+'ProfModificar"></span>';
							cardPertenencia += '</div>';
							cardPertenencia += '<div class="col-md-12" style="text-align: center;">';
								cardPertenencia += '<button class="btn btn-danger btn-sm" onclick="EliminarRegistroPertenencia(\'' + ContadorPertenenciaGuardada + '\')">Eliminar Registro</button>';
							cardPertenencia += '</div>';
						cardPertenencia += '</div>';


						cardPertenencia += '<div class="col-md-6">';
							cardPertenencia += '<label>Archivo Evidencia</label>';
							cardPertenencia += '<span class="alertError" id="alertPertenenciaArchivo' + ContadorPertenenciaGuardada + 'ProfModificar"></span>';
							cardPertenencia += '<div class="container p-y-1 col-md-9">';
								cardPertenencia += '<div class="row m-b-1">';
									cardPertenencia += '<div class="col-sm-12">';
										cardPertenencia += '<div class="form-group inputDnD">';
											cardPertenencia += '<label class="sr-only" for="inputFile">File Upload</label>';
											cardPertenencia += '<input type="file" name="Archivo" class="form-control-file text-primary font-weight-bold" id="ArchivoPertenencia' + ContadorPertenenciaGuardada + '" accept="application/pdf" onchange="ControladorPertenencia(\'' + ContadorPertenenciaGuardada + '\')" data-title="Arrastre y suelte el archivo">';
										cardPertenencia += '</div>';
									cardPertenencia += '</div>';
								cardPertenencia += '</div>';
							cardPertenencia += '</div>';
							cardPertenencia += '<div class="container col-md-12">';
								cardPertenencia += '<ul class="nav nav-tabs" id="ArchivosPertenencia' + ContadorPertenenciaGuardada + '" role="tablist">';
									cardPertenencia += '<li class="nav-item">';
										cardPertenencia += '<a class="nav-link" id="ArchivosCargadosPertenencia-tab' + ContadorPertenenciaGuardada + '" data-toggle="tab" href="#ArchivosCargadosPertenencia' + ContadorPertenenciaGuardada + '" role="tab" aria-controls="Archivos Cargados Pertenencia" aria-selected="true">Archivos Cargados</a>';
									cardPertenencia += '</li>';
									cardPertenencia += '<li class="nav-item">';
										cardPertenencia += '<a class="nav-link active" id="ArchivosGuardadosPertenencia-tab' + ContadorPertenenciaGuardada + '" data-toggle="tab" href="#ArchivosGuardadosPertenencia' + ContadorPertenenciaGuardada + '" role="tab" aria-controls="Archivos Guardados Pertenencia" aria-selected="false">Archivos Guardados</a>';
									cardPertenencia += '</li>';
								cardPertenencia += '</ul>';
								cardPertenencia += '<div class="tab-content" id="ArchivosPertenenciaContent' + ContadorPertenenciaGuardada + '">';
									cardPertenencia += '<div class="tab-pane fade show active" id="ArchivosGuardadosPertenencia' + ContadorPertenenciaGuardada + '" role="tabpanel" aria-labelledby="ArchivosGuardadosPertenencia-tab' + ContadorPertenenciaGuardada + '">';
										cardPertenencia += '<table class="table table-sm">';
											cardPertenencia += '<thead>';
												cardPertenencia += '<tr><th>Archivos</th></tr>';
											cardPertenencia += '</thead>';
											cardPertenencia += '<tbody id="PertenenciaGuardados' + ContadorPertenenciaGuardada + '">';
												cardPertenencia += '<tr>';
													cardPertenencia += '<td style="vertical-align:middle; text-align:center"><a href="' + informacion[0].Pertenencias[p].Ruta_Archivo + '" target="_blank" rel="noopener noreferrer">' + informacion[0].Pertenencias[p].NombreArchivo + '</a></td>';
												cardPertenencia += '</tr>';
											cardPertenencia += '</tbody>';
										cardPertenencia += '</table>';
									cardPertenencia += '</div>';
									cardPertenencia += '<div class="tab-pane fade" id="ArchivosCargadosPertenencia' + ContadorPertenenciaGuardada + '" role="tabpanel" aria-labelledby="ArchivosCargadosPertenencia-tab' + ContadorPertenenciaGuardada + '">'
										cardPertenencia += '<table class="table table-sm">';
											cardPertenencia += '<thead>';
												cardPertenencia += '<tr><th colspan="2">Archivos</th></tr>';
											cardPertenencia += '</thead>';
											cardPertenencia += '<tbody id="VistaPrevPertenencia' + ContadorPertenenciaGuardada + '">';
											cardPertenencia += '</tbody>';
										cardPertenencia += '</table>';
									cardPertenencia += '</div>'
								cardPertenencia += '</div>';
							cardPertenencia += '</div>';
						cardPertenencia += '</div>';


					cardPertenencia += '</div>';
				cardPertenencia += '</form>';
			cardPertenencia += '</div>';
		cardPertenencia += '</div>';

		$("#Pertenencias").append(cardPertenencia);
		$("#AnioPertenencia" + ContadorPertenenciaGuardada).val(informacion[0].Trayectoria[p].Anio);
	}
	ContadorPertenencias = ContadorPertenenciaGuardada;
}

//FUNCIONES CONTROLADOR DE CARTAS NAB
function ControladorCartasNAB() {
	var Archivos = document.getElementById('Archivos').files;

	for (let i = 0; i < Archivos.length; i++) {
		var contador = ArregloCartasNABCargadas.length;
		ArregloCartasNABCargadas[contador] = Archivos[i];
	}

	crearCopiasCatas();
}

function crearCopiasCatas() {
	var form = new FormData();

	for (var i = 0; i < ArregloCartasNABCargadas.length; i++) {
		form.append('cartas[]', ArregloCartasNABCargadas[i]);
	}
	//var archivo = new File([informacion[0].DatosGenerales[0].CartasNAB[0].NombreArchivo], informacion[0].DatosGenerales[0].CartasNAB[0].Ruta_Archivo, {type:'application/pdf'});

	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Auxiliar/CartasNAB",
		type: "POST",
		data: form,
		cache: false,
		contentType: false,
		processData: false,
		success: function (result) {
			var tabla = "";
			for (let i = 0; i < result.length; i++) {
				tabla = tabla + '<tr id="tr' + i + '">';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarArchivo(\'' + i + '\')" class="btn btn-danger btn-xs">Quitar</button></td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="../' + result[i][0] + '" target="_blank" rel="noopener noreferrer">' + result[i][1] + '</a></td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center">';
				tabla = tabla + '<div style="padding-left:10px">';
				if (i == 0) {
					tabla = tabla + '<input class="form-check-input" style="margin-top:.2rem;" type="radio" name="EstadoCarta" id="Carta' + i + '" value="' + i + '" aria-label="Vigencia de Cartas">';
				} else {
					tabla = tabla + '<input class="form-check-input" style="margin-top:.2rem;" type="radio" name="EstadoCarta" id="Carta' + i + '" value="' + i + '" aria-label="Vigencia de Cartas">';
				}
				tabla = tabla + '<label class="form-check-label" for="Carta' + i + '">Vigente</label>';
				tabla = tabla + '</div>';
				tabla = tabla + '</td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevCartas').innerHTML = tabla;
			var aux = document.getElementsByName("EstadoCarta");
			var checkvalor = null;
			for (let i = 0; i < aux.length; i++) {
				if (aux[i].checked == true) {
					checkvalor = true;
				}
			}
			if (checkvalor == null) {
				aux[0].checked = true;
			}
		}
	});
}

function quitarArchivo(id) {
	ArregloCartasNABCargadas.splice(id, 1);
	var idtr = "#tr" + id;
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Auxiliar/QuitarCartaNAB",
		type: "POST",
		data: { "id": id },
		success: function (result) {
			crearCopiasCatas();
			$(idtr).remove();
		}
	});
}

function borrarCartaGuardada(idArchivo) {
	ArregloCartasNABGuardadas = ArregloCartasNABGuardadas.filter(function (carta) { return carta.id != idArchivo }); // filtramos
	$("#trCG" + idArchivo).remove();
	var aux = document.getElementsByName("EstadoCarta");
	var checkvalor = null;
	for (let i = 0; i < aux.length; i++) {
		if (aux[i].checked == true) {
			checkvalor = true;
		}
	}
	try {
		if (checkvalor == null) {
			aux[0].checked = true;
		}
	} catch (error) {

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
	cardEstudios += '<span class="alertError" id="alertPrepAcadTitulo' + ContadorPreparacionAcademica + 'ProfRegistro"></span>';
	cardEstudios += '</div>';
	cardEstudios += '<div class="form-group">';
	cardEstudios += '<input type="text" class="form-control" id="Universidad' + ContadorPreparacionAcademica + '" name="Universidad" placeholder="Universidad o Institución">';
	cardEstudios += '<span class="alertError" id="alertPrepAcadUniversidad' + ContadorPreparacionAcademica + 'ProfRegistro"></span>';
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
	cardEstudios += '<span class="alertError" id="alertPrepAcadLugar' + ContadorPreparacionAcademica + 'ProfRegistro"></span>';
	cardEstudios += '</div>';
	cardEstudios += '</div>';
	cardEstudios += '</div>';
	cardEstudios += '<div class="col-md-6">';
	cardEstudios += '<label>Archivo Evidencia</label>';
	cardEstudios += '<span class="alertError" id="alertPrepAcadArchivo' + ContadorPreparacionAcademica + 'ProfRegistro"></span>';
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
		console.log(ArregloBorrarEstudios);
	} else {
		$('form[name="PreparacionAcademicaGuardada"]').submit(function (e) {
			e.preventDefault();
		});
	}


}

//FUNCIONES CONTROLADOR DE SUPERACION ACADEMICA
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
				tabla = tabla + '<tr id="VistaSuperacion' + posicion + '">';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarArchivoSuperacion(\'' + posicion + '\')" class="btn btn-danger btn-xs">Quitar</button></td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="../' + result[i][0] + '" target="_blank" rel="noopener noreferrer">' + result[i][1] + '</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevSuperacion'+posicion).innerHTML=tabla;
		}
	});
}

function quitarArchivoSuperacion(posicion) {
	$("#VistaSuperacion" + posicion).remove();
	document.getElementById('ArchivoSuperacion' + posicion).value = null;
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
	if(ContadorSuperacionAcademica<=ContadorSuperacionAcademicaGuardada){
		$("#btnQuitarSuperacion").prop('disabled', true);
	}
}

function SuperacionOtro(input, numSuperacion) {
	if(input.value!="0"){
		$( "#TextOtro"+numSuperacion ).prop( "disabled", true );
	}else{
		$( "#TextOtro"+numSuperacion ).prop( "disabled", false );
	}
}

function EliminarRegistroSuperacion(posicion) {
	var r = confirm("¿Esta seguro de eliminar este registro? \n (Se ejecutara al guardar los cambios)");
	if (r == true) {
		ArregloBorrarSuperacion.push($("#RegistroSuperacionID" + posicion).val());
		$("#CardSAGuardada" + posicion).remove();
		console.log(ArregloBorrarSuperacion);
	} else {
		$('form[name="SuperacionAcademicaGuardada"]').submit(function (e) {
			e.preventDefault();
		});
	}
}

//FUNCIONES CONTROLADOR DISTINCIONES
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
				tabla = tabla + '<tr id="VistaDistincion' + posicion + '">';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarArchivoDistincion(\'' + posicion + '\')" class="btn btn-danger btn-xs">Quitar</button></td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="../'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevDistincion'+posicion).innerHTML=tabla;
		}
	});
}

function DistincionOtro(input, numDistincion) {
	if(input.value!="0"){
		$( "#TextOtroDistincion"+numDistincion ).prop( "disabled", true );
	}else{
		$( "#TextOtroDistincion"+numDistincion ).prop( "disabled", false );
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
						cardDistincion += '<thead><tr><th colspan="2">Archivos</th></tr></thead>';
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
	if(ContadorDistinciones<=ContadorDistincionGuardada){
		$("#btnQuitarDistincion").prop('disabled', true);
	}
}

function quitarArchivoDistincion(posicion) {
	$("#VistaDistincion" + posicion).remove();
	document.getElementById('ArchivoDistincion' + posicion).value = null;
}

function EliminarRegistroDistincion(posicion) {
	var r = confirm("¿Esta seguro de eliminar este registro? \n (Se ejecutara al guardar los cambios)");
	if (r == true) {
		ArregloBorrarDistincion.push($("#RegistroDistincionID" + posicion).val());
		$("#CardDGuardada" + posicion).remove();
		console.log(ArregloBorrarDistincion);
	} else {
		$('form[name="DistincionesGuardada"]').submit(function (e) {
			e.preventDefault();
		});
	}
}

//CONTROLADOR TRAYECTORIAS
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
				tabla = tabla + '<tr id="VistaTrayectoria' + posicion + '">';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarArchivoTrayectoria(\'' + posicion + '\')" class="btn btn-danger btn-xs">Quitar</button></td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="../'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevTrayectoria'+posicion).innerHTML=tabla;
		}
	});
}

function TrayectoriaOtro(input, numTrayectoria) {
	if(input.value!="0"){
		$( "#TextOtroTrayectoria"+numTrayectoria ).prop( "disabled", true );
	}else{
		$( "#TextOtroTrayectoria"+numTrayectoria ).prop( "disabled", false );
	}
}

function añadirTrayectoria() {
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
									cardTrayectoria += '<tr><th colspan="2">Archivos</th></tr>';
								cardTrayectoria += '</thead>';
								cardTrayectoria += '<tbody id="VistaPrevTrayectoria'+ContadorTrayectoria+'">';
								cardTrayectoria += '</tbody>';
							cardTrayectoria += '</table>';
						cardTrayectoria += '</div>';
					cardTrayectoria += '</div>';
				cardTrayectoria += '</div>';
			cardTrayectoria += '</form>';
	cardTrayectoria += '</div>';
	
	$("#Trayectorias").append(cardTrayectoria);
}

function quitarTrayectoria(){
	var idDiv="#CardTP"+ContadorTrayectoria;
	$(idDiv).remove();
	ContadorTrayectoria -= 1;
	if(ContadorTrayectoria<=ContadorTrayectoriaGuardada){
		$("#btnQuitarTrayectoria").prop('disabled', true);
	}
}

function quitarArchivoTrayectoria(posicion) {
	$("#VistaTrayectoria" + posicion).remove();
	document.getElementById('ArchivoTrayectoria' + posicion).value = null;
}

function EliminarRegistroTrayectoria(posicion) {
	var r = confirm("¿Esta seguro de eliminar este registro? \n (Se ejecutara al guardar los cambios)");
	if (r == true) {
		ArregloBorrarTrayectoria.push($("#RegistroTrayectoriaID" + posicion).val());
		$("#CardTPGuardada" + posicion).remove();
		console.log(ArregloBorrarTrayectoria);
	} else {
		$('form[name="TrayectoriaProfesionalGuardada"]').submit(function (e) {
			e.preventDefault();
		});
	}
}

//CONTROLADOR PERTENENCIAS
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
				tabla = tabla + '<tr id="VistaPertenencia' + posicion + '">';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarArchivoPertenencia(\'' + posicion + '\')" class="btn btn-danger btn-xs">Quitar</button></td>';
					tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="../'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevPertenencia'+posicion).innerHTML=tabla;
		}
	});
}

function añadirPertenencias() {
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

function quitarPertenencias(){
	var idDiv="#CardP"+ContadorPertenencias;
	$(idDiv).remove();
	ContadorPertenencias -= 1;
	if(ContadorPertenencias<=ContadorPertenenciaGuardada){
		$("#btnQuitarPertenencias").prop('disabled', true);
	}
}

function quitarArchivoPertenencia(posicion) {
	$("#VistaPertenencia" + posicion).remove();
	document.getElementById('ArchivoPertenencia' + posicion).value = null;
}

function EliminarRegistroPertenencia(posicion) {
	var r = confirm("¿Esta seguro de eliminar este registro? \n (Se ejecutara al guardar los cambios)");
	if (r == true) {
		ArregloBorrarPertenencia.push($("#RegistroPertenenciaID" + posicion).val());
		$("#CardPGuardada" + posicion).remove();
	} else {
		$('form[name="PertenenciasGuardadas"]').submit(function (e) {
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
	ValidarSuperacion();
	ValidarDistincion();
	ValidarTrayectoria();
	ValidarPertenencia();
}

function ValidarDatosG() {
	validarContDatosGenerales = 1;
	var formDatosGenerales = new FormData(document.getElementById('FormDatosGenerales'));
	var id = informacion[0].DatosGenerales[0].id;
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Profesores/Modificar_Profesor/ValidarDatosGeneralesProfesor/" + id,
		data: formDatosGenerales,
		type: "POST",
		contentType: false,
		processData: false,
		success: function (resultado) {
			$("#alertNombreProfModificar").html("");
			$("#alertApellido_PProfModificar").html("");
			$("#alertApellido_MProfModificar").html("");
			$("#alertCorreoProfModificar").html("");
			$("#alertNo_CVUProfModificar").html("");
			$("#alertInstitucionProfModificar").html("");
			$("#alertPaisProfModificar").html("");
			$("#alertId_LGACProfRModificar").html("");

			if (resultado != true) {
				for (const atributo in resultado) {
					var mensajes = "";
					for (let i = 0; i < resultado[atributo].length; i++) {
						mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> ' + resultado[atributo][i];
						if (resultado[atributo].length - i != 1) {
							mensajes = mensajes + "<br>"
						}
					}
					$("#alert" + atributo + "ProfModificar").html(mensajes);
				}
				Bandera = false;
			}
			validarContDatosGenerales--;
			validarValidaciones();
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
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
			url: "/Profesores/Registrar_Profesor/ValidarPreparacionAcademicaProfesor",
			data: formPrepAcad,
			type: "POST",
			contentType: false,
			processData: false,
			success: function (resultado) {
				$("#alertPrepAcadTitulo" + parseInt(ContadorPreparacionAcademicaGuardada + i + 1) + "ProfRegistro").html("");
				$("#alertPrepAcadUniversidad" + parseInt(ContadorPreparacionAcademicaGuardada + i + 1) + "ProfRegistro").html("");
				$("#alertPrepAcadLugar" + parseInt(ContadorPreparacionAcademicaGuardada + i + 1) + "ProfRegistro").html("");
				$("#alertPrepAcadArchivo" + parseInt(ContadorPreparacionAcademicaGuardada + i + 1) + "ProfRegistro").html("");

				if (resultado != true) {
					for (const atributo in resultado) {
						var mensajes = "";
						for (let i = 0; i < resultado[atributo].length; i++) {
							mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> ' + resultado[atributo][i];
							if (resultado[atributo].length - i != 1) {
								mensajes = mensajes + "<br>"
							}
						}
						$("#alertPrepAcad" + atributo + parseInt(ContadorPreparacionAcademicaGuardada + i + 1) + "ProfRegistro").html(mensajes);
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
		url: "/Profesores/Modificar_Profesor/ValidarPreparacionAcademicaProfesor",
		data: formPrepAcad,
		type: "POST",
		contentType: false,
		processData: false,
		success: function (resultado) {
			var valor = formPrepAcad.get("Contador");

			$("#alertPrepAcadTitulo" + valor + "ProfModificar").html("");
			$("#alertPrepAcadUniversidad" + valor + "ProfModificar").html("");
			$("#alertPrepAcadLugar" + valor + "ProfModificar").html("");
			$("#alertPrepAcadArchivo" + valor + "ProfModificar").html("");

			if (resultado != true) {
				for (const atributo in resultado) {
					var mensajes = "";
					for (let i = 0; i < resultado[atributo].length; i++) {
						mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> ' + resultado[atributo][i];
						if (resultado[atributo].length - i != 1) {
							mensajes = mensajes + "<br>"
						}
					}
					$("#alertPrepAcad" + atributo + valor + "ProfModificar").html(mensajes);
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

function ValidarSuperacion(){
	var ArregloSupAcadGuardada = document.getElementsByName('SuperacionAcademicaGuardada');
	var ArregloSupAcad = document.getElementsByName('SuperacionAcademica');
	
	validarContSuperacionAcad = ArregloSupAcadGuardada.length + ArregloSupAcad.length;

	for (let i = 0; i < ArregloSupAcadGuardada.length; i++) {
		ValidarSuperacionGuardada(new FormData(ArregloSupAcadGuardada[i]))
	}
	
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
				
				$("#alertSuperacionOpcionOtro"+parseInt(ContadorSuperacionAcademicaGuardada + i + 1)+"ProfRegistro").html("");
				$("#alertSuperacionTitulo"+parseInt(ContadorSuperacionAcademicaGuardada + i + 1)+"ProfRegistro").html("");
				$("#alertSuperacionPeriodo"+parseInt(ContadorSuperacionAcademicaGuardada + i + 1)+"ProfRegistro").html("");
				$("#alertSuperacionDescripcion"+parseInt(ContadorSuperacionAcademicaGuardada + i + 1)+"ProfRegistro").html("");
				$("#alertSuperacionArchivo"+parseInt(ContadorSuperacionAcademicaGuardada + i + 1)+"ProfRegistro").html("");
				
				if(resultado!=true){
					for (const atributo in resultado) {
						var mensajes="";
						for (let i = 0; i < resultado[atributo].length; i++) {
							mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
							if(resultado[atributo].length-i!=1){
								mensajes = mensajes + "<br>"
							}
						}
						$("#alertSuperacion"+atributo+parseInt(ContadorSuperacionAcademicaGuardada + i + 1)+"ProfRegistro").html(mensajes);
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

async function ValidarSuperacionGuardada(formPrepAcad) {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Profesores/Modificar_Profesor/ValidarSuperacionAcademicaProfesor",
		data: formPrepAcad,
		type: "POST",
		contentType: false,
		processData: false,
		success: function (resultado) {
			var valor = formPrepAcad.get("Contador");
			
			$("#alertSuperacionOpcionOtro"+valor+"ProfModificar").html("");
			$("#alertSuperacionTitulo"+valor+"ProfModificar").html("");
			$("#alertSuperacionPeriodo"+valor+"ProfModificar").html("");
			$("#alertSuperacionDescripcion"+valor+"ProfModificar").html("");
			$("#alertSuperacionArchivo"+valor+"ProfModificar").html("");
				

			if (resultado != true) {
				for (const atributo in resultado) {
					var mensajes = "";
					for (let i = 0; i < resultado[atributo].length; i++) {
						mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> ' + resultado[atributo][i];
						if (resultado[atributo].length - i != 1) {
							mensajes = mensajes + "<br>"
						}
					}
					$("#alertSuperacion" + atributo + valor + "ProfModificar").html(mensajes);
				}
				Bandera = false;
			}
			validarContSuperacionAcad--;
			validarValidaciones();
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function ValidarDistincion(){
	var ArregloDistincionGuardada = document.getElementsByName('DistincionesGuardadas');
	var ArregloDistincion = document.getElementsByName('Distinciones');
	
	validarContDistinciones = ArregloDistincionGuardada.length + ArregloDistincion.length;

	for (let i = 0; i < ArregloDistincionGuardada.length; i++) {
		ValidarDistincionGuardada(new FormData(ArregloDistincionGuardada[i]))
	}
	
	for (let i = 0; i < ArregloDistincion.length; i++) {
		
		var formDistincion = new FormData(ArregloDistincion[i]);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Registrar_Profesor/ValidarDistincionProfesor",
			data: formDistincion,
			type: "POST",
			contentType: false,
			processData: false,
			success: function(resultado){
				
				$("#alertDistincionOpcionOtro"+parseInt(ContadorDistincionGuardada + i + 1)+"ProfRegistro").html("");
				$("#alertDistincionPeriodo"+parseInt(ContadorDistincionGuardada + i + 1)+"ProfRegistro").html("");
				$("#alertDistincionDescripcion"+parseInt(ContadorDistincionGuardada + i + 1)+"ProfRegistro").html("");
				$("#alertDistincionArchivo"+parseInt(ContadorDistincionGuardada + i + 1)+"ProfRegistro").html("");
				
				if(resultado!=true){
					for (const atributo in resultado) {
						var mensajes="";
						for (let i = 0; i < resultado[atributo].length; i++) {
							mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
							if(resultado[atributo].length-i!=1){
								mensajes = mensajes + "<br>"
							}
						}
						console.log("#alertDistincion"+atributo+parseInt(ContadorDistincionGuardada + i + 1)+"ProfRegistro");
						$("#alertDistincion"+atributo+parseInt(ContadorDistincionGuardada + i + 1)+"ProfRegistro").html(mensajes);
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

async function ValidarDistincionGuardada(formDistinciones) {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Profesores/Modificar_Profesor/ValidarDistincionesProfesor",
		data: formDistinciones,
		type: "POST",
		contentType: false,
		processData: false,
		success: function (resultado) {
			var valor = formDistinciones.get("Contador");
			
			$("#alertDistincionOpcionOtro"+valor+"ProfModificar").html("");
			$("#alertDistincionPeriodo"+valor+"ProfModificar").html("");
			$("#alertDistincionDescripcion"+valor+"ProfModificar").html("");
			$("#alertDistincionArchivo"+valor+"ProfModificar").html("");
				

			if (resultado != true) {
				for (const atributo in resultado) {
					var mensajes = "";
					for (let i = 0; i < resultado[atributo].length; i++) {
						mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> ' + resultado[atributo][i];
						if (resultado[atributo].length - i != 1) {
							mensajes = mensajes + "<br>"
						}
					}
					console.log("#alertDistincion" + atributo + valor + "ProfModificar");
					$("#alertDistincion" + atributo + valor + "ProfModificar").html(mensajes);
				}

				console.log("valor : "+valor);
				Bandera = false;
			}
			validarContDistinciones--;
			validarValidaciones();
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function ValidarTrayectoria(){
	var ArregloTrayectoriaGuardada = document.getElementsByName('TrayectoriaProfesionalGuardada');
	var ArregloTrayectoria = document.getElementsByName('TrayectoriaProfesional');
	
	validarContTrayectoria = ArregloTrayectoriaGuardada.length + ArregloTrayectoria.length;

	for (let i = 0; i < ArregloTrayectoriaGuardada.length; i++) {
		ValidarTrayectoriaGuardada(new FormData(ArregloTrayectoriaGuardada[i]))
	}
	
	for (let i = 0; i < ArregloTrayectoria.length; i++) {
		
		var formTrayectoria = new FormData(ArregloTrayectoria[i]);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Registrar_Profesor/ValidarTrayectoriaProfesor",
			data: formTrayectoria,
			type: "POST",
			contentType: false,
			processData: false,
			success: function(resultado){
				
				$("#alertTrayectoriaOpcionOtro"+parseInt(ContadorTrayectoriaGuardada + i + 1)+"ProfRegistro").html("");
				$("#alertTrayectoriaPeriodo"+parseInt(ContadorTrayectoriaGuardada + i + 1)+"ProfRegistro").html("");
				$("#alertTrayectoriaDescripcion"+parseInt(ContadorTrayectoriaGuardada + i + 1)+"ProfRegistro").html("");
				$("#alertTrayectoriaArchivo"+parseInt(ContadorTrayectoriaGuardada + i + 1)+"ProfRegistro").html("");
				
				if(resultado!=true){
					for (const atributo in resultado) {
						var mensajes="";
						for (let i = 0; i < resultado[atributo].length; i++) {
							mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
							if(resultado[atributo].length-i!=1){
								mensajes = mensajes + "<br>"
							}
						}
						console.log("#alertTrayectoria"+atributo+parseInt(ContadorTrayectoriaGuardada + i + 1)+"ProfRegistro");
						$("#alertTrayectoria"+atributo+parseInt(ContadorTrayectoriaGuardada + i + 1)+"ProfRegistro").html(mensajes);
					}
					Bandera = false;
				}
				validarContTrayectoria--;
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

async function ValidarTrayectoriaGuardada(formTrayectoria) {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Profesores/Modificar_Profesor/ValidarTrayectoriaProfesor",
		data: formTrayectoria,
		type: "POST",
		contentType: false,
		processData: false,
		success: function (resultado) {
			var valor = formTrayectoria.get("Contador");
			
			$("#alertTrayectoriaOpcionOtro"+valor+"ProfModificar").html("");
			$("#alertTrayectoriaPeriodo"+valor+"ProfModificar").html("");
			$("#alertTrayectoriaDescripcion"+valor+"ProfModificar").html("");
			$("#alertTrayectoriaArchivo"+valor+"ProfModificar").html("");
				

			if (resultado != true) {
				for (const atributo in resultado) {
					var mensajes = "";
					for (let i = 0; i < resultado[atributo].length; i++) {
						mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> ' + resultado[atributo][i];
						if (resultado[atributo].length - i != 1) {
							mensajes = mensajes + "<br>"
						}
					}
					$("#alertTrayectoria" + atributo + valor + "ProfModificar").html(mensajes);
				}

				Bandera = false;
			}
			validarContTrayectoria--;
			validarValidaciones();
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

function ValidarPertenencia(){
	var ArregloPertenenciaGuardada = document.getElementsByName('PertenenciasGuardadas');
	var ArregloPertenencia = document.getElementsByName('Pertenencias');
	
	validarContPertenencia = ArregloPertenenciaGuardada.length + ArregloPertenencia.length;

	for (let i = 0; i < ArregloPertenenciaGuardada.length; i++) {
		ValidarPertenenciaGuardada(new FormData(ArregloPertenenciaGuardada[i]))
	}
	
	for (let i = 0; i < ArregloPertenencia.length; i++) {
		
		var formPertenencia = new FormData(ArregloPertenencia[i]);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Registrar_Profesor/ValidarPertenenciaProfesor",
			data: formPertenencia,
			type: "POST",
			contentType: false,
			processData: false,
			success: function(resultado){
				
				$("#alertPertenenciaNombre_Organizacion"+parseInt(ContadorPertenenciaGuardada + i + 1)+"ProfRegistro").html("");
				$("#alertPertenenciaPeriodo"+parseInt(ContadorPertenenciaGuardada + i + 1)+"ProfRegistro").html("");
				$("#alertPertenenciaDescripcion"+parseInt(ContadorPertenenciaGuardada + i + 1)+"ProfRegistro").html("");
				$("#alertPertenenciaArchivo"+parseInt(ContadorPertenenciaGuardada + i + 1)+"ProfRegistro").html("");
				
				if(resultado!=true){
					for (const atributo in resultado) {
						var mensajes="";
						for (let i = 0; i < resultado[atributo].length; i++) {
							mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
							if(resultado[atributo].length-i!=1){
								mensajes = mensajes + "<br>"
							}
						}
						$("#alertPertenencia"+atributo+parseInt(ContadorPertenenciaGuardada + i + 1)+"ProfRegistro").html(mensajes);
					}
					Bandera = false;
				}
				validarContPertenencia--;
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

async function ValidarPertenenciaGuardada(formPertenencia) {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Profesores/Modificar_Profesor/ValidarPertenenciaProfesor",
		data: formPertenencia,
		type: "POST",
		contentType: false,
		processData: false,
		success: function (resultado) {
			var valor = formPertenencia.get("Contador");
			
			$("#alertPertenenciaNombre_Organizacion"+valor+"ProfModificar").html("");
			$("#alertPertenenciaPeriodo"+valor+"ProfModificar").html("");
			$("#alertPertenenciaDescripcion"+valor+"ProfModificar").html("");
			$("#alertPertenenciaArchivo"+valor+"ProfModificar").html("");
				

			if (resultado != true) {
				for (const atributo in resultado) {
					var mensajes = "";
					for (let i = 0; i < resultado[atributo].length; i++) {
						mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> ' + resultado[atributo][i];
						if (resultado[atributo].length - i != 1) {
							mensajes = mensajes + "<br>"
						}
					}
					$("#alertPertenencia" + atributo + valor + "ProfModificar").html(mensajes);
				}

				Bandera = false;
			}
			validarContPertenencia--;
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
	if (validarContDatosGenerales == 0 && validarContPreparacionAcad == 0 && validarContSuperacionAcad == 0 && validarContDistinciones == 0 && validarContTrayectoria==0 && validarContPertenencia==0) {
		if (Bandera == true) {
			console.log(Bandera);
			ModificarDatosGenerales();
		} else {
			console.log(Bandera);
			Bandera = true;
			$("#btnGuardar").prop('disabled', false);
			$("#btnCancelar").prop('disabled', false);
		}
	}
}

//OPERACIONES DATOS GENERALES
function ModificarDatosGenerales() {
	var formDatosGenerales = new FormData(document.getElementById('FormDatosGenerales'));
	var id = informacion[0].DatosGenerales[0].id;
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Profesores/Modificar_Profesor/ModificarProfesor/" + id,
		data: formDatosGenerales,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function (idProfesor) {
			ModificarCartasNAB(idProfesor);
			ModificarPreparacionAcademica(idProfesor);
			ModificarSuperacionAcademica(idProfesor);
			ModificarDistinciones(idProfesor);
			ModificarTrayectorias(idProfesor);
			ModificarPertenencias(idProfesor);

			alert("Los cambios han sido guardados");
			location.href="/Profesores";

		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

//OPERACIONES CARTAS NAB
async function ModificarCartasNAB(idProfesor) {
	var FechasRegistro = [];
	for (let i = ArregloCartasNABGuardadas.length - 1; i >= 0; i--) {
		let file = await fetch(ArregloCartasNABGuardadas[i].Ruta_Archivo).then(r => r.blob()).then(blobFile => new File([blobFile], ArregloCartasNABGuardadas[i].NombreArchivo, { type: 'application/pdf' }));
		ArregloCartasNABCargadas.unshift(file);
		FechasRegistro.unshift(ArregloCartasNABGuardadas[i].Fecha_Registro);
	}

	var f = new Date();
	var fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();

	var aux = document.getElementsByName("EstadoCarta");
	var checkvalor = "ninguno";
	for (let i = 0; i < aux.length; i++) {
		if (aux[i].checked == true) {
			checkvalor = i;
		}
	}

	var form = new FormData();
	for (let i = 0; i < FechasRegistro.length; i++) {
		form.append('fechasGuardadas[]', FechasRegistro[i]);
	}
	form.append('fechaRegistro', fecha);
	form.append('ArchivoVigente', checkvalor);
	form.append('idProfesor', idProfesor);
	for (var i = 0; i < ArregloCartasNABCargadas.length; i++) {
		form.append('cartas[]', ArregloCartasNABCargadas[i]);
	}
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Profesores/Modificar_Profesor/ModificarCartasNAB",
		type: "POST",
		data: form,
		cache: false,
		contentType: false,
		processData: false,
		success: function (result) {
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}

//OPERACIONES PREPARACION ACADEMICA
function ModificarPreparacionAcademica(idProfesor) {
	EliminarRegistrosEstudios();
	RegistrarEstudiosAcademicos(idProfesor);
	ModificarRegistrosEstudios(idProfesor);
}

function EliminarRegistrosEstudios() {
	if (ArregloBorrarEstudios.length != 0) {
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Modificar_Profesor/EliminarPreparacionAcademica",
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

function RegistrarEstudiosAcademicos(idProfesor) {
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
			success: function (resultado) {
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	}
}

function ModificarRegistrosEstudios(idProfesor) {
	var ArregloPrepAcad = document.getElementsByName('PreparacionAcademicaGuardada');
	for (let i = 0; i < ArregloPrepAcad.length; i++) {
		var formPrepAcad = new FormData(ArregloPrepAcad[i]);
		formPrepAcad.append("idProfesor", idProfesor);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Modificar_Profesor/ModificarPreparacionAcademica",
			data: formPrepAcad,
			type: "POST",
			contentType: false,
			processData: false,
			success: function (resultado) {
				console.log(resultado);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	}
}

//OPERACIONES SUPERACION ACADEMICA
function ModificarSuperacionAcademica(idProfesor) {
	EliminarRegistrosSuperacion();
	RegistrarSuperacionAcademica(idProfesor);
	ModificarRegistrosSuperacion(idProfesor);
}

function EliminarRegistrosSuperacion() {
	if (ArregloBorrarSuperacion.length != 0) {
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Modificar_Profesor/EliminarSuperacionAcademica",
			data: { "Ids": ArregloBorrarSuperacion },
			type: "POST",
			success: function (resultado) {
				console.log(resultado);
			}
		});
	} else {
		console.log("nada para borrar");
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

function ModificarRegistrosSuperacion(idProfesor) {
	var ArregloPrepAcad = document.getElementsByName('SuperacionAcademicaGuardada');
	for (let i = 0; i < ArregloPrepAcad.length; i++) {
		var formPrepAcad = new FormData(ArregloPrepAcad[i]);
		formPrepAcad.append("idProfesor", idProfesor);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Modificar_Profesor/ModificarSuperacionAcademica",
			data: formPrepAcad,
			type: "POST",
			contentType: false,
			processData: false,
			success: function (resultado) {
				console.log(resultado);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	}
}

//OPERACIONES DISTINCION
function ModificarDistinciones(idProfesor){
	EliminarRegistrosDistincion();
	RegistrarDistincion(idProfesor);
	ModificarRegistrosDistincion(idProfesor);
}

function EliminarRegistrosDistincion() {
	if (ArregloBorrarDistincion.length != 0) {
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Modificar_Profesor/EliminarDistincion",
			data: { "Ids": ArregloBorrarDistincion },
			type: "POST",
			success: function (resultado) {
				console.log(resultado);
			}
		});
	} else {
		console.log("nada para borrar");
	}
}

function RegistrarDistincion(idProfesor) {
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

function ModificarRegistrosDistincion(idProfesor) {
	var ArregloDistinciones = document.getElementsByName('DistincionesGuardadas');
	for (let i = 0; i < ArregloDistinciones.length; i++) {
		var formDistinciones = new FormData(ArregloDistinciones[i]);
		formDistinciones.append("idProfesor", idProfesor);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Modificar_Profesor/ModificarDistincion",
			data: formDistinciones,
			type: "POST",
			contentType: false,
			processData: false,
			success: function (resultado) {
				console.log(resultado);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	}
}

//OPERACIONES TRAYECTORIA
function ModificarTrayectorias(idProfesor){
	EliminarRegistrosTrayectoria();
	RegistrarTrayectoria(idProfesor);
	ModificarRegistrosTrayectoria(idProfesor);
}

function EliminarRegistrosTrayectoria() {
	if (ArregloBorrarTrayectoria.length != 0) {
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Modificar_Profesor/EliminarTrayectoria",
			data: { "Ids": ArregloBorrarTrayectoria },
			type: "POST",
			success: function (resultado) {
				console.log(resultado);
			}
		});
	} else {
		console.log("nada para borrar");
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

function ModificarRegistrosTrayectoria(idProfesor) {
	var ArregloTrayectoria = document.getElementsByName('TrayectoriaProfesionalGuardada');
	for (let i = 0; i < ArregloTrayectoria.length; i++) {
		var formTrayectoria = new FormData(ArregloTrayectoria[i]);
		formTrayectoria.append("idProfesor", idProfesor);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Modificar_Profesor/ModificarTrayectoria",
			data: formTrayectoria,
			type: "POST",
			contentType: false,
			processData: false,
			success: function (resultado) {
				console.log(resultado);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	}
}

//OPERACIONES PERTENENCIA
function ModificarPertenencias(idProfesor){
	EliminarRegistrosPertenencia();
	RegistrarPertenencia(idProfesor);
	ModificarRegistrosPertenencia(idProfesor);
}

function EliminarRegistrosPertenencia() {
	if (ArregloBorrarPertenencia.length != 0) {
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Modificar_Profesor/EliminarPertenencia",
			data: { "Ids": ArregloBorrarPertenencia },
			type: "POST",
			success: function (resultado) {
				console.log(resultado);
			}
		});
	} else {
		console.log("nada para borrar");
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
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	}
}

function ModificarRegistrosPertenencia(idProfesor) {
	var ArregloPertenencia = document.getElementsByName('PertenenciasGuardadas');
	for (let i = 0; i < ArregloPertenencia.length; i++) {
		var formPertenencia = new FormData(ArregloPertenencia[i]);
		formPertenencia.append("idProfesor", idProfesor);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "/Profesores/Modificar_Profesor/ModificarPertenencia",
			data: formPertenencia,
			type: "POST",
			contentType: false,
			processData: false,
			success: function (resultado) {
				console.log(resultado);
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










