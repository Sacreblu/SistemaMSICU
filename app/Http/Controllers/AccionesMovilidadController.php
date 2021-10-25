<?php

namespace App\Http\Controllers;

use App\AccionesMovilidad;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AccionesMovilidadController extends Controller
{
    public function registrarAccionesVista(){
        return view('AccionMovilidad.registrarAccion');
    }

    public function VistaModificarAccion($id){
        $request = new Request();
        $request->request->add(['idAccion' => $id]);
        $informacion = new AccionesMovilidadController();
        $informacion = $informacion->obtenerInformacionAccion($request);

        return view('AccionMovilidad.modificarAccion', compact('informacion'));
    }

    public function mostrarAcciones(){
        $objeto = new AccionesMovilidad();
        $result = $objeto->MostrarAcciones();
        
        return view('AccionMovilidad.verAcciones', compact('result'));
    }


    public function obtenerInformacionAccion(Request $request){
        $DatosGenerales = new AccionesMovilidad();
        $DatosGenerales = $DatosGenerales -> ObtenerDatosGeneralesAccion($request);

        return $DatosGenerales;
    }

    public function FiltradoMovilidades(Request $request){
        $accion = new AccionesMovilidad();
        return $accion->FiltradoMovilidades($request);
    }

    public function BusquedaMovilidades(Request $request){
        $convenio = new AccionesMovilidad();
        return $convenio->BusquedaMovilidades($request);
    }

    public function ValidarDatosGeneralesMovilidad(Request $request){
        $validator = Validator::make($request->all(), [
                'IdSector'  => 'required',
                'NombreConvenio'=>'required|string|max:30',
                'IdConvenio'=>'required',
                'NombreEstudiante'=>'required|string',
                'IdEstudiante'=>'required',
                'InstitucionDestino'=>'required|string|max:100',
                'InstitucionOrigen'=>'nullable|required_if:IdSector,==,4|string|max:100',
                'ProgramaDestino'=>'nullable|required_if:IdSector,==,4|string|max:70',
                'ProgramaOrigen'=>'nullable|required_if:IdSector,==,4|string|max:70',
                'PeriodoComienzo'=>'exclude_if:IdSector,==,5|required|before_or_equal:PeriodoConclusion',
                'PeriodoConclusion'=>'exclude_if:IdSector,==,5|required|after_or_equal:PeriodoComienzo',
                'DependenciaDestino'=>'nullable|string|max:50',
                'DependenciaOrigen'=>'nullable|string|max:50',
                'Motivo'=>'required|string|max:350',
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarDatosGeneralesMovilidadModificar(Request $request){
        $validator = Validator::make($request->all(), [
                'IdSector'  => 'required',
                'NombreConvenio'=>'required|string|max:30',
                'IdConvenio'=>'required',
                'NombreEstudiante'=>'required|string',
                'IdEstudiante'=>'required',
                'InstitucionDestino'=>'required|string|max:100',
                'InstitucionOrigen'=>'nullable|required_if:IdSector,==,4|string|max:100',
                'ProgramaDestino'=>'nullable|required_if:IdSector,==,4|string|max:70',
                'ProgramaOrigen'=>'nullable|required_if:IdSector,==,4|string|max:70',
                'PeriodoComienzo'=>'exclude_if:IdSector,==,5|required|before_or_equal:PeriodoConclusion',
                'PeriodoConclusion'=>'exclude_if:IdSector,==,5|required|after_or_equal:PeriodoComienzo',
                'DependenciaDestino'=>'nullable|string|max:50',
                'DependenciaOrigen'=>'nullable|string|max:50',
                'Motivo'=>'required|string|max:350',
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function RegistrarDG(Request $request){

        $DatosGenerales = new AccionesMovilidad();
        $idAccion=$DatosGenerales->RegistrarDG($request);

        return $idAccion;
    }

    public function ModificarDG(Request $request, $id){

        $DatosGenerales = new AccionesMovilidad();
        $DatosGenerales->ModificarDG($request, $id);

        return "hecho";
    }
    
    public function EliminarMovilidad(Request $request){
        $accion = new AccionesMovilidad();
        return $accion->EliminarMovilidad($request);
    }
}
