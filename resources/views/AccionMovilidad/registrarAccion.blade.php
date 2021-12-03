@extends('layouts.Plantilla')

<link rel="stylesheet" href="/css/AccionesMovilidad.css">
<script src="/js/AccionMovilidad/RegistrarAccion.js" type="text/javascript"></script>

<div class="Contenedor">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{url('/Estancias_Academicas')}}">Estancias Academicas</a></li>
            <li class="breadcrumb-item active" aria-current="page">Registrar Estancias Academicas</li>
        </ol>
    </nav>
    <div class="container">
        <div class="btn-formRegistro">
            <button type="button" id="btnRegistrar" class="btn btn-success btn-sm" style="margin-right:10px" onclick="EjecutarValidaciones()">Registrar</button>
            <button type="button" id="btnCancelar" class="btn btn-light btn-sm" onclick="Cancelar()" style="margin-left:10px">Cancelar</button>
        </div>
    </div>
    <div class="tabs-container">
        <form action="" class="form-group" id="FormDatosGenerales">
            <div class="form-row" style="padding: 0 30px">
                <div class="col-md-6">
                    
                    <div class="form-group" style="text-align: left;">
                        <label for="NombreConvenio">Convenio de Movilidad Asociado</label>
                        <input type="text" class="form-control" onchange="ControladorConvenio()" id="NombreConvenio" name="NombreConvenio">
                        <input type="hidden" id="IdConvenio" name="IdConvenio">
                        <input type="hidden" id="IdSector" name="IdSector">
                        <span class="alertError" id="alertIdConvenioRegistro"></span>
                        <span class="alertError" id="alertNombreConvenioRegistro"></span>
                    </div>

                    <div class="form-group" style="text-align: left;">
                        <label for="NombreEstudiante">Nombre de Estudiante</label>
                        <input type="text" class="form-control" onchange="ControladorEstudiante()" id="NombreEstudiante" name="NombreEstudiante">
                        <input type="hidden" id="IdEstudiante" name="IdEstudiante">
                        <span class="alertError" id="alertIdEstudianteRegistro"></span>
                        <span class="alertError" id="alertNombreEstudianteRegistro"></span>
                    </div>

                    <div class="form-group" style="text-align: left;">
                        <label for="InstitucionDestino">Institución Destino</label>
                        <input type="text" class="form-control" id="InstitucionDestino" name="InstitucionDestino" readonly>
                        <span class="alertError" id="alertInstitucionDestinoRegistro"></span>
                    </div>

                    <div id="divInstOrigen" class="form-group" style="text-align: left;">
                        <label for="InstitucionOrigen">Institución Origen</label>
                        <input type="text" class="form-control" id="InstitucionOrigen" name="InstitucionOrigen" readonly value="Universidad Veracruzana">
                        <span class="alertError" id="alertInstitucionOrigenRegistro"></span>
                    </div>

                    <div id="divProgDestino" class="form-group" style="text-align: left;">
                        <label for="ProgramaDestino">Programa Educativo Destino</label>
                        <input type="text" class="form-control" id="ProgramaDestino" name="ProgramaDestino">
                        <span class="alertError" id="alertProgramaDestinoRegistro"></span>
                    </div>

                    <div id="divProgOrigen" class="form-group" style="text-align: left;">
                        <label for="ProgramaOrigen">Programa Educativo Origen</label>
                        <input type="text" class="form-control" id="ProgramaOrigen" name="ProgramaOrigen" readonly value="Maestría en Sistemas Interactivos Centrados en el Usuario">
                        <span class="alertError" id="alertProgramaOrigenRegistro"></span>
                    </div>
                </div>
                <div class="col-md-6">
                    
                    <div id="divSelectTipo" class="form-group" style="text-align: left; ">
                        <label for="tipoM">Tipo de Movilidad</label>
                        <select class="form-control" id="tipoM" name="tipoM" onchange="ControladorTipoMov()">
                            <Option value="1">Estancia desde la MSICU</Option>
                            <Option value="2">Estancia hacia la MSICU</Option>
                        </select>
                    </div>
                    
                    <div id="divPeriodos" class="row" >
                        <div class="form-group col-md-6" style="text-align: left;">
                            <label for="PeriodoComienzo">Periodo de Comienzo</label>
                            <input type="month" class="form-control" id="PeriodoComienzo" name="PeriodoComienzo">
                            <span class="alertError" id="alertPeriodoComienzoRegistro"></span>
                        </div>
                        <div class="form-group col-md-6" style="text-align: left;">
                            <label for="PeriodoConclusion">Periodo de Conclusión</label>
                            <input type="month" class="form-control" id="PeriodoConclusion" name="PeriodoConclusion">
                            <span class="alertError" id="alertPeriodoConclusionRegistro"></span>
                        </div>
                    </div>

                    <div id="divDependDestino" class="form-group" style="text-align: left; ">
                        <label for="DependenciaDestino">Dependencia Destino</label>
                        <input type="text" class="form-control" id="DependenciaDestino" name="DependenciaDestino" readonly>
                        <span class="alertError" id="alertDependenciaDestinoRegistro"></span>
                    </div>

                    <div id="divDependOrigen" class="form-group" style="text-align: left; ">
                        <label for="DependenciaOrigen">Dependencia Origen</label>
                        <input type="text" class="form-control" id="DependenciaOrigen" name="DependenciaOrigen" readonly value="Facultad de Estadístuca e Informática">
                        <span class="alertError" id="alertDependenciaOrigenRegistro"></span>
                    </div>
                    
                    <div class="form-group" style="text-align: left;">
                        <label for="Motivo">Motivo</label>
                        <textarea class="form-control" id="Motivo" name="Motivo" rows="4"></textarea>
                        <span class="alertError" id="alertMotivoRegistro"></span>
                    </div>
                                    
                </div>
            </div>
            <div id="divArchivos" class="form-row" style="padding: 0 30px;">
            
                    <div class="container">
                        <ul class="nav nav-tabs" id="MovilidadEvidencias" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="MovilidadComienzo-tab" data-toggle="tab" href="#MovilidadComienzo" role="tab" aria-controls="" aria-selected="true">Comienzo de Movilidad</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="MovilidadTerminacion-tab" data-toggle="tab" href="#MovilidadTerminacion" role="tab" aria-controls="" aria-selected="false">Conclusión de Movilidad</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="MovilidadEvidenciasContent">
                            <div class="tab-pane fade show active" id="MovilidadComienzo" role="tabpanel" aria-labelledby="MovilidadComienzo-tab">
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