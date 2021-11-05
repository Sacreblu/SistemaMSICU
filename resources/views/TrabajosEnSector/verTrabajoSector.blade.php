@extends('layouts.Plantilla')

<link rel="stylesheet" href="/css/TrabajosSectores.css">
<script src="/js/TrabajosSectores/MostrarTrabajosSect.js" type="text/javascript"></script>

<div class="Contenedor">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">Trabajos en Sector</li>
        </ol>
    </nav>

    <div class="container">
        <div class="div-buscar">
            <div class="form-inline form-buscar">
                <form id="formBusqueda">
                    <div style="display:block; margin-bottom: 9px; padding-right: 10px">
                        <div class="form-check check-buscar">
                            <input class="form-check-input" type="radio" checked name="opcionBusqueda" id="checkConvenio" value="Nombre_Clave">
                            <label class="form-check-label" for="checkConvenio">Convenio</label>
                            <input class="form-check-input" type="radio" name="opcionBusqueda" id="checkProfesor" value="Profesor">
                            <label class="form-check-label" for="checkProfesor">Profesor Responsable</label>
                            <input class="form-check-input" type="radio" name="opcionBusqueda" id="checkNombreTS" value="NombreTS">
                            <label class="form-check-label" for="checkNombreTS">Nombre de Trabajo</label>
                        </div>
                    </div>
                    <input type="text" class="form-control input-busqueda" name="textBusqueda" id="busqueda" onkeyup="busquedaTrabajoEnSector()" value="">
                    <button type="button" class="btn btn-success btn-sm btn-buscar" onclick="busquedaTrabajoEnSector()">Buscar</button>
                </form>
            </div>
        </div>
        <div class="div-opciones row">
            <div class="form-group form-inline col-md-9 opciones-form">
                <label for="Mostrar">Mostrar: </label>
                <select class="form-control" id="Mostrar">
                    <option value="Todos">Todos</option>
                </select>
            </div>
            <div class="opciones-btn col-md-3">
                <a class="btn btn-primary btn-sm" href="{{url('/Trabajos_En_Sector/Registrar_Trabajos_Sectores')}}">Registrar Trabajo</a>
            </div>
        </div>
        <div class="col-md-12 mt-3">
            <table id="TrabajoTabla" class="table table-hover table-sm tablaConvenios">
                <thead>
                    <tr style="text-align:center">
                        <th style="width:220px; vertical-align:middle;">Nombre de Proyecto</th>
                        <th style="width:150px; vertical-align:middle;">Convenio</th>
                        <th style="width:200px; vertical-align:middle;">Profesor Responsable</th>
                        <th style="width:130px; vertical-align:middle;">Año de Inicio</th>
                        <th style="width:130px; vertical-align:middle;">Año de Conclusión</th>
                        
                        <th style="width:140px; vertical-align:middle;">Opciones</th>
                    </tr>
                </thead>
                <tbody id="tablaTrabajos">
                    @foreach($result as $trabajo)
                        <tr>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo({{$trabajo->id}})">{{$trabajo->NombreProyecto}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo({{$trabajo->id}})">{{$trabajo->Nombre_Clave}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo({{$trabajo->id}})">{{$trabajo->Nombre}} {{$trabajo->Apellido_P}} {{$trabajo->Apellido_M}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo({{$trabajo->id}})">{{$trabajo->anioInicio}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionTrabajo({{$trabajo->id}})">{{$trabajo->anioFin}}</td>
                            
                            <td style="vertical-align:middle;  text-align:center">
                                <button type="button" class="btn btn-primary btn-xs" onclick="ModificarTrabajo({{$trabajo->id}})">Modificar</button>
                                <button type="button" class="btn btn-danger btn-xs btn-deshab" onclick="EliminarTrabajo({{$trabajo->id}})">Eliminar</button>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <!-- Modal Ver Datos--> 
        <div class="modal fade" id="verDatos" tabindex="-1" role="dialog" aria-labelledby="VerDatosLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Trabajo en Sector</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style="text-align:left">
                        <div class="tabs-container row">
                            <fieldset class="scheduler-border col-md-6">
                                <legend class="scheduler-border">Datos de la Institución</legend>
                                <div style="display: inline-block; margin:10px 20px;">
                                    <p style="font-size:16px;"><b>Nombre del Proyecto</b></p>
                                    <p style="font-size:16px;" style="width:800px;" id="NombreProyecto"></p>
                                </div>
                                <div style="display: inline-block; margin:10px 20px;">
                                    <p style="font-size:16px;"><b>Convenio Asociado</b></p>
                                    <p style="font-size:16px;" style="width:800px;" id="Nombre_Clave"></p>
                                </div>
                                <div style="display: inline-block; margin:10px 20px;">
                                    <p style="font-size:16px;"><b>Institución</b></p>
                                    <p style="font-size:16px;" style="width:800px;" id="Institucion"></p>
                                </div>
                                <div style="display: inline-block; margin:10px 20px;">
                                    <p style="font-size:16px;"><b>Responsable del Proyecto</b></p>
                                    <p style="font-size:16px;" style="width:800px;" id="ResponsableProyecto"></p>
                                </div>
                                <div style="display: inline-block; margin:10px 20px;">
                                    <p style="font-size:16px;"><b>Año de Inicio</b></p>
                                    <p style="font-size:16px;" style="width:800px;" id="anioInicio"></p>
                                </div>
                                <div style="display: inline-block; margin:10px 20px;">
                                    <p style="font-size:16px;"><b>Año de Conclusión</b></p>
                                    <p style="font-size:16px;" style="width:800px;" id="anioFin"></p>
                                </div>
                                <div style="display: inline-block; margin: 10px 0;">
                                    <p style="font-size:16px;"><b>Archivo Evidencia</b></p><br>
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th style="vertical-align:middle; text-align:center;">Archivo</th>
                                            </tr>
                                        </thead>
                                        <tbody id="ArchivoEvidencia" style="text-align: center">
                                        </tbody>
                                    </table>
                                </div>
                            </fieldset>
                            <fieldset class="scheduler-border col-md-6">
                                <legend class="scheduler-border">Datos de la MSICU</legend>
                                <div style="display: inline-block; margin:10px 20px;">
                                    <p style="font-size:16px;"><b>Profesor Responsable</b></p>
                                    <p style="font-size:16px;" style="width:800px;" id="ProfResponsable"></p>
                                </div>
                                <div style="display: inline-block; margin:10px 20px;">
                                    <p style="font-size:16px;"><b>Experiencia Educativa</b></p>
                                    <p style="font-size:16px;" style="width:800px;" id="EE"></p>
                                </div>
                                <div style="display: inline-block; margin:10px 20px;">
                                    <p style="font-size:16px;"><b>Colaboración de Profesores:</b></p>
                                    <div id="ColabProf">

                                    </div>
                                </div>
                                <div style="display: inline-block; margin:10px 20px;">
                                    <p style="font-size:16px;"><b>Colaboración de Estudiantes:</b></p>
                                    <div id="ColabEst">
                                        
                                    </div>
                                </div>
                            </fieldset>
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