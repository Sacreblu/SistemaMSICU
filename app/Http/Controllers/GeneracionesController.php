<?php

namespace App\Http\Controllers;

use App\Generaciones;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GeneracionesController extends Controller
{
    public function registrarGeneracion(Request $request){
        $Generacion = new Generaciones();
        $validator=$this->validate($request, 
            [
                'Generacion'=>'required|numeric|unique:generaciones',
                'Anio_Inicio'=>'required|numeric|unique:generaciones'
            ]);
        return $Generacion->RegistrarGeneracion($request);
    }

    public function modificarGeneracion(Request $request, $id){
        $Generacion = new Generaciones();
        $validator=$this->validate($request, 
            [
                'Generacion'=>'required|numeric|unique:generaciones,Generacion,'.$id,
                'Anio_Inicio'=>'required|numeric|unique:generaciones,Anio_Inicio,'.$id
                
            ]);
        return $Generacion->ModificarGeneracion($request, $id);
    }

    public function filtradoGen(Request $request){
        $objeto = new Generaciones();
        $generaciones = $objeto->filtradoGen($request);
        return $generaciones;
    }

    public function busquedaGen(Request $request){
        $objeto = new Generaciones();
        $generaciones = $objeto->busquedaGen($request);
        return $generaciones;
    }

    public function ObtenerGeneraciones(){
        $objeto = new Generaciones();
        $generaciones = $objeto->ObtenerGeneraciones();
        return $generaciones;
    }
}
