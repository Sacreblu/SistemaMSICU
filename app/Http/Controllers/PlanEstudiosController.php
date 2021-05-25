<?php

namespace App\Http\Controllers;

use App\PlanEstudios;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PlanEstudiosController extends Controller
{
    public function mostrarPlanEstudios(){
        $objeto = new PlanEstudios();
        $array = $objeto->MostrarPlanes();
        return view('PlanEstudios.Plan_Estudios', compact('array'));
    }

    public function registrarPlanEstudios(Request $request){
        $PlanDeEstudios = new PlanEstudios();
        $validator=$this->validate($request, 
            [
                'Nombre'=>'required|string|max:50',
                'Anio'=>'required|numeric|unique:plan_estudios'
            ]);
        return $PlanDeEstudios->RegistrarPlan($request);
    }

    public function modificarPlanEstudios(Request $request, $id){
        $PlanDeEstudios = new PlanEstudios();
        $validator=$this->validate($request, 
            [
                'Nombre'=>'required|string|max:50',
                'Anio'=>'required|numeric|unique:plan_estudios,Anio,'.$id
                
            ]);
        return $PlanDeEstudios->ModificarPlan($request, $id);
    }

    public function filtrado(Request $request){
        $objeto = new PlanEstudios();
        $planes = $objeto->filtrado($request);
        return $planes;
    }

    public function busqueda(Request $request){
        $objeto = new PlanEstudios();
        $planes = $objeto->busqueda($request);
        return $planes;
    }

    public function ObtenerPlanes(){
        $objeto = new PlanEstudios();
        $planes = $objeto->ObtenerPlanes();
        return $planes;
    }
}
