@extends('layouts.Plantilla')

<link rel="stylesheet" href="/css/Estudiante.css">
<script src="/js/Estudiante/MostrarEstudiantes.js" type="text/javascript"></script>

<div class="Contenedor">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <!--<li class="breadcrumb-item"><a href="#">Home</a></li>-->
            <li class="breadcrumb-item active" aria-current="page">Estudiante</li>
        </ol>
    </nav>

    <div class="container">
        <div class="div-buscar">
            <div class="form-inline form-buscar">
                <form id="formBusqueda">
                    <div style="display:block; margin-bottom: 9px; padding-right: 10px">
                        <div class="form-check check-buscar">
                            <input class="form-check-input" type="radio" checked name="opcionBusqueda" id="checkCVU" value="No_CVU">
                            <label class="form-check-label" for="checkCVU">CVU</label>
                        </div>
                        <div class="form-check check-buscar">
                            <input class="form-check-input" type="radio" name="opcionBusqueda" id="checkMatricula" value="Matricula">
                            <label class="form-check-label" for="checkMatricula">Matricula</label>
                        </div>
                        <div class="form-check check-buscar">
                            <input class="form-check-input" type="radio" name="opcionBusqueda" id="checkNombre" value="Nombre">
                            <label class="form-check-label" for="checkNombre">Nombre</label>
                        </div>
                    </div>
                    <input type="text" class="form-control input-busqueda" name="textBusqueda" id="busqueda" onkeyup="busquedaEstudiante()" value="">
                    <button type="button" class="btn btn-success btn-sm btn-buscar" onclick="busquedaEstudiante()">Buscar</button>
                </form>
            </div>
        </div>
        <div class="div-opciones row">
            <div class="form-group form-inline col-md-9 opciones-form">
                <label for="Mostrar">Mostrar: </label>
                <select class="form-control" id="Mostrar">
                    <option value="Todos">Todos</option>
                    <option value="En curso">En curso</option>
                    <option value="Egresado">Egresados</option>
                    <option value="Baja">De baja</option>
                </select>
            </div>
            <div class="opciones-btn col-md-3">
                <a class="btn btn-primary btn-sm" href="{{url('/Estudiantes/Registrar_Estudiante')}}">Registrar Estudiante</a>
            </div>
        </div>
        <div class="col-md-12 mt-3">
            <table id="EstudianteTabla" class="table table-hover table-sm tablaEstudiantes">
                <thead>
                    <tr style="text-align:center">
                        <th style="width:80px; vertical-align:middle;">No. CVU</th>
                        <th style="width:70px; vertical-align:middle;">Matrícula</th>
                        <th style="width:250px; vertical-align:middle;">Estudiante</th>
                        <th style="width:100px; vertical-align:middle;">Correo</th>
                        <th style="width:100px; vertical-align:middle;">Generación</th>
                        <th style="width:100px; vertical-align:middle;">Estado</th>

                        <th style="width:140px; vertical-align:middle;">Opciones</th>
                    </tr>
                </thead>
                <tbody id="tablaEstudiantes">
                    @foreach($result as $estudiante)
                        <tr>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionEstudiante({{$estudiante->id}})">{{$estudiante->No_CVU}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionEstudiante({{$estudiante->id}})">{{$estudiante->Matricula}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionEstudiante({{$estudiante->id}})">{{$estudiante->Nombre}} {{$estudiante->Apellido_P}} {{$estudiante->Apellido_M}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionEstudiante({{$estudiante->id}})">{{$estudiante->Correo}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionEstudiante({{$estudiante->id}})">{{$estudiante->Generacion}}° Gen</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionEstudiante({{$estudiante->id}})">{{$estudiante->Estado}}</td>
                            <td style="vertical-align:middle;  text-align:center">
                                <button type="button" class="btn btn-primary btn-xs" onclick="ModificarEstudiante({{$estudiante->id}})">Modificar</button>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <!-- Modal Ver Datos -->
        <div class="modal fade" id="verDatos" tabindex="-1" role="dialog" aria-labelledby="VerDatosLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="NombreEstudiante"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style="text-align:left">
                        <div class="tabs-container">

                            <ul class="nav nav-tabs" id="Secciones" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="DatosGenerales-tab" data-toggle="tab" href="#DatosGenerales" role="tab" aria-controls="Datos Generales" aria-selected="true">Datos Generales</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="PreparacionAcademica-tab" data-toggle="tab" href="#PreparacionAcademica" role="tab" aria-controls="Preparacion Academica" aria-selected="false">Preparación Academica</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="ColaboracionProductos-tab" data-toggle="tab" href="#ColaboracionProductos" role="tab" aria-controls="Colaboración en Productos" aria-selected="false">Colaboración en Productos</a>
                                </li>
                            </ul>

                            <div class="tab-content" id="SeccionesContent">
                                <div class="tab-pane fade show active" id="DatosGenerales" role="tabpanel" aria-labelledby="DatosGenerales-tab">
                                    <div style="margin:25px; width:850px; max-height: 350px; overflow: auto;">
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Estado</b></p>
                                            <p style="font-size:16px;" id="Estado"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>No. CVU</b></p>
                                            <p style="font-size:16px;" id="No_CVU"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Matricula</b></p>
                                            <p style="font-size:16px;" id="Matricula"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Correo Personal</b></p>
                                            <p style="font-size:16px;" id="CorreoPersonal"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Correo Institucional</b></p>
                                            <p style="font-size:16px;" id="Correo"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Generación</b></p>
                                            <p style="font-size:16px;" id="Generacion"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Plan de Estudios</b></p>
                                            <p style="font-size:16px;" id="PlanEstudios"></p>
                                        </div>
                                        <div style="display:block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Linea de Generación y Aplicación del Conocimiento</b></p>
                                            <p style="font-size:16px;" id="LGACs">
                                            </p>
                                        </div>
                                        <div id="divArchivoEvidencia" style="display: none; margin:10px">
                                            <p style="font-size:16px;"><b>Documento Carta de Liberación</b></p><br>
                                            <table class="table table-sm" style="width: auto">
                                                <thead>
                                                    <tr>
                                                        <th style="vertical-align:middle; text-align:center; width:270px;">Archivo</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="VistaCarta">
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="PreparacionAcademica" role="tabpanel" aria-labelledby="PreparacionAcademica-tab">
                                    <br>
                                    <table id="TablaEstudios" class="table table-sm" style="">
                                        <thead>
                                            <tr>
                                                <th style="vertical-align:middle; text-align:center; width:270px;">Título</th>
                                                <th style="vertical-align:middle; text-align:center; width:110px;">Grado</th>
                                                <th style="vertical-align:middle; text-align:center; width:150px;">Universidad</th>
                                                <th style="vertical-align:middle; text-align:center; width:150px;">Año</th>
                                                <th style="vertical-align:middle; text-align:center; width:150px;">Lugar</th>
                                                <th style="vertical-align:middle; text-align:center; width:150px;">Archivo</th>
                                            </tr>
                                        </thead>
                                        <tbody id="VistaEstudios">
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade" id="ColaboracionProductos" role="tabpanel" aria-labelledby="ColaboracionProductos-tab">
                                    <br>
                                    <!-- <table id="TablaSuperacion" class="table table-sm" style="">
                                        <thead>
                                            <tr>
                                                <th style="vertical-align:middle; text-align:center; width:220px;">Título</th>
                                                <th style="vertical-align:middle; text-align:center; width:90px;">Documento</th>
                                                <th style="vertical-align:middle; text-align:center; width:90px;">Periodo</th>
                                                <th style="vertical-align:middle; text-align:center; width:80px;">Año</th>
                                                <th style="vertical-align:middle; text-align:center; width:250px;">Descripción</th>
                                                <th style="vertical-align:middle; text-align:center; width:100px;">Archivo</th>
                                            </tr>
                                        </thead>
                                        <tbody id="VistaSuperacion">
                                        </tbody>
                                    </table> -->
                                </div>
                            </div>
                            <div style="margin:25px; width:850px; text-align:center;">
                                <button type="button" id="Modificar" class="btn btn-primary btn-sm">Modificar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>