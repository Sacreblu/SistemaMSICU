<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TrabSectEEAsociadas extends Model
{
    protected $fillable = [
        'id',
        'idTrabajo',
        'idEE'
    ];

    public function RegistrarEEAsociadas($request){
        $datos = new TrabSectEEAsociadas([
            'idTrabajo'=> $request->get('IdTrabajoSector'),
            'idEE'=> $request->get('IdEE')
        ]); 
        $datos->save();
    }

    public function ObtenerEEAsociadas($request){
        $idTS = $request->get('idTS');
        $TS = TrabSectEEAsociadas::join('experiencias_educativas', 'trab_sect_e_e_asociadas.idEE', '=', 'experiencias_educativas.id')
            ->select('trab_sect_e_e_asociadas.id', 'trab_sect_e_e_asociadas.idEE', 'experiencias_educativas.NombreEE', 'experiencias_educativas.id_Plan')
            ->where('trab_sect_e_e_asociadas.idTrabajo', '=', $idTS)->get();
        return $TS;
    }

    public function EliminarEE($request){
        $ids = $request->get('Ids');
        for ($i=0; $i < count($ids); $i++) { 
            $ee = TrabSectEEAsociadas::find($ids[$i]);
            $ee->delete();
        }
        return "hecho";
    }

    public function ModificarEE($request){
        $TS = TrabSectEEAsociadas::find($request->get('IdRegEE'));
        
        $TS->idEE = $request->get('IdEE');

        $TS->save();
        return "hecho";
    }

}
