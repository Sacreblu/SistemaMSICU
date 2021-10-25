var validarContDatosGenerales = 0;

var arregloPaises=[];

var Bandera = true;

window.onload = function () {
	initializeConvenio();
};

function initializeConvenio() {
	limpiarTMP();
	console.log(informacion);
	
	getPaises();
	getSectores();
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
	var valor = informacion.idSector;
	
	switch (valor) {
		case 5:
			$('#divDependencia').css("display","none");
			$('#divNombre').css("display","block");
			$('#divAcronimo').css("display","block");

			$('#NombreCongreso').val(informacion.NombreCongreso);
			$('#Acronimo').val(informacion.AcronimoCongreso);
			break;
		case 4:
			$('#divNombre').css("display","none");
			$('#divAcronimo').css("display","none");
			$('#divDependencia').css("display","block");
			$('#Dependencia').val(informacion.Dependencia);
			break;
		default:
			$('#divNombre').css("display","none");
			$('#divAcronimo').css("display","none");
			$('#divDependencia').css("display","none");
			break;
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

function autocompletePaises(arreglo) {
	$( "#Pais" ).autocomplete({
		source: arreglo
	});
}

function getSectores() {
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "/Auxiliar/Sectores",
		type: "POST",
		dataType: "json",
		success: function(resultado){
			var cadena="";
			for (let i = 0; i < resultado.length; i++) {
				cadena+='<div class="form-check-inline">';
					cadena+='<label class="form-check-label" for="Sector'+resultado[i].id+'">';
						if (i+1==informacion.idSector) {
							cadena+='<input type="radio" class="form-check-input" id="Sector'+resultado[i].id+'" name="Sector" value="'+resultado[i].id+'" checked>'+resultado[i].Sector;
						}else{
							cadena+='<input type="radio" class="form-check-input" id="Sector'+resultado[i].id+'" name="Sector" value="'+resultado[i].id+'">'+resultado[i].Sector;
						}
					cadena+='</label>';
				cadena+='</div>';
			}
			$("#setSectores").html(cadena);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
			location.reload();
		}
	});
}

function ControladorMovilidad(){
	var valor = $('#Sector').val();
	
	switch (valor) {
		case "5":
			$('#divDependencia').css("display","none");
			$('#divNombre').css("display","block");
			$('#divAcronimo').css("display","block");
			break;
		case "4":
			$('#divNombre').css("display","none");
			$('#divAcronimo').css("display","none");
			$('#divDependencia').css("display","block");
			break;
		default:
			$('#divNombre').css("display","none");
			$('#divAcronimo').css("display","none");
			$('#divDependencia').css("display","none");
			break;
	}
}

//FUNCIONES PARA ARCHIVO Convenio
function ControladorConvenio(){
	var Archivo = document.getElementById('ArchivoConvenio').files;
	var form = new FormData();
	form.append('ArchivoEvidencia[]', Archivo[0]);
	form.append('idPosicion', "0");
	form.append('TipoEvidencia', "ArchivoConvenio");
	
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
				tabla = tabla + '<tr id="VistaArchivoConvenio">';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><button type="button" onclick="quitarArchivoConvenio()" class="btn btn-danger btn-xs">Quitar</button></td>';
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="../'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
				tabla = tabla + '</tr>';
			}
			document.getElementById('VistaPrevConvenio').innerHTML=tabla;
		}
	});
}

function quitarArchivoConvenio() {
	var idDiv = "#VistaArchivoConvenio";
	$(idDiv).remove();
	document.getElementById('ArchivoConvenio').value = null;
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
		url: "/Convenios_Movilidad/Modificar_Convenios_Movilidad/ValidarDatosGeneralesConvenio/" + id,
		data: formDatosGenerales,
		type: "POST",
		contentType: false,
		processData: false,
		success: function(resultado){
			$("#alertNombreCongresoModificar").html("");
			$("#alertDependenciaModificar").html("");
			$("#alertAcronimoModificar").html("");
			$("#alertFechaComienzoModificar").html("");
			$("#alertFechaConclusionModificar").html("");
			$("#alertCiudadModificar").html("");
			$("#alertPaisModificar").html("");
			$("#alertInstitucionModificar").html("");
			$("#alertArchivoConvenioModificar").html("");

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
		url:  "/Convenios_Movilidad/Modificar_Convenios_Movilidad/ModificarDG/" + id,
		data: formDatosGenerales,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(resultado){
			alert("Convenio de Movilidad Modificado");
			location.href="/Convenios_Movilidad";
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










