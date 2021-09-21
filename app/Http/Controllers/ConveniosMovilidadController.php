<?php

namespace App\Http\Controllers;

use App\ConveniosMovilidad;
use App\Paises;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ConveniosMovilidadController extends Controller
{
    public function registrarConveniosVista(){
        return view('Convenio.registrarConvenio');
    }

    public function VistaModificarConvenio($id){
        $request = new Request();
        $request->request->add(['idConvenio' => $id]);
        $informacion = new ConveniosMovilidadController();
        $informacion = $informacion->obtenerInformacionConvenio($request);

        return view('Convenio.modificarConvenio', compact('informacion'));
    }

    public function mostrarConvenios(){
        $objeto = new ConveniosMovilidad();
        $result = $objeto->MostrarConvenios();
        
        return view('Convenio.verConvenios', compact('result'));
    }

    public function FiltradoConvenios(Request $request){
        $convenio = new ConveniosMovilidad();
        return $convenio->FiltradoConvenios($request);
    }

    public function BusquedaConvenios(Request $request){
        $convenio = new ConveniosMovilidad();
        return $convenio->BusquedaConvenios($request);
    }

    public function obtenerInformacionConvenio(Request $request){
        $DatosGenerales = new ConveniosMovilidad();
        $DatosGenerales = $DatosGenerales -> ObtenerDatosGeneralesConvenio($request);

        return $DatosGenerales;
    }

    public function ValidarDatosGeneralesConvenio(Request $request){
        $validator = Validator::make($request->all(), [
                'Nombre'=>'required|string',
                'FechaComienzo'=>'required|before:FechaConclusion',
                'FechaConclusion'=>'required|after:FechaComienzo',
                'Ciudad' => 'required|string|max:30',
                'Pais'=>'required|string|max:20',
                'Institucion'=>'required|string|max:50'
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarDatosGeneralesConvenioModificar(Request $request, $id){
        $validator = Validator::make($request->all(), [
                'Nombre'=>'required|string',
                'FechaComienzo'=>'required|before:FechaConclusion',
                'FechaConclusion'=>'required|after:FechaComienzo',
                'Ciudad' => 'required|string|max:30',
                'Pais'=>'required|string|max:20',
                'Institucion'=>'required|string|max:50'
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function RegistrarDG(Request $request){
        $pais = new Paises();
        $request["Pais"]=$pais->ComprobarPais($request->get('Pais'));

        $DatosGenerales = new ConveniosMovilidad();
        $idConvenio=$DatosGenerales->RegistrarDG($request);

        return $idConvenio;
    }

    public function ModificarDG(Request $request, $id){
        $pais = new Paises();
        $request["Pais"]=$pais->ComprobarPais($request->get('Pais'));

        $DatosGenerales = new ConveniosMovilidad();
        $DatosGenerales->ModificarDG($request, $id);

        return "hecho";
    }

    public function EliminarConvenio(Request $request){
        $convenio = new ConveniosMovilidad();
        return $convenio->EliminarConvenio($request);
    }

    
}
