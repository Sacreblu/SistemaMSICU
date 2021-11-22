<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/Plantilla', function () {
    return view('layouts.Plantilla');
});


//Plan de Estudios
Route::get('/Plan_de_Estudios', 'PlanEstudiosController@mostrarPlanEstudios');
Route::post('/Plan_de_Estudios/Registrar_Plan', 'PlanEstudiosController@registrarPlanEstudios');
Route::post('/Plan_de_Estudios/Modificar_Plan/{id}', 'PlanEstudiosController@modificarPlanEstudios');
Route::post('/Plan_de_Estudios/FiltradoTabla', 'PlanEstudiosController@filtrado');
Route::post('/Plan_de_Estudios/Busqueda', 'PlanEstudiosController@busqueda');
Route::post('/Plan_de_Estudios/ObtenerPlanes', 'PlanEstudiosController@ObtenerPlanes');

//Generaciones
Route::post('/Plan_de_Estudios/Registrar_Generacion', 'GeneracionesController@registrarGeneracion');
Route::post('/Plan_de_Estudios/Modificar_Generacion/{id}', 'GeneracionesController@modificarGeneracion');
Route::post('/Plan_de_Estudios/FiltradoTablaGen', 'GeneracionesController@filtradoGen');
Route::post('/Plan_de_Estudios/BusquedaGen', 'GeneracionesController@busquedaGen');
Route::post('/Genetaciones/ObtenerGeneraciones', 'GeneracionesController@ObtenerGeneraciones');

//LGAC
Route::post('/Plan_de_Estudios/Registrar_LGAC', 'LGACController@registrarLGAC');
Route::post('/Plan_de_Estudios/Modificar_LGAC/{id}', 'LGACController@modificarLGAC');
Route::post('/Plan_de_Estudios/FiltradoTablaLGAC', 'LGACController@filtradoLGAC');
Route::post('/Plan_de_Estudios/BusquedaLGAC', 'LGACController@busquedaLGAC');
Route::post('/LGACs/ObtenerLGACs', 'LGACController@ObtenerLGACs');

//Experencias Educativas
Route::post('/Plan_de_Estudios/Registrar_EE', 'ExperienciasEducativasController@registrarEE');
Route::post('/Plan_de_Estudios/Modificar_EE/{id}', 'ExperienciasEducativasController@modificarEE');
Route::post('/Plan_de_Estudios/FiltradoTablaEE', 'ExperienciasEducativasController@filtradoEE');
Route::post('/Plan_de_Estudios/BusquedaEE', 'ExperienciasEducativasController@busquedaEE');
Route::post('/EE/ObtenerEE', 'ExperienciasEducativasController@ObtenerEE');


//Route::post('/LGACs/ObtenerLGACs', 'LGACController@ObtenerLGACs');

//Profesores
Route::get('/Profesores', 'ProfesoresController@mostrarProfesores');
Route::get('/Profesores/Registrar_Profesor', 'ProfesoresController@registrarProfesorVista');
Route::get('/Profesores/Modificar_Profesor/{id}', 'ProfesoresController@VistaModificarProfesor');

Route::post('/Profesores/BusquedaProfesor', 'ProfesoresController@BusquedaProfesor');
Route::post('/Profesores/FiltradoTablaProfesores', 'ProfesoresController@FiltradoProfesor');
Route::post('/Profesores/DeshabilitarProfesor', 'ProfesoresController@DeshabilitarProfesor');
Route::post('/Profesores/obtenerInformacionProfesor', 'ProfesoresController@obtenerInformacionProfesor');
Route::post('/Profesores/ObtenerProfesores', 'ProfesoresController@ObtenerProfesores');

Route::post('/Profesores/Registrar_Profesor/ValidarDatosGeneralesProfesor', 'ProfesoresController@ValidarDatosGeneralesProfesor');
Route::post('/Profesores/Registrar_Profesor/ValidarPreparacionAcademicaProfesor', 'ProfesoresController@ValidarPreparacionAcademicaProfesor');
Route::post('/Profesores/Registrar_Profesor/ValidarSuperacionAcademicaProfesor', 'ProfesoresController@ValidarSuperacionAcademicaProfesor');
Route::post('/Profesores/Registrar_Profesor/ValidarDistincionProfesor', 'ProfesoresController@ValidarDistincionProfesor');
Route::post('/Profesores/Registrar_Profesor/ValidarTrayectoriaProfesor', 'ProfesoresController@ValidarTrayectoriaProfesor');
Route::post('/Profesores/Registrar_Profesor/ValidarPertenenciaProfesor', 'ProfesoresController@ValidarPertenenciaProfesor');

