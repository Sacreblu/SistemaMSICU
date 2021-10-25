var validarContDatosGenerales = 0;

var arregloPaises=[];

var Bandera = true;

window.onload = function() {
	initializeConvenio();
};

function initializeConvenio() {
    limpiarTMP();

	getPaises();

	$('#Sector').on('change', function() {
		ControladorMovilidad();
	});
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

function ControladorMovilidad(){
	var valor = $('#Sector').val();
	
	switch (valor) {
		case "5":
			$('#divDependencia').css("display","none");
			$('#divNombre').css("display","block");
			$('#divAcronimo').css("display","block");
			$('#Dependencia').val("");
			break;
		case "4":
			$('#divNombre').css("display","none");
			$('#divAcronimo').css("display","none");
			$('#divDependencia').css("display","block");
			$('#Acronimo').val("");
			$('#NombreCongreso').val("");		
			break;
		default:
			$('#divNombre').css("display","none");
			$('#divAcronimo').css("display","none");
			$('#divDependencia').css("display","none");
			
			$('#Dependencia').val("");
			$('#Acronimo').val("");
			$('#NombreCongreso').val("");			
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
				tabla = tabla + '<td style="vertical-align:middle; text-align:center"><a href="'+result[i][0]+'" target="_blank" rel="noopener noreferrer">'+result[i][1]+'</a></td>';
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
		url: "/Convenios_Movilidad/Registrar_Convenios_Movilidad/ValidarDatosGeneralesConvenio",
		data: formDatosGenerales,
		type: "POST",
		contentType: false,
		processData: false,
		success: function(resultado){
			$("#alertNombreCongresoRegistro").html("");
			$("#alertDependenciaRegistro").html("");
			$("#alertAcronimoRegistro").html("");
			$("#alertFechaComienzoRegistro").html("");
			$("#alertFechaConclusionRegistro").html("");
			$("#alertCiudadRegistro").html("");
			$("#alertPaisRegistro").html("");
			$("#alertInstitucionRegistro").html("");
			$("#alertArchivoConvenioRegistro").html("");

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
		url: "/Convenios_Movilidad/Registrar_Convenios_Movilidad/RegistrarDG",
		data: formDatosGenerales,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(resultado){
			alert("Convenio de Movilidad Registrado");
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