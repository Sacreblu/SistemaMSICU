<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TiposColaboraciones extends Model
{
    protected $fillable = [
        'id',
        'Tipo'
    ];

    public function TipoColaboraciones(){
        $tipos= TiposColaboraciones::orderBy('Tipo', 'DESC')->get();
        return $tipos;
    }
}