Route::post('/Profesores/Registrar_Profesor/RegistrarProfesor', 'ProfesoresController@RegistrarProfesor');
Route::post('/Profesores/Registrar_Profesor/RegistrarCartasNAB', 'ProfesoresController@RegistrarCartasNAB');
Route::post('/Profesores/Registrar_Profesor/RegistrarPreparacionAcademica', 'ProfesoresController@RegistrarPreparacionAcademica');
Route::post('/Profesores/Registrar_Profesor/RegistrarSuperacionAcademica', 'ProfesoresController@RegistrarSuperacionAcademica');
Route::post('/Profesores/Registrar_Profesor/RegistrarDistincion', 'ProfesoresController@RegistrarDistincion');
Route::post('/Profesores/Registrar_Profesor/RegistrarTrayectorias', 'ProfesoresController@RegistrarTrayectorias');
Route::post('/Profesores/Registrar_Profesor/RegistrarPertenencia', 'ProfesoresController@RegistrarPertenencia');

Route::post('/Profesores/Modificar_Profesor/ValidarDatosGeneralesProfesor/{id}', 'ProfesoresController@ValidarDatosGeneralesProfesorModificar');
Route::post('/Profesores/Modificar_Profesor/ValidarPreparacionAcademicaProfesor', 'ProfesoresController@ValidarPreparacionAcademicaProfesorModificar');
Route::post('/Profesores/Modificar_Profesor/ValidarSuperacionAcademicaProfesor', 'ProfesoresController@ValidarSuperacionAcademicaProfesorModificar');
Route::post('/Profesores/Modificar_Profesor/ValidarDistincionesProfesor', 'ProfesoresController@ValidarDistincionProfesorModificar');
Route::post('/Profesores/Modificar_Profesor/ValidarTrayectoriaProfesor', 'ProfesoresController@ValidarTrayectoriaProfesorModificar');
Route::post('/Profesores/Modificar_Profesor/ValidarPertenenciaProfesor', 'ProfesoresController@ValidarPertenenciaProfesorModificar');

Route::post('/Profesores/Modificar_Profesor/ModificarProfesor/{id}', 'ProfesoresController@ModificarProfesor');
Route::post('/Profesores/Modificar_Profesor/ModificarCartasNAB', 'ProfesoresController@ModificarCartasNAB');
Route::post('/Profesores/Modificar_Profesor/EliminarPreparacionAcademica', 'ProfesoresController@EliminarPreparacionAcademica');
Route::post('/Profesores/Modificar_Profesor/ModificarPreparacionAcademica', 'ProfesoresController@ModificarPreparacionAcademica');
Route::post('/Profesores/Modificar_Profesor/EliminarSuperacionAcademica', 'ProfesoresController@EliminarSuperacionAcademica');
Route::post('/Profesores/Modificar_Profesor/ModificarSuperacionAcademica', 'ProfesoresController@ModificarSuperacionAcademica');
Route::post('/Profesores/Modificar_Profesor/EliminarDistincion', 'ProfesoresController@EliminarDistincion');
Route::post('/Profesores/Modificar_Profesor/ModificarDistincion', 'ProfesoresController@ModificarDistincion');
Route::post('/Profesores/Modificar_Profesor/EliminarTrayectoria', 'ProfesoresController@EliminarTrayectoria');
Route::post('/Profesores/Modificar_Profesor/ModificarTrayectoria', 'ProfesoresController@ModificarTrayectoria');
Route::post('/Profesores/Modificar_Profesor/EliminarPertenencia', 'ProfesoresController@EliminarPertenencia');
Route::post('/Profesores/Modificar_Profesor/ModificarPertenencia', 'ProfesoresController@ModificarPertenencia');

//Estudiantes
Route::get('/Estudiantes', 'EstudiantesController@mostrarEstudiantes');
Route::get('/Estudiantes/Registrar_Estudiante', 'EstudiantesController@registrarEstudianteVista');
Route::get('/Estudiantes/Modificar_Estudiante/{id}', 'EstudiantesController@VistaModificarEstudiante');

Route::post('/Estudiantes/BusquedaEstudiante', 'EstudiantesController@BusquedaEstudiante');
Route::post('/Estudiantes/FiltradoTablaEstudiantes', 'EstudiantesController@FiltradoEstudiante');
Route::post('/Estudiantes/obtenerInformacionEstudiante', 'EstudiantesController@obtenerInformacionEstudiante');
Route::post('/Estudiantes/ObtenerEstudiantes', 'EstudiantesController@ObtenerEstudiantes');
Route::post('/Estudiantes/getEstudiante', 'EstudiantesController@getEstudiante');

