<?php

namespace App\Http\Controllers;

use App\Estudiantes;
use App\EstudiosEstudiantes;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class EstudiantesController extends Controller
{
    public function mostrarEstudiantes(){
        $objeto = new Estudiantes();
        $result = $objeto->MostrarEstudiantes();
        return view('Estudiante.verEstudiantes', compact('result'));
    }

    public function FiltradoEstudiante(Request $request){
        $estudiante = new Estudiantes();
        return $estudiante->FiltradoEstudiante($request);
    }

    public function BusquedaEstudiante(Request $request){
        $estudiante = new Estudiantes();
        return $estudiante->BusquedaEstudiante($request);
    }

    public function obtenerInformacionEstudiante(Request $request){
        $DatosGenerales = new Estudiantes();
        $DatosGenerales = $DatosGenerales -> ObtenerDatosGeneralesEstudiante($request);
        $Estudios = new EstudiosEstudiantes();
        $Estudios = $Estudios -> ObtenerEstudiosByEstudiante($request);

        $array[0] = array(
            "DatosGenerales" => $DatosGenerales,
            "PreparacionAcademica" => $Estudios
        );
        return $array;
    }

    public function registrarEstudianteVista(){
        return view('Estudiante.registrarEstudiante');
    }

    public function VistaModificarEstudiante($id){
        $request = new Request();
        $request->request->add(['idEstudiante' => $id]);
        $informacion = new EstudiantesController();
        $informacion = $informacion->obtenerInformacionEstudiante($request);

        return view('Estudiante.modificarEstudiante', compact('informacion'));
    }

    public function ValidarDatosGeneralesEstudiante(Request $request){
        $validator = Validator::make($request->all(), [
                'Nombre'=>'required|string|max:30',
                'Apellido_P'=>'required|string|max:20',
                'Apellido_M'=>'required|string|max:20',
                'Correo'=>'required|string|max:40|email|unique:estudiantes',
                'CorreoPersonal'=>'string|max:40|email|nullable|unique:estudiantes',
                'No_CVU'=>'required|numeric|digits_between:5,6|unique:estudiantes',
                'Matricula'=>'required|string|size:9|unique:estudiantes',
                'Estado'  => 'required',
                'ArchivoCartaLib' => 'required_if:Estado,==,Egresado',
                'Id_LGAC'=>'required'
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }
    
    public function ValidarPreparacionAcademicaEstudiante(Request $request){
        $validator = Validator::make($request->all(), [
                'Titulo'=>'required|string|max:100',
                'Universidad'=>'required|string|max:80',
                'Lugar'=>'required|string|max:100',
                'Archivo'=>'required'
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarDatosGeneralesEstudianteModificar(Request $request, $id){
        $validator = Validator::make($request->all(), [
                'Nombre'=>'required|string|max:30',
                'Apellido_P'=>'required|string|max:20',
                'Apellido_M'=>'required|string|max:20',
                'Correo'=>'required|string|max:40|email|unique:estudiantes,Correo,'.$id,
                'CorreoPersonal'=>'string|max:40|email|nullable|unique:estudiantes,CorreoPersonal,'.$id,
                'No_CVU'=>'required|numeric|digits_between:5,6|unique:estudiantes,No_CVU,'.$id,
                'Matricula'=>'required|string|size:9|unique:estudiantes,Matricula,'.$id,
                'Estado'  => 'required',
                'EstadoCheck'  => 'required',
                'ArchivoVerificacion'  => 'required',
                'ArchivoCartaLib' => 'required_if:ArchivoVerificacion,==,true',
                'Id_LGAC'=>'required'
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarPreparacionAcademicaEstudianteModificar(Request $request){
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

    public function RegistrarEstudiante(Request $request){
        $DatosGenerales = new Estudiantes();
        $idEstudiante=$DatosGenerales->RegistrarDatosGenerales($request);
        return $idEstudiante;
    }

    public function RegistrarPreparacionAcademica(Request $request){
        $estudios = new EstudiosEstudiantes();
        return $estudios->RegistrarPreparacionAcademica($request);
    }

    public function ModificarEstudiante(Request $request, $id){
        $estudios = new Estudiantes();
        return $estudios->ModificarEstudiante($request, $id);
    }

    public function EliminarPreparacionAcademica(Request $request){
        $estudios = new EstudiosEstudiantes();
        return $estudios->EliminarPreparacionAcademica($request);
    }

    public function ModificarPreparacionAcademica(Request $request){
        $estudios = new EstudiosEstudiantes();
        return $estudios->ModificarPreparacionAcademica($request);
    }
}
