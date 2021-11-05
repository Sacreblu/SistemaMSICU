@extends('layouts.Plantilla')

<link rel="stylesheet" href="/css/ProductosLGAC.css">
<script src="/js/ProductosLGAC/RegistrarProductoLGAC.js" type="text/javascript"></script>
<!--<script src="/js/ProductosLGAC/Articulos/RegistrarArticulo.js" type="text/javascript"></script>-->

<div class="Contenedor">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{url('/Productos_LGAC')}}">Productos LGAC</a></li>
            <li class="breadcrumb-item active" aria-current="page">Registrar Producto LGAC</li>
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
                <div class="form-group col-md-4" style="text-align: left;">
                    <label>Tipo de Producto</label>
                    <select class="form-control" id="TipoProducto" name="TipoProducto" onchange="ControladorTipoProducto()">
                        <option value="Articulo">Articulo</option>
                        <option value="Articulo">Capítulo de Libro</option>
                        <option value="Articulo">Memorias de Congreso</option>
                        <option value="Articulo">Prototipo de Software</option>
                        <option value="Articulo">Proyectos con Sector</option>
                        <option value="Articulo">Acción de Movilidad</option>
                    </select>
                </div>
                <div class="form-group col-md-8" style="text-align: left;"> 
                </div>
                <fieldset class="scheduler-border col-md-6">
                    <legend class="scheduler-border">Información del Producto</legend>
                    <div>
                        <div class="form-group" style="text-align: left;">
                            <label for="Titulo">Título del Producto</label>
                            <input type="text" class="form-control" id="Titulo" name="Titulo">
                            <span class="alertError" id="alertTituloRegistro"></span>
                        </div>
                        <div class="form-group" style="text-align: left;">
                            <label>Plan de Estudios</label>
                            <select class="form-control" id="PlanEstudios" name="PlanEstudios" onchange="ControladorLGACByPlan()">
                            </select>
                        </div>
                        <div class="form-group" style="text-align: left;">
                            <label>Linea de Generación y Aplicación del Conocimiento</label>
                            <select class="form-control" id="LGAC" name="LGAC">
                            </select>
                        </div>
                        <div id="divPeriodos" class="row">
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label>Año de Publicación</label>
                                <select class="form-control" id="AnioPublicacion" name="AnioPublicacion">
                                </select>
                                <span class="alertError" id="alertAnioPublicacionRegistro"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label>País</label>
                                <input type="text" class="form-control" id="Pais" name="Pais">
                                <span class="alertError" id="alertPaisRegistro"></span>
                            </div>
                        </div>
                        <div class="form-group" style="text-align: left;">
                            <label for="">Archivo Evidencia del Producto</label>
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

                    </div>
                </fieldset>

                <fieldset id="infoArticulo" class="scheduler-border col-md-6" style="display: none;">
                    <legend class="scheduler-border">Información Adicional</legend>
                    <div>
                        <div class="form-group" style="text-align: left;">
                            <label for="ArticuloRevista">Revista de Publicación</label>
                            <input type="text" class="form-control" id="ArticuloRevista" name="ArticuloRevista">
                            <span class="alertError" id="alertArticuloRevistaRegistro"></span>
                        </div>
                        <div class="row">
                        
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label>Mes de Publicación</label>
                                <select class="form-control" id="ArticuloAnioPublicacion" name="ArticuloAnioPublicacion">
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
                                <span class="alertError" id="alertArticuloAnioPublicacionRegistro"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label for="ArticuloISSN">ISSN de Publicación</label>
                                <input type="text" class="form-control" id="ArticuloISSN" name="ArticuloISSN">
                                <span class="alertError" id="alertArticuloISSNRegistro"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label for="ArticuloPaginas">Páginas</label>
                                <input type="text" class="form-control" id="ArticuloPaginas" name="ArticuloPaginas">
                                <span class="alertError" id="alertArticuloPaginasRegistro"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label for="ArticuloPrintISSN">Print ISSN</label>
                                <input type="text" class="form-control" id="ArticuloPrintISSN" name="ArticuloPrintISSN">
                                <span class="alertError" id="alertArticuloPrintISSNRegistro"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label for="ArticuloVolumen">Volumen de Revista</label>
                                <input type="text" class="form-control" id="ArticuloVolumen" name="ArticuloVolumen">
                                <span class="alertError" id="alertArticuloVolumenRegistro"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label for="ArticuloIndizacion">Indización</label>
                                <input type="text" class="form-control" id="ArticuloIndizacion" name="ArticuloIndizacion">
                                <span class="alertError" id="alertArticuloIndizacionRegistro"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label for="ArticuloEditorial">Editorial</label>
                                <input type="text" class="form-control" id="ArticuloEditorial" name="ArticuloEditorial">
                                <span class="alertError" id="alertArticuloEditorialRegistro"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label for="ArticuloMovilidad">Movilidad Asociada</label>
                                <input type="text" class="form-control" id="ArticuloMovilidad" name="ArticuloMovilidad">
                                <span class="alertError" id="alertArticuloMovilidadRegistro"></span>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset id="infoCapituloLibro" class="scheduler-border col-md-6" style="display: none;">
                    <legend class="scheduler-border">Información Adicional</legend>
                    <div>
                        <div class="form-group" style="text-align: left;">
                            <label for="CapituloLibro">Nombre del Libro</label>
                            <input type="text" class="form-control" id="CapituloLibro" name="CapituloLibro">
                            <span class="alertError" id="alertCapituloLibroRegistro"></span>
                        </div>
                        <div class="form-group" style="text-align: left;">
                            <label for="CapituloEditorial">Editorial</label>
                            <input type="text" class="form-control" id="CapituloEditorial" name="CapituloEditorial">
                            <span class="alertError" id="alertCapituloEditorialRegistro"></span>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label>Mes de Publicación</label>
                                <select class="form-control" id="CapituloAnioPublicacion" name="CapituloAnioPublicacion">
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
                                <span class="alertError" id="alertCapituloAnioPublicacionRegistro"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label for="CapituloISBN">ISBN de Publicación</label>
                                <input type="text" class="form-control" id="CapituloISBN" name="CapituloISBN">
                                <span class="alertError" id="alertCapituloISBNRegistro"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label for="CapituloPaginas">Páginas</label>
                                <input type="text" class="form-control" id="CapituloPaginas" name="CapituloPaginas">
                                <span class="alertError" id="alertCapituloPaginasRegistro"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label for="CapituloVolumen">Volumen de Libro</label>
                                <input type="text" class="form-control" id="CapituloVolumen" name="CapituloVolumen">
                                <span class="alertError" id="alertCapituloVolumenRegistro"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label for="CapituloIndizacion">Indización</label>
                                <input type="text" class="form-control" id="CapituloIndizacion" name="CapituloIndizacion">
                                <span class="alertError" id="alertCapituloIndizacionRegistro"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label for="CapituloMovilidad">Movilidad Asociada</label>
                                <input type="text" class="form-control" id="CapituloMovilidad" name="CapituloMovilidad">
                                <span class="alertError" id="alertCapituloMovilidadRegistro"></span>
                            </div>
                        </div>
                    </div>
                </fieldset>
                
                <fieldset id="infoMemorias" class="scheduler-border col-md-6" style="display: none;">
                    <legend class="scheduler-border">Información Adicional</legend>
                    <div>
                        <div class="form-group" style="text-align: left;">
                            <label for="MemoriasCongreso">Nombre del Congreso</label>
                            <input type="text" class="form-control" id="MemoriasCongreso" name="MemoriasCongreso">
                            <span class="alertError" id="alertMemoriasCongresoRegistro"></span>
                        </div>
                        <div class="form-group" style="text-align: left;">
                            <label for="MemoriasLugar">Lugar del Congreso</label>
                            <input type="text" class="form-control" id="MemoriasLugar" name="MemoriasLugar">
                            <span class="alertError" id="alertMemoriasLugarRegistro"></span>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label for="MemoriasISBN">ISBN de Publicación</label>
                                <input type="text" class="form-control" id="MemoriasISBN" name="MemoriasISBN">
                                <span class="alertError" id="alertMemoriasISBNRegistro"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label for="MemoriasMovilidad">Movilidad Asociada</label>
                                <input type="text" class="form-control" id="MemoriasMovilidad" name="MemoriasMovilidad">
                                <span class="alertError" id="alertMemoriasMovilidadRegistro"></span>
                            </div>
                        </div>
                    </div>
                </fieldset>
                
                <fieldset id="infoPrototipo" class="scheduler-border col-md-6" style="display: none;">
                    <legend class="scheduler-border">Información Adicional</legend>
                    <div>
                        <div class="form-group" style="text-align: left;">
                            <label for="PrototipoLugar">Lugar</label>
                            <input type="text" class="form-control" id="PrototipoLugar" name="PrototipoLugar">
                            <span class="alertError" id="alertPrototipoLugarRegistro"></span>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label for="PrototipoINDAUTOR">No. Registro INDAUTOR</label>
                                <input type="text" class="form-control" id="PrototipoINDAUTOR" name="PrototipoINDAUTOR">
                                <span class="alertError" id="alertPrototipoINDAUTORRegistro"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label for="PrototipoMovilidad">Movilidad Asociada</label>
                                <input type="text" class="form-control" id="PrototipoMovilidad" name="PrototipoMovilidad">
                                <span class="alertError" id="alertPrototipoMovilidadRegistro"></span>
                            </div>
                        </div>
                    </div>
                </fieldset>
                
                <fieldset id="infoProyecto" class="scheduler-border col-md-6" style="display: none;">
                    <legend class="scheduler-border">Información Adicional</legend>
                    <div>
                        <div class="form-group" style="text-align: left;">
                            <label for="ProyectoLugar">Lugar</label>
                            <input type="text" class="form-control" id="ProyectoLugar" name="ProyectoLugar">
                            <span class="alertError" id="alertProyectoLugarRegistro"></span>
                        </div>
                        <div class="form-group" style="text-align: left;">
                            <label for="ProyectoMovilidad">Movilidad Asociada</label>
                            <input type="text" class="form-control" id="ProyectoMovilidad" name="ProyectoMovilidad">
                            <span class="alertError" id="alertProyectoMovilidadRegistro"></span>
                        </div>
                    </div>
                </fieldset>
                
                <fieldset id="infoAccion" class="scheduler-border col-md-6" style="">
                    <legend class="scheduler-border">Información Adicional</legend>
                    <div>
                        <div class="form-group" style="text-align: left;">
                            <label for="AccionMovilidad">Movilidad Asociada</label>
                            <input type="text" class="form-control" id="AccionMovilidad" name="AccionMovilidad">
                            <span class="alertError" id="alertAccionMovilidadRegistro"></span>
                        </div>
                        <div class="form-group" style="text-align: left;">
                            <label for="AccionInstitucion">Institución de Colaboración</label>
                            <input type="text" class="form-control" id="AccionInstitucion" name="AccionInstitucion">
                            <span class="alertError" id="alertAccionInstitucionRegistro"></span>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label>Periodo de Inicio</label>
                                <input type="month" class="form-control" id="AccionPeriodoInicio" name="AccionPeriodoInicio">
                                <span class="alertError" id="alertAccionPeriodoInicioRegistro"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label>Periodo de Conclusión</label>
                                <input type="month" class="form-control" id="AccionPeriodoConclusion" name="AccionPeriodoConclusion">
                                <span class="alertError" id="alertAccionPeriodoConclusionRegistro"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label for="AccionLugar">Lugar de Movilidad</label>
                                <input type="text" class="form-control" id="AccionLugar" name="AccionLugar">
                                <span class="alertError" id="alertAccionLugarRegistro"></span>
                            </div>
                            <div class="form-group col-md-6" style="text-align: left;">
                                <label for="AccionINDAUTOR">No. Registro INDAUTOR</label>
                                <input type="text" class="form-control" id="AccionINDAUTOR" name="AccionINDAUTOR">
                                <span class="alertError" id="alertAccionINDAUTORRegistro"></span>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
        </form>
    </div>  
    
</div>