Route::post('/Estudiantes/Registrar_Estudiante/ValidarDatosGeneralesEstudiante', 'EstudiantesController@ValidarDatosGeneralesEstudiante');
Route::post('/Estudiantes/Registrar_Estudiante/ValidarPreparacionAcademicaEstudiante', 'EstudiantesController@ValidarPreparacionAcademicaEstudiante');

Route::post('/Estudiantes/Registrar_Estudiante/RegistrarEstudiante', 'EstudiantesController@RegistrarEstudiante');
Route::post('/Estudiantes/Registrar_Estudiante/RegistrarPreparacionAcademica', 'EstudiantesController@RegistrarPreparacionAcademica');

Route::post('/Estudiantes/Modificar_Estudiante/ValidarDatosGeneralesEstudiante/{id}', 'EstudiantesController@ValidarDatosGeneralesEstudianteModificar');
Route::post('/Estudiantes/Modificar_Estudiante/ValidarPreparacionAcademicaEstudiantes', 'EstudiantesController@ValidarPreparacionAcademicaEstudianteModificar');

Route::post('/Estudiantes/Modificar_Estudiante/ModificarEstudiante/{id}', 'EstudiantesController@ModificarEstudiante');
Route::post('/Estudiantes/Modificar_Estudiante/EliminarPreparacionAcademica', 'EstudiantesController@EliminarPreparacionAcademica');
Route::post('/Estudiantes/Modificar_Estudiante/ModificarPreparacionAcademica', 'EstudiantesController@ModificarPreparacionAcademica');

//Trabajos Recepcionales

Route::get('/Trabajos_Recepcionales/Registrar_Trabajo_Recepcional', 'TrabajosRecepcionalesController@registrarTesisVista');
Route::get('/Trabajos_Recepcionales', 'TrabajosRecepcionalesController@mostrarTesis');
Route::get('/Trabajos_Recepcionales/Modificar_Trabajo/{id}', 'TrabajosRecepcionalesController@VistaModificarTrabajo');

Route::post('/Trabajos_Recepcionales/FiltradoTablaTesis', 'TrabajosRecepcionalesController@FiltradoTesis');
Route::post('/Trabajos_Recepcionales/BusquedaTesis', 'TrabajosRecepcionalesController@BusquedaTesis');
Route::post('/Trabajos_Recepcionales/obtenerInformacionTesis', 'TrabajosRecepcionalesController@obtenerInformacionTesis');

Route::post('/Trabajos_Recepcionales/Registrar_Trabajo_Recepcional/ValidarDatosGeneralesTesis', 'TrabajosRecepcionalesController@ValidarDatosGeneralesTesis');
Route::post('/Trabajos_Recepcionales/Modificar_Trabajo_Recepcional/ValidarDatosGeneralesTesis/{id}', 'TrabajosRecepcionalesController@ValidarDatosGeneralesTesisModificar');

Route::post('/Trabajos_Recepcionales/Registrar_Trabajo_Recepcional/RegistrarDG', 'TrabajosRecepcionalesController@RegistrarDG');
Route::post('/Trabajos_Recepcionales/Modificar_Trabajo_Recepcional/ModificarDG/{id}', 'TrabajosRecepcionalesController@ModificarDG');
Route::post('/Trabajos_Recepcionales/EliminarTesis', 'TrabajosRecepcionalesController@EliminarTesis');

//Convenios de Movilidad
Route::get('/Convenios_Movilidad/Registrar_Convenios_Movilidad', 'ConveniosMovilidadController@registrarConveniosVista');
Route::get('/Convenios_Movilidad/Modificar_Convenios_Movilidad/{id}', 'ConveniosMovilidadController@VistaModificarConvenio');
Route::get('/Convenios_Movilidad', 'ConveniosMovilidadController@mostrarConvenios');

Route::post('/Convenios_Movilidad/FiltradoTablaConvenios', 'ConveniosMovilidadController@FiltradoConvenios');
Route::post('/Convenios_Movilidad/BusquedaConvenios', 'ConveniosMovilidadController@BusquedaConvenios');
Route::post('/Convenios_Movilidad/obtenerInformacionConvenios', 'ConveniosMovilidadController@obtenerInformacionConvenio');
Route::post('/Convenios_Movilidad/ObtenerConvenios', 'ConveniosMovilidadController@ObtenerConvenios');
Route::post('/Convenios_Movilidad/ObtenerConveniosPorSector', 'ConveniosMovilidadController@ObtenerConveniosPorSector');

