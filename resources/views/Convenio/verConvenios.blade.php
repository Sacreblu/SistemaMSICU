@extends('layouts.Plantilla')

<link rel="stylesheet" href="/css/ConveniosMovilidad.css">
<script src="/js/Convenio/MostrarConvenios.js" type="text/javascript"></script>

<div class="Contenedor">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">Convenios de Movilidad</li>
        </ol>
    </nav>

    <div class="container">
        <div class="div-buscar">
            <div class="form-inline form-buscar">
                <form id="formBusqueda">
                    <div style="display:block; margin-bottom: 9px; padding-right: 10px">
                        <div class="form-check check-buscar">
                            <input class="form-check-input" type="radio" checked name="opcionBusqueda" id="checkNombre" value="Nombre_Clave">
                            <label class="form-check-label" for="checkNombre">Nombre</label>
                        </div>
                    </div>
                    <input type="text" class="form-control input-busqueda" name="textBusqueda" id="busqueda" onkeyup="busquedaConvenio()" value="">
                    <button type="button" class="btn btn-success btn-sm btn-buscar" onclick="busquedaConvenio()">Buscar</button>
                </form>
            </div>
        </div>
        <div class="div-opciones row">
            <div class="form-group form-inline col-md-9 opciones-form">
                <label for="Mostrar">Mostrar Sector: </label>
                <select class="form-control" id="Mostrar">
                    <option value="Todos">Todos</option>
                    <Option value="1">Practica de Movilidad en el Sector Social</Option>
                    <Option value="2">Practica de Movilidad en el Sector Productivo</Option>
                    <Option value="3">Practica de Movilidad en el Sector Gubernamental</Option>
                    <Option value="4">Estancia Académica</Option>
                    <Option value="5">Congreso</Option>
                </select>
            </div>
            <div class="opciones-btn col-md-3">
                <a class="btn btn-primary btn-sm" href="{{url('/Convenios_Movilidad/Registrar_Convenios_Movilidad')}}">Registrar Convenio</a>
            </div>
        </div>
        <div class="col-md-12 mt-3">
            <table id="ConveniosTabla" class="table table-hover table-sm tablaConvenios">
                <thead>
                    <tr style="text-align:center">
                        <th style="width:220px; vertical-align:middle;">Nombre</th>
                        <th style="width:150px; vertical-align:middle;">Sector</th>
                        <th style="width:220px; vertical-align:middle;">Institución/Organización</th>
                        <th style="width:150px; vertical-align:middle;">Conclusión</th>
                        <th style="width:100px; vertical-align:middle;">País</th>
                        
                        <th style="width:140px; vertical-align:middle;">Opciones</th>
                    </tr>
                </thead>
                <tbody id="tablaConvenios">
                    @foreach($result as $convenio)
                        <tr>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionConvenio({{$convenio->id}})">{{$convenio->Nombre_Clave}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionConvenio({{$convenio->id}})">{{$convenio->Sector}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionConvenio({{$convenio->id}})">{{$convenio->Institucion_Organizacion}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionConvenio({{$convenio->id}})">{{$convenio->Fecha_Conclusion}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionConvenio({{$convenio->id}})">{{$convenio->Pais}}</td>
                            
                            <td style="vertical-align:middle;  text-align:center">
                                <button type="button" class="btn btn-primary btn-xs" onclick="ModificarConvenio({{$convenio->id}})">Modificar</button>
                                <button type="button" class="btn btn-danger btn-xs btn-deshab" onclick="EliminarConvenio({{$convenio->id}})">Eliminar</button>
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
                        <h5 class="modal-title">Convenio de Movilidad</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style="text-align:left">
                        <div class="tabs-container">
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Nombre Clave del Convenio</b></p>
                                            <p style="font-size:16px;" style="width:800px;" id="Nombre_Clave"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Sector</b></p>
                                            <p style="font-size:16px;" id="Sector"></p>
                                        </div>
                                        <div id="divNombreCongreso" style="display:none">
                                            <div style="display: inline-block; margin:10px 20px;">
                                                <p style="font-size:16px;"><b>Nombre del Congreso</b></p>
                                                <p style="font-size:16px;" style="width:800px;" id="NombreCongreso"></p>
                                            </div>
                                        </div>
                                        <div id="divAcronimoCongreso" style="display:none">
                                            <div style="display: inline-block; margin:10px 20px;">
                                                <p style="font-size:16px;"><b>Acrónimo del Congreso</b></p>
                                                <p style="font-size:16px;" style="width:800px;" id="AcronimoCongreso"></p>
                                            </div>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Fecha de Comienzo</b></p>
                                            <p style="font-size:16px;" id="F_Comienzo"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Fecha de Conclusión</b></p>
                                            <p style="font-size:16px;" id="F_Conclusion"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px; max-width:350px">
                                            <p style="font-size:16px;"><b>Institución/Organización</b></p>
                                            <p style="font-size:16px;" id="Institucion"></p>
                                        </div>
                                        <div id="divDependencia" style="display:none">
                                            <div style="display: inline-block; margin:10px 20px;">
                                                <p style="font-size:16px;"><b>Dependencia</b></p>
                                                <p style="font-size:16px;" id="Dependencia"></p>
                                            </div>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>País</b></p>
                                            <p style="font-size:16px;" id="Pais"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Ciudad</b></p>
                                            <p style="font-size:16px;" id="Ciudad"></p>
                                        </div>
                                        <div class="row" style="margin:10px 5px;">
                                            <div style="display: inline-block; margin: 10px 0;" class="col-md-6">
                                                <p style="font-size:16px;"><b>Archivo Evidencia del Convenio</b></p><br>
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th style="vertical-align:middle; text-align:center;">Archivo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="EvidenciaConvenio">
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