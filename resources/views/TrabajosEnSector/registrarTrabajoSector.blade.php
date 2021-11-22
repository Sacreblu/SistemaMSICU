@extends('layouts.Plantilla')

<link rel="stylesheet" href="/css/TrabajosSectores.css">
<script src="/js/TrabajosSectores/RegistrarTrabajosSect.js" type="text/javascript"></script>

<div class="Contenedor">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{url('/Trabajos_En_Sector')}}">Trabajos en Sector</a></li>
            <li class="breadcrumb-item active" aria-current="page">Registrar Trabajo en Sector</li>
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
                <fieldset class="scheduler-border col-md-6">
                    <legend class="scheduler-border">Datos de la Institución</legend>
                    <div>
                        
                        <div class="form-group" style="text-align: left;">
                            <label for="NombreConvenio">Convenio de Movilidad Asociado</label>
                            <input type="text" class="form-control" onchange="ControladorConvenio()" id="NombreConvenio" name="NombreConvenio">
                            <input type="hidden" id="IdConvenio" name="IdConvenio">
                            <span class="alertError" id="alertIdConvenioRegistro"></span>
                            <span class="alertError" id="alertNombreConvenioRegistro"></span>
                        </div>
                        <div class="form-group" style="text-align: left;">
                            <label for="NombreProyecto">Nombre del Proyecto</label>
                            <input type="text" class="form-control" id="NombreProyecto" name="NombreProyecto">
                            <span class="alertError" id="alertNombreProyectoRegistro"></span>
                        </div>
                        <div class="form-group" style="text-align: left;">
                            <label for="InstitucionDestino">Institución o Empresa</label>
                            <input type="text" class="form-control" id="Institucion" name="Institucion" readonly>
                            <span class="alertError" id="alertInstitucionRegistro"></span>
                        </div>
                        <div class="form-group" style="text-align: left;">
                            <label for="InstitucionDestino">Responsable del Proyecto</label>
                            <input type="text" class="form-control" id="ResponsableProyecto" name="ResponsableProyecto">
                            <span class="alertError" id="alertResponsableProyectoRegistro"></span>
                        </div>

                        <div id="divPeriodos" class="row">
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label>Año de Inicio</label>
                                <select class="form-control" id="AnioInicio" name="AnioInicio">
                                </select>
                                <span class="alertError" id="alertAnioInicioRegistro"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label>Año de Conclusión</label>
                                <select class="form-control" id="AnioFin" name="AnioFin">
                                </select>
                                <span class="alertError" id="alertAnioFinRegistro"></span>
                            </div>
                        </div>

                        <div class="form-group" style="text-align: left;">
                            <label for="">Archivo Evidencia</label>
                        </div>
                        <ul class="nav nav-tabs" id="ArchivoEvidencia-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="CargarArchivoEvidencia-tab" data-toggle="tab" href="#CargarArchivoEvidencia" role="tab" aria-controls="" aria-selected="true">Cargar Archivo</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="VistaArchivoEvidencia-tab" data-toggle="tab" href="#VistaArchivoEvidencia" role="tab" aria-controls="" aria-selected="false">Vista Previa</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="ArchivoArchivoEvidencia-content">
                            <div class="tab-pane fade show active" id="CargarArchivoEvidencia" role="tabpanel" aria-labelledby="">
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
                            <input type="text" class="form-control" onchange="ControladorProfesorResponsable()" id="ProfesorResponsable" name="ProfesorResponsable">
                            <input type="hidden" id="IdProfesorResponsable" name="IdProfesorResponsable">
                            <span class="alertError" id="alertIdProfesorResponsableRegistro"></span>
                            <span class="alertError" id="alertProfesorResponsableRegistro"></span>
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

                        <div class="Materias-control" style="text-align: left; padding: 20px 10px; ">
                            <div class="text-control">
                                ¿Asociar a una experiencia educativa?
                            </div> 
                            <button class="btn btn-sm" id="btnSi" onclick="respuestaEE('si')">Si</button>
                            <button class="btn btn-sm" id="btnNo" onclick="respuestaEE('no')">No</button>
                        </div>

                        <div id="AsociarMaterias" class="ListaMaterias-container" style="display:none;">
                            <div class="Materias-control">
                                <div class="text-control">
                                   Agregar Experiencia Educativa
                                </div> 
                                <button class="btn btn-sm" id="btnAgregarMateria" onclick="añadirMateria()" title="Añadir una Materia"><i class="fas fa-plus"></i></button>
                                <button class="btn btn-sm" id="btnQuitarMateria" onclick="quitarMateria()" title="Restar una Materia" disabled><i class="fas fa-minus"></i></button>
                            </div>
                            <div id="Materias">
                                <div class="Materias-form card" id="CardListaMaterias">
                                    <div id="MateriasContainer" data-toggle="collapse" style="cursor: pointer;" data-target="#ListaMaterias">
                                        <i class="fas fa-angle-right"></i> Lista de Materias
                                    </div>
                                    <div id="ListaMaterias" style="margin-top:10px;" class="collapse"> 
                                        
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