<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TiposContrataciones extends Model
{
    protected $fillable = [
        'id',
        'Tipo'
    ];

    public function TipoContrataciones(){
        $tipos= TiposContrataciones::orderBy('Tipo', 'DESC')->get();
        return $tipos;
    }
}