Route::post('/Convenios_Movilidad/Registrar_Convenios_Movilidad/ValidarDatosGeneralesConvenio', 'ConveniosMovilidadController@ValidarDatosGeneralesConvenio');
Route::post('/Convenios_Movilidad/Modificar_Convenios_Movilidad/ValidarDatosGeneralesConvenio/{id}', 'ConveniosMovilidadController@ValidarDatosGeneralesConvenioModificar');

Route::post('/Convenios_Movilidad/Registrar_Convenios_Movilidad/RegistrarDG', 'ConveniosMovilidadController@RegistrarDG');
Route::post('/Convenios_Movilidad/Modificar_Convenios_Movilidad/ModificarDG/{id}', 'ConveniosMovilidadController@ModificarDG');
Route::post('/Convenios_Movilidad/EliminarConvenio', 'ConveniosMovilidadController@EliminarConvenio');

//Acciones de Movilidad
Route::get('/Acciones_Movilidad/Registrar_Acciones_Movilidad', 'AccionesMovilidadController@registrarAccionesVista');
Route::get('/Acciones_Movilidad/Modificar_Acciones_Movilidad/{id}', 'AccionesMovilidadController@VistaModificarAccion');
Route::get('/Acciones_Movilidad', 'AccionesMovilidadController@mostrarAcciones');

Route::post('/Acciones_Movilidad/FiltradoTablaMovilidades', 'AccionesMovilidadController@FiltradoMovilidades');
Route::post('/Acciones_Movilidad/BusquedaMovilidades', 'AccionesMovilidadController@BusquedaMovilidades');
Route::post('/Acciones_Movilidad/obtenerInformacionMovilidades', 'AccionesMovilidadController@obtenerInformacionAccion');
Route::post('/Acciones_Movilidad/ObtenerMovilidades', 'AccionesMovilidadController@ObtenerConvenios');

Route::post('/Acciones_Movilidad/Registrar_Acciones_Movilidad/ValidarDatosGeneralesMovilidad', 'AccionesMovilidadController@ValidarDatosGeneralesMovilidad');
Route::post('/Acciones_Movilidad/Modificar_Acciones_Movilidad/ValidarDatosGeneralesMovilidad/{id}', 'AccionesMovilidadController@ValidarDatosGeneralesMovilidadModificar');

Route::post('/Acciones_Movilidad/Registrar_Acciones_Movilidad/RegistrarDG', 'AccionesMovilidadController@RegistrarDG');
Route::post('/Acciones_Movilidad/Modificar_Acciones_Movilidad/ModificarDG/{id}', 'AccionesMovilidadController@ModificarDG');
Route::post('/Acciones_Movilidad/EliminarMovilidad', 'AccionesMovilidadController@EliminarMovilidad');

//Acciones de Movilidad
Route::get('/Trabajos_En_Sector/Registrar_Trabajos_Sectores', 'TrabajosEnSectoresController@registrarTrabajosSector');
Route::get('/Trabajos_En_Sector/Modificar_Trabajos_Sectores/{id}', 'TrabajosEnSectoresController@VistaModificarTrabajosSector');
Route::get('/Trabajos_En_Sector', 'TrabajosEnSectoresController@mostrarTrabajoSector');

Route::post('/Trabajos_En_Sector/FiltradoTablaTS', 'TrabajosEnSectoresController@FiltradoTS');
Route::post('/Trabajos_En_Sector/BusquedaTrabajoEnSector', 'TrabajosEnSectoresController@BusquedaTS');
Route::post('/Trabajos_En_Sector/obtenerInformacionTS', 'TrabajosEnSectoresController@obtenerInformacionTS');

Route::post('/Trabajos_En_Sector/Registrar_Trabajos_Sectores/ValidarDatosGeneralesTrabajoSector', 'TrabajosEnSectoresController@ValidarDatosGeneralesTrabajoSector');
Route::post('/Trabajos_En_Sector/Registrar_Trabajos_Sectores/ValidarProfesoresTrabajoSector', 'TrabajosEnSectoresController@ValidarColaboracionesProfesores');
Route::post('/Trabajos_En_Sector/Registrar_Trabajos_Sectores/ValidarEstudiantesTrabajoSector', 'TrabajosEnSectoresController@ValidarColaboracionesEstudiantes');
Route::post('/Trabajos_En_Sector/Registrar_Trabajos_Sectores/ValidarEEAsociada', 'TrabajosEnSectoresController@ValidarEEAsociada');

