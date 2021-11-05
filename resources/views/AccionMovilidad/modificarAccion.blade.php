@extends('layouts.Plantilla')

<link rel="stylesheet" href="/css/AccionesMovilidad.css">
<script src="/js/AccionMovilidad/ModificarAccion.js" type="text/javascript"></script>

<script>
    var informacion = @json($informacion);
</script>

<div class="Contenedor">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{url('/Acciones_Movilidad')}}">Movilidad y Congresos</a></li>
            <li class="breadcrumb-item active" aria-current="page">Modificar Movilidad y Congresos</li>
        </ol>
    </nav>
    <div class="container">
        <div class="btn-formRegistro">
            <button type="button" id="btnRegistrar" class="btn btn-success btn-sm" style="margin-right:10px" onclick="EjecutarValidaciones()">Guardar Cambios</button>
            <button type="button" id="btnCancelar" class="btn btn-light btn-sm" onclick="Cancelar()" style="margin-left:10px">Cancelar</button>
        </div>
    </div>
    <div class="tabs-container">
        <form action="" class="form-group" id="FormDatosGenerales">
            <div class="form-row" style="padding: 0 30px">
                <div class="col-md-6">
                    
                    <div class="form-group" style="text-align: left;">
                        <label for="NombreConvenio">Convenio de Movilidad Asociado</label>
                        <input type="text" class="form-control" onchange="ControladorConvenio()" id="NombreConvenio" name="NombreConvenio" value="{{$informacion->Nombre_Clave}}">
                        <input type="hidden" id="IdConvenio" name="IdConvenio" value="{{$informacion->IdConvenio}}">
                        <input type="hidden" id="IdSector" name="IdSector" value="{{$informacion->Sector}}">
                        <span class="alertError" id="alertIdConvenioModificar"></span>
                        <span class="alertError" id="alertNombreConvenioModificar"></span>
                    </div>

                    <div class="form-group" style="text-align: left;">
                        <label for="NombreEstudiante">Nombre de Estudiante</label>
                        <input type="text" class="form-control" onchange="ControladorEstudiante()" id="NombreEstudiante" name="NombreEstudiante" value="{{$informacion->Nombre}} {{$informacion->Apellido_P}} {{$informacion->Apellido_M}}">
                        <input type="hidden" id="IdEstudiante" name="IdEstudiante" value="{{$informacion->IdEstudiante}}">
                        <span class="alertError" id="alertIdEstudianteModificar"></span>
                        <span class="alertError" id="alertNombreEstudianteModificar"></span>
                    </div>

                    <div class="form-group" style="text-align: left;">
                        <label for="InstitucionDestino">Institución Destino</label>
                        <input type="text" class="form-control" id="InstitucionDestino" name="InstitucionDestino" value="{{$informacion->InstitucionDestino}}">
                        <span class="alertError" id="alertInstitucionDestinoModificar"></span>
                    </div>

                    <div id="divInstOrigen" class="form-group" style="text-align: left; display:none;">
                        <label for="InstitucionOrigen">Institución Origen</label>
                        <input type="text" class="form-control" id="InstitucionOrigen" name="InstitucionOrigen" value="{{$informacion->InstitucionOrigen}}">
                        <span class="alertError" id="alertInstitucionOrigenModificar"></span>
                    </div>

                    <div id="divProgDestino" class="form-group" style="text-align: left; display:none;">
                        <label for="ProgramaDestino">Programa Educativo Destino</label>
                        <input type="text" class="form-control" id="ProgramaDestino" name="ProgramaDestino" value="{{$informacion->ProgramaDestino}}">
                        <span class="alertError" id="alertProgramaDestinoModificar"></span>
                    </div>

                    <div id="divProgOrigen" class="form-group" style="text-align: left; display:none;">
                        <label for="ProgramaOrigen">Programa Educativo Origen</label>
                        <input type="text" class="form-control" id="ProgramaOrigen" name="ProgramaOrigen" value="{{$informacion->ProgramaOrigen}}">
                        <span class="alertError" id="alertProgramaOrigenModificar"></span>
                    </div>
                </div>
                <div class="col-md-6">
                    
                    <div id="divSelectTipo" class="form-group" style="text-align: left; display:none;">
                        <label for="tipoM">Tipo de Movilidad</label>
                        <select class="form-control" id="tipoM" name="tipoM" onchange="ControladorTipoMov()">
                            <Option value="0">Selecciona el tipo de estancia academica (Opcional)</Option>
                            <Option value="1">Estancia desde la MSICU</Option>
                            <Option value="2">Estancia hacia la MSICU</Option>
                        </select>
                    </div>
                    
                    <div id="divPeriodos" class="row" style="display:none;">
                        <div class="form-group col-md-6" style="text-align: left;">
                            <label for="PeriodoComienzo">Periodo de Comienzo</label>
                            <input type="month" class="form-control" id="PeriodoComienzo" name="PeriodoComienzo" value="{{substr($informacion->PeriodoInicio, 0, 7)}}">
                            <span class="alertError" id="alertPeriodoComienzoModificar"></span>
                        </div>
                        <div class="form-group col-md-6" style="text-align: left;">
                            <label for="PeriodoConclusion">Periodo de Conclusión</label>
                            <input type="month" class="form-control" id="PeriodoConclusion" name="PeriodoConclusion" value="{{substr($informacion->PeriodoConclusion, 0, 7)}}">
                            <span class="alertError" id="alertPeriodoConclusionModificar"></span>
                        </div>
                    </div>

                    <div id="divDependDestino" class="form-group" style="text-align: left; display:none;">
                        <label for="DependenciaDestino">Dependencia Destino</label>
                        <input type="text" class="form-control" id="DependenciaDestino" name="DependenciaDestino" value="{{$informacion->DependenciaDestino}}">
                        <span class="alertError" id="alertDependenciaDestinoModificar"></span>
                    </div>

                    <div id="divDependOrigen" class="form-group" style="text-align: left; display:none;">
                        <label for="DependenciaOrigen">Dependencia Origen</label>
                        <input type="text" class="form-control" id="DependenciaOrigen" name="DependenciaOrigen" value="{{$informacion->DependenciaOrigen}}">
                        <span class="alertError" id="alertDependenciaOrigenModificar"></span>
                    </div>
                    
                    <div class="form-group" style="text-align: left;">
                        <label for="Motivo">Motivo</label>
                        <textarea class="form-control" id="Motivo" name="Motivo" rows=4">{{$informacion->Motivo}}</textarea>
                        <span class="alertError" id="alertMotivoModificar"></span>
                    </div>
                                    <div class="container" id="divArchivoCongreso" style="display:none">
                                        <div class="form-group" style="text-align: left;">
                                            <label for="">Producto de Congreso</label>
                                        </div>
                                        <ul class="nav nav-tabs" id="ArchivoCongreso-tab" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="CargarArchivoCongreso-tab" data-toggle="tab" href="#CargarArchivoCongreso" role="tab" aria-controls="" aria-selected="true">Cargar Archivo</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="VistaArchivoCongreso-tab" data-toggle="tab" href="#VistaArchivoCongreso" role="tab" aria-controls="" aria-selected="false">Vista Previa</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="VistaArchivoGuardado-tab" data-toggle="tab" href="#VistaArchivoGuardado" role="tab" aria-controls="" aria-selected="false">Archivos Guardados</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content" id="ArchivoArchivoCongreso-content">
                                            <div class="tab-pane fade show active" id="VistaArchivoGuardado" role="tabpanel" aria-labelledby="">
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr><th>Archivo</th></tr>
                                                    </thead>
                                                    <tbody id="VistaPrevArchivoGuardado"><table class="table table-sm">
                                                        <tr>
                                                            <td style="vertical-align:middle; text-align:center"><a href="{{$informacion->RutaArchivoCongreso}}" target="_blank" rel="noopener noreferrer"> {{$informacion->NombreArchivoCongreso}} </a></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="tab-pane fade" id="CargarArchivoCongreso" role="tabpanel" aria-labelledby="">
                                                <br>
                                                <div style="text-align:center" class="containerInputfile container p-y-1 col-md-9">
                                                    <div class="row m-b-1">
                                                        <div class="col-sm-12">
                                                            <div class="form-group inputDnD">
                                                                <label class="sr-only" for="inputFile">File Upload</label>
                                                                <input type="file" name="ArchivoCongreso" class="form-control-file text-primary font-weight-bold" id="ArchivoCongreso" accept="application/pdf" onchange="ControladorArchivoCongreso()" data-title="Arrastre y suelte el archivo">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="VistaArchivoCongreso" role="tabpanel" aria-labelledby="">
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr><th colspan="2">Archivos</th></tr>
                                                    </thead>
                                                    <tbody id="VistaPrevArchivoCongreso">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                </div>
            </div>
            <div id="divArchivos" class="form-row" style="padding: 0 30px; display:none">
            
                    <div class="container">
                        <ul class="nav nav-tabs" id="MovilidadEvidencias" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="ArchivosGuardados-tab" data-toggle="tab" href="#ArchivosGuardados" role="tab" aria-controls="" aria-selected="false">Archivos Guardados</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="MovilidadComienzo-tab" data-toggle="tab" href="#MovilidadComienzo" role="tab" aria-controls="" aria-selected="true">Comienzo de Movilidad</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="MovilidadTerminacion-tab" data-toggle="tab" href="#MovilidadTerminacion" role="tab" aria-controls="" aria-selected="false">Conclusión de Movilidad</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="MovilidadEvidenciasContent">
                            <div class="tab-pane fade show active" id="ArchivosGuardados" role="tabpanel" aria-labelledby="ArchivosGuardados-tab">
                                <br>
                                <div class="row">
                                    <div class="container col-md-4">
                                        <div class="form-group" style="text-align: left;">
                                            <label for="">Formato de Movilidad</label>
                                        </div>
                                        <table class="table table-sm">
                                            <thead>
                                                <tr><th>Archivo</th></tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="vertical-align:middle; text-align:center"><a href="{{$informacion->RutaFormatoSolicitud}}" target="_blank" rel="noopener noreferrer">{{$informacion->NombreFormatoSolicitud}}</a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="container col-md-4">
                                        <div class="form-group" style="text-align: left;">
                                            <label for="">Carta de Solicitud de Movilidad</label>
                                        </div>
                                        <table class="table table-sm">
                                            <thead>
                                                <tr><th>Archivo</th></tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="vertical-align:middle; text-align:center"><a href="{{$informacion->RutaCartaMovilidad}}" target="_blank" rel="noopener noreferrer">{{$informacion->NombreCartaMovilidad}}</a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="container col-md-4">
                                        <div class="form-group" style="text-align: left;">
                                            <label for="">Carta de Aceptación de Movilidad</label>
                                        </div>
                                        <table class="table table-sm">
                                            <thead>
                                                <tr><th>Archivo</th></tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="vertical-align:middle; text-align:center"><a href="{{$informacion->RutaCartaAceptacion}}" target="_blank" rel="noopener noreferrer">{{$informacion->NombreCartaAceptacion}}</a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="container col-md-4">
                                        <div class="form-group" style="text-align: left;">
                                            <label for="">Reporte de Actividades</label>
                                        </div>
                                        <table class="table table-sm">
                                            <thead>
                                                <tr><th>Archivo</th></tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="vertical-align:middle; text-align:center"><a href="{{$informacion->RutaReporteActividades}}" target="_blank" rel="noopener noreferrer">{{$informacion->NombreReporteActividades}}</a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="container col-md-4">
                                        <div class="form-group" style="text-align: left;">
                                            <label for="">Carta de Liberación</label>
                                        </div>
                                        <table class="table table-sm">
                                            <thead>
                                                <tr><th>Archivo</th></tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="vertical-align:middle; text-align:center"><a href="{{$informacion->RutaCartaLiberacion}}" target="_blank" rel="noopener noreferrer">{{$informacion->NombreCartaLiberacion}}</a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="container col-md-4">
                                        <div class="form-group" style="text-align: left;">
                                            <label for="">Documentación Complementaria</label>
                                        </div>
                                        <table class="table table-sm">
                                            <thead>
                                                <tr><th>Archivo</th></tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="vertical-align:middle; text-align:center"><a href="{{$informacion->RutaDocumentacionComp}}" target="_blank" rel="noopener noreferrer">{{$informacion->NombreDocumentacionComp}}</a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="MovilidadComienzo" role="tabpanel" aria-labelledby="MovilidadComienzo-tab">
                                <br>
                                <div class="row">
                                    <div class="container col-md-4">
                                        <div class="form-group" style="text-align: left;">
                                            <label for="">Formato de Movilidad</label>
                                        </div>
                                        <ul class="nav nav-tabs" id="ArchivoFormatoMovilidad" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="CargarFormatoMovilidad-tab" data-toggle="tab" href="#CargarFormatoMovilidad" role="tab" aria-controls="Cargar Formato de Movilidad" aria-selected="true">Cargar Archivo</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="VistaFormatoMovilidad-tab" data-toggle="tab" href="#VistaFormatoMovilidad" role="tab" aria-controls="Vista Formato de Movilidad" aria-selected="false">Vista Previa</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content" id="ArchivoFormatoMovilidadContent">
                                            <div class="tab-pane fade show active" id="CargarFormatoMovilidad" role="tabpanel" aria-labelledby="CargarFormatoMovilidad-tab">
                                                <br>
                                                <div style="text-align:center" class="containerInputfile container p-y-1 col-md-9">
                                                    <div class="row m-b-1">
                                                        <div class="col-sm-12">
                                                            <div class="form-group inputDnD">
                                                                <label class="sr-only" for="inputFile">File Upload</label>
                                                                <input type="file" name="ArchivoFormMovilidad" class="form-control-file text-primary font-weight-bold" id="ArchivoFormMovilidad" accept="application/pdf" onchange="ControladorFormato()" data-title="Arrastre y suelte el archivo">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="VistaFormatoMovilidad" role="tabpanel" aria-labelledby="VistaFormatoMovilidad-tab">
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr><th colspan="2">Archivos</th></tr>
                                                    </thead>
                                                    <tbody id="VistaPrevFormato">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container col-md-4">
                                        <div class="form-group" style="text-align: left;">
                                            <label for="">Carta de Solicitud de Movilidad</label>
                                        </div>
                                        <ul class="nav nav-tabs" id="ArchivoCartaSolicitud" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="CargarSolicitudMovilidad-tab" data-toggle="tab" href="#CargarSolicitudMovilidad" role="tab" aria-controls="Cargar Solicitud de Movilidad" aria-selected="true">Cargar Archivo</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="VistaSolicitudMovilidad-tab" data-toggle="tab" href="#VistaSolicitudMovilidad" role="tab" aria-controls="Vista Solicitud de Movilidad" aria-selected="false">Vista Previa</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content" id="ArchivoCargarSolicitudMovilidad">
                                            <div class="tab-pane fade show active" id="CargarSolicitudMovilidad" role="tabpanel" aria-labelledby="">
                                                <br>
                                                <div style="text-align:center" class="containerInputfile container p-y-1 col-md-9">
                                                    <div class="row m-b-1">
                                                        <div class="col-sm-12">
                                                            <div class="form-group inputDnD">
                                                                <label class="sr-only" for="inputFile">File Upload</label>
                                                                <input type="file" name="ArchivoSolicitudMovilidad" class="form-control-file text-primary font-weight-bold" id="ArchivoSolicitudMovilidad" accept="application/pdf" onchange="ControladorCartaSolicitud()" data-title="Arrastre y suelte el archivo">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="VistaSolicitudMovilidad" role="tabpanel" aria-labelledby="VistaSolicitudMovilidad-tab">
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr><th colspan="2">Archivos</th></tr>
                                                    </thead>
                                                    <tbody id="VistaPrevCartaSolicitud">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container col-md-4">
                                        <div class="form-group" style="text-align: left;">
                                            <label for="">Carta de Aceptación de Movilidad</label>
                                        </div>
                                        <ul class="nav nav-tabs" id="ArchivoCartaAceptacion-tab" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="CargarAceptacionMovilidad-tab" data-toggle="tab" href="#CargarAceptacionMovilidad" role="tab" aria-controls="" aria-selected="true">Cargar Archivo</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="VistaCartaAceptacion-tab" data-toggle="tab" href="#VistaCartaAceptacion" role="tab" aria-controls="" aria-selected="false">Vista Previa</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content" id="ArchivoCartaAceptacion-content">
                                            <div class="tab-pane fade show active" id="CargarAceptacionMovilidad" role="tabpanel" aria-labelledby="">
                                                <br>
                                                <div style="text-align:center" class="containerInputfile container p-y-1 col-md-9">
                                                    <div class="row m-b-1">
                                                        <div class="col-sm-12">
                                                            <div class="form-group inputDnD">
                                                                <label class="sr-only" for="inputFile">File Upload</label>
                                                                <input type="file" name="ArchivoCartaAceptacion" class="form-control-file text-primary font-weight-bold" id="ArchivoCartaAceptacion" accept="application/pdf" onchange="ControladorCartaAceptacion()" data-title="Arrastre y suelte el archivo">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="VistaCartaAceptacion" role="tabpanel" aria-labelledby="VistaCartaAceptacion-tab">
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr><th colspan="2">Archivos</th></tr>
                                                    </thead>
                                                    <tbody id="VistaPrevCartaAceptacion">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="MovilidadTerminacion" role="tabpanel" aria-labelledby="MovilidadTerminacion-tab">
                                <br>
                                <div class="row">
                                    <div class="container col-md-4">
                                        <div class="form-group" style="text-align: left;">
                                            <label for="">Reporte de Actividades</label>
                                        </div>
                                        <ul class="nav nav-tabs" id="ArchivoReporteActividades-tab" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="CargarReporteActividades-tab" data-toggle="tab" href="#CargarReporteActividades" role="tab" aria-controls="" aria-selected="true">Cargar Archivo</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="VistaReporteActividades-tab" data-toggle="tab" href="#VistaReporteActividades" role="tab" aria-controls="" aria-selected="false">Vista Previa</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content" id="ArchivoReporteActividades-content">
                                            <div class="tab-pane fade show active" id="CargarReporteActividades" role="tabpanel" aria-labelledby="">
                                                <br>
                                                <div style="text-align:center" class="containerInputfile container p-y-1 col-md-9">
                                                    <div class="row m-b-1">
                                                        <div class="col-sm-12">
                                                            <div class="form-group inputDnD">
                                                                <label class="sr-only" for="inputFile">File Upload</label>
                                                                <input type="file" name="ArchivoReporteActividades" class="form-control-file text-primary font-weight-bold" id="ArchivoReporteActividades" accept="application/pdf" onchange="ControladorReporteActividades()" data-title="Arrastre y suelte el archivo">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="VistaReporteActividades" role="tabpanel" aria-labelledby="">
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr><th colspan="2">Archivos</th></tr>
                                                    </thead>
                                                    <tbody id="VistaPrevReporteActividades">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container col-md-4">
                                        <div class="form-group" style="text-align: left;">
                                            <label for="">Carta de Liberación</label>
                                        </div>
                                        <ul class="nav nav-tabs" id="ArchivoCartaLiberacion-tab" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="CargarCartaLiberacion-tab" data-toggle="tab" href="#CargarCartaLiberacion" role="tab" aria-controls="" aria-selected="true">Cargar Archivo</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="VistaCartaLiberacion-tab" data-toggle="tab" href="#VistaCartaLiberacion" role="tab" aria-controls="" aria-selected="false">Vista Previa</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content" id="ArchivoCartaLiberacion-content">
                                            <div class="tab-pane fade show active" id="CargarCartaLiberacion" role="tabpanel" aria-labelledby="">
                                                <br>
                                                <div style="text-align:center" class="containerInputfile container p-y-1 col-md-9">
                                                    <div class="row m-b-1">
                                                        <div class="col-sm-12">
                                                            <div class="form-group inputDnD">
                                                                <label class="sr-only" for="inputFile">File Upload</label>
                                                                <input type="file" name="ArchivoCartaLiberacion" class="form-control-file text-primary font-weight-bold" id="ArchivoCartaLiberacion" accept="application/pdf" onchange="ControladorCartaLiberacion()" data-title="Arrastre y suelte el archivo">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="VistaCartaLiberacion" role="tabpanel" aria-labelledby="">
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr><th colspan="2">Archivos</th></tr>
                                                    </thead>
                                                    <tbody id="VistaPrevCartaLiberacion">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container col-md-4">
                                        <div class="form-group" style="text-align: left;">
                                            <label for="">Documentación Complementaria</label>
                                        </div>
                                        <ul class="nav nav-tabs" id="ArchivoDocumentacionComp-tab" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="CargarDocumentacionComp-tab" data-toggle="tab" href="#CargarDocumentacionComp" role="tab" aria-controls="" aria-selected="true">Cargar Archivo</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="VistaDocumentacionComp-tab" data-toggle="tab" href="#VistaDocumentacionComp" role="tab" aria-controls="" aria-selected="false">Vista Previa</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content" id="ArchivoDocumentacionComp-content">
                                            <div class="tab-pane fade show active" id="CargarDocumentacionComp" role="tabpanel" aria-labelledby="">
                                                <br>
                                                <div style="text-align:center" class="containerInputfile container p-y-1 col-md-9">
                                                    <div class="row m-b-1">
                                                        <div class="col-sm-12">
                                                            <div class="form-group inputDnD">
                                                                <label class="sr-only" for="inputFile">File Upload</label>
                                                                <input type="file" name="ArchivoDocumentacionComp" class="form-control-file text-primary font-weight-bold" id="ArchivoDocumentacionComp" accept="application/pdf" onchange="ControladorDocumentacionComp()" data-title="Arrastre y suelte el archivo">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="VistaDocumentacionComp" role="tabpanel" aria-labelledby="">
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr><th colspan="2">Archivos</th></tr>
                                                    </thead>
                                                    <tbody id="VistaPrevDocumentacionComp">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

            </div>
        </form>
    </div>  
    
</div>