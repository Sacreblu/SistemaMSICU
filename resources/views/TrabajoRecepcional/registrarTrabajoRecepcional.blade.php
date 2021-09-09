@extends('layouts.Plantilla')

<link rel="stylesheet" href="/css/TrabajoRecepcional.css">
<script src="/js/TrabajoRecepcional/RegistrarTrabajoRecepcional.js" type="text/javascript"></script>

<div class="Contenedor">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{url('/Trabajos_Recepcionales')}}">Trabajos Recepcionales</a></li>
            <li class="breadcrumb-item active" aria-current="page">Registrar Trabajo Recepcional</li>
        </ol>
    </nav>
    <div class="container">
        <div class="btn-formRegistro">
            <button type="button" id="btnRegistrar" class="btn btn-success btn-sm" style="margin-right:10px" onclick="EjecutarValidaciones()">Registrar</button>
            <button type="button" id="btnCancelar" class="btn btn-light btn-sm" onclick="Cancelar()" style="margin-left:10px">Cancelar</button>
        </div>
    </div>
        <div class="tabs-container">

            <ul class="nav nav-tabs" id="Secciones" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="DatosGenerales-tab" data-toggle="tab" href="#DatosGenerales" role="tab" aria-controls="Datos Generales" aria-selected="true">Datos Generales</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="Colaboraciones-tab" data-toggle="tab" href="#Colaboraciones" role="tab" aria-controls="Colaboraciones" aria-selected="false">Colaboraciones</a>
                </li>
            </ul>
            <form action="" class="form-group" id="FormDatosGenerales">
                <div class="tab-content" id="SeccionesContent" style="padding-top:17px;">
                    <div class="tab-pane fade show active" id="DatosGenerales" role="tabpanel" aria-labelledby="DatosGenerales-tab">
                        
                            <div class="form-row" style="padding: 0 30px">
                                <div class="form-group col-md-6" style="text-align: left;">
                                    <label for="Autor">Autor</label>
                                    <input type="text" class="form-control" onchange="ControladorAutor()" id="Autor" name="Autor">
                                    <input type="hidden" id="IdAutor" name="IdAutor">
                                    <span class="alertError" id="alertAutorRegistro"></span>
                                    <span class="alertError" id="alertIdAutorRegistro"></span>
                                </div>
                                <div class="form-group col-md-3" style="text-align: left;">
                                    <label for="Estado">Estado</label>
                                    <select class="form-control" id="Estado" name="Estado" onchange="controladorEstado()">
                                        <Option value="EnProceso">En Proceso</Option>
                                        <Option value="Presentado">Presentado</Option>
                                        <Option value="Publicado">Publicado</Option>
                                    </select>
                                </div>
                                <div class="form-group col-md-3" style="text-align: left;">
                                    <label for="Generacion">Generación</label>
                                    <input type="text" class="form-control" id="Generacion" name="Generacion" readonly>
                                    <input type="hidden" id="IdGeneracion" name="IdGeneracion">
                                </div>
                                <div class="form-group col-md-6" style="text-align: left;">
                                    <label for="Titulo">Titulo</label>
                                    <input type="text" class="form-control" id="Titulo" name="Titulo">
                                    <span class="alertError" id="alertTituloRegistro"></span>
                                </div>
                                <div class="form-group col-md-3" style="text-align: left;">
                                    <label for="Generacion">Mes de Publicación</label>
                                    <select class="form-control" disabled id="MesPublicacion" name="MesPublicacion">
                                        <option value="">-- Eligue un mes --</option>
                                        <option value="Enero">Enero</option>
                                        <option value="Febrero">Febrero</option>
                                        <option value="Marzo">Marzo</option>
                                        <option value="Abril">Abril</option>
                                        <option value="Mayo">Mayo</option>
                                        <option value="Junio">Junio</option>
                                        <option value="Julio">Julio</option>
                                        <option value="Agosto">Agosto</option>
                                        <option value="Septiembre">Septiembre</option>
                                        <option value="Octubre">Octubre</option>
                                        <option value="Noviembre">Noviembre</option>
                                        <option value="Diciembre">Diciembre</option>
                                    </select>
                                    <span class="alertError" id="alertMesPublicacionRegistro"></span>
                                </div>
                                <div class="form-group col-md-3" style="text-align: left;">
                                    <label for="Generacion">Año de Publicación</label>
                                    <select class="form-control" disabled id="AnioPublicacion" name="AnioPublicacion">
                                            
                                    </select>
                                    <span class="alertError" id="alertAnioPublicacionRegistro"></span>
                                </div>
                                <div class="form-group col-md-6" style="text-align: left;">
                                    <label for="DireccionRepositorio">Dirección del Repositorio del Documento</label>
                                    <input disabled type="text" class="form-control" id="DireccionRepositorio" name="DireccionRepositorio">
                                    <span class="alertError" id="alertDireccionRepositorioRegistro"></span>
                                </div>
                                <div class="form-group col-md-6" style="text-align: left;">
                                    <label for="LGAC">Linea de Generación y Aplicación de Conocimiento</label>
                                    <input type="hidden" id="LGACname" name="LGACname">
                                    <select class="form-control" id="LGAC" name="LGAC">
                                    </select>
                                    <span class="alertError" id="alertLGACRegistro"></span>
                                </div>
                                <div class="form-group col-md-6" style="text-align: left;">
                                    <label for="DireccionDocumento">Dirección del Documento PDF</label>
                                    <input disabled type="text" class="form-control" id="DireccionDocumento" name="DireccionDocumento">
                                    <span class="alertError" id="alertDireccionDocumentoRegistro"></span>
                                </div>
                                <div class="form-group col-md-6" style="text-align: left;">
                                </div>
                                <div id="archivosEvidencia" class="col-md-12 row" style="display:none">
                                    <div class="form-group col-md-6" style="text-align: left;">
                                        <label for="ArchivoTesis">Archivo Evidencia del Trabajo Recepcional</label>
                                        <span class="alertError" id="alertArchivoTesisRegistro"></span>
                                    </div>
                                    <div class="form-group col-md-6" style="text-align: left;">
                                        <label for="ArchivoActaDeExamen">Archivo Evidencia del Acta de Examen</label>
                                        <span class="alertError" id="alertArchivoActaDeExamenRegistro"></span>
                                    </div>
                                    <div class="container col-md-6">
                                        <ul class="nav nav-tabs" id="ArchivoTrabajoRecepcional" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="CargarTrabajoRecepcional-tab" data-toggle="tab" href="#CargarTrabajoRecepcional" role="tab" aria-controls="Cargar Archivo Trabajo Recepcional" aria-selected="true">Cargar Archivo</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="VistaTrabajoRecepcional-tab" data-toggle="tab" href="#VistaTrabajoRecepcional" role="tab" aria-controls="Vista Archivo Trabajo Recepcional" aria-selected="false">Vista Previa</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content" id="ArchivoTrabajoRecepcionalContent">
                                            <div class="tab-pane fade show active" id="CargarTrabajoRecepcional" role="tabpanel" aria-labelledby="CargarTrabajoRecepcional-tab">
                                                <br>
                                                <div style="text-align:center" class="container p-y-1 col-md-9">
                                                    <div class="row m-b-1">
                                                        <div class="col-sm-12">
                                                            <div class="form-group inputDnD">
                                                                <label class="sr-only" for="inputFile">File Upload</label>
                                                                <input type="file" name="ArchivoTesis" class="form-control-file text-primary font-weight-bold" id="ArchivoTesis" accept="application/pdf" onchange="ControladorTesis()" data-title="Arrastre y suelte el archivo">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="VistaTrabajoRecepcional" role="tabpanel" aria-labelledby="VistaTrabajoRecepcional-tab">
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr><th colspan="2">Archivos</th></tr>
                                                    </thead>
                                                    <tbody id="VistaPrevTrabajoRecepcional">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container col-md-6">
                                        <ul class="nav nav-tabs" id="ArchivoActaExamen" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="CargarActaExamen-tab" data-toggle="tab" href="#CargarActaExamen" role="tab" aria-controls="Cargar Archivo Acta de Examen" aria-selected="true">Cargar Archivo</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="VistaActaExamen-tab" data-toggle="tab" href="#VistaActaExamen" role="tab" aria-controls="Vista Archivo Acta de Examen" aria-selected="false">Vista Previa</a>
                                            </li>
                                        </ul>   
                                        <div class="tab-content" id="ArchivoActaExamenContent">
                                            <div class="tab-pane fade show active" id="CargarActaExamen" role="tabpanel" aria-labelledby="CargarActaExamen-tab">
                                                <br>
                                                <div style="text-align:center" class="container p-y-1 col-md-9">
                                                    <div class="row m-b-1">
                                                        <div class="col-sm-12">
                                                            <div class="form-group inputDnD">
                                                                <label class="sr-only" for="inputFile">File Upload</label>
                                                                <input type="file" name="ArchivoActaDeExamen" class="form-control-file text-primary font-weight-bold" id="ArchivoActaDeExamen" accept="application/pdf" onchange="ControladorActaExamen()" data-title="Arrastre y suelte el archivo">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="VistaActaExamen" role="tabpanel" aria-labelledby="VistaActaExamen-tab">
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr><th colspan="2">Archivos</th></tr>
                                                    </thead>
                                                    <tbody id="VistaPrevActaExamen">
                                                    </tbody>
                                                </table>
                                        </div>
                                        </div>
                                    </div>
                                </div>    
                            </div>
                            
                    </div>
                    <div class="tab-pane fade" id="Colaboraciones" role="tabpanel" aria-labelledby="Colaboraciones-tab">
                        <div class="Colaboradores-container">
                            

                                <div style="display:contents;">
                                    <div class="card carta">
                                        <div class="row">
                                            <div class="form-group col-md-6">
                                                <br>
                                                <label for="Director">Director</label>
                                                <input type="text" class="form-control" onchange="ControladorColaboraciones('Director')" id="Director" name="Director">
                                                <input type="hidden" id="IdDirector" name="IdDirector">
                                                <span class="alertError" id="alertDirectorRegistro"></span>
                                                <span class="alertError" id="alertIdDirectorRegistro"></span>
                                                <span class="alertError" id="alertArchivoEvDirectorRegistro"></span>
                                            </div>
                                            <div class="col-md-6">
                                                <ul class="nav nav-tabs" id="PanelEvaluacionDirector" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" id="CargarEvDirector-tab" data-toggle="tab" href="#CargarEvDirector" role="tab" aria-controls="Cargar Archivo Evaluación Director" aria-selected="true">Cargar Archivo</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="VistaEvDirector-tab" data-toggle="tab" href="#VistaEvDirector" role="tab" aria-controls="Vista Archivo Evaluación Director" aria-selected="false">Vista Previa</a>
                                                    </li>
                                                </ul>   
                                                <div class="tab-content" id="PanelEvaluacionDirectorContent">
                                                    <div class="tab-pane fade show active" id="CargarEvDirector" role="tabpanel" aria-labelledby="CargarEvDirector-tab">
                                                        <br>
                                                        <div style="text-align:center" class="container p-y-1 col-md-9">
                                                            <div class="row m-b-1">
                                                                <div class="col-sm-12">
                                                                    <div class="form-group inputDnD">
                                                                        <label class="sr-only" for="inputFile">File Upload</label>
                                                                        <input type="file" name="ArchivoEvDirector" class="form-control-file text-primary font-weight-bold" id="ArchivoEvDirector" accept="application/pdf" onchange="ControladorEvaluaciones('Director')" data-title="Arrastre y suelte el archivo">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade" id="VistaEvDirector" role="tabpanel" aria-labelledby="VistaEvDirector-tab">
                                                        <table class="table table-sm">
                                                            <thead>
                                                                <tr><th colspan="2">Archivo</th></tr>
                                                            </thead>
                                                            <tbody id="VistaPrevEvDirector">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                    <div class="card carta">
                                        <div class="row">
                                            <div class="form-group col-md-6">
                                                <br>
                                                <label for="Codirector">Codirector</label>
                                                <input type="text" class="form-control" onchange="ControladorColaboraciones('Codirector')" id="Codirector" name="Codirector">
                                                <input type="hidden" id="IdCodirector" name="IdCodirector">
                                                <span class="alertError" id="alertCodirectorRegistro"></span>
                                                <span class="alertError" id="alertIdCodirectorRegistro"></span>
                                                <span class="alertError" id="alertArchivoEvCodirectorRegistro"></span>
                                            </div>
                                            <div class="col-md-6">
                                                <ul class="nav nav-tabs" id="PanelEvaluacionCodirector" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" id="CargarEvCodirector-tab" data-toggle="tab" href="#CargarEvCodirector" role="tab" aria-controls="Cargar Archivo Evaluación Codirector" aria-selected="true">Cargar Archivo</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="VistaEvCodirector-tab" data-toggle="tab" href="#VistaEvCodirector" role="tab" aria-controls="Vista Archivo Evaluación Codirector" aria-selected="false">Vista Previa</a>
                                                    </li>
                                                </ul>   
                                                <div class="tab-content" id="PanelEvaluacionCodirectorContent">
                                                    <div class="tab-pane fade show active" id="CargarEvCodirector" role="tabpanel" aria-labelledby="CargarEvCodirector-tab">
                                                        <br>
                                                        <div style="text-align:center" class="container p-y-1 col-md-9">
                                                            <div class="row m-b-1">
                                                                <div class="col-sm-12">
                                                                    <div class="form-group inputDnD">
                                                                        <label class="sr-only" for="inputFile">File Upload</label>
                                                                        <input type="file" name="ArchivoEvCodirector" class="form-control-file text-primary font-weight-bold" id="ArchivoEvCodirector" accept="application/pdf" onchange="ControladorEvaluaciones('Codirector')" data-title="Arrastre y suelte el archivo">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade" id="VistaEvCodirector" role="tabpanel" aria-labelledby="VistaEvCodirector-tab">
                                                        <table class="table table-sm">
                                                            <thead>
                                                                <tr><th colspan="2">Archivo</th></tr>
                                                            </thead>
                                                            <tbody id="VistaPrevEvCodirector">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>   
                                        </div> 
                                    </div>    
                                </div>
                                    
                                <div id="divJurados" style="display:none">
                                    
                                    <div class="card carta">
                                        <div class="row">
                                            <div class="form-group col-md-6">
                                                <br>
                                                <label for="JuradoP">Jurado Presidente</label>
                                                <input type="text" class="form-control" onchange="ControladorColaboraciones('JuradoP')" id="JuradoP" name="JuradoP">
                                                <input type="hidden" id="IdJuradoP" name="IdJuradoP">
                                                <span class="alertError" id="alertJuradoPRegistro"></span>
                                                <span class="alertError" id="alertIdJuradoPRegistro"></span>
                                                <span class="alertError" id="alertArchivoEvJuradoPRegistro"></span>
                                            </div>
                                            <div class=" col-md-6">
                                                <ul class="nav nav-tabs" id="PanelEvaluacionJuradoP" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" id="CargarEvJuradoP-tab" data-toggle="tab" href="#CargarEvJuradoP" role="tab" aria-controls="Cargar Archivo Evaluación Jurado Presidente" aria-selected="true">Cargar Archivo</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="VistaEvJuradoP-tab" data-toggle="tab" href="#VistaEvJuradoP" role="tab" aria-controls="Vista Archivo Evaluación Jurado Presidente" aria-selected="false">Vista Previa</a>
                                                    </li>
                                                </ul>   
                                                <div class="tab-content" id="PanelEvaluacionJuradoPContent">
                                                    <div class="tab-pane fade show active" id="CargarEvJuradoP" role="tabpanel" aria-labelledby="CargarEvJuradoP-tab">
                                                        <br>
                                                        <div style="text-align:center" class="container p-y-1 col-md-9">
                                                            <div class="row m-b-1">
                                                                <div class="col-sm-12">
                                                                    <div class="form-group inputDnD">
                                                                        <label class="sr-only" for="inputFile">File Upload</label>
                                                                        <input type="file" name="ArchivoEvJuradoP" class="form-control-file text-primary font-weight-bold" id="ArchivoEvJuradoP" accept="application/pdf" onchange="ControladorEvaluaciones('JuradoP')" data-title="Arrastre y suelte el archivo">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade" id="VistaEvJuradoP" role="tabpanel" aria-labelledby="VistaEvJuradoP-tab">
                                                        <table class="table table-sm">
                                                            <thead>
                                                                <tr><th colspan="2">Archivo</th></tr>
                                                            </thead>
                                                            <tbody id="VistaPrevEvJuradoP">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card carta">
                                        <div class="row">
                                            <div class="form-group col-md-6">
                                                <br>
                                                <label for="JuradoS">Jurado Secretario</label>
                                                <input type="text" class="form-control" onchange="ControladorColaboraciones('JuradoS')" id="JuradoS" name="JuradoS">
                                                <input type="hidden" id="IdJuradoS" name="IdJuradoS">
                                                <span class="alertError" id="alertJuradoSRegistro"></span>
                                                <span class="alertError" id="alertIdJuradoSRegistro"></span>
                                                <span class="alertError" id="alertArchivoEvJuradoSRegistro"></span>
                                            </div>
                                            <div class="col-md-6">
                                                <ul class="nav nav-tabs" id="PanelEvaluacionJuradoS" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" id="CargarEvJuradoS-tab" data-toggle="tab" href="#CargarEvJuradoS" role="tab" aria-controls="Cargar Archivo Evaluación Jurado Secretario" aria-selected="true">Cargar Archivo</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="VistaEvJuradoS-tab" data-toggle="tab" href="#VistaEvJuradoS" role="tab" aria-controls="Vista Archivo Evaluación Jurado Secretario" aria-selected="false">Vista Previa</a>
                                                    </li>
                                                </ul>   
                                                <div class="tab-content" id="PanelEvaluacionJuradoSContent">
                                                    <div class="tab-pane fade show active" id="CargarEvJuradoS" role="tabpanel" aria-labelledby="CargarEvJuradoS-tab">
                                                        <br>
                                                        <div style="text-align:center" class="container p-y-1 col-md-9">
                                                            <div class="row m-b-1">
                                                                <div class="col-sm-12">
                                                                    <div class="form-group inputDnD">
                                                                        <label class="sr-only" for="inputFile">File Upload</label>
                                                                        <input type="file" name="ArchivoEvJuradoS" class="form-control-file text-primary font-weight-bold" id="ArchivoEvJuradoS" accept="application/pdf" onchange="ControladorEvaluaciones('JuradoS')" data-title="Arrastre y suelte el archivo">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade" id="VistaEvJuradoS" role="tabpanel" aria-labelledby="VistaEvJuradoS-tab">
                                                        <table class="table table-sm">
                                                            <thead>
                                                                <tr><th colspan="2">Archivo</th></tr>
                                                            </thead>
                                                            <tbody id="VistaPrevEvJuradoS">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card carta">
                                        <div class="row">
                                            <div class="form-group col-md-6">
                                                <br>
                                                <label for="JuradoS">Jurado Vocal</label>
                                                <input type="text" class="form-control" onchange="ControladorColaboraciones('JuradoV')" id="JuradoV" name="JuradoV">
                                                <input type="hidden" id="IdJuradoV" name="IdJuradoV">
                                                <span class="alertError" id="alertJuradoVRegistro"></span>
                                                <span class="alertError" id="alertIdJuradoVRegistro"></span>
                                                <span class="alertError" id="alertArchivoEvJuradoVRegistro"></span>
                                            </div>
                                            <div class=" col-md-6">
                                                <ul class="nav nav-tabs" id="PanelEvaluacionJuradoV" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" id="CargarEvJuradoV-tab" data-toggle="tab" href="#CargarEvJuradoV" role="tab" aria-controls="Cargar Archivo Evaluación Jurado Vocal" aria-selected="true">Cargar Archivo</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="VistaEvJuradoV-tab" data-toggle="tab" href="#VistaEvJuradoV" role="tab" aria-controls="Vista Archivo Evaluación Jurado Vocal" aria-selected="false">Vista Previa</a>
                                                    </li>
                                                </ul>   
                                                <div class="tab-content" id="PanelEvaluacionJuradoVContent">
                                                    <div class="tab-pane fade show active" id="CargarEvJuradoV" role="tabpanel" aria-labelledby="CargarEvJuradoV-tab">
                                                        <br>
                                                        <div style="text-align:center" class="container p-y-1 col-md-9">
                                                            <div class="row m-b-1">
                                                                <div class="col-sm-12">
                                                                    <div class="form-group inputDnD">
                                                                        <label class="sr-only" for="inputFile">File Upload</label>
                                                                        <input type="file" name="ArchivoEvJuradoV" class="form-control-file text-primary font-weight-bold" id="ArchivoEvJuradoV" accept="application/pdf" onchange="ControladorEvaluaciones('JuradoV')" data-title="Arrastre y suelte el archivo">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade" id="VistaEvJuradoV" role="tabpanel" aria-labelledby="VistaEvJuradoV-tab">
                                                        <table class="table table-sm">
                                                            <thead>
                                                                <tr><th colspan="2">Archivo</th></tr>
                                                            </thead>
                                                            <tbody id="VistaPrevEvJuradoV">
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
                </div>
            </form>
        </div>
    
</div>