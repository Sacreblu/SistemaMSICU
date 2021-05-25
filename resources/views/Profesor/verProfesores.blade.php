@extends('layouts.Plantilla')

<link rel="stylesheet" href="/css/Profesor.css">
<script src="/js/Profesor/MostrarProfesores.js" type="text/javascript"></script>

<div class="Contenedor">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <!--<li class="breadcrumb-item"><a href="#">Home</a></li>-->
            <li class="breadcrumb-item active" aria-current="page">Profesores</li>
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
                            <input class="form-check-input" type="radio" name="opcionBusqueda" id="checkNombre" value="Nombre">
                            <label class="form-check-label" for="checkNombre">Nombre</label>
                        </div>
                    </div>
                    <input type="text" class="form-control input-busqueda" name="textBusqueda" id="busqueda" onkeyup="busquedaProfe()" value="">
                    <button type="button" class="btn btn-success btn-sm btn-buscar" onclick="busquedaProfe()">Buscar</button>
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
                <a class="btn btn-primary btn-sm" href="{{url('/Profesores/Registrar_Profesor')}}">Registrar Profesor</a>
            </div>
        </div>
        <div class="col-md-12 mt-3">
            <table id="ProfesorTabla" class="table table-hover table-sm tablaProfesores">
                <thead>
                    <tr style="text-align:center">
                        <th style="width:60px; vertical-align:middle;">No. CVU</th>
                        <th style="width:250px; vertical-align:middle;">Profesor</th>
                        <th style="width:180px; vertical-align:middle;">Correo</th>
                        <th style="width:200px; vertical-align:middle;">Tipo de Contratación</th>
                        <th style="width:80px; vertical-align:middle;">Fecha de Contratación</th>
                        
                        <th style="width:140px; vertical-align:middle;">Opciones</th>
                    </tr>
                </thead>
                <tbody id="tablaProfesores">
                    @foreach($result as $profe)
                        <tr>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor({{$profe->id}})">{{$profe->No_CVU}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor({{$profe->id}})">{{$profe->Nombre}} {{$profe->Apellido_P}} {{$profe->Apellido_M}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor({{$profe->id}})">{{$profe->Correo}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor({{$profe->id}})">{{$profe->Tipo}}</td>
                            <td style="vertical-align:middle; text-align:center" onclick="verInformacionProfesor({{$profe->id}})">{{$profe->Mes_Ingreso}} {{$profe->Anio_Ingreso}}</td>
                            <td style="vertical-align:middle;  text-align:center">
                                <button type="button" class="btn btn-primary btn-xs" onclick="ModificarProfesor({{$profe->id}})">Modificar</button>
                                <button type="button" class="btn btn-warning btn-xs btn-deshab" onclick="DeshabilitarProfesor({{$profe->id}})">Deshabilitar</button>
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
                        <h5 class="modal-title" id="NombreProfesor"></h5>
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
                                    <a style="width:140px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;" class="nav-link" id="PreparacionAcademica-tab" data-toggle="tab" href="#PreparacionAcademica" role="tab" aria-controls="Preparacion Academica" aria-selected="false">Preparación Academica</a>
                                </li>
                                <li class="nav-item">
                                    <a style="width:140px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;" class="nav-link" id="SuperacionAcademica-tab" data-toggle="tab" href="#SuperacionAcademica" role="tab" aria-controls="Superacion Academica" aria-selected="false">Superación Academica</a>
                                </li>
                                <li class="nav-item">
                                    <a style="width:140px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;" class="nav-link" id="Distincion-tab" data-toggle="tab" href="#Distincion" role="tab" aria-controls="Distinciones" aria-selected="false">Distinciones</a>
                                </li>
                                <li class="nav-item">
                                    <a style="width:140px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;" class="nav-link" id="TrayectoriaProfesional-tab" data-toggle="tab" href="#TrayectoriaProfesional" role="tab" aria-controls="Trayectoria Profesional" aria-selected="false">Trayectoria Profesional</a>
                                </li>
                                <li class="nav-item">
                                    <a style="width:140px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;" class="nav-link" id="PertenenciaOrganizaciones-tab" data-toggle="tab" href="#PertenenciaOrganizaciones" role="tab" aria-controls="Pertenencia a Organizaciones" aria-selected="false">Pertenencia a Organizaciones</a>
                                </li>
                            </ul>

                            <div class="tab-content" id="SeccionesContent">
                                <div class="tab-pane fade show active" id="DatosGenerales" role="tabpanel" aria-labelledby="DatosGenerales-tab">
                                    <div style="margin:25px; width:850px; max-height: 350px; overflow: auto;">
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>No. CVU</b></p>
                                            <p style="font-size:16px;" id="No_CVU"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Correo Institucional</b></p>
                                            <p style="font-size:16px;" id="Correo"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Correo Personal</b></p>
                                            <p style="font-size:16px;" id="CorreoPersonal"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>País</b></p>
                                            <p style="font-size:16px;" id="Pais"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Tipo de Contratación</b></p>
                                            <p style="font-size:16px;" id="TipoContratacion"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Institución de Contratación</b></p>
                                            <p style="font-size:16px;" id="Institucion"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Tipo de Colaboración</b></p>
                                            <p style="font-size:16px;" id="TipoColaboracion"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Fecha de Ingreso</b></p>
                                            <p style="font-size:16px;" id="FechaIngreso"></p>
                                        </div>
                                        <div style="display: inline-block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Fecha de Salida</b></p>
                                            <p style="font-size:16px;" id="FechaSalida"></p>
                                        </div>
                                        <div style="display:block; margin:10px 20px;">
                                            <p style="font-size:16px;"><b>Linea de Generación y Aplicación del Conocimiento</b></p>
                                            <p style="font-size:16px;" id="LGACs">
                                                Computo Centrado en el Usuario<br>
                                                Computo Centrado en el Usuario
                                            </p>
                                            
                                        </div>
                                        <div style="display: inline-block; margin:10px">
                                            <p style="font-size:16px;"><b>Fecha de Ingreso al NAB</b></p>
                                            <p style="font-size:16px;" id="IngresoNAB"></p>
                                        </div>
                                        <div style="display: block; margin:10px">
                                            <p style="font-size:16px;"><b>Documentos Cartas NAB</b></p><br>
                                            <table class="table table-sm" style="width: auto">
                                                <thead>
                                                    <tr>
                                                        <th style="vertical-align:middle; text-align:center; width:270px;">Archivo</th>
                                                        <th style="vertical-align:middle; text-align:center; width:110px;">Estado</th>
                                                        <th style="vertical-align:middle; text-align:center; width:150px;">Fecha de Registro</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="VistaCartas">
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
                                <div class="tab-pane fade" id="SuperacionAcademica" role="tabpanel" aria-labelledby="SuperacionAcademica-tab">
                                <br>
                                    <table id="TablaSuperacion" class="table table-sm" style="">
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
                                    </table>
                                </div>
                                <div class="tab-pane fade" id="Distincion" role="tabpanel" aria-labelledby="Distincion-tab">
                                    <br>
                                    <table id="TablaDistincion" class="table table-sm" style="">
                                        <thead>
                                            <tr>
                                                <th style="vertical-align:middle; text-align:center; width:220px;">Distincion</th>
                                                <th style="vertical-align:middle; text-align:center; width:90px;">Periodo</th>
                                                <th style="vertical-align:middle; text-align:center; width:90px;">Año</th>
                                                <th style="vertical-align:middle; text-align:center; width:250px;">Descripción</th>
                                                <th style="vertical-align:middle; text-align:center; width:100px;">Archivo</th>
                                            </tr>
                                        </thead>
                                        <tbody id="VistaDistincion">
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade" id="TrayectoriaProfesional" role="tabpanel" aria-labelledby="TrayectoriaProfesional-tab">
                                    <br>
                                    <table id="TablaTrayectoria" class="table table-sm" style="">
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
                                        <tbody id="VistaTrayectoria">
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade" id="PertenenciaOrganizaciones" role="tabpanel" aria-labelledby="PertenenciaOrganizaciones-tab">
                                    <br>
                                    <table id="TablaPertenencias" class="table table-sm" style="">
                                        <thead>
                                            <tr>
                                                <th style="vertical-align:middle; text-align:center; width:220px;">Organizacion/Comité</th>
                                                <th style="vertical-align:middle; text-align:center; width:90px;">Periodo</th>
                                                <th style="vertical-align:middle; text-align:center; width:90px;">Año</th>
                                                <th style="vertical-align:middle; text-align:center; width:250px;">Descripción</th>
                                                <th style="vertical-align:middle; text-align:center; width:100px;">Archivo</th>
                                            </tr>
                                        </thead>
                                        <tbody id="VistaPertenencias">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div style="margin:25px; width:850px; text-align:center;">
                                <button type="button" id="Modificar" class="btn btn-primary btn-sm">Modificar</button>
                                <button type="button" id="Deshabilitar" class="btn btn-warning btn-sm btn-deshab" >Deshabilitar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>