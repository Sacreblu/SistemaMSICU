@extends('layouts.Plantilla')

<link rel="stylesheet" href="/css/AccionesMovilidad.css">
<script src="/js/AccionMovilidad/MostrarAccion.js" type="text/javascript"></script>

<div class="Contenedor">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">Movilidad y Congresos</li>
        </ol>
    </nav>

    <div class="container">
        <div class="div-buscar">
            <div class="form-inline form-buscar">
                <form id="formBusqueda">
                    <div style="display:block; margin-bottom: 9px; padding-right: 10px">
                        <div class="form-check check-buscar">
                            <input class="form-check-input" type="radio" checked name="opcionBusqueda" id="checkConvenio" value="Nombre_Clave">
                            <label class="form-check-label" for="checkConvenio">Convenio/Congreso</label>
                            <input class="form-check-input" type="radio" name="opcionBusqueda" id="checkEstudiante" value="Estudiante">
                            <label class="form-check-label" for="checkEstudiante">Estudiante</label>
                        </div>
                    </div>
                    <input type="text" class="form-control input-busqueda" name="textBusqueda" id="busqueda" onkeyup="busquedaMovilidad()" value="">
                    <button type="button" class="btn btn-success btn-sm btn-buscar" onclick="busquedaMovilidad()">Buscar</button>
                </form>
            </div>
        </div>
        <div class="div-opciones row">
            <div class="form-group form-inline col-md-9 opciones-form">
                <label for="Mostrar">Mostrar: </label>
                <select class="form-control" id="Mostrar">
                    <option value="Todos">Todos</option>
                    <Option value="1">Movilidad hacia MSICU</Option>
                    <Option value="2">Movilidad desde MSICU</Option>
                </select>
            </div>
            <div class="opciones-btn col-md-3">
                <a class="btn btn-primary btn-sm" href="{{url('/Acciones_Movilidad/Registrar_Acciones_Movilidad')}}">Registrar Movilidad</a>
            </div>
        </div>
        <div class="col-md-12 mt-3">
            <table id="MovilidadTabla" class="table table-hover table-sm tablaConvenios">
                <thead>
                    <tr style="text-align:center">
                        <th style="width:220px; vertical-align:middle;">Estudiante</th>
                        <th style="width:150px; vertical-align:middle;">Convenio</th>
                        <th style="width:150px; vertical-align:middle;">Periodo de Inicio</th>
                        <th style="width:150px; vertical-align:middle;">Periodo de Conclusión</th>
                        <th style="width:220px; vertical-align:middle;">Institución Destino</th>
                        
                        <th style="width:140px; vertical-align:middle;">Opciones</th>
                    </tr>
                </thead>
                <tbody id="tablaMovilidades">
                    @foreach($result as $movilidad)
                        <tr>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionMovilidad({{$movilidad->id}})">{{$movilidad->Nombre}} {{$movilidad->Apellido_P}} {{$movilidad->Apellido_M}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionMovilidad({{$movilidad->id}})">{{$movilidad->Nombre_Clave}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionMovilidad({{$movilidad->id}})">{{substr($movilidad->PeriodoInicio, 0, 7)}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionMovilidad({{$movilidad->id}})">{{substr($movilidad->PeriodoConclusion, 0, 7)}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionMovilidad({{$movilidad->id}})">{{$movilidad->InstitucionDestino}}</td>
                            
                            <td style="vertical-align:middle;  text-align:center">
                                <button type="button" class="btn btn-primary btn-xs" onclick="ModificarMovilidad({{$movilidad->id}})">Modificar</button>
                                <button type="button" class="btn btn-danger btn-xs btn-deshab" onclick="EliminarMovilidad({{$movilidad->id}})">Eliminar</button>
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
                        <h5 class="modal-title">Accion de Movilidad</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style="text-align:left">
                        <div class="tabs-container">
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Convenio o Congreso Asociado</b></p>
                                            <p style="font-size:16px;" style="width:800px;" id="Nombre_Clave"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Estudiante</b></p>
                                            <p style="font-size:16px;" style="width:800px;" id="Estudiante"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Periodo de Comienzo</b></p>
                                            <p style="font-size:16px;" id="P_Comienzo"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Periodo de Conclusión</b></p>
                                            <p style="font-size:16px;" id="P_Conclusion"></p>
                                        </div>
                                        <div id="divInstOrigen" style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Institución de Origen</b></p>
                                            <p style="font-size:16px;" id="InstOrigen"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Institución Destino</b></p>
                                            <p style="font-size:16px;" id="InstDestino"></p>
                                        </div>
                                        <div id="divDepOrigen" style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Dependencia de Origen</b></p>
                                            <p style="font-size:16px;" id="DepOrigen"></p>
                                        </div>
                                        <div id="divDepDestino" style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Dependencia Destino</b></p>
                                            <p style="font-size:16px;" id="DepDestino"></p>
                                        </div>
                                        <div id="divProgOrigen" style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Programa de Origen</b></p>
                                            <p style="font-size:16px;" id="ProgOrigen"></p>
                                        </div>
                                        <div id="divProgDestino" style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Programa Destino</b></p>
                                            <p style="font-size:16px;" id="ProgDestino"></p>
                                        </div>
                                        <div style="display:block">
                                            <div style="display: inline-block; margin:10px 20px;">
                                                <p style="font-size:16px;"><b>Motivo de Movilidad</b></p>
                                                <p style="font-size:16px;" style="width:800px;" id="Motivo"></p>
                                            </div>
                                        </div>
                                        <div id="divCongresoEvidencia" class="row" style="margin:10px 5px; display: none;">
                                            <div style="display: inline-block; margin: 10px 0;" class="col-md-6">
                                                <p style="font-size:16px;"><b>Evidencia de Congreso</b></p><br>
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th style="vertical-align:middle; text-align:center;">Archivo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="EvidenciaCongreso" style="text-align: center">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div id="divArchivosEvidencia" class="row" style="margin:10px 5px; display: none;">
                                            <div style="display: inline-block; margin: 10px 0;" class="col-md-6">
                                                <p style="font-size:16px;"><b>Formato de Movilidad</b></p><br>
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th style="vertical-align:middle; text-align:center;">Archivo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="FormatoMovilidad" style="text-align: center">
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div style="display: inline-block; margin: 10px 0;" class="col-md-6">
                                                <p style="font-size:16px;"><b>Carta de Solicitud de Movilidad</b></p><br>
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th style="vertical-align:middle; text-align:center;">Archivo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="CartaSolicitudMov" style="text-align: center">
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div style="display: inline-block; margin: 10px 0;" class="col-md-6">
                                                <p style="font-size:16px;"><b>Carta de Aceptacion de Movilidad</b></p><br>
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th style="vertical-align:middle; text-align:center;">Archivo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="CartaAceptacion" style="text-align: center">
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div style="display: inline-block; margin: 10px 0;" class="col-md-6">
                                                <p style="font-size:16px;"><b>Reporte de Actividades</b></p><br>
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th style="vertical-align:middle; text-align:center;">Archivo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="ReporteActividades" style="text-align: center">
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div style="display: inline-block; margin: 10px 0;" class="col-md-6">
                                                <p style="font-size:16px;"><b>Carta de Liberación</b></p><br>
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th style="vertical-align:middle; text-align:center;">Archivo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="CartaLiberacion" style="text-align: center">
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div style="display: inline-block; margin: 10px 0;" class="col-md-6">
                                                <p style="font-size:16px;"><b>Documentación Complementaria</b></p><br>
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th style="vertical-align:middle; text-align:center;">Archivo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="DocumentacionComp" style="text-align: center">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                            <div style="width:700px; text-align:center;">
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