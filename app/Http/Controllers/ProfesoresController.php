<?php

namespace App\Http\Controllers;

use App\Profesores;
use App\LGACProfesores;
use App\CartasNAB;
use App\Paises;
use App\EstudiosProfesores;
use App\SuperacionAcademica;
use App\Distinciones;
use App\TrayectoriaProfesional;
use App\Organizaciones;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class ProfesoresController extends Controller
{
    public function mostrarProfesores(){
        $objeto = new Profesores();
        $result = $objeto->MostrarProfesores();
        return view('Profesor.verProfesores', compact('result'));
    }

    public function registrarProfesorVista(){
        return view('Profesor.registrarProfesor');
    }

    public function BusquedaProfesor(Request $request){
        $profesor = new Profesores();
        return $profesor->busquedaProfesor($request);
    }

    public function FiltradoProfesor(Request $request){
        $profesor = new Profesores();
        return $profesor->FiltradoProfesor($request);
    }

    public function DeshabilitarProfesor(Request $request){
        $profesor = new Profesores();
        return $profesor->DeshabilitarProfesor($request);
    }

    public function ValidarDatosGeneralesProfesor(Request $request){
        $validator = Validator::make($request->all(), [
                'Nombre'=>'required|string|max:30',
                'Apellido_P'=>'required|string|max:20',
                'Apellido_M'=>'required|string|max:20',
                'Correo'=>'required|string|max:40|email|unique:profesores',
                'CorreoPersonal'=>'string|max:40|email|nullable|unique:profesores',
                'No_CVU'=>'required|numeric|digits_between:5,6|unique:profesores',
                'Institucion'=>'required|string|max:80',
                'Pais'=>'required|string|max:20',
                'Id_LGAC'=>'required|array|min:1'
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarPreparacionAcademicaProfesor(Request $request){
        $validator = Validator::make($request->all(), [
                'Titulo'=>'required|string|max:100',
                'Universidad'=>'required|string|max:80',
                'Lugar'=>'required|string|max:100',
                'Archivo'=>'nullable'
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarSuperacionAcademicaProfesor(Request $request){
        $validator = Validator::make($request->all(), [
                'Tipo_Documento'  => 'required',
                'OpcionOtro' => 'required_if:Tipo_Documento,==,0|string|max:15',
                'Titulo'=>'required|string|max:50',
                'Periodo'=>'required|string|max:40',
                'Descripcion'=>'required|string|max:150',
                'Archivo'=>'nullable'
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarDistincionProfesor(Request $request){
        $validator = Validator::make($request->all(), [
                'Nombre_Distincion'  => 'required',
                'OpcionOtro' => 'required_if:Nombre_Distincion,==,0|string|max:20',
                'Periodo'=>'required|string|max:40',
                'Descripcion'=>'required|string|max:150',
                'Archivo'=>'nullable'
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarTrayectoriaProfesor(Request $request){
        $validator = Validator::make($request->all(), [
                'Tipo_Documento'  => 'required',
                'OpcionOtro' => 'required_if:Tipo_Documento,==,0|string|max:20',
                'Titulo'=>'required|string|max:50',
                'Periodo'=>'required|string|max:40',
                'Descripcion'=>'required|string|max:150',
                'Archivo'=>'nullable'
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarPertenenciaProfesor(Request $request){
        $validator = Validator::make($request->all(), [
                'Nombre_Organizacion'=>'required|string|max:40',
                'Periodo'=>'required|string|max:40',
                'Descripcion'=>'required|string|max:150',
                'Archivo'=>'nullable'
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarDatosGeneralesProfesorModificar(Request $request, $id){
        $validator = Validator::make($request->all(), [
                'Nombre'=>'required|string|max:30',
                'Apellido_P'=>'required|string|max:20',
                'Apellido_M'=>'required|string|max:20',
                'Correo'=>'required|string|max:40|email|unique:profesores,Correo,'.$id,
                'CorreoPersonal'=>'string|max:40|email|nullable|unique:profesores, CorreoPersonal,'.$id,
                'No_CVU'=>'required|numeric|digits_between:5,6|unique:profesores,No_CVU,'.$id,
                'Institucion'=>'required|string|max:80',
                'Pais'=>'required|string|max:20',
                'Id_LGAC'=>'required|array|min:1'
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarPreparacionAcademicaProfesorModificar(Request $request){
        $validator = Validator::make($request->all(), [
                'Titulo'=>'required|string|max:100',
                'Universidad'=>'required|string|max:80',
                'Lugar'=>'required|string|max:100'
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarSuperacionAcademicaProfesorModificar(Request $request){
        $validator = Validator::make($request->all(), [
            'Tipo_Documento'  => 'required',
            'OpcionOtro' => 'required_if:Tipo_Documento,==,0|string|max:15',
            'Titulo'=>'required|string|max:50',
            'Periodo'=>'required|string|max:40',
            'Descripcion'=>'required|string|max:150'
        ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }
    
    public function ValidarDistincionProfesorModificar(Request $request){
        $validator = Validator::make($request->all(), [
            'Nombre_Distincion'  => 'required',
            'OpcionOtro' => 'required_if:Nombre_Distincion,==,0|string|max:15',
            'Periodo'=>'required|string|max:40',
            'Descripcion'=>'required|string|max:150'
        ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarTrayectoriaProfesorModificar(Request $request){
        $validator = Validator::make($request->all(), [
            'Tipo_Documento'  => 'required',
            'OpcionOtro' => 'required_if:Tipo_Documento,==,0|string|max:15',
            'Titulo'=>'required|string|max:50',
            'Periodo'=>'required|string|max:40',
            'Descripcion'=>'required|string|max:150'
        ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarPertenenciaProfesorModificar(Request $request){
        $validator = Validator::make($request->all(), [
            'Nombre_Organizacion'=>'required|string|max:40',
            'Periodo'=>'required|string|max:40',
            'Descripcion'=>'required|string|max:150',
        ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function RegistrarProfesor(Request $request){

        $pais = new Paises();
        $request["Pais"]=$pais->ComprobarPais($request->get('Pais'));

        $profesorDatosGenerales = new Profesores();
        $idProfesor=$profesorDatosGenerales->RegistrarDatosGenerales($request);

        $arraylgac=$request->input('Id_LGAC');
        $relacionLGACProfesor = new LGACProfesores();

        foreach ($arraylgac as $idlgac){
            $relacionLGACProfesor->RegistrarRelacion($idProfesor, $idlgac);
        }
        
        return $idProfesor;

    }

    public function ModificarProfesor(Request $request, $idProfe){

        $pais = new Paises();
        $request["Pais"]=$pais->ComprobarPais($request->get('Pais'));

        $profesorDatosGenerales = new Profesores();
        $profesorDatosGenerales->ModificarDatosGenerales($request, $idProfe);

        $arraylgac=$request->input('Id_LGAC');
        $relacionLGACProfesor = new LGACProfesores();
        $relacionLGACProfesor->CleanLGACs($idProfe);
        foreach ($arraylgac as $idlgac){
            $relacionLGACProfesor->RegistrarRelacion($idProfe, $idlgac);
        }
        
        return $idProfe;

    }

    public function EliminarPreparacionAcademica(Request $request){
        $estudios = new EstudiosProfesores();
        return $estudios->EliminarPreparacionAcademica($request);
    }

    public function ModificarPreparacionAcademica(Request $request){
        $estudios = new EstudiosProfesores();
        return $estudios->ModificarPreparacionAcademica($request);
    }

    public function EliminarSuperacionAcademica(Request $request){
        $superacion = new SuperacionAcademica();
        return $superacion->EliminarSuperacionAcademica($request);
    }

    public function ModificarSuperacionAcademica(Request $request){
        $superacion = new SuperacionAcademica();
        return $superacion->ModificarSuperacionAcademica($request);
    }

    public function EliminarDistincion(Request $request){
        $distincion = new Distinciones();
        return $distincion->EliminarDistincion($request);
    }

    public function ModificarDistincion(Request $request){
        $distincion = new Distinciones();
        return $distincion->ModificarDistincion($request);
    }

    public function EliminarTrayectoria(Request $request){
        $trayectoria = new TrayectoriaProfesional();
        return $trayectoria->EliminarTrayectoria($request);
    }

    public function ModificarTrayectoria(Request $request){
        $trayectoria = new TrayectoriaProfesional();
        return $trayectoria->ModificarTrayectoria($request);
    }

    public function EliminarPertenencia(Request $request){
        $pertenencia = new Organizaciones();
        return $pertenencia->EliminarPertenencia($request);
    }

    public function ModificarPertenencia(Request $request){
        $pertenencia = new Organizaciones();
        return $pertenencia->ModificarPertenencia($request);
    }


    public function RegistrarCartasNAB(Request $request){
        $carta = new CartasNAB();
        return $carta->RegistrarCartasNAB($request);
    }

    public function ModificarCartasNAB(Request $request){
        $carta = new CartasNAB();
        return $carta->ModificarCartasNAB($request);
    }

    public function RegistrarPreparacionAcademica(Request $request){
        $estudios = new EstudiosProfesores();
        return $estudios->RegistrarPreparacionAcademica($request);
    }

    public function RegistrarSuperacionAcademica(Request $request){
        $superacion = new SuperacionAcademica();
        return $superacion->RegistrarSuperacionAcademica($request);
    }

    public function RegistrarDistincion(Request $request){
        $distincion = new Distinciones();
        return $distincion->RegistrarDistincion($request);
    }

    public function RegistrarTrayectorias(Request $request){
        $trayectoria = new TrayectoriaProfesional();
        return $trayectoria->RegistrarTrayectorias($request);
    }

    public function RegistrarPertenencia(Request $request){
        $pertenencia = new Organizaciones();
        return $pertenencia->RegistrarPertenencia($request);
    }

    public function obtenerInformacionProfesor(Request $request){
        $DatosGenerales = new Profesores();
        $DatosGenerales = $DatosGenerales -> ObtenerDatosGeneralesProfesor($request);
        $LGACsProfesor = new LGACProfesores();
        $LGACsProfesor = $LGACsProfesor -> ObtenerLGACsByProfesor($request);
        $CartasNAB = new CartasNAB();
        $CartasNAB = $CartasNAB -> ObtenerCartasByProfesor($request);
        $Estudios = new EstudiosProfesores();
        $Estudios = $Estudios -> ObtenerEstudiosByProfesor($request);
        $Superacion = new SuperacionAcademica();
        $Superacion = $Superacion -> ObtenerSuperacionByProfesor($request);
        $Distinciones = new Distinciones();
        $Distinciones = $Distinciones -> ObtenerDistincionByProfesor($request);
        $Trayectoria = new TrayectoriaProfesional();
        $Trayectoria = $Trayectoria -> ObtenerTrayectoriaByProfesor($request);
        $Pertenencias = new Organizaciones();
        $Pertenencias = $Pertenencias -> ObtenerPertenenciaByProfesor($request);

        $DatosGenerales[0]->LGACs = $LGACsProfesor;
        $DatosGenerales[0]->CartasNAB = $CartasNAB;
        $array[0] = array(
            "DatosGenerales" => $DatosGenerales,
            "PreparacionAcademica" => $Estudios,
            "SuperacionAcademica" => $Superacion,
            "Distinciones" => $Distinciones,
            "Trayectoria" => $Trayectoria,
            "Pertenencias" => $Pertenencias
        );
        return $array;
    }

    public function VistaModificarProfesor($id){
        $request = new Request();
        $request->request->add(['idProfe' => $id]);
        $informacion = new ProfesoresController();
        $informacion = $informacion->obtenerInformacionProfesor($request);

        return view('Profesor.modificarProfesor', compact('informacion'));
    }

    public function ObtenerProfesores(){
        $profesores = new Profesores();
        return $profesores->ObtenerProfesores();
    }
}
