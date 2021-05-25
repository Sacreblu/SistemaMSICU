@extends('layouts.Plantilla')
<link rel="stylesheet" href="/css/PlanEstudios.css">
<script src="/js/PlanEstudios/Plan_Estudios.js" type="text/javascript"></script>
<script src="/js/PlanEstudios/Generaciones.js" type="text/javascript"></script>
<script src="/js/PlanEstudios/LGAC.js" type="text/javascript"></script>

<div class="Contenedor">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <!--<li class="breadcrumb-item"><a href="#">Home</a></li>-->
            <li class="breadcrumb-item active" aria-current="page">Plan de Estudios</li>
        </ol>
    </nav>
    <div class="tabs-container">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#PlanEstudios">Plan de Estudios</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#Generaciones">Generaciones</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#LGAC">LGAC</a>
            </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
            <div id="PlanEstudios" class="container tab-pane active"><br>
                <div class="div-buscar">
                    <div class="form-inline form-buscar">
                        <div class="form-check check-buscar">
                            <input class="form-check-input" type="radio" checked name="opcionPlan" id="checkNombrePlan" value="Nombre">
                            <label class="form-check-label" for="checkNombrePlan">Nombre</label>
                        </div>
                        <input type="text"  class="form-control input-busqueda" id="busqueda" value="">
                        <button type="button" class="btn btn-success btn-sm btn-buscar" onclick="busquedaPlan()">Buscar</button>
                        
                        <!--<div class="form-check check-buscar">
                            <input class="form-check-input" type="radio" name="opcion" id="checkNombre" value="Nombre2">
                            <label class="form-check-label" for="checkNombre">Nombre</label>
                        </div>-->
                    </div>
                </div>
                <div class="div-opciones row">
                    <div class="form-group form-inline col-md-9 opciones-form">
                        <label for="Mostrar">Mostrar: </label>
                        <select class="form-control" id="Mostrar">
                            <option value="Todos">Todos</option>
                            <option value="on">Vigentes</option>
                            <option value="off">No vigentes</option>
                        </select>
                    </div>
                    <div class="opciones-btn col-md-3">
                        <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#PlanRegistro">Registrar Plan</button>
                    </div>
                </div>
                <div class="col-md-12 mt-3">
                    <table id="PlanesTabla" class="table table-hover">
                        <thead>
                        <tr >
                            <th style="min-width: 410px !important">Nombre</th>
                            <th>Año</th>
                            <th>Estado</th>
                            <th>Opciones</th>
                        </tr>
                        </thead>
                        <tbody id="tablaPlanes">
                            @foreach($array[0] as $plan)
                            <tr>
                                <td style="vertical-align:middle; text-align:center">{{$plan->Nombre}}</td>
                                <td style="vertical-align:middle;  text-align:center">{{$plan->Anio}}</td>
                                <td  style="vertical-align:middle; text-align:center">
                                @if($plan->Vigente=="on")
                                    Vigente
                                @else
                                    No vigente
                                @endif
                                </td>
                                <td  style="vertical-align:middle;  text-align:center"><button type="button" class="btn btn-primary btn-sm" onclick="llenarModificarPlan({{$plan}})" data-toggle="modal" data-target="#PlanModificar">Modificar</button></td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                <!-- Modal Registrar -->
                <div class="modal fade" id="PlanRegistro" tabindex="-1" role="dialog" aria-labelledby="PlanRegistroLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="PlanRegistroLabel">Registrar Plan de Estudios</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" style="align-text:left">
                                <div class="formRegistro">
                                    <form id="formularioRegistroPlan" method="post">
                                    @csrf
                                        <label class="formRegistrolabel" for="RegistrarNombrePlan">Nombre del Programa de Estudios</label>
                                        <input type="text" class="form-control" id="RegistrarNombrePlan" name="Nombre">
                                        <span class="alertError" id="alertNombreRegistro"></span>
                                        <div class="row">
                                            <div class="col-md-7">
                                                <label class="formRegistrolabel" for="RegistrarAnioPlan">Año</label>
                                                <select class="form-control" id="RegistrarAnioPlan" name="Anio">
                                                </select>
                                                <span class="alertError" id="alertAnioRegistro"></span>
                                            </div>
                                            <div class="col-md-5">
                                                <div class="form-check checkVigente">
                                                    <input class="form-check-input" type="checkbox" id="RegistrarVigente" name="Vigente" checked>
                                                    <label class="form-check-label" for="RegistrarVigente">Vigente</label>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <button type="button" class="btn btn-success btn-sm" style="margin-right:10px" onclick="registrarPlan()">Registrar</button>
                                    <button type="button" class="btn btn-light btn-sm" data-dismiss="modal" style="margin-left:10px">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Modificar -->
                <div class="modal fade" id="PlanModificar" tabindex="-1" role="dialog" aria-labelledby="PlanModificarLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="PlanModificarLabel">Modificar Plan de Estudios</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" style="align-text:left">
                                <div class="formModificar">
                                    <form id="formularioModificarPlan">
                                    @csrf 
                                        <input type="hidden" class="form-control" name="ID_Plan" id="ModificarIDPlan">
                                        <label class="formModificarlabel" for="ModificarNombrePlan">Nombre del Programa de Estudios</label>
                                        <input type="text" class="form-control" id="ModificarNombrePlan" name="Nombre">
                                        <span class="alertError" id="alertNombreModificar"></span>
                                        <div class="row">
                                            <div class="col-md-7">
                                                <label class="formModificarlabel" for="ModificarAnioPlan">Año</label>
                                                <select class="form-control" id="ModificarAnioPlan" name="Anio">
                                                </select>
                                                <span class="alertError" id="alertAnioModificar"></span>
                                            </div>
                                            <div class="col-md-5">
                                                <div class="form-check checkVigente">
                                                    <input class="form-check-input" type="checkbox" id="ModificarVigente" name="Vigente">
                                                    <label class="form-check-label" for="ModificarVigente">Vigente</label>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <button type="button" class="btn btn-success btn-sm" style="margin-right:10px" onclick="modificarPlan()">Guardar</button>
                                    <button type="button" class="btn btn-light btn-sm" data-dismiss="modal" style="margin-left:10px">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="Generaciones" class="container tab-pane fade"><br>
                <div class="div-buscar">
                    <div class="form-inline form-buscar">
                        <div class="form-check check-buscar">
                            <input class="form-check-input" type="radio" checked name="opcionGen" id="checkNombreGen" value="Generacion">
                            <label class="form-check-label" for="checkNombreGen">Generación</label>
                        </div>
                        <input type="text"  class="form-control input-busqueda" id="busquedaGen" value="">
                        <button type="button" class="btn btn-success btn-sm btn-buscar" onclick="busquedaGen()">Buscar</button>
                        
                        <!--<div class="form-check check-buscar">
                            <input class="form-check-input" type="radio" name="opcion" id="checkNombre" value="Nombre2">
                            <label class="form-check-label" for="checkNombre">Nombre</label>
                        </div>-->
                    </div>
                </div>
                <div class="div-opciones row">
                    <div class="form-group form-inline col-md-9 opciones-form">
                        <label for="Mostrar">Mostrar: </label>
                        <select class="form-control" id="MostrarGen">
                            <option value="Todos">Todos</option>
                            <option value="Vigente">Vigentes</option>
                            <option value="Concluido">Concluidos</option>
                        </select>
                    </div>
                    <div class="opciones-btn col-md-3">
                        <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#GenRegistro">Registrar Generación</button>
                    </div>
                </div>
                <div class="col-md-12 mt-3">
                    <table class="table table-hover" id="GeneracionesTabla">
                        <thead>
                        <tr >
                            <th>Generación</th>
                            <th>Plan de Estudios</th>
                            <th>Fecha Comienzo</th>
                            <th>Fecha Conclusión</th>
                            <th>Estado</th>
                            <th>Opciones</th>
                        </tr>
                        </thead>
                        <tbody id="tablaGeneraciones">
                            @foreach($array[1] as $generacion)
                            <tr>
                                <td style="vertical-align:middle; text-align:center">{{$generacion->Generacion}}° Gen</td>
                                <td style="vertical-align:middle; text-align:center">{{$generacion->Nombre}}</td>
                                <td style="vertical-align:middle; text-align:center">{{$generacion->Mes_Inicio}} {{$generacion->Anio_Inicio}}</td>
                                <td style="vertical-align:middle; text-align:center">{{$generacion->Mes_Fin}} {{$generacion->Anio_Fin}}</td>
                                <td style="vertical-align:middle; text-align:center">{{$generacion->Estado}}</td>
                                <td  style="vertical-align:middle;  text-align:center"><button type="button" class="btn btn-primary btn-sm" onclick="llenarModificarGen({{$generacion}})" data-toggle="modal" data-target="#GenModificar">Modificar</button></td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                <!-- Modal Registrar -->
                <div class="modal fade" id="GenRegistro" tabindex="-1" role="dialog" aria-labelledby="GenRegistroLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="GenRegistroLabel">Registrar Generación</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" style="align-text:left">
                                <div class="formRegistro">
                                    <form id="formularioRegistroGen" method="post">
                                    @csrf
                                        <div class="row">
                                            <div class="col-md-8">
                                                <label class="formRegistrolabel" for="formularioRegistroGen">Número de la Generación</label>
                                                <input type="number" min="1" pattern="^[0-9]+" oninput="validity.valid||(value='');" class="form-control" id="RegistrarNumeroGen" name="Generacion">
                                                <span class="alertError" id="alertGeneracionRegistro"></span>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-check checkVigente">
                                                    <input class="form-check-input" type="checkbox" id="RegistrarGenVigente" name="Estado" checked>
                                                    <label class="form-check-label" for="RegistrarGenVigente">Vigente</label>
                                                </div>
                                            </div>
                                        
                                            <div class="col-md-6">
                                                <label class="formRegistrolabel" for="RegistrarMesComienzoGen">Mes de Comienzo</label>
                                                <select class="form-control" id="RegistrarMesComienzoGen" name="Mes_Inicio">
                                                    <option value="Julio">Julio</option>
                                                    <option value="Agosto">Agosto</option>
                                                    <option value="Septiembre">Septiembre</option>
                                                </select>
                                                <span class="alertError" id="alertMesComienzoRegistro"></span>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="formRegistrolabel" for="RegistrarAnioComienzoGen">Año de Comienzo</label>
                                                <select class="form-control" id="RegistrarAnioComienzoGen" name="Anio_Inicio">
                                                </select>
                                                <span class="alertError" id="alertAnioComienzoRegistro"></span>
                                            </div>

                                            <div class="col-md-6">
                                                <label class="formRegistrolabel" for="RegistrarMesConclusionGen">Mes de Conclusión</label>
                                                <select class="form-control" id="RegistrarMesConclusionGen" name="Mes_Fin">
                                                    <option value="Junio">Junio</option>
                                                    <option value="Julio">Julio</option>
                                                    <option value="Agosto">Agosto</option>
                                                </select>
                                                <span class="alertError" id="alertMesConclusionRegistro"></span>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="formRegistrolabel" for="RegistrarAnioConclusionGen">Año de Conclusión</label>
                                                <input type="texr" class="form-control" readonly id="RegistrarAnioConclusionGen" name="Anio_Fin">
                                                <span class="alertError" id="alertAnioConclusionRegistro"></span>
                                            </div>
                                            <div class="col-md-12">
                                                <label class="formRegistrolabel" for="RegistrarPlanGen">Plan de Estudios</label>
                                                <select class="form-control" id="RegistrarPlanGen" name="Id_Plan">
                                                </select>
                                                <span class="alertError" id="alertPlanEstudiosRegistro"></span>
                                            </div>
                                        </div>
                                    </form>
                                    <button type="button" class="btn btn-success btn-sm" style="margin-right:10px" onclick="registrarGeneracion()">Registrar</button>
                                    <button type="button" class="btn btn-light btn-sm" data-dismiss="modal" style="margin-left:10px">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Modificar -->
                <div class="modal fade" id="GenModificar" tabindex="-1" role="dialog" aria-labelledby="GenModificarLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="GenModificarLabel">Modificar Generación</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" style="align-text:left">
                                <div class="formModificar">
                                    <form id="formularioModificarGen">
                                    @csrf
                                        <input type="hidden" class="form-control" name="id" id="ModificarIDGen">
                                        <div class="row">
                                            <div class="col-md-8">
                                                <label class="formModificarlabel" for="ModificarNumeroGen">Numero de la Generación</label>
                                                <input type="number" min="1" pattern="^[0-9]+" oninput="validity.valid||(value='');" class="form-control" id="ModificarNumeroGen" name="Generacion">
                                                <span class="alertError" id="alertGeneracionModificar"></span>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-check checkVigente">
                                                    <input class="form-check-input" type="checkbox" id="ModificarGenVigente" name="Estado" checked>
                                                    <label class="form-check-label" for="ModificarGenVigente">Vigente</label>
                                                </div>
                                            </div>
                                        
                                            <div class="col-md-6">
                                                <label class="formRegistrolabel" for="ModificarMesComienzoGen">Mes de Comienzo</label>
                                                <select class="form-control" id="ModificarMesComienzoGen" name="Mes_Inicio">
                                                    <option value="Julio">Julio</option>
                                                    <option value="Agosto">Agosto</option>
                                                    <option value="Septiembre">Septiembre</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="formRegistrolabel" for="ModificarAnioComienzoGen">Año de Comienzo</label>
                                                <select class="form-control" id="ModificarAnioComienzoGen" name="Anio_Inicio">
                                                </select>
                                                <span class="alertError" id="alertAnioComienzoModificar"></span>
                                            </div>

                                            <div class="col-md-6">
                                                <label class="formRegistrolabel" for="ModificarMesConclusionGen">Mes de Conclusión</label>
                                                <select class="form-control" id="ModificarMesConclusionGen" name="Mes_Fin">
                                                    <option value="Junio">Junio</option>
                                                    <option value="Julio">Julio</option>
                                                    <option value="Agosto">Agosto</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="formRegistrolabel" for="ModificarAnioConclusionGen">Año de Conclusión</label>
                                                <input type="text" readonly class="form-control" id="ModificarAnioConclusionGen" name="Anio_Fin">
                                                <span class="alertError" id="alertAnioConclusionModificar"></span>
                                            </div>
                                            <div class="col-md-12">
                                                <label class="formRegistrolabel" for="ModificarPlanGen">Plan de Estudios</label>
                                                <select class="form-control" id="ModificarPlanGen" name="Id_Plan">
                                                </select>
                                                <span class="alertError" id="alertPlanEstudiosModificar"></span>
                                            </div>
                                        </div>
                                    </form>
                                    <button type="button" class="btn btn-success btn-sm" style="margin-right:10px" onclick="modificarGen()">Guardar</button>
                                    <button type="button" class="btn btn-light btn-sm" data-dismiss="modal" style="margin-left:10px">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="LGAC" class="container tab-pane fade"><br>
            <div class="div-buscar">
                    <div class="form-inline form-buscar">
                        <div class="form-check check-buscar">
                            <input class="form-check-input" type="radio" checked name="opcionLGAC" id="checkNombreLGAC" value="Nombre">
                            <label class="form-check-label" for="checkNombreGen">Nombre</label>
                        </div>
                        <input type="text"  class="form-control input-busqueda" id="busquedaLGAC" value="">
                        <button type="button" class="btn btn-success btn-sm btn-buscar" onclick="busquedaLGAC()">Buscar</button>
                        
                        <!--<div class="form-check check-buscar">
                            <input class="form-check-input" type="radio" name="opcion" id="checkNombre" value="Nombre2">
                            <label class="form-check-label" for="checkNombre">Nombre</label>
                        </div>-->
                    </div>
                </div>
                <div class="div-opciones row">
                    <div class="form-group form-inline col-md-9 opciones-form">
                        <label for="MostrarLGAC">Mostrar: </label>
                        <select class="form-control" id="MostrarLGAC">
                            <option value="Todos">Todos</option>
                            <option value="Vigente_on">Vigentes</option>
                            <option value="Vigente_off">No Vigentes</option>
                        </select>
                    </div>
                    <div class="opciones-btn col-md-3">
                        <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#LGACRegistro">Registrar LGAC</button>
                    </div>
                </div>
                <div class="col-md-12 mt-3">
                    <table id="LGACTabla" class="table table-hover">
                        <thead>
                        <tr >
                            <th style="min-width: 550px !important">Nombre</th>
                            <th>Plan de Estudios</th>
                            <th>Estado</th>
                            <th>Opciones</th>
                        </tr>
                        </thead>
                        <tbody id="tablaLGAC">
                            @foreach($array[2] as $lgac)
                            <tr>
                                <td style="vertical-align:middle; text-align:center">{{$lgac->Nombre}}</td>
                                <td style="vertical-align:middle;  text-align:center">{{$lgac->planNombre}}</td>
                                <td  style="vertical-align:middle; text-align:center">
                                @if($lgac->Vigente=="on")
                                    Vigente
                                @else
                                    No vigente
                                @endif
                                </td>
                                <td  style="vertical-align:middle;  text-align:center"><button type="button" class="btn btn-primary btn-sm" onclick="llenarModificarLGAC({{$lgac}})" data-toggle="modal" data-target="#LGACModificar">Modificar</button></td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                <!-- Modal Registrar -->
                <div class="modal fade" id="LGACRegistro" tabindex="-1" role="dialog" aria-labelledby="LGACRegistroLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="LGACRegistroLabel">Registrar LGAC</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" style="align-text:left">
                                <div class="formRegistro">
                                    <form id="formularioRegistroLGAC" method="post">
                                    @csrf
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class="formRegistrolabel" for="RegistrarNombreLGAC">Nombre de la LGAC</label>
                                                <input type="text" class="form-control" id="RegistrarNombreLGAC" name="Nombre">
                                                <span class="alertError" id="alertNombreLGACRegistro"></span>
                                            </div>
                                            <div class="col-md-12">
                                                <label class="formRegistrolabel" for="RegistrarPlanLGAC">Plan de Estudios</label>
                                                <select class="form-control" id="RegistrarPlanLGAC" name="Id_Plan">
                                                </select>
                                                <span class="alertError" id="alertPlanLGACRegistro"></span>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-check checkVigente">
                                                    <input class="form-check-input" type="checkbox" id="RegistrarLGACVigente" name="Vigente" checked>
                                                    <label class="form-check-label" for="RegistrarLGACVigente">Vigente</label>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <button type="button" class="btn btn-success btn-sm" style="margin-right:10px" onclick="registrarLGAC()">Registrar</button>
                                    <button type="button" class="btn btn-light btn-sm" data-dismiss="modal" style="margin-left:10px">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Modificar -->
                <div class="modal fade" id="LGACModificar" tabindex="-1" role="dialog" aria-labelledby="GenModificarLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="LGACModificarLabel">Modificar Generación</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" style="align-text:left">
                                <div class="formModificar">
                                    <form id="formularioModificarLGAC" method="post">
                                    @csrf
                                        <input type="hidden" class="form-control" name="id" id="ModificarIDLGAC">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class="formRegistrolabel" for="ModificarNombreLGAC">Nombre de la LGAC</label>
                                                <input type="text" class="form-control" id="ModificarNombreLGAC" name="Nombre">
                                                <span class="alertError" id="alertNombreLGACRegistro"></span>
                                            </div>
                                            <div class="col-md-12">
                                                <label class="formRegistrolabel" for="ModificarPlanLGAC">Plan de Estudios</label>
                                                <select class="form-control" id="ModificarPlanLGAC" name="Id_Plan">
                                                </select>
                                                <span class="alertError" id="alertPlanLGACModificar"></span>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-check checkVigente">
                                                    <input class="form-check-input" type="checkbox" id="ModificarLGACVigente" name="Vigente" checked>
                                                    <label class="form-check-label" for="ModificarLGACVigente">Vigente</label>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <button type="button" class="btn btn-success btn-sm" style="margin-right:10px" onclick="modificarLGAC()">Guardar</button>
                                    <button type="button" class="btn btn-light btn-sm" data-dismiss="modal" style="margin-left:10px">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>