@extends('layouts.Plantilla')

<link rel="stylesheet" href="/css/Profesor.css">
<script src="/js/Profesor/ModificarProfesor.js" type="text/javascript"></script>

<script>
    var informacion = @json($informacion);
</script>
<div class="Contenedor">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{url('/Profesores')}}">Profesores</a></li>
            <li class="breadcrumb-item active" aria-current="page">Modificar Profesor</li>
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
                <li class="nav-item">
                    <a class="nav-link" id="SuperacionAcademica-tab" data-toggle="tab" href="#SuperacionAcademica" role="tab" aria-controls="Superacion Academica" aria-selected="false">Superación Academica</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="TrayectoriaProfesional-tab" data-toggle="tab" href="#TrayectoriaProfesional" role="tab" aria-controls="Trayectoria Profesional" aria-selected="false">Trayectoria Profesional</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="PertenenciaOrganizaciones-tab" data-toggle="tab" href="#PertenenciaOrganizaciones" role="tab" aria-controls="Pertenencia a Organizaciones" aria-selected="false">Pertenencia a Organizaciones</a>
                </li>
            </ul>
            <div class="tab-content" id="SeccionesContent">
                <div class="tab-pane fade show active" id="DatosGenerales" role="tabpanel" aria-labelledby="DatosGenerales-tab">
                    <form action="" class="form-group" id="FormDatosGenerales">
                        <div style="text-align: right; margin-right: 5%;">
                            <div class="divlabelcheck">Habilitar</div>
                            <div class="divcheck">
                                <label class="switch">
                                    <div class="divlabelcheck"></div>
                                    <input type="checkbox" id="Habilitar" name="Estado" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="form-row" style="padding: 0 30px">
                            <div class="form-group col-md-3" style="text-align: left;">
                                <label for="Nombre">Nombre(s)</label>
                                <input type="text" class="form-control" id="Nombre" name="Nombre">
                                <span class="alertError" id="alertNombreProfModificar"></span>
                            </div>
                            <div class="form-group col-md-2" style="text-align: left;">
                                <label for="ApellidoP">Apellido Paterno</label>
                                <input type="text" class="form-control" id="ApellidoP" name="Apellido_P">
                                <span class="alertError" id="alertApellido_PProfModificar"></span>
                            </div>
                            <div class="form-group col-md-2" style="text-align: left;">
                                <label for="ApellidoM">Apellido Materno</label>
                                <input type="text" class="form-control" id="ApellidoM" name="Apellido_M">
                                <span class="alertError" id="alertApellido_MProfModificar"></span>
                            </div>
                            <div class="form-group col-md-3" style="text-align: left;">
                                <label for="Correo">Correo Institucional</label>
                                <input type="email" class="form-control" id="Correo" name="Correo">
                                <span class="alertError" id="alertCorreoProfModificar"></span>
                            </div>
                            <div class="form-group col-md-2" style="text-align: left;">
                                <label for="CVU">No. CVU</label>
                                <input type="text" class="form-control" id="CVU" name="No_CVU">
                                <span class="alertError" id="alertNo_CVUProfModificar"></span>
                            </div>
                            <div class="form-group col-md-3" style="text-align: left;">
                                <label for="TipoContratacion">Tipo de Contratación</label>
                                <select class="form-control" id="TipoContratacion" name="Tipo_Contratacion">
                                </select>
                            </div>
                            <div class="form-group col-md-4" style="text-align: left;">
                                <label for="Institucion">Institución de Contratación</label>
                                <input type="text" class="form-control" id="Institucion" name="Institucion">
                                <span class="alertError" id="alertInstitucionProfModificar"></span>
                            </div>
                            <div class="form-group col-md-3" style="text-align: left;">
                                <label for="TipoColaboracion">Tipo de Colaboración</label>
                                <select class="form-control" id="TipoColaboracion" name="Tipo_Colaboracion">
                                </select>
                            </div>
                            <div class="form-group col-md-2" style="text-align: left;">
                                <label for="Pais">Pais</label>
                                <input type="text" class="form-control" id="Pais" name="Pais">
                                <span class="alertError" id="alertPaisProfModificar"></span>
                            </div>
                            <div class="form-group col-md-2" style="text-align: left;">
                                <label>Fecha de Contratación</label>
                                <select class="form-control" id="MesIngreso" name="Mes_Ingreso">
                                    <option value="Enero">Enero</option>
                                    <option value="Febrero">Febrero</option>
                                    <option value="Marzo">Marzo</option>
                                    <option value="Abril">Abril</option>
                                    <option value="Mayo">Mayo</option>
                                    <option value="Junio">Junio</option>
                                    <option value="Julio">Julio</option>
                                    <option value="Agosto">Agosto</option>
                                    <option value="Septiembre">Septiembre</option>
                                    <option value="Octubre">Octubre</option>
                                    <option value="Noviembre">Noviembre</option>
                                    <option value="Diciembre">Diciembre</option>
                                </select>
                            </div>
                            <div class="form-group col-md-2" style="text-align: left;">
                                <label style="visibility: hidden;">Fecha de Contratación</label>
                                <select class="form-control" id="AnioIngreso" name="Anio_Ingreso">
                                </select>
                            </div>
                            <div class="form-group col-md-2" style="text-align: left;">
                                <label>Fecha de Salida</label>
                                <select class="form-control" id="MesSalida" name="Mes_Salida">
                                    <option value="">Elige un Mes</option>
                                    <option value="Enero">Enero</option>
                                    <option value="Febrero">Febrero</option>
                                    <option value="Marzo">Marzo</option>
                                    <option value="Abril">Abril</option>
                                    <option value="Mayo">Mayo</option>
                                    <option value="Junio">Junio</option>
                                    <option value="Julio">Julio</option>
                                    <option value="Agosto">Agosto</option>
                                    <option value="Septiembre">Septiembre</option>
                                    <option value="Octubre">Octubre</option>
                                    <option value="Noviembre">Noviembre</option>
                                    <option value="Diciembre">Diciembre</option>
                                </select>
                            </div>
                            <div class="form-group col-md-2" style="text-align: left;">
                                <label style="visibility: hidden;">Fecha de Salida</label>
                                <select class="form-control" id="AnioSalida" name="Anio_Salida">
                                    <option value="">Elige un Año</option>
                                </select>
                            </div>
                            <div class="form-group col-md-4" style="text-align: left;">
                                <label for="CorreoPersonal">Correo Personal</label>
                                <input type="email" class="form-control" id="CorreoPersonal" name="CorreoPersonal">
                                <span class="alertError" id="alertCorreoPersonalProfModificar"></span>
                            </div>
                            <div class="form-group col-md-12" style="text-align: left;">
                                <label>Linea de Generación y Aplicación de Conocimiento</label>
                                <select class="form-control col-md-5" style="margin-bottom:10px;" onchange="LGACController()" id="PlanEstudios" name="PlanEstudios">
                                    
                                </select>
                                <span class="alertError" id="alertId_LGACProfModificar"></span>
                                
                            </div>
                            <div class="form-group col-md-3" style="text-align: left;">
                                <label for="IngresoNAB">Fecha de Ingreso al NAB</label>
                                <div>
                                    <input class="form-control" type="date" id="IngresoNAB" name="Fecha_Ingreso_NAB">
                                </div>
                            </div>
                            <div class="form-group col-md-9" style="text-align: left;">
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label>Cartas de Pertenencia al NAB</label>
                                <div class="container p-y-1 col-md-8">
                                    <div class="row m-b-1">
                                        <div class="col-sm-12">
                                            <div class="form-group inputDnD">
                                                <label class="sr-only" for="inputFile">File Upload</label>
                                                <input type="file" name="Archivos" class="form-control-file text-primary font-weight-bold" id="Archivos" accept="application/pdf" onchange="ControladorCartasNAB()" data-title="Arrastre y suelte el archivo" multiple>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <ul class="nav nav-tabs" id="ArchivosNAB" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link" id="ArchivosCargadosNAB-tab" data-toggle="tab" href="#ArchivosCargadosNAB" role="tab" aria-controls="Archivos Cargados NAB" aria-selected="true">Archivos Cargados</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active" id="ArchivosGuardadosNAB-tab" data-toggle="tab" href="#ArchivosGuardadosNAB" role="tab" aria-controls="Archivos Guardados NAB" aria-selected="false">Archivos Guardados</a>
                                    </li>
                                </ul>
                                <div class="tab-content" id="ArchivosNABContent">
                                    <div class="tab-pane fade show active" id="ArchivosGuardadosNAB" role="tabpanel" aria-labelledby="ArchivosGuardadosNAB-tab">
                                        <div class="container col-md-12">
                                            <table class="table table-sm">
                                                <thead>
                                                    <tr>
                                                        <th colspan="3">Archivos</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="VistaCartasGuardadas">
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade " id="ArchivosCargadosNAB" role="tabpanel" aria-labelledby="ArchivosCargadosNAB-tab">
                                        <div class="container col-md-12">
                                            <table class="table table-sm">
                                                <thead>
                                                    <tr>
                                                        <th colspan="3">Archivos</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="VistaPrevCartas">
                                                    
                                                </tbody>
                                            </table>
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
                <div class="tab-pane fade" id="SuperacionAcademica" role="tabpanel" aria-labelledby="SuperacionAcademica-tab">
                    <div class="Superacion-container">
                        <div class="row">
                            <div class="col-md-6" style="padding: 0 10px;">
                                <div class="Cursos-control">
                                    <div class="text-control">
                                        Cursos, Certificados, etc...
                                    </div> 
                                    <button class="btn btn-sm" onclick="añadirSuperacionAcademica()" title="Añadir un registro de Curso"><i class="fas fa-plus"></i></button>
                                    <button class="btn btn-sm" id="btnQuitarSuperacion" onclick="quitarSuperacionAcademica()" title="Quitar un registro de Curso" disabled><i class="fas fa-minus"></i></button>
                                </div>
                                <div id="Cursos">
                                    <!--<div class="Cursos-form card" id="CardSA0'">
                                        <form class="form-group" action="" name="CursoForm">
                                            <div class="form-group">
                                                <label style="display:block;">Tipo de Documento</label>
                                                <div class="form-check-inline">
                                                    <label class="form-check-label" for="Curso0">
                                                        <input type="radio" class="form-check-input" id="Curso0" name="Tipo_Documento" value="2" checked onclick="SuperacionOtro(this, '0')">Curso
                                                    </label>
                                                </div>
                                                <div class="form-check-inline">
                                                    <label class="form-check-label" for="Certificado0">
                                                        <input type="radio" class="form-check-input" id="Certificado0" name="Tipo_Documento" value="1" onclick="SuperacionOtro(this, '0')">Certificado
                                                    </label>
                                                </div>
                                                <div class="form-check-inline">
                                                        <input type="radio" class="form-check-input col-md-1" id="Otro0" name="Tipo_Documento" value="0" onclick="SuperacionOtro(this, '0')">
                                                        <input class="form-control form-control-sm col-md-10" type="text" disabled placeholder="Otro" id="TextOtro0">
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-group col-md-4">
                                                    <select class="form-control" id="AnioSuperacion" name="Anio">
                                                        <option value="">Año</option>
                                                    </select>
                                                </div>
                                                <div class="form-group col-md-8">
                                                    <input type="text" class="form-control" id="Periodo0'" name="Periodo" placeholder="Periodo">
                                                    <span class="alertError" id="alertSuperacionPeriodo0ProfRegistro"></span>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <textarea class="form-control" id="Descripcion0" rows="3" placeholder="Descripción" name="Descripcion"></textarea>
                                                <span class="alertError" id="alertSuperacionDescripcion0ProfRegistro"></span>
                                            </div>
                                            <label>Archivo Evidencia</label>
                                            <span class="alertError" id="alertSuperacionArchivoProfRegistro"></span>
                                            <div class="container p-y-1 col-md-9">
                                                <div class="row m-b-1">
                                                    <div class="col-sm-12">
                                                        <div class="form-group inputDnD">
                                                            <label class="sr-only" for="inputFile">File Upload</label>
                                                            <input type="file" name="Archivo" class="form-control-file text-primary font-weight-bold" id="ArchivoSuperacion0" accept="application/pdf" onchange="" data-title="Arrastre y suelte el archivo">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="container col-md-12">
                                                <label>Vista Previa de Archivos Cargados</label>  
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr><th>Archivos</th></tr>
                                                    </thead>
                                                    <tbody id="VistaPrevSuperacion0">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </form>
                                    </div>-->
                                </div>
                            </div>
                            <div class="col-md-6" style="padding: 0 10px;">
                                <div class="Distincion-control">
                                    <div class="text-control">
                                        Distinciones
                                    </div> 
                                    <button class="btn btn-sm" onclick="añadirDistincion()" title="Añadir un registro de Distinción"><i class="fas fa-plus"></i></button>
                                    <button class="btn btn-sm" id="btnQuitarDistincion" onclick="quitarDistincion()" title="Quitar un registro de Distinción" disabled><i class="fas fa-minus"></i></button>
                                </div>
                                <div id="Distinciones">
                                    <!--<div class="Distinciones-form card" id="CardDistincion0'">
                                        <form class="form-group" action="" name="DistincionForm">
                                            <div class="form-group">
                                                <label style="display:block;">Tipo de Documento</label>
                                                <div class="form-check-inline">
                                                    <label class="form-check-label" for="Prodep0">
                                                        <input type="radio" class="form-check-input" id="Prodep0" name="Tipo_Documento" value="PRODEP" checked onclick="DistincionOtro(this, '0')">PRODEP
                                                    </label>
                                                </div>
                                                <div class="form-check-inline">
                                                    <label class="form-check-label" for="SNI0">
                                                        <input type="radio" class="form-check-input" id="sni0" name="Tipo_Documento" value="SNI" onclick="DistincionOtro(this, '0')">SNI
                                                    </label>
                                                </div>
                                                <div class="form-check-inline">
                                                        <input type="radio" class="form-check-input col-md-1" id="DistincionOtro0" name="Tipo_Documento" value="0" onclick="DistincionOtro(this, '0')">
                                                        <input class="form-control form-control-sm col-md-10" type="text" disabled placeholder="Otro" id="TextDistincionOtro0">
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-group col-md-4">
                                                    <select class="form-control" id="AnioDistincion0" name="Anio">
                                                        <option value="">Año</option>
                                                    </select>
                                                </div>
                                                <div class="form-group col-md-8">
                                                    <input type="text" class="form-control" id="PeriodoDistincion0'" name="Periodo" placeholder="Periodo">
                                                    <span class="alertError" id="alertSuperacionPeriodo0ProfRegistro"></span>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <textarea class="form-control" id="DescriocionDistincion0" rows="3" placeholder="Descripción" name="Descripcion"></textarea>
                                                <span class="alertError" id="alertDistincionDescripcion0ProfRegistro"></span>
                                            </div>
                                            <label>Archivo Evidencia</label>
                                            <span class="alertError" id="alertSuperacionArchivoProfRegistro"></span>
                                            <div class="container p-y-1 col-md-9">
                                                <div class="row m-b-1">
                                                    <div class="col-sm-12">
                                                        <div class="form-group inputDnD">
                                                            <label class="sr-only" for="inputFile">File Upload</label>
                                                            <input type="file" name="Archivo" class="form-control-file text-primary font-weight-bold" id="ArchivoDistincion0" accept="application/pdf" onchange="" data-title="Arrastre y suelte el archivo">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="container col-md-12">
                                                <label>Vista Previa de Archivos Cargados</label>  
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr><th>Archivos</th></tr>
                                                    </thead>
                                                    <tbody id="VistaPrevDistincion0">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </form>
                                    </div>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="TrayectoriaProfesional" role="tabpanel" aria-labelledby="TrayectoriaProfesional-tab">
                    <div class="Trayectoria-container">
                        <div class="Trayectoria-control">
                            <div class="text-control">
                                Trabajos Profesionales
                            </div> 
                            <button class="btn btn-sm" onclick="añadirTrayectoria()" title="Añadir un registro de Trayectoria"><i class="fas fa-plus"></i></button>
                            <button class="btn btn-sm" id="btnQuitarTrayectoria" onclick="quitarTrayectoria()" title="Restar un registro de Trayectoria" disabled><i class="fas fa-minus"></i></button>
                        </div>
                        <div id="Trayectorias">
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="PertenenciaOrganizaciones" role="tabpanel" aria-labelledby="PertenenciaOrganizaciones-tab">
                    <div class="Pertenencias-container">
                        <div class="Pertenencias-control">
                            <div class="text-control">
                                Colaboración
                            </div> 
                            <button class="btn btn-sm" onclick="añadirPertenencias()" title="Añadir un registro de Pertenencia"><i class="fas fa-plus"></i></button>
                            <button class="btn btn-sm" id="btnQuitarPertenencias" onclick="quitarPertenencias()" title="Restar un registro de Pertenencia" disabled><i class="fas fa-minus"></i></button>
                        </div>
                        <div id="Pertenencias">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
</div>