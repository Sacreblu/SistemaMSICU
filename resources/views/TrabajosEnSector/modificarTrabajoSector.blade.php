@extends('layouts.Plantilla')

<link rel="stylesheet" href="/css/TrabajosSectores.css">
<script src="/js/TrabajosSectores/ModificarTrabajosSect.js" type="text/javascript"></script>

<script>
    var informacion = @json($informacion);
    console.log(informacion);
</script>

<div class="Contenedor">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{url('/Trabajos_En_Sector')}}">Trabajos en Sector</a></li>
            <li class="breadcrumb-item active" aria-current="page">Modificar Trabajo en Sector</li>
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
                <fieldset class="scheduler-border col-md-6">
                    <legend class="scheduler-border">Datos de la Institución</legend>
                    <div>
                        <div class="form-group" style="text-align: left;">
                            <label for="NombreConvenio">Convenio de Movilidad Asociado</label>
                            <input type="text" class="form-control" onchange="ControladorConvenio()" id="NombreConvenio" name="NombreConvenio" value="{{$informacion['DatosGenerales']->Nombre_Clave}}">
                            <input type="hidden" id="IdConvenio" name="IdConvenio" value="{{$informacion['DatosGenerales']->IdConvenio}}">
                            <input type="hidden" id="IdTS" name="IdTS" value="{{$informacion['DatosGenerales']->id}}">
                            <span class="alertError" id="alertIdConvenioModificar"></span>
                            <span class="alertError" id="alertNombreConvenioModificar"></span>
                        </div>
                        <div class="form-group" style="text-align: left;">
                            <label for="NombreProyecto">Nombre del Proyecto</label>
                            <input type="text" class="form-control" id="NombreProyecto" name="NombreProyecto" value="{{$informacion['DatosGenerales']->NombreProyecto}}">
                            <span class="alertError" id="alertNombreProyectoModificar"></span>
                        </div>
                        <div class="form-group" style="text-align: left;">
                            <label for="InstitucionDestino">Institución o Empresa</label>
                            <input type="text" class="form-control" id="Institucion" name="Institucion" value="{{$informacion['DatosGenerales']->Institucion}}">
                            <span class="alertError" id="alertInstitucionModificar"></span>
                        </div>
                        <div class="form-group" style="text-align: left;">
                            <label for="InstitucionDestino">Responsable del Proyecto</label>
                            <input type="text" class="form-control" id="ResponsableProyecto" name="ResponsableProyecto" value="{{$informacion['DatosGenerales']->ResponsableProyecto}}">
                            <span class="alertError" id="alertResponsableProyectoModificar"></span>
                        </div>

                        <div id="divPeriodos" class="row">
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label>Año de Inicio</label>
                                <select class="form-control" id="AnioInicio" name="AnioInicio">
                                </select>
                                <span class="alertError" id="alertAnioInicioModificar"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label>Año de Conclusión</label>
                                <select class="form-control" id="AnioFin" name="AnioFin">
                                </select>
                                <span class="alertError" id="alertAnioFinModificar"></span>
                            </div>
                        </div>

                        <div class="form-group" style="text-align: left;">
                            <label for="">Archivo Evidencia</label>
                        </div>
                        <ul class="nav nav-tabs" id="ArchivoEvidencia-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link  active" id="ArchivoEvidenciaGuardado-tab" data-toggle="tab" href="#ArchivoEvidenciaGuardado" role="tab" aria-controls="" aria-selected="false">Archivo Guardado</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="CargarArchivoEvidencia-tab" data-toggle="tab" href="#CargarArchivoEvidencia" role="tab" aria-controls="" aria-selected="true">Cargar Archivo</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="VistaArchivoEvidencia-tab" data-toggle="tab" href="#VistaArchivoEvidencia" role="tab" aria-controls="" aria-selected="false">Vista Previa</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="ArchivoArchivoEvidencia-content">
                            <div class="tab-pane fade show active" id="ArchivoEvidenciaGuardado" role="tabpanel" aria-labelledby="">
                                <table class="table table-sm">
                                    <thead>
                                        <tr><th>Archivo Guardado</th></tr>
                                    </thead>
                                    <tbody id="VistaArchivoEvidenciaGuardado">
                                        <td style="vertical-align:middle; text-align:center"><a href="{{$informacion['DatosGenerales']->RutaArchivoEvidencia}}" target="_blank" rel="noopener noreferrer">{{$informacion['DatosGenerales']->NombreArchivoEvidencia}}</a></td>
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade" id="CargarArchivoEvidencia" role="tabpanel" aria-labelledby="">
                                <br>
                                <div style="text-align:center" class="containerInputfile container p-y-1 col-md-9">
                                    <div class="row m-b-1">
                                        <div class="col-sm-12">
                                            <div class="form-group inputDnD">
                                                <label class="sr-only" for="inputFile">File Upload</label>
                                                <input type="file" name="ArchivoEvidencia" class="form-control-file text-primary font-weight-bold" id="ArchivoEvidencia" accept="application/pdf" onchange="ControladorArchivoEvidencia()" data-title="Arrastre y suelte el archivo">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="VistaArchivoEvidencia" role="tabpanel" aria-labelledby="">
                                <table class="table table-sm">
                                    <thead>
                                        <tr><th colspan="2">Archivos</th></tr>
                                    </thead>
                                    <tbody id="VistaPrevArchivoEvidencia">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset class="scheduler-border col-md-6">
                    <legend class="scheduler-border">Colaboraciones de la MSICU</legend>
                    <div>
                        <div class="form-group" style="text-align: left;">
                            <label for="ProfesorResponsable">Profesor Responsable</label>
                            <input type="text" class="form-control" onchange="ControladorProfesorResponsable()" id="ProfesorResponsable" name="ProfesorResponsable" value="{{$informacion['DatosGenerales']->Nombre}} {{$informacion['DatosGenerales']->Apellido_P}} {{$informacion['DatosGenerales']->Apellido_M}}">
                            <input type="hidden" id="IdProfesorResponsable" name="IdProfesorResponsable" value="{{$informacion['DatosGenerales']->ProfResponsable}}">
                            <span class="alertError" id="alertIdProfesorResponsableModificar"></span>
                            <span class="alertError" id="alertProfesorResponsableModificar"></span>
                        </div>
                        <div class="form-group" style="text-align: left;">
                            <label>Plan de Estudios</label>
                            <select class="form-control" id="PlanEstudios" name="PlanEstudios" onchange="ControladorPlanEstudiosEE()">
                            </select>
                        </div>
                        <div class="form-group" style="text-align: left;">
                            <label for="EE">Experiencia Educativa Asociada</label>
                            <input type="text" class="form-control" onchange="ControladorEE()" id="EE" name="EE" value="{{$informacion['DatosGenerales']->NombreEE}}">
                            <input type="hidden" id="IdEE" name="IdEE" value="{{$informacion['DatosGenerales']->EEasociada}}">
                            <span class="alertError" id="alertIdEEModificar"></span>
                            <span class="alertError" id="alertEEModificar"></span>
                        </div>

                        <div class="ListaProfesores-container">
                            <div class="Profesores-control">
                                <div class="text-control">
                                    Colaboración de Profesores
                                </div> 
                                <button class="btn btn-sm" id="btnAgregarProfesor" onclick="añadirProfesor()" title="Añadir un profesor"><i class="fas fa-plus"></i></button>
                                <button class="btn btn-sm" id="btnQuitarProfesor" onclick="quitarProfesor()" title="Restar un profesor" disabled><i class="fas fa-minus"></i></button>
                            </div>
                            <div id="Profesores">
                                <div class="Profesores-form card" id="CardListaProfesores">
                                    <div id="ProfesoresContainer" data-toggle="collapse" style="cursor: pointer;" data-target="#ListaProfesores">
                                        <i class="fas fa-angle-right"></i> Lista de Profesores
                                    </div>
                                    <div id="ListaProfesores" style="margin-top:10px;" class="collapse"> 

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ListaEstudiantes-container">
                            <div class="Estudiantes-control">
                                <div class="text-control">
                                    Colaboración de Estudiantes
                                </div> 
                                <button class="btn btn-sm" id="btnAgregarEstudiante" onclick="añadirEstudiantes()" title="Añadir un Estudiantes"><i class="fas fa-plus"></i></button>
                                <button class="btn btn-sm" id="btnQuitarEstudiante" onclick="quitarEstudiantes()" title="Restar un Estudiantes" disabled><i class="fas fa-minus"></i></button>
                            </div>
                            <div id="Estudiantes">
                                <div class="Estudiantes-form card" id="CardListaEstudiantes">
                                    <div id="EstudiantesContainer" data-toggle="collapse" style="cursor: pointer;" data-target="#ListaEstudiantes">
                                        <i class="fas fa-angle-right"></i> Lista de Estudiantes
                                    </div>
                                    <div id="ListaEstudiantes" style="margin-top:10px;" class="collapse"> 

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </fieldset>
            </div>
        </form>
    </div>  
    
</div>