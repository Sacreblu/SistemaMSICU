<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Generaciones extends Model
{
    protected $fillable = [
        'id',
        'Generacion',
        'Mes_Inicio',
        'Anio_Inicio',
        'Mes_Fin',
        'Anio_Fin',
        'Estado',
        'Id_Plan'
    ];

    public function RegistrarGeneracion($request){
        $estado = $request->get('Estado');
        if($estado!="on"){
            $estado = "Concluido";
        }else{
            $estado = "Vigente";
        }
        $datos = new Generaciones ([
            'Generacion'=> $request->get('Generacion'),
            'Mes_Inicio'=> $request->get('Mes_Inicio'),
            'Anio_Inicio' => $request->get('Anio_Inicio'),
            'Mes_Fin'=> $request->get('Mes_Fin'),
            'Anio_Fin' => $request->get('Anio_Fin'),
            'Estado' => $estado,
            'Id_Plan' => $request->get('Id_Plan')
        ]); 
        $datos->save();
        return "Nueva Generación Registrada";
    }


    public function ModificarGeneracion($request, $id){
        $estado = $request->get('Estado');
        if($estado!="on"){
            $estado = "Concluido";
        }else{
            $estado = "Vigente";
        }

        $generacion = Generaciones::find($id);
        $generacion->Generacion = $request->get('Generacion');
        $generacion->Mes_Inicio = $request->get('Mes_Inicio');
        $generacion->Anio_Inicio = $request->get('Anio_Inicio');
        $generacion->Mes_Fin = $request->get('Mes_Fin');
        $generacion->Anio_Fin = $request->get('Anio_Fin');
        $generacion->Estado = $estado;
        $generacion->Id_Plan = $request->get('Id_Plan');
        $generacion->save();
        return "Plan de Estudios Modificado";
    }

    public function filtradoGen($request){
        $mostrar = $request->get('mostrar');

        switch ($mostrar) {
            case 'Todos':
                $generaciones= Generaciones::join('plan_estudios', 'generaciones.Id_Plan', '=', 'plan_estudios.id')->orderBy('Generacion', 'DESC')->get();
                break;
            default:
                $generaciones= Generaciones::join('plan_estudios', 'generaciones.Id_Plan', '=', 'plan_estudios.id')->where('Estado', '=', $mostrar)->orderBy('Generacion', 'DESC')->get();
                break;
        }
        return $generaciones;
    }

    public function busquedaGen($request){
        $texto = $request->busqueda;
        $check = $request->check;

        $generaciones= Generaciones::join('plan_estudios', 'generaciones.Id_Plan', '=', 'plan_estudios.id')->where($check, 'like', '%'.$texto.'%')->get();

        return $generaciones;
    }

    public function ObtenerGeneraciones(){
        $generaciones= Generaciones::select('id', 'Generacion', 'Id_Plan')->orderBy('Generacion', 'DESC')->get();
        return $generaciones;
    }

    public function getAnioGen($idgen){
        $gen = Generaciones::select('Anio_Inicio')->where('id', '=', $idgen)->first();
        return $gen->Anio_Inicio;
    }
}
