<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DocumentosSuperacion extends Model
{
    protected $fillable = [
        'id',
        'Tipo'
    ];

    public function Tipos(){
        $tipos= DocumentosSuperacion::select('id', 'Tipo')->orderBy('id', 'ASC')->get();
        return $tipos;
    }

    public function getNombreDocumento($id){
        $tipo= DocumentosSuperacion::select('Tipo')->where('id', '=', $id)->get();
        return $tipo;
    }

    public function RegistrarTipo($tipo){
        $datos = new DocumentosSuperacion ([
            'Tipo'=> $tipo
        ]);
        $datos->save();
        return $datos->id;
    }
}
