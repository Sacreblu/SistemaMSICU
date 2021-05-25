@extends('layouts.Plantilla')

<link rel="stylesheet" href="/css/Estudiante.css">
<script src="/js/Estudiante/ModificarEstudiante.js" type="text/javascript"></script>

<script>
    var informacion = @json($informacion);
</script>
<div class="Contenedor">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{url('/Estudiantes')}}">Estudiantes</a></li>
            <li class="breadcrumb-item active" aria-current="page">Modificar Estudiante</li>
        </ol>
    </nav>
    <div class="container">
        <div class="btn-formRegistro">
            <button type="button" id="btnGuardar" class="btn btn-success btn-sm" style="margin-right:10px" onclick="EjecutarValidaciones()">Guardar Cambios</button>
            <button type="button" id="btnCancelar" class="btn btn-light btn-sm" onclick="Cancelar()" style="margin-left:10px">Cancelar</button>
        </div>
    </div>
        <div class="tabs-container">

            <ul class="nav nav-tabs" id="Secciones" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="DatosGenerales-tab" data-toggle="tab" href="#DatosGenerales" role="tab" aria-controls="Datos Generales" aria-selected="true">Datos Generales</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="PreparacionAcademica-tab" data-toggle="tab" href="#PreparacionAcademica" role="tab" aria-controls="Preparacion Academica" aria-selected="false">Preparación Academica</a>
                </li>
            </ul>
            <div class="tab-content" id="SeccionesContent" style="padding-top: 18px">
                <div class="tab-pane fade show active" id="DatosGenerales" role="tabpanel" aria-labelledby="DatosGenerales-tab">
                    <form action="" class="form-group" id="FormDatosGenerales">
                        <div class="form-row" style="padding: 0 30px">
                            <div class="form-group form-chek col-md-2" style="text-align: left;">
                                <label style="display:block;">Estado</label>
                                <div class="form-check-inline" style="padding-left:18px">
                                    <label class="form-check-label" for="Encurso">
                                    <input type="radio" class="form-check-input" id="Encurso" name="Estado" value="En curso" onchange="controladorEstado()" checked>En curso
                                </div>
                                <div class="form-check-inline" style="padding-left:18px">
                                    <label class="form-check-label" for="Egresado">
                                    <input type="radio" class="form-check-input" id="Egresado" name="Estado" value="Egresado" onchange="controladorEstado()">Egresado
                                </div>
                                <div class="form-check-inline" style="padding-left:18px">
                                    <label class="form-check-label" for="Baja">
                                    <input type="radio" class="form-check-input" id="Baja" name="Estado" value="Baja" onchange="controladorEstado()">De baja
                                </div>
                            </div>
                            <div class="form-group col-md-3" style="text-align: left;">
                                <label for="Nombre">Nombre(s)</label>
                                <input type="text" class="form-control" id="Nombre" name="Nombre">
                                <span class="alertError" id="alertNombreEstModificar"></span>
                            </div>
                            <div class="form-group col-md-2" style="text-align: left;">
                                <label for="ApellidoP">Apellido Paterno</label>
                                <input type="text" class="form-control" id="ApellidoP" name="Apellido_P">
                                <span class="alertError" id="alertApellido_PEstModificar"></span>
                            </div>
                            <div class="form-group col-md-2" style="text-align: left;">
                                <label for="ApellidoM">Apellido Materno</label>
                                <input type="text" class="form-control" id="ApellidoM" name="Apellido_M">
                                <span class="alertError" id="alertApellido_MEstModificar"></span>
                            </div>
                            <div class="form-group col-md-3" style="text-align: left;">
                                <label for="Correo">Correo Institucional</label>
                                <input type="email" class="form-control" id="Correo" name="Correo">
                                <span class="alertError" id="alertCorreoEstModificar"></span>
                            </div>
                            <div class="form-group col-md-3" style="text-align: left;">
                                <label for="CorreoPersonal">Correo Personal</label>
                                <input type="email" class="form-control" id="CorreoPersonal" name="CorreoPersonal">
                                <span class="alertError" id="alertCorreoPersonalEstModificar"></span>
                            </div>
                            <div class="form-group col-md-2" style="text-align: left;">
                                <label for="CVU">No. CVU</label>
                                <input type="text" class="form-control" id="CVU" name="No_CVU">
                                <span class="alertError" id="alertNo_CVUEstModificar"></span>
                            </div>
                            <div class="form-group col-md-2" style="text-align: left;">
                                <label for="Matricula">Matrrícula</label>
                                <input type="text" class="form-control" id="Matricula" name="Matricula">
                                <span class="alertError" id="alertMatriculaEstModificar"></span>
                            </div>
                            <div class="form-group col-md-2" style="text-align: left;">
                                <label for="Generacion">Generación</label>
                                <select class="form-control" id="Generacion" name="Generacion" onchange="setPlanEstudios(this)">
                                </select>
                            </div>
                            <div class="form-group col-md-3" style="text-align: left;">
                                <label for="Plan">Plan de Estudios</label>
                                <input type="text" readonly class="form-control" id="Plan" name="Plan">
                                <input type="hidden" class="form-control" id="Id_Plan" name="Id_Plan">
                            </div>
                            <div class="form-group col-md-12" id="LGACs" style="text-align: left;">
                                
                            </div>
                            <div class="col-md-12" id="divArchivoCarta" style="padding: 0; display:none">
                                <div class="form-group col-md-6" style="text-align: left; display: inline-block;">
                                    <label>Carta de Liberación</label>
                                    <input type="hidden" name="EstadoCheck" id="EstadoCheck">
                                    <span class="alertError" id="alertArchivoCartaLibEstModificar"></span>
                                    <div class="container p-y-1 col-md-8">
                                        <div class="row m-b-1">
                                            <div class="col-sm-12">
                                                <div class="form-group inputDnD">
                                                    <label class="sr-only" for="inputFile">File Upload</label>
                                                    <input type="file" name="ArchivoCartaLib" class="form-control-file text-primary font-weight-bold" id="ArchivoCartaLiberacion" accept="application/pdf" onchange="ControladorCartaLiberacion()" data-title="Arrastre y suelte el archivo">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-5" style="display: inline-block;">
                                    <ul class="nav nav-tabs" id="ArchivoCarta" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link" id="ArchivoCargadoCarta-tab" data-toggle="tab" href="#ArchivoCargadoCarta" role="tab" aria-controls="Archivos Cargados Carta" aria-selected="true">Archivo Cargado</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link active" id="ArchivoGuardadoCarta-tab" data-toggle="tab" href="#ArchivoGuardadoCarta" role="tab" aria-controls="Archivos Guardados Carta" aria-selected="false">Archivo Guardado</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="ArchivoCartaContent">
                                        <div class="tab-pane fade show active" id="ArchivoGuardadoCarta" role="tabpanel" aria-labelledby="ArchivoGuardadoCarta-tab">
                                            <div class="container col-md-12">
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th colspan="2">Archivo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="VistaCartaGuardada">
                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade " id="ArchivoCargadoCarta" role="tabpanel" aria-labelledby="ArchivoCargadoCarta-tab">
                                            <div class="container col-md-12">
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th>Archivo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="VistaPrevCartaLiberacion">
                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="tab-pane fade" id="PreparacionAcademica" role="tabpanel" aria-labelledby="PreparacionAcademica-tab">
                    <div class="Estudios-container">
                        <div class="Estudios-control">
                            <div class="text-control">
                                Estudios y Grados Academicos
                            </div> 
                            <button class="btn btn-sm" onclick="añadirPreparacionAcademica()" title="Añadir un registro de Estudios"><i class="fas fa-plus"></i></button>
                            <button class="btn btn-sm" id="btnQuitar" onclick="quitarPreparacionAcademica()" title="Restar un registro de Estudios" disabled><i class="fas fa-minus"></i></button>
                        </div>
                        <div id="Estudios">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
</div>