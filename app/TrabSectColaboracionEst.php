<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TrabSectColaboracionEst extends Model
{
    protected $fillable = [
        'id',
        'idTrabajo',
        'idEstudiante'
    ];

    public function RegistrarColaboracionEstudiantes($request){
        $datos = new TrabSectColaboracionEst([
            'idTrabajo'=> $request->get('IdTrabajoSector'),
            'idEstudiante'=> $request->get('IdColabEst')
        ]); 
        $datos->save();
    }

    public function EliminarColabEst($request){
        $ids = $request->get('Ids');
        for ($i=0; $i < count($ids); $i++) { 
            $colaboracion = TrabSectColaboracionEst::find($ids[$i]);
            $colaboracion->delete();
        }
        return "hecho";
    }

    public function ModificarColabEst($request){
        $TS = TrabSectColaboracionEst::find($request->get('IdRegColabEst'));
        
        $TS->idEstudiante = $request->get('IdColabEst');

        $TS->save();
        return "hecho";
    }

    public function ObtenerColaboracionByEstudiante($request){
        $idTS = $request->get('idTS');
        $TS = TrabSectColaboracionEst::join('estudiantes', 'trab_sect_colaboracion_ests.idEstudiante', '=', 'estudiantes.id')
            ->select('trab_sect_colaboracion_ests.id', 'trab_sect_colaboracion_ests.idEstudiante', 'estudiantes.Nombre', 'estudiantes.Apellido_P', 'estudiantes.Apellido_M')
            ->where('trab_sect_colaboracion_ests.idTrabajo', '=', $idTS)->get();
        return $TS;
    }
}
