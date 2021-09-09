@extends('layouts.Plantilla')

<link rel="stylesheet" href="/css/TrabajoRecepcional.css">
<script src="/js/TrabajoRecepcional/MostrarTrabajosRecepcionales.js" type="text/javascript"></script>

<div class="Contenedor">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <!--<li class="breadcrumb-item"><a href="#">Home</a></li>-->
            <li class="breadcrumb-item active" aria-current="page">Trabajos Recepcionales</li>
        </ol>
    </nav>

    <div class="container">
        <div class="div-buscar">
            <div class="form-inline form-buscar">
                <form id="formBusqueda">
                    <div style="display:block; margin-bottom: 9px; padding-right: 10px">
                        <div class="form-check check-buscar">
                            <input class="form-check-input" type="radio" checked name="opcionBusqueda" id="checkTitulo" value="Titulo">
                            <label class="form-check-label" for="checkTitulo">Título</label>
                        </div>
                        <div class="form-check check-buscar">
                            <input class="form-check-input" type="radio" name="opcionBusqueda" id="checkAutor" value="Autor">
                            <label class="form-check-label" for="checkAutor">Autor</label>
                        </div>
                    </div>
                    <input type="text" class="form-control input-busqueda" name="textBusqueda" id="busqueda" onkeyup="busquedaTesis()" value="">
                    <button type="button" class="btn btn-success btn-sm btn-buscar" onclick="busquedaTesis()">Buscar</button>
                </form>
            </div>
        </div>
        <div class="div-opciones row">
            <div class="form-group form-inline col-md-9 opciones-form">
                <label for="Mostrar">Mostrar: </label>
                <select class="form-control" id="Mostrar">
                    <option value="Todos">Todos</option>
                    <Option value="EnProceso">En Proceso</Option>
                    <Option value="Presentado">Presentado</Option>
                    <Option value="Publicado">Publicado</Option>
                </select>
            </div>
            <div class="opciones-btn col-md-3">
                <a class="btn btn-primary btn-sm" href="{{url('/Trabajos_Recepcionales/Registrar_Trabajo_Recepcional')}}">Registrar Trabajo</a>
            </div>
        </div>
        <div class="col-md-12 mt-3">
            <table id="TrabajosTabla" class="table table-hover table-sm tablaTrabajos">
                <thead>
                    <tr style="text-align:center">
                        <th style="width:220px; vertical-align:middle;">Título</th>
                        <th style="width:150px; vertical-align:middle;">Autor</th>
                        <th style="width:80px; vertical-align:middle;">Generación</th>
                        <th style="width:250px; vertical-align:middle;">LGAC</th>
                        <th style="width:60px; vertical-align:middle;">Estado</th>
                        
                        <th style="width:140px; vertical-align:middle;">Opciones</th>
                    </tr>
                </thead>
                <tbody id="tablaTrabajos">
                    @foreach($result as $trabajo)
                        <tr>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo({{$trabajo->id}})">{{$trabajo->Titulo}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo({{$trabajo->id}})">{{$trabajo->Nombre}} {{$trabajo->Apellido_P}} {{$trabajo->Apellido_M}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo({{$trabajo->id}})">{{$trabajo->Generacion}}° Gen</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo({{$trabajo->id}})">{{$trabajo->NombreLGAC}} (Plan {{$trabajo->Anio}})</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo({{$trabajo->id}})">
                                @if($trabajo->Estado=="EnProceso")
                                    En Proceso
                                @else
                                    {{$trabajo->Estado}}
                                @endif
                            </td>
                            <td style="vertical-align:middle;  text-align:center">
                                <button type="button" class="btn btn-primary btn-xs" onclick="ModificarTrabajo({{$trabajo->id}})">Modificar</button>
                                <button type="button" class="btn btn-danger btn-xs btn-deshab" onclick="EliminarTrabajo({{$trabajo->id}})">Eliminar</button>
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
                        <h5 class="modal-title">Trabajo Recepcional</h5>
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
                                    <a class="nav-link" id="Colaboraciones-tab" data-toggle="tab" href="#Colaboraciones" role="tab" aria-controls="Colaboraciones" aria-selected="false">Colaboraciones</a>
                                </li>
                            </ul>

                            <div class="tab-content" id="SeccionesContent">
                                <div class="tab-pane fade show active" id="DatosGenerales" role="tabpanel" aria-labelledby="DatosGenerales-tab">
                                    <div style="margin:25px; width:850px; max-height: 350px; overflow: auto;">
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Título</b></p>
                                            <p style="font-size:16px;" style="width:800px;" id="Titulo"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Autor</b></p>
                                            <p style="font-size:16px;" id="Autor"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Estado</b></p>
                                            <p style="font-size:16px;" id="Estado"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Generación</b></p>
                                            <p style="font-size:16px;" id="Generacion"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Mes de Publicación</b></p>
                                            <p style="font-size:16px;" id="MesPub"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Año de Publicación</b></p>
                                            <p style="font-size:16px;" id="AnioPub"></p>
                                        </div>
                                        <div style="display:block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Linea de Generación y Aplicación del Conocimiento</b></p>
                                            <p style="font-size:16px;" id="LGACs"></p>
                                        </div>
                                        <div class="row" style="margin:10px 5px;">
                                            <div style="display: inline-block;" class="col-md-6">
                                                <p style="font-size:16px;"><b>Dirección del Repositorio del Documento</b></p>
                                                <p style="font-size:16px;" id="DireccionRepositorio"></p>
                                            </div>
                                            <div style="display: inline-block;" class="col-md-6">
                                                <p style="font-size:16px;"><b>Dirección del Documento PDF</b></p>
                                                <p style="font-size:16px;" id="DireccionDocumento"></p>
                                            </div>
                                            <div style="display: inline-block; margin: 10px 0;" class="col-md-6">
                                                <p style="font-size:16px;"><b>Archivo Evidencia del Trabajo Recepcional</b></p><br>
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th style="vertical-align:middle; text-align:center;">Archivo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="EvidenciaTesis">
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div style="display: inline-block;  margin: 10px 0;" class="col-md-6">
                                                <p style="font-size:16px;"><b>Archivo Evidencia del Acta de Examen</b></p><br>
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th style="vertical-align:middle; text-align:center;">Archivo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="EvidenciaActa">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="Colaboraciones" role="tabpanel" aria-labelledby="Colaboraciones-tab">
                                    <br>
                                    <table id="TablaEvaluaciones" class="table table-sm" style="">
                                        <thead>
                                            <tr>
                                                <th style="vertical-align:middle; text-align:center; width:200px;">Profesor</th>
                                                <th style="vertical-align:middle; text-align:center; width:110px;">Colaboración</th>
                                                <th style="vertical-align:middle; text-align:center; width:250px;">Archivo de Evaluación</th>
                                            </tr>
                                        </thead>
                                        <tbody id="VistaEvaluaciones">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div style="margin:25px; width:850px; text-align:center;">
                                <button type="button" id="Modificar" class="btn btn-primary btn-sm">Modificar</button>
                                <button type="button" id="Eliminar" class="btn btn-warning btn-sm btn-danger" >Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>