Route::post('/Trabajos_En_Sector/Registrar_Trabajos_Sectores/RegistrarDG', 'TrabajosEnSectoresController@RegistrarDG');
Route::post('/Trabajos_En_Sector/Registrar_Trabajos_Sectores/RegistrarColaboracionProfesores', 'TrabajosEnSectoresController@RegistrarColaboracionProfesores');
Route::post('/Trabajos_En_Sector/Registrar_Trabajos_Sectores/RegistrarColaboracionEstudiantes', 'TrabajosEnSectoresController@RegistrarColaboracionEstudiantes');
Route::post('/Trabajos_En_Sector/Registrar_Trabajos_Sectores/RegistrarEEAsociadas', 'TrabajosEnSectoresController@RegistrarEEAsociadas');

Route::post('/Trabajos_En_Sector/Modificar_Trabajos_Sectores/ValidarDatosGeneralesTrabajoSector/{id}', 'TrabajosEnSectoresController@ValidarDatosGeneralesTrabajoSectorModificar');
Route::post('/Trabajos_En_Sector/Modificar_Trabajos_Sectores/ValidarProfesoresTrabajoSector', 'TrabajosEnSectoresController@ValidarColaboracionesProfesoresModificar');
Route::post('/Trabajos_En_Sector/Modificar_Trabajos_Sectores/ValidarEstudiantesTrabajoSector', 'TrabajosEnSectoresController@ValidarColaboracionesEstudiantesModificar');
Route::post('/Trabajos_En_Sector/Modificar_Trabajos_Sectores/ValidarEEAsociada', 'TrabajosEnSectoresController@ValidarEEAsociadaModificar');

Route::post('/Trabajos_En_Sector/Modificar_Trabajos_Sectores/ModificarDG/{id}', 'TrabajosEnSectoresController@ModificarDG');
Route::post('/Trabajos_En_Sector/Modificar_Trabajos_Sectores/EliminarColabProf', 'TrabajosEnSectoresController@EliminarColabProf');
Route::post('/Trabajos_En_Sector/Modificar_Trabajos_Sectores/ModificarColabProf', 'TrabajosEnSectoresController@ModificarColabProf');
Route::post('/Trabajos_En_Sector/Modificar_Trabajos_Sectores/EliminarColabEst', 'TrabajosEnSectoresController@EliminarColabEst');
Route::post('/Trabajos_En_Sector/Modificar_Trabajos_Sectores/ModificarColabEst', 'TrabajosEnSectoresController@ModificarColabEst');
Route::post('/Trabajos_En_Sector/Modificar_Trabajos_Sectores/EliminarEE', 'TrabajosEnSectoresController@EliminarEE');
Route::post('/Trabajos_En_Sector/Modificar_Trabajos_Sectores/ModificarEE', 'TrabajosEnSectoresController@ModificarEE');

Route::post('/Trabajos_En_Sector/Eliminar_Trabajos_Sectores', 'TrabajosEnSectoresController@EliminarTrabajoEnSector');

Route::get('/Productos_LGAC/Registrar_Producto_LGAC', 'ProductoslgacController@registrarProductosLGAC');

//Controlador Auxiliar
Route::post('/Auxiliar/TipoContratacion', 'AuxiliarController@TipoContrataciones');
Route::post('/Auxiliar/TipoColaboracion', 'AuxiliarController@TipoColaboraciones');
Route::post('/Auxiliar/LGACS', 'AuxiliarController@LGACS');
Route::post('/Auxiliar/Paises', 'AuxiliarController@Paises');
Route::post('/Auxiliar/Grados', 'AuxiliarController@Grados');
Route::post('/Auxiliar/TipoSuperacion', 'AuxiliarController@TipoSuperacion');
Route::post('/Auxiliar/TipoTrayectoria', 'AuxiliarController@TipoTrayectoria');
Route::post('/Auxiliar/Sectores', 'AuxiliarController@Sectores');
Route::post('/Auxiliar/LGACsByPlan', 'AuxiliarController@LGACsByPlan');
Route::post('/Auxiliar/getLGACs', 'AuxiliarController@getLGACs');
Route::post('/Auxiliar/CartasNAB', 'AuxiliarController@CartasNAB');
Route::post('/Auxiliar/QuitarCartaNAB', 'AuxiliarController@QuitarCartaNAB');
Route::post('/Auxiliar/ArchivosEvidencia', 'AuxiliarController@ArchivosEvidencia');
Route::post('/Auxiliar/LimpiarTMP', 'AuxiliarController@LimpiarTMP');