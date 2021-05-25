<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LGACProfesores extends Model
{
    protected $fillable = [
        'id',
        'Id_Profesor',
        'Id_LGAC'
    ];

    public function RegistrarRelacion($idProfe, $idLGAC){
        $relacion = new LGACProfesores ([
            'Id_Profesor'=> $idProfe,
            'Id_LGAC'=> $idLGAC
        ]); 
        $relacion->save();
        return true;
    }

    public function ObtenerLGACsByProfesor($request){
        $idProfesor = $request->get('idProfe');
        $profesor = LGACProfesores::join('l_g_a_c_s', 'l_g_a_c_profesores.Id_LGAC', '=', 'l_g_a_c_s.id')
        ->join('plan_estudios', 'l_g_a_c_s.Id_Plan', '=', 'plan_estudios.id')    
        ->select('l_g_a_c_profesores.id','Id_LGAC', 'l_g_a_c_s.Nombre', 'plan_estudios.Nombre as NombrePlan')
            ->where('Id_Profesor', '=', $idProfesor)->get();
        return $profesor;
    }

    public function CleanLGACs($idProfe){
        LGACProfesores::where('Id_Profesor', "=", $idProfe)->delete();
    }
}
