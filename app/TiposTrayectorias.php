<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TiposTrayectorias extends Model
{
    protected $fillable = [
        'id',
        'Tipo'
    ];

    public function Tipos(){
        $tipos= TiposTrayectorias::select('id', 'Tipo')->orderBy('id', 'ASC')->get();
        return $tipos;
    }

    public function getNombreDocumento($id){
        $tipo= TiposTrayectorias::select('Tipo')->where('id', '=', $id)->get();
        return $tipo;
    }

    public function RegistrarTipo($tipo){
        $datos = new TiposTrayectorias ([
            'Tipo'=> $tipo
        ]);
        $datos->save();
        return $datos->id;
    }
}
