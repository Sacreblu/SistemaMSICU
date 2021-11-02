<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlanEstudios extends Model
{
    //Constructor de la Clase PlanEstudios
    protected $fillable = [
        'id',
        'Nombre',
        'Anio',
        'Vigente'
    ];

    //Metodo que muestra todos los planes de estudio registrados
    public function MostrarPlanes(){
        $planes= PlanEstudios::orderBy('Anio', 'DESC')->get();
        
        $generaciones = Generaciones::join('plan_estudios', 'generaciones.Id_Plan', '=', 'plan_estudios.id')
                        ->select('generaciones.*', 'plan_estudios.Nombre')->orderBy('Generacion', 'ASC')->get();
        
        $lgacs = LGAC::join('plan_estudios', 'l_g_a_c_s.Id_Plan', '=', 'plan_estudios.id')
                        ->select('l_g_a_c_s.*', 'plan_estudios.Nombre as planNombre')->orderBy('l_g_a_c_s.Nombre', 'DESC')->get();
        
        $ee = ExperienciasEducativas::join('plan_estudios', 'experiencias_educativas.Id_Plan', '=', 'plan_estudios.id')
                        ->select('experiencias_educativas.*', 'plan_estudios.Nombre as planNombre')->orderBy('experiencias_educativas.NombreEE', 'DESC')->get();
        
        $array=[$planes, $generaciones, $lgacs, $ee];
        return $array;
    }

    //Metodo de la clase PlanEstudios que recibe los datos y los guarda en la bd
    public function RegistrarPlan($request){
        $vigencia = $request->get('Vigente');
        if($vigencia!="on"){
            $vigencia = "off";
        }
        $datos = new PlanEstudios ([
            'Nombre'=> $request->get('Nombre'),
            'Anio'=> $request->get('Anio'),
            'Vigente' => $vigencia
        ]); 
        $datos->save();
        return "Plan de Estudios Registrado";
    }

    //Metodo de la clase PlanEstudios que recibe los datos modificados y los guarda
    public function ModificarPlan($request, $id){
        $vigencia = $request->get('Vigente');
        if($vigencia!="on"){
            $vigencia = "off";
        }

        $plan = PlanEstudios::find($id);
        $plan->Nombre = $request->get('Nombre');
        $plan->Anio = $request->get('Anio');
        $plan->Vigente = $vigencia;
        $plan->save();
        return "Plan de Estudios Modificado";
    }

    public function filtrado($request){
        $mostrar = $request->get('mostrar');

        if($mostrar=="Todos"){
            $planes= PlanEstudios::orderBy('Anio', 'DESC')->get();
        }else{
            $planes= PlanEstudios::where('Vigente', '=', $mostrar)->orderBy('Anio', 'DESC')->get();
        }
        return $planes;
    }

    public function busqueda($request){
        $texto = $request->busqueda;
        $check = $request->check;

        $planes= PlanEstudios::where($check, 'like', '%'.$texto.'%')->get();

        return $planes;
    }

    public function ObtenerPlanes(){
        $planes = PlanEstudios::query() ->select(['id', 'Nombre'])->get();
        return $planes;
    }
}
