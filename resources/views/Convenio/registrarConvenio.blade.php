@extends('layouts.Plantilla')

<link rel="stylesheet" href="/css/ConveniosMovilidad.css">
<script src="/js/Convenio/RegistrarConvenio.js" type="text/javascript"></script>

<div class="Contenedor">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{url('/Convenios_Movilidad')}}">Convenios de Movilidad</a></li>
            <li class="breadcrumb-item active" aria-current="page">Registrar Convenios de Movilidad y Congresos</li>
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
                        <label for="Sector">Tipo de Movilidad</label>
                        <select class="form-control" id="Sector" name="Sector">
                            <Option value="1">Practica de Movilidad en el Sector Social</Option>
                            <Option value="2">Practica de Movilidad en el Sector Productivo</Option>
                            <Option value="3">Practica de Movilidad en el Sector Gubernamental</Option>
                            <Option value="4">Estancia Académica</Option>
                            <Option value="5">Congreso</Option>
                        </select>
                    </div>
                    <div id="divNombre" class="form-group" style="text-align: left; display:none">
                        <label for="NombreCongreso">Nombre Completo del Congreso</label>
                        <input type="text" class="form-control" id="NombreCongreso" name="NombreCongreso">
                        <span class="alertError" id="alertNombreCongresoRegistro"></span>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6" style="text-align: left;">
                            <label for="FechaComienzo">Fecha de Comienzo</label>
                            <input type="date" class="form-control" id="FechaComienzo" name="FechaComienzo">
                            <span class="alertError" id="alertFechaComienzoRegistro"></span>
                        </div>
                        <div class="form-group col-md-6" style="text-align: left;">
                            <label for="FechaConclusion">Fecha de Conclusión</label>
                            <input type="date" class="form-control" id="FechaConclusion" name="FechaConclusion">
                            <span class="alertError" id="alertFechaConclusionRegistro"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6" style="text-align: left;">
                            <label for="Ciudad">Ciudad</label>
                            <input type="text" class="form-control" id="Ciudad" name="Ciudad">
                            <span class="alertError" id="alertCiudadRegistro"></span>
                        </div>
                        <div class="form-group col-md-6" style="text-align: left;">
                            <label for="Pais">País</label>
                            <input type="text" class="form-control" id="Pais" name="Pais">
                            <span class="alertError" id="alertPaisRegistro"></span>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group" style="text-align: left;">
                        <label for="Institucion">Institución u Organización</label>
                        <input type="text" class="form-control" id="Institucion" name="Institucion">
                        <span class="alertError" id="alertInstitucionRegistro"></span>
                    </div>
                    <div id="divAcronimo" class="form-group" style="text-align: left; display:none">
                        <label for="Acronimo">Acrónimo del Congreso</label>
                        <input type="text" class="form-control" id="Acronimo" name="Acronimo">
                        <span class="alertError" id="alertAcronimoRegistro"></span>
                    </div>
                    <div id="divDependencia" class="form-group" style="text-align: left; display:none">
                        <label for="Dependencia">Dependencia de la Institución</label>
                        <input type="text" class="form-control" id="Dependencia" name="Dependencia">
                        <span class="alertError" id="alertDependenciaRegistro"></span>
                    </div>
                    <br>
                    <div class="container">
                        <ul class="nav nav-tabs" id="ArchivoEvidenciaConvenio" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="CargarEvidenciaConvenio-tab" data-toggle="tab" href="#CargarEvidenciaConvenio" role="tab" aria-controls="Cargar Archivo Evidencia Conveniol" aria-selected="true">Cargar Archivo</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="VistaEvidenciaConvenio-tab" data-toggle="tab" href="#VistaEvidenciaConvenio" role="tab" aria-controls="Vista Archivo Evidencia Convenio" aria-selected="false">Vista Previa</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="ArchivoEvidenciaConvenioContent">
                            <div class="tab-pane fade show active" id="CargarEvidenciaConvenio" role="tabpanel" aria-labelledby="CargarEvidenciaConvenio-tab">
                                <br>
                                <div style="text-align:center" class="container p-y-1 col-md-9">
                                    <div class="row m-b-1">
                                        <div class="col-sm-12">
                                            <div class="form-group inputDnD">
                                                <label class="sr-only" for="inputFile">File Upload</label>
                                                <input type="file" name="ArchivoConvenio" class="form-control-file text-primary font-weight-bold" id="ArchivoConvenio" accept="application/pdf" onchange="ControladorConvenio()" data-title="Arrastre y suelte el archivo">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="VistaEvidenciaConvenio" role="tabpanel" aria-labelledby="VistaEvidenciaConvenio-tab">
                                <table class="table table-sm">
                                    <thead>
                                        <tr><th colspan="2">Archivos</th></tr>
                                    </thead>
                                    <tbody id="VistaPrevConvenio">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>  
    
</div>