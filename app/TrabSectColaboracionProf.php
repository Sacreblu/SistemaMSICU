<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TrabSectColaboracionProf extends Model
{
    protected $fillable = [
        'id',
        'idTrabajo',
        'idProfesor'
    ];

    public function RegistrarColaboracionProfesores($request){
        $datos = new TrabSectColaboracionProf([
            'idTrabajo'=> $request->get('IdTrabajoSector'),
            'idProfesor'=> $request->get('IdColabProf')
        ]); 
        $datos->save();
    }

    public function EliminarColabProf($request){
        $ids = $request->get('Ids');
        for ($i=0; $i < count($ids); $i++) { 
            $colaboracion = TrabSectColaboracionProf::find($ids[$i]);
            $colaboracion->delete();
        }
        return "hecho";
    }

    public function ModificarColabProf($request){
        $TS = TrabSectColaboracionProf::find($request->get('IdRegColabProf'));
        
        $TS->idProfesor = $request->get('IdColabProf');

        $TS->save();
        return "hecho";
    }

    public function ObtenerColaboracionByProfesor($request){
        $idTS = $request->get('idTS');
        $TS = TrabSectColaboracionProf::join('profesores', 'trab_sect_colaboracion_profs.idProfesor', '=', 'profesores.id')
            ->select('trab_sect_colaboracion_profs.id', 'trab_sect_colaboracion_profs.idProfesor', 'profesores.Nombre', 'profesores.Apellido_P', 'profesores.Apellido_M')
            ->where('trab_sect_colaboracion_profs.idTrabajo', '=', $idTS)->get();
        return $TS;
    }
}
