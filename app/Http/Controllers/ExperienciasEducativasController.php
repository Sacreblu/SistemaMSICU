<?php

namespace App\Http\Controllers;

use App\ExperienciasEducativas;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ExperienciasEducativasController extends Controller
{
    public function registrarEE(Request $request){
        $EE = new ExperienciasEducativas();
        $validator=$this->validate($request, 
            [
                'NombreEE'=>'required|string|max:150',
                'CreditosEE'=>'required|numeric',
                'TeoriaConProfesorEE'=>'required|numeric',
                'TeoriaSinProfesorEE'=>'required|numeric',
                'PracticasConProfesorEE'=>'required|numeric',
                'PracticasSinProfesorEE'=>'required|numeric'
            ]);
        return $EE->registrarEE($request);
    }

    public function modificarEE(Request $request, $id){
        $EE = new ExperienciasEducativas();
        $validator=$this->validate($request, 
            [
                'NombreEE'=>'required|string|max:150',
                'CreditosEE'=>'required|numeric',
                'TeoriaConProfesorEE'=>'required|numeric',
                'TeoriaSinProfesorEE'=>'required|numeric',
                'PracticasConProfesorEE'=>'required|numeric',
                'PracticasSinProfesorEE'=>'required|numeric'
            ]);
        return $EE->modificarEE($request, $id);
    }

    public function busquedaEE(Request $request){
        $objeto = new ExperienciasEducativas();
        $EE = $objeto->busquedaEE($request);
        return $EE;
    }

    public function filtradoEE(Request $request){
        $objeto = new ExperienciasEducativas();
        $EE = $objeto->filtradoEE($request);
        return $EE;
    }

    public function ObtenerEE(){
        $objeto = new ExperienciasEducativas();
        $EE = $objeto->ObtenerEE();
        return $EE;
    }
}
