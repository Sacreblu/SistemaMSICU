<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LGAC extends Model
{
    protected $fillable = [
        'id',
        'Nombre',
        'Id_Plan',
        'Vigente'
    ];

    public function RegistrarLGAC($request){
        $vigencia = $request->get('Vigente');
        if($vigencia!="on"){
            $vigencia = "off";
        }
        $datos = new LGAC ([
            'Nombre'=> $request->get('Nombre'),
            'Id_Plan'=> $request->get('Id_Plan'),
            'Vigente' => $vigencia
        ]); 
        $datos->save();
        return "Linea de Generación y Aplicación de Conocimiento Registrada";
    }

    public function ModificarLGAC($request, $id){
        $vigencia = $request->get('Vigente');
        if($vigencia!="on"){
            $vigencia = "off";
        }

        $lgac = LGAC::find($id);
        $lgac->Nombre = $request->get('Nombre');
        $lgac->Id_Plan = $request->get('Id_Plan');
        $lgac->Vigente = $vigencia;
        $lgac->save();
        return "Linea de Generación y Aplicación de Conocimiento Modificado";
    }

    public function filtradoLGAC($request){
        $mostrar = $request->get('mostrar');

        try {
            $split = explode("_", $request->get('mostrar'));

            $campo = $split[0];
            $valor = $split[1];
        } catch (\Throwable $th) {
            
        }

        switch ($mostrar) {
            case 'Todos':
                $lgac= LGAC::join('plan_estudios', 'l_g_a_c_s.Id_Plan', '=', 'plan_estudios.id')->select('l_g_a_c_s.*', 'plan_estudios.Nombre as planNombre')->orderBy('l_g_a_c_s.Nombre', 'ASC')->get();
                break;
            default:
                $lgac= LGAC::join('plan_estudios', 'l_g_a_c_s.Id_Plan', '=', 'plan_estudios.id')->select('l_g_a_c_s.*', 'plan_estudios.Nombre as planNombre')->where('l_g_a_c_s.'.$campo, '=', $valor)->orderBy('l_g_a_c_s.Nombre', 'ASC')->get();
                break;
        }
        return $lgac;
    }

    public function busquedaLGAC($request){
        $texto = $request->busqueda;
        $check = $request->check;

        $lgac= LGAC::join('plan_estudios', 'l_g_a_c_s.Id_Plan', '=', 'plan_estudios.id')->select('l_g_a_c_s.*', 'plan_estudios.Nombre as planNombre')->where('l_g_a_c_s.'.$check, 'like', '%'.$texto.'%')->get();

        return $lgac;
    }

    public function LGACS(){
        $lgac= LGAC::select('id', 'Nombre')->orderBy('Nombre', 'ASC')->get();
        return $lgac;
    }

    public function LGACsByPlan($idPlan){
        $lgac = LGAC::select('id', 'Nombre')->where('Id_Plan', '=', $idPlan)->orderBy('id', 'ASC')->get();
        return $lgac;
    }

    public function getLGACs(){
        $lgacs =LGAC::join('plan_estudios', 'l_g_a_c_s.Id_Plan', '=', 'plan_estudios.id')
                ->select('l_g_a_c_s.id', 'l_g_a_c_s.Nombre', 'plan_estudios.Anio')
                ->get();
        return $lgacs;    
    }

    public function ObtenerLGACs(){
        $lgac= LGAC::select('id', 'Nombre', 'Id_Plan')->orderBy('Nombre', 'ASC')->get();
        return $lgac;
    }
}
